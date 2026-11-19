/**
 * DEMONSTRATION DATA ONLY
 * 
 * Note: These readings represent realistic sample telemetry for UI demonstration
 * purposes. They are NOT live inverter feeds or actual hardware measurements.
 */

export const dashboardData = {
  isDemonstrationData: true,
  plantStatus: {
    statusText: 'All Systems Optimal',
    dateFormatted: 'October 24, 2025',
    activePlant: 'SolarPlant Alpha - 500kW Rooftop Array',
    systemStatus: 'optimal',
  },
  summaryMetrics: [
    {
      id: 'actual-power',
      label: 'Actual Solar Power',
      value: '412.5',
      unit: 'kW',
      trend: '+5.2% vs avg',
      trendPositive: true,
      icon: 'wb_sunny',
    },
    {
      id: 'predicted-power',
      label: 'Predicted Power (Demonstration)',
      value: '398.0',
      unit: 'kW',
      trend: 'Model v4.2 Active',
      trendPositive: null,
      icon: 'psychology',
    },
    {
      id: 'performance-deviation',
      label: 'Performance Deviation',
      value: '+3.6%',
      unit: '',
      trend: 'Above model baseline',
      trendPositive: true,
      icon: 'equalizer',
    },
    {
      id: 'system-health',
      label: 'System Health Index',
      value: '98.2%',
      unit: '',
      trend: '142/144 Strings Active',
      trendPositive: true,
      icon: 'health_and_safety',
    },
  ],
  generationHistory: [
    { time: '06:00', actual: 40, predicted: 35 },
    { time: '08:00', actual: 160, predicted: 150 },
    { time: '10:00', actual: 340, predicted: 320 },
    { time: '12:00', actual: 490, predicted: 470 },
    { time: '14:00', actual: 412, predicted: 398 },
    { time: '16:00', actual: 230, predicted: 245 },
    { time: '18:00', actual: 60, predicted: 70 },
  ],
  telemetryTable: [
    { id: 'INV-01', location: 'Section A - String 1', voltage: '792 V', current: '24.1 A', power: '19.1 kW', efficiency: '98.6%', status: 'Optimal' },
    { id: 'INV-02', location: 'Section A - String 2', voltage: '788 V', current: '23.8 A', power: '18.7 kW', efficiency: '98.2%', status: 'Optimal' },
    { id: 'INV-03', location: 'Section B - String 1', voltage: '745 V', current: '19.2 A', power: '14.3 kW', efficiency: '92.4%', status: 'Warning' },
    { id: 'INV-04', location: 'Section B - String 2', voltage: '794 V', current: '24.3 A', power: '19.3 kW', efficiency: '98.8%', status: 'Optimal' },
    { id: 'INV-05', location: 'Section C - String 1', voltage: '791 V', current: '24.0 A', power: '19.0 kW', efficiency: '98.5%', status: 'Optimal' },
  ],
};
