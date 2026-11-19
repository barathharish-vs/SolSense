/**
 * DEMONSTRATION DATA ONLY
 */
export const solarPerformanceData = {
  isDemonstrationData: true,
  summary: {
    dcVoltage: '800.0 V DC',
    dcVoltageDelta: '+1.4% from nominal',
    stringCurrent: '515.0 A',
    stringCurrentStatus: 'Optimal load',
    actualPower: '412.5 kW',
    actualPowerDelta: 'Exceeding forecast',
    predictedPower: '398.0 kW',
    modelTag: 'Model AI-v4.2 (Simulated)',
    prRatio: '84.2%',
    prRatioDelta: '+1.8% vs benchmark'
  },
  strings: [
    { id: 'String A-01', voltage: 795, current: 25.1, power: 19.95, temp: 42.1, status: 'Optimal' },
    { id: 'String A-02', voltage: 792, current: 24.8, power: 19.64, temp: 41.8, status: 'Optimal' },
    { id: 'String A-03', voltage: 789, current: 25.0, power: 19.72, temp: 42.4, status: 'Optimal' },
    { id: 'String B-01', voltage: 742, current: 18.5, power: 13.73, temp: 47.2, status: 'Warning' },
    { id: 'String B-02', voltage: 794, current: 24.9, power: 19.77, temp: 42.0, status: 'Optimal' },
    { id: 'String C-01', voltage: 790, current: 25.2, power: 19.90, temp: 41.5, status: 'Optimal' },
  ]
};
