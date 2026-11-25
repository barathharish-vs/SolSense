# SolSense – MySQL Database Documentation

This directory houses the database schema DDL, initial seed scripts, and migration instructions for the **SolSense – Weather-Correlated Solar Panel Efficiency Analysis and Fault Detection System**.

---

## 1. Database Overview

The SolSense data layer stores solar plant assets, time-series weather telemetry, string-level electrical performance, machine learning prediction outcomes, anomaly alerts, and plant operator configurations.

- **DBMS:** MySQL 8.0+
- **Driver / Connector:** PyMySQL (`mysql+pymysql`)
- **ORM:** Flask-SQLAlchemy (SQLAlchemy 2.0+)
- **Migrations:** Flask-Migrate (Alembic)
- **Character Set / Collation:** `utf8mb4` / `utf8mb4_unicode_ci`

---

## 2. Directory Structure

```text
database/
├── schema.sql           # DDL table creation scripts with constraints & indexes
├── seed.sql             # Demonstration initial records for local verification
└── README.md            # Database documentation & setup instructions
```

---

## 3. Database Schema & Tables

### 1. `plants`
Represents physical solar generation sites.
- `id` (VARCHAR(50), PK): Unique plant identifier (e.g., `'alpha'`, `'beta'`).
- `name` (VARCHAR(150), NOT NULL): Commercial or facility plant name.
- `location` (VARCHAR(200), NOT NULL): Geographical coordinates or address.
- `capacity_kw` (DECIMAL(10, 2), NOT NULL): Nominal nameplate capacity in kW.
- `installation_date` (DATE): Commissioning or grid-tie date.
- `created_at` (DATETIME): Record creation timestamp.

### 2. `weather_readings`
Time-series meteorological station readings.
- `id` (INT, PK, AUTO_INCREMENT).
- `plant_id` (VARCHAR(50), FK -> `plants.id`, ON DELETE CASCADE).
- `timestamp` (DATETIME, NOT NULL, INDEXED).
- `temperature` (DECIMAL(5, 2), NOT NULL): Ambient temperature in °C.
- `humidity` (DECIMAL(5, 2), NOT NULL): Relative humidity in %.
- `wind_speed` (DECIMAL(5, 2), NOT NULL): Wind velocity in m/s.
- `wind_direction` (VARCHAR(20)): Compass direction vector (e.g. `'m/s NE'`).
- `cloud_cover` (DECIMAL(5, 2), NOT NULL): Cloud coverage percentage.
- `solar_irradiance` (DECIMAL(8, 2), NOT NULL): Plane of array irradiance in W/m².
- `sensor_status` (VARCHAR(50)): Telemetry health status.

### 3. `solar_readings`
Time-series DC and AC electrical telemetry.
- `id` (INT, PK, AUTO_INCREMENT).
- `plant_id` (VARCHAR(50), FK -> `plants.id`, ON DELETE CASCADE).
- `timestamp` (DATETIME, NOT NULL, INDEXED).
- `voltage` (DECIMAL(8, 2), NOT NULL): DC bus voltage (V).
- `current` (DECIMAL(8, 2), NOT NULL): String current (A).
- `actual_power` (DECIMAL(10, 2), NOT NULL): Instantaneous AC power (kW).
- `energy_generated` (DECIMAL(12, 2)): Cumulative generation (kWh).

### 4. `prediction_results`
ML solar yield estimates prepared for Scikit-learn integration.
- `id` (INT, PK, AUTO_INCREMENT).
- `plant_id` (VARCHAR(50), FK -> `plants.id`, ON DELETE CASCADE).
- `timestamp` (DATETIME, NOT NULL, INDEXED).
- `predicted_solar_power` (DECIMAL(10, 2), NOT NULL): Model output (kW).
- `actual_solar_power` (DECIMAL(10, 2), NULL): Ground-truth power (kW).
- `prediction_model_name` (VARCHAR(100), NOT NULL): Model identifier/version.
- `deviation_percent` (DECIMAL(6, 2)): Delta deviation percentage.

### 5. `fault_alerts`
Electrical and thermal anomaly logs.
- `id` (VARCHAR(50), PK): Alert identifier (e.g., `'ANOM-1042'`).
- `plant_id` (VARCHAR(50), FK -> `plants.id`, ON DELETE CASCADE).
- `timestamp` (DATETIME, NOT NULL, INDEXED).
- `fault_category` (VARCHAR(100), NOT NULL): Category (e.g., `'Voltage Drop'`).
- `severity` (ENUM('critical', 'warning', 'info'), INDEXED).
- `description` (TEXT, NOT NULL): Diagnostic hypothesis.
- `component` (VARCHAR(100)): Target module, string, or combiner box.
- `confidence_score` (DECIMAL(5, 2)): Diagnostic algorithm confidence (0-100%).
- `status` (VARCHAR(50)): Resolution workflow state.

### 6. `user_settings`
Operator thresholds and preferences.
- `id` (INT, PK, AUTO_INCREMENT).
- `user_name` (VARCHAR(100)), `email` (VARCHAR(150), UNIQUE).
- `role` (VARCHAR(100)), `permissions` (VARCHAR(100)).
- `two_factor_enabled` (BOOLEAN).
- `critical_voltage_drop`, `soiling_threshold`, `inverter_temp_alert` (DECIMAL(5, 2)).
- `email_alerts`, `sms_alerts`, `daily_report_summary` (BOOLEAN).

---

## 4. Setup & Configuration

### Step 1: Create Database
In MySQL CLI or MySQL Workbench:
```sql
CREATE DATABASE IF NOT EXISTS solsense_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### Step 2: Apply Schema DDL
```bash
mysql -u root -p solsense_db < database/schema.sql
```

### Step 3: Seed Sample Demonstration Data
```bash
mysql -u root -p solsense_db < database/seed.sql
```

### Step 4: Configure Backend Connection
Set your database credentials in `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=solsense_db
DB_USER=root
DB_PASSWORD=your_mysql_password
```

Or provide a unified connection string:
```env
DATABASE_URL=mysql+pymysql://root:your_mysql_password@localhost:3306/solsense_db?charset=utf8mb4
```

---

## 5. Flask-Migrate Workflow

To manage schema migrations using Flask-Migrate:

```bash
# Inside backend/ directory:
flask db init        # Only first time
flask db migrate -m "Initial schema migration"
flask db upgrade
```

---

## 6. Testing Database Connectivity

To verify database connectivity from the Flask backend:
```bash
curl http://127.0.0.1:5000/api/health
```

The response includes the `database_status`:
- `"database_status": "connected"` when MySQL is accessible.
- `"database_status": "disconnected (<Exception>)"` with graceful fallback to demonstration responses if credentials are not yet configured on the target host.
