from flask import Blueprint, jsonify, request
from app.services import get_performance_analytics

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/analytics', methods=['GET'])
def analytics():
    """
    GET /api/analytics
    Returns periodic generation yields, CO2 offset metrics, and peak efficiency benchmarks.
    Query parameter: period (optional: daily, weekly, monthly, yearly)
    """
    period = request.args.get('period', 'daily').lower()
    valid_periods = ['daily', 'weekly', 'monthly', 'yearly']
    if period not in valid_periods:
        return jsonify({
            "status": "error",
            "message": f"Invalid period '{period}'. Allowed periods are: {', '.join(valid_periods)}."
        }), 400

    data = get_performance_analytics(period=period)
    return jsonify(data), 200
