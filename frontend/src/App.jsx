import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import WeatherMonitoring from './pages/WeatherMonitoring';
import SolarPerformance from './pages/SolarPerformance';
import FaultDetection from './pages/FaultDetection';
import AnalyticsReports from './pages/AnalyticsReports';
import SettingsProfile from './pages/SettingsProfile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/*
          Root Route:
          - If not authenticated, renders the existing SignIn component first.
          - Once authenticated (via demo login), renders the Dashboard inside AppLayout.
        */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AppLayout onSignOut={() => setIsAuthenticated(false)}>
                <Dashboard />
              </AppLayout>
            ) : (
              <SignIn onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* Explicit /login route for direct access or sign-out */}
        <Route
          path="/login"
          element={<SignIn onLoginSuccess={() => setIsAuthenticated(true)} />}
        />

        {/* Authenticated Application Shell for all other sub-routes */}
        <Route element={<AppLayout onSignOut={() => setIsAuthenticated(false)} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weather" element={<WeatherMonitoring />} />
          <Route path="/solar-performance" element={<SolarPerformance />} />
          <Route path="/faults" element={<FaultDetection />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
          <Route path="/settings" element={<SettingsProfile />} />
        </Route>

        {/* Fallback to Root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
