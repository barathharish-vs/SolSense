
import os
from urllib.parse import quote_plus
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def build_database_uri():
    """Build the MySQL database URI safely."""

    custom_uri = os.environ.get('DATABASE_URL')
    if custom_uri:
        return custom_uri

    user = os.environ.get('DB_USER', 'root')
    password = os.environ.get('DB_PASSWORD', '')
    host = os.environ.get('DB_HOST', 'localhost')
    port = os.environ.get('DB_PORT', '3306')
    name = os.environ.get('DB_NAME', 'solsense_db')

    encoded_user = quote_plus(user)
    encoded_password = quote_plus(password)

    if password:
        return (
            f"mysql+pymysql://{encoded_user}:{encoded_password}"
            f"@{host}:{port}/{name}?charset=utf8mb4"
        )

    return (
        f"mysql+pymysql://{encoded_user}"
        f"@{host}:{port}/{name}?charset=utf8mb4"
    )


class Config:
    """Base application configuration."""

    SECRET_KEY = os.environ.get(
        'SECRET_KEY',
        'solsense-default-dev-secret-key'
    )

    DEBUG = False
    TESTING = False

    CORS_ORIGINS = os.environ.get(
        'CORS_ORIGINS',
        'http://localhost:3000,http://127.0.0.1:3000'
    ).split(',')

    JSON_SORT_KEYS = False

    # SQLAlchemy configuration
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_recycle': 280,
        'pool_pre_ping': True
    }


class DevelopmentConfig(Config):
    """Development configuration."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = build_database_uri()


class TestingConfig(Config):
    """Testing configuration."""

    TESTING = True
    DEBUG = True

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'TEST_DATABASE_URL',
        'sqlite:///:memory:'
    )


class ProductionConfig(Config):
    """Production configuration."""

    DEBUG = False

    SECRET_KEY = os.environ.get('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = (
        os.environ.get('DATABASE_URL') or build_database_uri()
    )


config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig,
}
