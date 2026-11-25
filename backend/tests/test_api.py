import pytest
from datetime import datetime, date
from app import create_app
from app.extensions import db
from app.models import Plant, WeatherReading, SolarReading, PredictionResult, FaultAlert, UserSetting

@pytest.fixture
def app():
    """Create and configure a testing application with in-memory database."""
    app = create_app('testing')
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

# --- 1. Base Endpoint Tests ---
def test_health_check(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'database_status' in data

def test_dashboard_fallback(client):
    response = client.get('/api/dashboard')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert 'summary_metrics' in data

def test_weather_endpoint(client):
    response = client.get('/api/weather')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert 'current' in data

def test_solar_endpoint(client):
    response = client.get('/api/solar')
    assert response.status_code == 200
    data = response.get_json()
    assert 'summary' in data

def test_faults_endpoint(client):
    response = client.get('/api/faults')
    assert response.status_code == 200
    assert 'anomalies' in response.get_json()

def test_analytics_endpoint(client):
    response = client.get('/api/analytics?period=monthly')
    assert response.status_code == 200
    assert response.get_json()['period'] == 'monthly'

def test_settings_endpoint(client):
    response = client.get('/api/settings')
    assert response.status_code == 200
    assert 'profile' in response.get_json()

# --- 2. Database Model & CRUD Tests ---
def test_plant_crud(app, client):
    # Create (POST)
    payload = {
        "id": "test-plant",
        "name": "Test Rooftop Solar Array",
        "location": "Testing Facility Sector 9",
        "capacity_kw": 350.5,
        "installation_date": "2024-01-15"
    }
    res_post = client.post('/api/plants', json=payload)
    assert res_post.status_code == 201
    assert res_post.get_json()['plant']['id'] == 'test-plant'

    # Read (GET)
    res_get = client.get('/api/plants')
    assert res_get.status_code == 200
    data = res_get.get_json()
    assert data['total'] == 1
    assert data['plants'][0]['id'] == 'test-plant'

    # Update (PUT)
    res_put = client.put('/api/plants/test-plant', json={"name": "Updated Solar Array"})
    assert res_put.status_code == 200
    assert res_put.get_json()['plant']['name'] == "Updated Solar Array"

    # Delete (DELETE)
    res_del = client.delete('/api/plants/test-plant')
    assert res_del.status_code == 200

    # Verify Deletion
    res_verify = client.get('/api/plants')
    assert res_verify.get_json()['total'] == 0

def test_relational_cascading_and_readings(app):
    with app.app_context():
        # Insert parent Plant
        plant = Plant(
            id='plant-alpha',
            name='Alpha Station',
            location='Central Field',
            capacity_kw=500.0,
            installation_date=date(2023, 5, 1)
        )
        db.session.add(plant)
        db.session.commit()

        # Insert Weather Reading
        weather = WeatherReading(
            plant_id='plant-alpha',
            timestamp=datetime(2024, 10, 24, 12, 0),
            temperature=25.4,
            humidity=40.0,
            wind_speed=3.5,
            wind_direction='NE',
            cloud_cover=10.0,
            solar_irradiance=870.0
        )
        # Insert Solar Reading
        solar = SolarReading(
            plant_id='plant-alpha',
            timestamp=datetime(2024, 10, 24, 12, 0),
            voltage=802.0,
            current=518.0,
            actual_power=415.4,
            energy_generated=2500.0
        )
        # Insert Prediction Result
        prediction = PredictionResult(
            plant_id='plant-alpha',
            timestamp=datetime(2024, 10, 24, 12, 0),
            predicted_solar_power=400.0,
            actual_solar_power=415.4,
            prediction_model_name='Model-v4.2',
            deviation_percent=3.85
        )
        # Insert Fault Alert
        alert = FaultAlert(
            id='ALERT-001',
            plant_id='plant-alpha',
            timestamp=datetime(2024, 10, 24, 12, 0),
            fault_category='Voltage Deviation',
            severity='critical',
            description='Severe voltage anomaly on array string',
            confidence_score=95.0,
            status='Open Investigation'
        )

        db.session.add_all([weather, solar, prediction, alert])
        db.session.commit()

        # Verify insertions
        assert WeatherReading.query.count() == 1
        assert SolarReading.query.count() == 1
        assert PredictionResult.query.count() == 1
        assert FaultAlert.query.count() == 1

        # Test Cascade Delete
        db.session.delete(plant)
        db.session.commit()

        assert WeatherReading.query.count() == 0
        assert SolarReading.query.count() == 0
        assert PredictionResult.query.count() == 0
        assert FaultAlert.query.count() == 0

def test_database_integration_dashboard_route(client, app):
    with app.app_context():
        # Seed record
        plant = Plant(id='alpha', name='Plant Alpha DB', location='Sector 4', capacity_kw=500.0)
        reading = SolarReading(
            plant_id='alpha',
            timestamp=datetime(2024, 10, 24, 12, 0),
            voltage=800.0,
            current=500.0,
            actual_power=400.0
        )
        pred = PredictionResult(
            plant_id='alpha',
            timestamp=datetime(2024, 10, 24, 12, 0),
            predicted_solar_power=390.0,
            prediction_model_name='AI-Model-v4'
        )
        db.session.add_all([plant, reading, pred])
        db.session.commit()

    # Query dashboard endpoint with active DB readings
    res = client.get('/api/dashboard?plant_id=alpha')
    assert res.status_code == 200
    data = res.get_json()
    assert data['data_source'] == 'mysql_database'
    assert data['is_demonstration_data'] is False
    assert data['plant_name'] == 'Plant Alpha DB'
