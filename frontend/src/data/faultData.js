/**
 * DEMONSTRATION DATA ONLY
 */
export const faultDetectionData = {
  isDemonstrationData: true,
  healthScore: '98.4%',
  healthDelta: '+0.2% vs yesterday',
  activeStrings: '142/144',
  aiEngine: 'AI Engine v4.2 (Simulated)',
  criticalCount: 2,
  warningCount: 5,
  aiConfidence: '94.8%',
  anomalies: [
    {
      id: 'ANOM-1042',
      stringId: 'Array B • String 07',
      component: 'Inverter Inv-03B',
      severity: 'critical',
      issue: 'Voltage Drop > 15%',
      potentialCause: 'Possible partial bypass diode failure or localized heavy shading',
      timestamp: 'Today, 10:14 AM',
      confidence: '96.2%',
      status: 'Open Investigation'
    },
    {
      id: 'ANOM-1041',
      stringId: 'Array D • String 02',
      component: 'Combiner Box CB-04',
      severity: 'critical',
      issue: 'Thermal Dissipation Exceeded',
      potentialCause: 'Terminal block loose connection causing localized heating',
      timestamp: 'Today, 09:32 AM',
      confidence: '92.5%',
      status: 'Maintenance Dispatched'
    },
    {
      id: 'ANOM-1039',
      stringId: 'Array A • String 14',
      component: 'Module Row 3',
      severity: 'warning',
      issue: 'Mild Soiling Accumulation',
      potentialCause: 'Dust and particulate buildup detected via optical delta algorithm',
      timestamp: 'Yesterday, 16:45 PM',
      confidence: '88.4%',
      status: 'Scheduled Cleaning'
    },
    {
      id: 'ANOM-1038',
      stringId: 'Array C • String 09',
      component: 'Inverter Inv-02A',
      severity: 'warning',
      issue: 'Intermittent Current Fluctuation',
      potentialCause: 'Transient tracking deviation during cloud transitions',
      timestamp: 'Yesterday, 14:10 PM',
      confidence: '84.0%',
      status: 'Monitoring'
    }
  ]
};
