# SolSense – Backend Service (Python Flask)

SolSense Backend is a RESTful API service supporting the **SolSense – Weather-Correlated Solar Panel Efficiency Analysis and Fault Detection System**.

It provides telemetry aggregation, weather correlation data, inverter electrical matrices, anomaly detection events, and analytical summaries for the SolSense React frontend.

---

## 1. Project Structure

```text
backend/
│
├── app/
│   ├── __init__.py          # Flask Application Factory & Blueprint registrations
│   ├── config.py            # Centralized environment-driven configuration
│   ├── routes/
│   │   ├── __init__.py      # Routes package definition
│   │   ├── dashboard.py     # GET /api/dashboard
│   │   ├── weather.py       # GET /api/weather
│   │   ├── solar.py         # GET /api/solar
│   │   ├── faults.py        # GET /api/faults
│   │   ├── analytics.py     # GET /api/analytics
│   │   └── settings.py      # GET /api/settings
│   │
│   └── services/
│       └── __init__.py      # Telemetry & demonstration data service layer
│
├── tests/
│   └── test_api.py          # Automated test suite using pytest
│
├── run.py                   # Application entry point script
├── requirements.txt         # Python dependencies
├── .env.example             # Template for local environment variables
└── README.md                # Backend documentation
```

---

## 2. Requirements & Environment
- **Python Version:** 3.10+ (tested with Python 3.13)
- **Framework:** Flask 3.1+, Flask-CORS 5.0+

---

## 3. Installation Instructions

### Step 1: Create and Activate Virtual Environment
From the `backend/` directory:

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

---

## 4. Running the Server

Start the development server:
```bash
python run.py
```

The Flask server will start locally at:
`http://127.0.0.1:5000`

---

## 5. Available API Endpoints

All API endpoints are prefixed with `/api` and return standardized JSON responses:

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/health` | Health check and API status verification | None |
| `GET` | `/api/dashboard` | Overview KPIs, actual/predicted kW, inverter table | `plant_id` (optional, default: `alpha`) |
| `GET` | `/api/weather` | Live station telemetry & irradiance/temp trends | `plant_id` (optional), `range` (`7D`, `30D`, `1Y`) |
| `GET` | `/api/solar` | DC voltage, string currents, AC power & strings | `plant_id` (optional) |
| `GET` | `/api/faults` | Detected anomalies, confidence & health index | `filter` (`all`, `critical`, `warning`) |
| `GET` | `/api/analytics` | Periodical generation, CO2 offset & peak efficiency | `period` (`daily`, `weekly`, `monthly`, `yearly`) |
| `GET` | `/api/settings` | Operator profile, plant specs, threshold sliders | None |

---

## 6. Running Automated Tests

Run the complete test suite using pytest:
```bash
pytest tests/ -v
```
All route tests verify status codes, JSON response schemas, valid parameter variations, and 400/404/405 error handlers.

---

## 7. Frontend Integration & CORS

The backend is configured with `Flask-CORS` to permit cross-origin requests from the React frontend running on `http://localhost:3000` and `http://127.0.0.1:3000`.

Frontend API service layer in `frontend/src/services/api.js` connects cleanly to these endpoints by referencing `http://127.0.0.1:5000/api`.
