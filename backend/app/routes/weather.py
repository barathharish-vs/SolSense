from flask import Blueprint, jsonify, request
from app.services import get_weather_telemetry

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/weather', methods=['GET'])
def weather():
    """
    GET /api/weather
    Returns current weather telemetry (irradiance, temp, humidity, wind) and historical correlation trends.
    Query parameters: plant_id (optional), range (optional: 7D, 30D, 1Y)
    """
    plant_id = request.args.get('plant_id', 'alpha')
    range_param = request.args.get('range', '7D')
    data = get_weather_telemetry(plant_id=plant_id, range_param=range_param)
    return jsonify(data), 200
