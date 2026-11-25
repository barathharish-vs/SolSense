from flask import Blueprint, jsonify, request
from app.services import get_solar_performance

solar_bp = Blueprint('solar', __name__)

@solar_bp.route('/solar', methods=['GET'])
def solar():
    """
    GET /api/solar
    Returns DC voltage, string currents, AC power generation, PR ratio, and multi-string telemetry.
    Query parameter: plant_id (optional)
    """
    plant_id = request.args.get('plant_id', 'alpha')
    data = get_solar_performance(plant_id=plant_id)
    return jsonify(data), 200
