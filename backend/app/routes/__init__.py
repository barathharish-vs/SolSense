"""
Flask Routes Package for SolSense API.
"""
from app.routes.dashboard import dashboard_bp
from app.routes.weather import weather_bp
from app.routes.solar import solar_bp
from app.routes.faults import faults_bp
from app.routes.analytics import analytics_bp
from app.routes.settings import settings_bp
from app.routes.plants import plants_bp

__all__ = [
    'dashboard_bp',
    'weather_bp',
    'solar_bp',
    'faults_bp',
    'analytics_bp',
    'settings_bp',
    'plants_bp',
]
