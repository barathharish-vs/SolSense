from flask import Flask, jsonify
from flask_cors import CORS
from app.config import config_by_name
from app.extensions import db, migrate
import os

def create_app(config_name=None):
    """Application Factory for SolSense Flask API."""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name, config_by_name['default']))

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Configure CORS for React Frontend communication
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config.get('CORS_ORIGINS', '*')}},
        supports_credentials=True
    )

    # Health Check API
    @app.route('/api/health', methods=['GET'])
    def health_check():
        db_status = "connected"
        try:
            db.session.execute(db.text("SELECT 1"))
        except Exception as e:
            db_status = f"disconnected ({type(e).__name__})"

        return jsonify({
            "status": "healthy",
            "service": "SolSense Backend API",
            "version": "1.0.0",
            "environment": config_name,
            "database_status": db_status
        }), 200

    # Register API Blueprints
    from app.routes.dashboard import dashboard_bp
    from app.routes.weather import weather_bp
    from app.routes.solar import solar_bp
    from app.routes.faults import faults_bp
    from app.routes.analytics import analytics_bp
    from app.routes.settings import settings_bp
    from app.routes.plants import plants_bp

    app.register_blueprint(dashboard_bp, url_prefix='/api')
    app.register_blueprint(weather_bp, url_prefix='/api')
    app.register_blueprint(solar_bp, url_prefix='/api')
    app.register_blueprint(faults_bp, url_prefix='/api')
    app.register_blueprint(analytics_bp, url_prefix='/api')
    app.register_blueprint(settings_bp, url_prefix='/api')
    app.register_blueprint(plants_bp, url_prefix='/api')

    # Global Error Handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "error_code": 404,
            "message": "The requested API endpoint was not found on SolSense backend."
        }), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "status": "error",
            "error_code": 405,
            "message": "The HTTP method is not allowed for the requested endpoint."
        }), 405

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "status": "error",
            "error_code": 500,
            "message": "Internal server error occurred on SolSense backend."
        }), 500

    return app
