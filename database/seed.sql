-- SolSense Sample & Seed Data for MySQL
USE solsense_db;

-- Plants
INSERT INTO plants (id, name, location, capacity_kw, installation_date)
VALUES 
    ('alpha', 'SolarPlant Alpha - 500kW Rooftop Array', 'Building A Rooftop, Sector 4', 500.00, '2023-03-15'),
    ('beta', 'SolarPlant Beta - 250kW Ground Mount', 'Field Sector 4', 250.00, '2023-06-20'),
    ('gamma', 'SolarPlant Gamma - 1MW Industrial Hub', 'North Terminal Hub', 1000.00, '2022-11-10')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Weather Readings
INSERT INTO weather_readings (plant_id, timestamp, temperature, humidity, wind_speed, wind_direction, cloud_cover, solar_irradiance, sensor_status)
VALUES 
    ('alpha', '2024-10-24 12:00:00', 24.50, 42.00, 3.20, 'm/s NE', 12.00, 850.00, 'Online (99.8%)'),
    ('alpha', '2024-10-24 10:00:00', 23.00, 45.00, 2.80, 'm/s NE', 10.00, 720.00, 'Online (99.8%)'),
    ('alpha', '2024-10-24 08:00:00', 21.00, 50.00, 2.10, 'm/s N', 15.00, 480.00, 'Online (99.8%)');

-- Solar Readings
INSERT INTO solar_readings (plant_id, timestamp, voltage, current, actual_power, energy_generated)
VALUES 
    ('alpha', '2024-10-24 12:00:00', 800.00, 515.00, 412.50, 2450.00),
    ('alpha', '2024-10-24 10:00:00', 792.00, 428.00, 340.00, 1630.00),
    ('alpha', '2024-10-24 08:00:00', 785.00, 203.00, 160.00, 480.00);

-- Prediction Results
INSERT INTO prediction_results (plant_id, timestamp, predicted_solar_power, actual_solar_power, prediction_model_name, deviation_percent)
VALUES 
    ('alpha', '2024-10-24 12:00:00', 398.00, 412.50, 'Model AI-v4.2 (Simulated)', 3.60),
    ('alpha', '2024-10-24 10:00:00', 320.00, 340.00, 'Model AI-v4.2 (Simulated)', 6.20),
    ('alpha', '2024-10-24 08:00:00', 150.00, 160.00, 'Model AI-v4.2 (Simulated)', 6.70);

-- Fault Alerts
INSERT INTO fault_alerts (id, plant_id, timestamp, fault_category, severity, description, component, confidence_score, status)
VALUES 
    ('ANOM-1042', 'alpha', '2024-10-24 10:14:00', 'Voltage Drop > 15%', 'critical', 'Possible partial bypass diode failure or localized heavy shading', 'Inverter Inv-03B', 96.20, 'Open Investigation'),
    ('ANOM-1041', 'alpha', '2024-10-24 09:32:00', 'Thermal Dissipation Exceeded', 'critical', 'Terminal block loose connection causing localized heating', 'Combiner Box CB-04', 92.50, 'Maintenance Dispatched'),
    ('ANOM-1039', 'alpha', '2024-10-23 16:45:00', 'Mild Soiling Accumulation', 'warning', 'Dust and particulate buildup detected via optical delta algorithm', 'Module Row 3', 88.40, 'Scheduled Cleaning'),
    ('ANOM-1038', 'alpha', '2024-10-23 14:10:00', 'Intermittent Current Fluctuation', 'warning', 'Transient tracking deviation during cloud transitions', 'Inverter Inv-02A', 84.00, 'Monitoring')
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- User Settings
INSERT INTO user_settings (id, user_name, email, role, permissions, two_factor_enabled, critical_voltage_drop, soiling_threshold, inverter_temp_alert, email_alerts, sms_alerts, daily_report_summary)
VALUES 
    (1, 'Alex Rivera', 'alex.rivera@solsense.energy', 'Senior Plant Operator', 'Senior Plant Operator (Full Access)', TRUE, 15.0, 12.0, 65.0, TRUE, FALSE, TRUE)
ON DUPLICATE KEY UPDATE user_name=VALUES(user_name);
