/**
 * DEMONSTRATION DATA ONLY
 */
export const analyticsData = {
  isDemonstrationData: true,
  daily: {
    totalGeneration: '142.5 MWh',
    generationDelta: '+12.4% vs previous period',
    co2Offset: '68.4 Tons',
    co2Equiv: 'Equivalent to 3,100 trees',
    peakEfficiency: '99.1%',
    efficiencyLabel: 'Optimal inverter performance',
    chartData: [
      { label: '06:00', generation: 12, target: 10 },
      { label: '09:00', generation: 42, target: 40 },
      { label: '12:00', generation: 88, target: 82 },
      { label: '15:00', generation: 64, target: 60 },
      { label: '18:00', generation: 18, target: 16 },
    ]
  },
  weekly: {
    totalGeneration: '984.2 MWh',
    generationDelta: '+8.1% vs previous week',
    co2Offset: '472.0 Tons',
    co2Equiv: 'Equivalent to 21,400 trees',
    peakEfficiency: '98.9%',
    efficiencyLabel: 'Exceeding weekly target',
    chartData: [
      { label: 'Mon', generation: 138, target: 130 },
      { label: 'Tue', generation: 142, target: 135 },
      { label: 'Wed', generation: 151, target: 140 },
      { label: 'Thu', generation: 146, target: 140 },
      { label: 'Fri', generation: 139, target: 135 },
      { label: 'Sat', generation: 135, target: 130 },
      { label: 'Sun', generation: 133, target: 130 },
    ]
  },
  monthly: {
    totalGeneration: '4,120 MWh',
    generationDelta: '+14.2% vs previous month',
    co2Offset: '1,970 Tons',
    co2Equiv: 'Equivalent to 89,500 trees',
    peakEfficiency: '98.8%',
    efficiencyLabel: 'High availability record',
    chartData: [
      { label: 'Week 1', generation: 940, target: 900 },
      { label: 'Week 2', generation: 1020, target: 950 },
      { label: 'Week 3', generation: 1080, target: 980 },
      { label: 'Week 4', generation: 1080, target: 1000 },
    ]
  },
  yearly: {
    totalGeneration: '52,400 MWh',
    generationDelta: '+6.4% year-on-year',
    co2Offset: '25,150 Tons',
    co2Equiv: 'Equivalent to 1,140,000 trees',
    peakEfficiency: '98.7%',
    efficiencyLabel: 'Annual performance milestone',
    chartData: [
      { label: 'Q1', generation: 11200, target: 10500 },
      { label: 'Q2', generation: 15400, target: 14800 },
      { label: 'Q3', generation: 16100, target: 15500 },
      { label: 'Q4', generation: 9700, target: 9200 },
    ]
  }
};
