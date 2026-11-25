from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import Plant
from app.extensions import db

plants_bp = Blueprint('plants', __name__)

@plants_bp.route('/plants', methods=['GET'])
def list_plants():
    """GET /api/plants - Retrieve all registered solar plants."""
    plants = Plant.query.all()
    return jsonify({
        "status": "success",
        "total": len(plants),
        "plants": [p.to_dict() for p in plants]
    }), 200

@plants_bp.route('/plants', methods=['POST'])
def create_plant():
    """POST /api/plants - Register a new solar plant."""
    data = request.get_json() or {}
    required = ['id', 'name', 'location', 'capacity_kw']
    for field in required:
        if field not in data:
            return jsonify({"status": "error", "message": f"Missing required field '{field}'"}), 400

    if db.session.get(Plant, data['id']):
        return jsonify({"status": "error", "message": f"Plant with ID '{data['id']}' already exists"}), 409

    inst_date = None
    if data.get('installation_date'):
        try:
            inst_date = datetime.strptime(data['installation_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"status": "error", "message": "Invalid date format. Use YYYY-MM-DD"}), 400

    new_plant = Plant(
        id=data['id'],
        name=data['name'],
        location=data['location'],
        capacity_kw=data['capacity_kw'],
        installation_date=inst_date
    )
    db.session.add(new_plant)
    db.session.commit()
    return jsonify({"status": "success", "message": "Plant created successfully", "plant": new_plant.to_dict()}), 201

@plants_bp.route('/plants/<plant_id>', methods=['PUT'])
def update_plant(plant_id):
    """PUT /api/plants/<plant_id> - Update existing plant metadata."""
    plant = db.session.get(Plant, plant_id)
    if not plant:
        return jsonify({"status": "error", "message": "Plant not found"}), 404

    data = request.get_json() or {}
    if 'name' in data:
        plant.name = data['name']
    if 'location' in data:
        plant.location = data['location']
    if 'capacity_kw' in data:
        plant.capacity_kw = data['capacity_kw']

    db.session.commit()
    return jsonify({"status": "success", "message": "Plant updated", "plant": plant.to_dict()}), 200

@plants_bp.route('/plants/<plant_id>', methods=['DELETE'])
def delete_plant(plant_id):
    """DELETE /api/plants/<plant_id> - Delete a plant and cascading records."""
    plant = db.session.get(Plant, plant_id)
    if not plant:
        return jsonify({"status": "error", "message": "Plant not found"}), 404

    db.session.delete(plant)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Plant '{plant_id}' deleted"}), 200
