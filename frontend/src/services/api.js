/**
 * SolSense API Service Layer
 * 
 * NOTE: This is a structured service abstraction layer for SolSense.
 * Currently returns realistic, simulated demonstration data.
 * When the Python Flask backend is ready, replace mock responses with
 * fetch/axios calls to the Flask REST endpoints (e.g. `/api/v1/...`).
 */

import { dashboardData } from '../data/dashboardData';
import { weatherData } from '../data/weatherData';
import { solarPerformanceData } from '../data/performanceData';
import { faultDetectionData } from '../data/faultData';
import { analyticsData } from '../data/analyticsData';
import { userProfileData } from '../data/userProfileData';

const SIMULATED_LATENCY_MS = 150;

const delay = (ms = SIMULATED_LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

export const plantService = {
  async getPlants() {
    await delay();
    return [
      { id: 'alpha', name: 'SolarPlant Alpha - 500kW Rooftop Array', capacityKw: 500, location: 'Building A' },
      { id: 'beta', name: 'SolarPlant Beta - 250kW Ground Mount', capacityKw: 250, location: 'Field Sector 4' },
      { id: 'gamma', name: 'SolarPlant Gamma - 1MW Industrial Hub', capacityKw: 1000, location: 'North Terminal' },
    ];
  }
};

export const dashboardService = {
  async getDashboardSummary(plantId = 'alpha') {
    await delay();
    return dashboardData;
  }
};

export const weatherService = {
  async getWeatherData(plantId = 'alpha', range = '7D') {
    await delay();
    return weatherData;
  }
};

export const solarPerformanceService = {
  async getPerformanceData(plantId = 'alpha', date = 'today') {
    await delay();
    return solarPerformanceData;
  }
};

export const faultDetectionService = {
  async getFaultEvents(filter = 'all') {
    await delay();
    if (filter === 'critical') {
      return faultDetectionData.anomalies.filter((a) => a.severity === 'critical');
    }
    if (filter === 'warning') {
      return faultDetectionData.anomalies.filter((a) => a.severity === 'warning');
    }
    return faultDetectionData;
  }
};

export const analyticsService = {
  async getAnalyticsReports(period = 'daily') {
    await delay();
    return analyticsData[period] || analyticsData['daily'];
  }
};

export const profileService = {
  async getUserProfile() {
    await delay();
    return userProfileData;
  },
  async updateProfile(updates) {
    await delay();
    return { success: true, updated: updates };
  }
};
