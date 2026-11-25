from flask import Blueprint, jsonify, request
from app.services import get_dashboard_summary

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
def dashboard():
    """
    GET /api/dashboard
    Returns summary KPIs, generation trends, and inverter statuses for the active solar plant.
    Query parameter: plant_id (optional, defaults to 'alpha')
    """
    plant_id = request.args.get('plant_id', 'alpha')
    data = get_dashboard_summary(plant_id=plant_id)
    return jsonify(data), 200
