from flask import Blueprint, jsonify, request
from app.services import get_user_settings

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/settings', methods=['GET'])
def settings():
    """
    GET /api/settings
    Returns user profile parameters, equipment specifications, telemetry thresholds, and notification options.
    """
    data = get_user_settings()
    return jsonify(data), 200
