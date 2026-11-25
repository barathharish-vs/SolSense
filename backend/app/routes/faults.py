from flask import Blueprint, jsonify, request
from app.services import get_fault_events

faults_bp = Blueprint('faults', __name__)

@faults_bp.route('/faults', methods=['GET'])
def faults():
    """
    GET /api/faults
    Returns detected electrical and thermal anomalies, health indices, and diagnostic confidence scores.
    Query parameter: filter (optional: all, critical, warning)
    """
    filter_param = request.args.get('filter', 'all')
    valid_filters = ['all', 'critical', 'warning']
    if filter_param not in valid_filters:
        return jsonify({
            "status": "error",
            "message": f"Invalid filter '{filter_param}'. Allowed values are: {', '.join(valid_filters)}."
        }), 400

    data = get_fault_events(severity_filter=filter_param)
    return jsonify(data), 200
