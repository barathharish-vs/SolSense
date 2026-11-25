-- SolSense MySQL Database Schema Definition
-- Database: solsense_db

CREATE DATABASE IF NOT EXISTS solsense_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE solsense_db;

-- 1. Plants Table
CREATE TABLE IF NOT EXISTS plants (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200) NOT NULL,
    capacity_kw DECIMAL(10, 2) NOT NULL,
    installation_date DATE NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_plants_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Weather Readings Table
CREATE TABLE IF NOT EXISTS weather_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL,
    timestamp DATETIME NOT NULL,
    temperature DECIMAL(5, 2) NOT NULL, -- Celsius
    humidity DECIMAL(5, 2) NOT NULL,    -- Percentage
    wind_speed DECIMAL(5, 2) NOT NULL,  -- m/s
    wind_direction VARCHAR(20) DEFAULT 'NE',
    cloud_cover DECIMAL(5, 2) NOT NULL, -- Percentage
    solar_irradiance DECIMAL(8, 2) NOT NULL, -- W/m^2
    sensor_status VARCHAR(50) DEFAULT 'Online (99.8%)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_weather_plant_time (plant_id, timestamp),
    CONSTRAINT fk_weather_plant FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Solar Readings Table
CREATE TABLE IF NOT EXISTS solar_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL,
    timestamp DATETIME NOT NULL,
    voltage DECIMAL(8, 2) NOT NULL,         -- Volts DC
    current DECIMAL(8, 2) NOT NULL,         -- Amperes
    actual_power DECIMAL(10, 2) NOT NULL,   -- kW
    energy_generated DECIMAL(12, 2) DEFAULT 0.0, -- kWh
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_solar_plant_time (plant_id, timestamp),
    CONSTRAINT fk_solar_plant FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Prediction Results Table (Prepared for future ML integration)
CREATE TABLE IF NOT EXISTS prediction_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL,
    timestamp DATETIME NOT NULL,
    predicted_solar_power DECIMAL(10, 2) NOT NULL, -- kW
    actual_solar_power DECIMAL(10, 2) NULL,        -- kW
    prediction_model_name VARCHAR(100) NOT NULL,
    deviation_percent DECIMAL(6, 2) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_prediction_plant_time (plant_id, timestamp),
    CONSTRAINT fk_prediction_plant FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Fault Alerts Table
CREATE TABLE IF NOT EXISTS fault_alerts (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    plant_id VARCHAR(50) NOT NULL,
    timestamp DATETIME NOT NULL,
    fault_category VARCHAR(100) NOT NULL,
    severity ENUM('critical', 'warning', 'info') NOT NULL DEFAULT 'warning',
    description TEXT NOT NULL,
    component VARCHAR(100) NULL,
    confidence_score DECIMAL(5, 2) NULL, -- Percentage (0-100)
    status VARCHAR(50) NOT NULL DEFAULT 'Open Investigation',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fault_plant_status (plant_id, status),
    INDEX idx_fault_severity (severity),
    CONSTRAINT fk_fault_plant FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. User Settings Table
CREATE TABLE IF NOT EXISTS user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(100) NOT NULL,
    permissions VARCHAR(100) NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT TRUE,
    critical_voltage_drop DECIMAL(5, 2) DEFAULT 15.0,
    soiling_threshold DECIMAL(5, 2) DEFAULT 12.0,
    inverter_temp_alert DECIMAL(5, 2) DEFAULT 65.0,
    email_alerts BOOLEAN DEFAULT TRUE,
    sms_alerts BOOLEAN DEFAULT FALSE,
    daily_report_summary BOOLEAN DEFAULT TRUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
