from datetime import datetime, timezone
from app.extensions import db

def utc_now():
    return datetime.now(timezone.utc)

class Plant(db.Model):
    """Solar Power Plant master entity."""
    __tablename__ = 'plants'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    capacity_kw = db.Column(db.Numeric(10, 2), nullable=False)
    installation_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=utc_now)

    # Relationships
    weather_readings = db.relationship('WeatherReading', backref='plant', lazy=True, cascade='all, delete-orphan')
    solar_readings = db.relationship('SolarReading', backref='plant', lazy=True, cascade='all, delete-orphan')
    predictions = db.relationship('PredictionResult', backref='plant', lazy=True, cascade='all, delete-orphan')
    fault_alerts = db.relationship('FaultAlert', backref='plant', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'capacity_kw': float(self.capacity_kw) if self.capacity_kw is not None else None,
            'installation_date': self.installation_date.isoformat() if self.installation_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class WeatherReading(db.Model):
    """Weather and meteorological station readings."""
    __tablename__ = 'weather_readings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_id = db.Column(db.String(50), db.ForeignKey('plants.id', ondelete='CASCADE'), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, nullable=False, index=True)
    temperature = db.Column(db.Numeric(5, 2), nullable=False)
    humidity = db.Column(db.Numeric(5, 2), nullable=False)
    wind_speed = db.Column(db.Numeric(5, 2), nullable=False)
    wind_direction = db.Column(db.String(20), default='NE')
    cloud_cover = db.Column(db.Numeric(5, 2), nullable=False)
    solar_irradiance = db.Column(db.Numeric(8, 2), nullable=False)
    sensor_status = db.Column(db.String(50), default='Online (99.8%)')
    created_at = db.Column(db.DateTime, default=utc_now)

    def to_dict(self):
        return {
            'id': self.id,
            'plant_id': self.plant_id,
            'timestamp': self.timestamp.isoformat(),
            'temperature': float(self.temperature),
            'humidity': float(self.humidity),
            'wind_speed': float(self.wind_speed),
            'wind_direction': self.wind_direction,
            'cloud_cover': float(self.cloud_cover),
            'solar_irradiance': float(self.solar_irradiance),
            'sensor_status': self.sensor_status
        }


class SolarReading(db.Model):
    """Solar array electrical telemetry readings."""
    __tablename__ = 'solar_readings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_id = db.Column(db.String(50), db.ForeignKey('plants.id', ondelete='CASCADE'), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, nullable=False, index=True)
    voltage = db.Column(db.Numeric(8, 2), nullable=False)
    current = db.Column(db.Numeric(8, 2), nullable=False)
    actual_power = db.Column(db.Numeric(10, 2), nullable=False)
    energy_generated = db.Column(db.Numeric(12, 2), default=0.0)
    created_at = db.Column(db.DateTime, default=utc_now)

    def to_dict(self):
        return {
            'id': self.id,
            'plant_id': self.plant_id,
            'timestamp': self.timestamp.isoformat(),
            'voltage': float(self.voltage),
            'current': float(self.current),
            'actual_power': float(self.actual_power),
            'energy_generated': float(self.energy_generated)
        }


class PredictionResult(db.Model):
    """ML prediction outcomes and model comparisons."""
    __tablename__ = 'prediction_results'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_id = db.Column(db.String(50), db.ForeignKey('plants.id', ondelete='CASCADE'), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, nullable=False, index=True)
    predicted_solar_power = db.Column(db.Numeric(10, 2), nullable=False)
    actual_solar_power = db.Column(db.Numeric(10, 2), nullable=True)
    prediction_model_name = db.Column(db.String(100), nullable=False)
    deviation_percent = db.Column(db.Numeric(6, 2), nullable=True)
    created_at = db.Column(db.DateTime, default=utc_now)

    def to_dict(self):
        return {
            'id': self.id,
            'plant_id': self.plant_id,
            'timestamp': self.timestamp.isoformat(),
            'predicted_solar_power': float(self.predicted_solar_power),
            'actual_solar_power': float(self.actual_solar_power) if self.actual_solar_power is not None else None,
            'prediction_model_name': self.prediction_model_name,
            'deviation_percent': float(self.deviation_percent) if self.deviation_percent is not None else None
        }


class FaultAlert(db.Model):
    """Detected electrical, thermal, and mechanical anomalies."""
    __tablename__ = 'fault_alerts'

    id = db.Column(db.String(50), primary_key=True)
    plant_id = db.Column(db.String(50), db.ForeignKey('plants.id', ondelete='CASCADE'), nullable=False, index=True)
    timestamp = db.Column(db.DateTime, nullable=False, index=True)
    fault_category = db.Column(db.String(100), nullable=False)
    severity = db.Column(db.String(20), nullable=False, default='warning')  # critical, warning, info
    description = db.Column(db.Text, nullable=False)
    component = db.Column(db.String(100), nullable=True)
    confidence_score = db.Column(db.Numeric(5, 2), nullable=True)
    status = db.Column(db.String(50), nullable=False, default='Open Investigation')
    created_at = db.Column(db.DateTime, default=utc_now)

    def to_dict(self):
        return {
            'id': self.id,
            'plant_id': self.plant_id,
            'timestamp': self.timestamp.isoformat(),
            'fault_category': self.fault_category,
            'severity': self.severity,
            'description': self.description,
            'component': self.component,
            'confidence_score': float(self.confidence_score) if self.confidence_score is not None else None,
            'status': self.status
        }


class UserSetting(db.Model):
    """User preferences, performance thresholds, and alerts."""
    __tablename__ = 'user_settings'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    role = db.Column(db.String(100), nullable=False)
    permissions = db.Column(db.String(100), nullable=False)
    two_factor_enabled = db.Column(db.Boolean, default=True)
    critical_voltage_drop = db.Column(db.Numeric(5, 2), default=15.0)
    soiling_threshold = db.Column(db.Numeric(5, 2), default=12.0)
    inverter_temp_alert = db.Column(db.Numeric(5, 2), default=65.0)
    email_alerts = db.Column(db.Boolean, default=True)
    sms_alerts = db.Column(db.Boolean, default=False)
    daily_report_summary = db.Column(db.Boolean, default=True)
    updated_at = db.Column(db.DateTime, default=utc_now, onupdate=utc_now)

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'email': self.email,
            'role': self.role,
            'permissions': self.permissions,
            'two_factor_enabled': self.two_factor_enabled,
            'critical_voltage_drop': float(self.critical_voltage_drop) if self.critical_voltage_drop is not None else 15.0,
            'soiling_threshold': float(self.soiling_threshold) if self.soiling_threshold is not None else 12.0,
            'inverter_temp_alert': float(self.inverter_temp_alert) if self.inverter_temp_alert is not None else 65.0,
            'email_alerts': self.email_alerts,
            'sms_alerts': self.sms_alerts,
            'daily_report_summary': self.daily_report_summary
        }
