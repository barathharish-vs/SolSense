# SolSense — Intelligent Solar Monitoring & AI Analytics Platform

SolSense is an enterprise-grade solar photovoltaics SaaS monitoring and intelligence platform designed to streamline solar asset operations, predictive generation forecasting, and real-time anomaly detection.

## Architecture & Directory Structure

```text
SolSense/
│
├── frontend/             # React + Vite + Tailwind CSS frontend application
│   ├── public/           # Static assets, favicon, PWA icons placeholder
│   ├── src/
│   │   ├── assets/       # Brand vectors & imagery
│   │   ├── components/   # Reusable UI components (MetricCard, StatusBadge)
│   │   ├── layouts/      # AppLayout, Header, Sidebar
│   │   ├── pages/        # 7 Google Stitch UI pages
│   │   ├── services/     # API service layer (ready for Flask REST endpoints)
│   │   ├── data/         # Demonstration telemetry and performance datasets
│   │   ├── App.jsx       # Root router configuration
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Design tokens & typography imports
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/              # Python Flask REST API server (Upcoming Stage)
├── database/             # MySQL schema definitions & migrations (Upcoming Stage)
├── ml/                   # Machine learning solar yield & fault models (Upcoming Stage)
├── docs/                 # Architecture, API specifications & user guides
├── README.md
└── .gitignore
```

## Frontend Setup & Execution

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Development
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if needed)
npm install

# Start local development server
npm run dev
```

The application runs locally on `http://localhost:3000`.

### Production Build
```bash
cd frontend
npm run build
```
Creates an optimized production bundle in `frontend/dist/`.
