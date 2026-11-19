/**
 * DEMONSTRATION DATA ONLY
 */
export const userProfileData = {
  isDemonstrationData: true,
  name: 'Alex Rivera',
  role: 'Senior Plant Operator',
  email: 'alex.rivera@solsense.energy',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  permissions: 'Senior Plant Operator (Full Access)',
  twoFactorEnabled: true,
  plantDetails: {
    name: 'SolarPlant Alpha',
    type: 'Commercial Rooftop & Solar Farm',
    capacity: '500 kWp Nominal',
    panels: '1,280 Monocrystalline Bifacial',
    inverters: '6x Sungrow SG110CX Commercial',
    location: 'Sector 4, Green Energy Corridor',
    gridTieDate: 'March 15, 2023',
    warrantyStatus: 'Active (Year 3 of 10)'
  },
  thresholds: {
    criticalVoltageDrop: 15, // percent
    soilingThreshold: 12,
    inverterTempAlert: 65, // Celsius
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    dailyReportSummary: true,
  }
};
