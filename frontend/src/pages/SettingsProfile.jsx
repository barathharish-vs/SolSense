import React, { useState } from 'react';
import { userProfileData } from '../data/userProfileData';

export default function SettingsProfile() {
  const [profile, setProfile] = useState(userProfileData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDiscard = () => {
    setProfile(userProfileData);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-space-xl">
      {/* Top Banner / Title area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <span className="text-label-md text-primary tracking-widest uppercase mb-space-xs block">
            Configuration &amp; Management
          </span>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Settings &amp; Profile</h1>
        </div>
        <div className="flex items-center gap-space-md">
          <button
            onClick={handleDiscard}
            className="px-space-md py-space-sm rounded-xl bg-surface-container-high text-on-surface text-label-md hover:bg-surface-container-highest transition-all cursor-pointer"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="px-space-lg py-space-sm rounded-xl bg-primary text-on-primary text-label-md hover:bg-surface-tint shadow-sm transition-all flex items-center gap-space-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p- space-md bg-secondary-fixed text-on-secondary-fixed rounded-xl flex items-center gap-2 border border-primary/20">
          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          <span className="text-body-md font-medium">Settings updated successfully (UI demonstration state).</span>
        </div>
      )}

      {/* Main Content Grid (3 columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Left Column: User Profile & Account Settings (1 col) */}
        <div className="flex flex-col gap-space-lg">
          {/* User Profile Card */}
          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h2 className="text-headline-sm font-headline-sm text-on-surface">User Profile</h2>
              <span className="px-space-sm py-space-xs rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center gap-space-md my-space-sm">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary flex items-center justify-center text-on-primary text-headline-md font-headline-md shadow-inner border border-primary-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Alex Rivera"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-body-lg font-headline-sm text-on-surface">{profile.name}</span>
                <span className="text-body-sm text-on-surface-variant">{profile.role}</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <label className="text-label-md text-on-surface-variant font-medium">Full Name</label>
              <input
                className="bg-surface px-space-md py-space-sm rounded-xl text-on-surface text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-space-sm">
              <label className="text-label-md text-on-surface-variant font-medium">Email Address</label>
              <input
                className="bg-surface px-space-md py-space-sm rounded-xl text-on-surface text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-space-sm">
              <label className="text-label-md text-on-surface-variant font-medium">Role &amp; Permissions</label>
              <input
                className="bg-surface-container px-space-md py-space-sm rounded-xl text-on-surface-variant text-body-md cursor-not-allowed border border-surface-container-high"
                disabled
                type="text"
                value={profile.permissions}
              />
            </div>
          </div>

          {/* Account Security Card */}
          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60 flex flex-col gap-space-md">
            <h2 className="text-headline-sm font-headline-sm text-on-surface">Account Security</h2>
            <div className="flex flex-col gap-space-sm">
              <label className="text-label-md text-on-surface-variant font-medium">Current Password</label>
              <input
                className="bg-surface px-space-md py-space-sm rounded-xl text-on-surface text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                type="password"
                defaultValue="••••••••••••"
              />
            </div>
            <div className="flex flex-col gap-space-sm">
              <label className="text-label-md text-on-surface-variant font-medium">New Password</label>
              <input
                className="bg-surface px-space-md py-space-sm rounded-xl text-on-surface text-body-md border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Enter new password"
                type="password"
              />
            </div>
            <div className="flex items-center justify-between pt-space-sm border-t border-surface-container">
              <div className="flex flex-col">
                <span className="text-body-md font-label-lg text-on-surface">Two-Factor Authentication</span>
                <span className="text-body-sm text-on-surface-variant">Authenticator app security layer</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.twoFactorEnabled}
                  onChange={(e) => setProfile({ ...profile, twoFactorEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Middle & Right Columns: Installation Details, Thresholds, Notifications (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-space-lg">
          {/* Installation Details Card */}
          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Installation Details</h2>
              <span className="text-label-sm text-primary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified Grid-Tied System
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
              <div className="bg-surface p-space-md rounded-xl border border-surface-container-high">
                <span className="text-label-sm text-on-surface-variant block">Plant Name &amp; Capacity</span>
                <span className="text-body-lg font-headline-sm text-on-surface mt-1 block">
                  {profile.plantDetails.name} — {profile.plantDetails.capacity}
                </span>
                <span className="text-body-sm text-on-surface-variant">{profile.plantDetails.type}</span>
              </div>

              <div className="bg-surface p-space-md rounded-xl border border-surface-container-high">
                <span className="text-label-sm text-on-surface-variant block">PV Module Array</span>
                <span className="text-body-lg font-headline-sm text-on-surface mt-1 block">
                  {profile.plantDetails.panels}
                </span>
                <span className="text-body-sm text-on-surface-variant">{profile.plantDetails.location}</span>
              </div>

              <div className="bg-surface p-space-md rounded-xl border border-surface-container-high">
                <span className="text-label-sm text-on-surface-variant block">Inverter Fleet</span>
                <span className="text-body-lg font-headline-sm text-on-surface mt-1 block">
                  {profile.plantDetails.inverters}
                </span>
                <span className="text-body-sm text-on-surface-variant">Grid Tie: {profile.plantDetails.gridTieDate}</span>
              </div>

              <div className="bg-surface p-space-md rounded-xl border border-surface-container-high">
                <span className="text-label-sm text-on-surface-variant block">Equipment Warranty</span>
                <span className="text-body-lg font-headline-sm text-on-surface mt-1 block text-primary">
                  {profile.plantDetails.warrantyStatus}
                </span>
                <span className="text-body-sm text-on-surface-variant">Sungrow Care Premier Support</span>
              </div>
            </div>
          </div>

          {/* Telemetry Alert Thresholds Card */}
          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60 flex flex-col gap-space-md">
            <h2 className="text-headline-sm font-headline-sm text-on-surface">Telemetry Alert Thresholds</h2>
            <p className="text-body-sm text-on-surface-variant">
              Configure sensitivity for AI anomaly detection and preventative maintenance triggers.
            </p>

            <div className="space-y-space-md pt-space-xs">
              <div>
                <div className="flex justify-between text-body-md mb-1 font-medium">
                  <span className="text-on-surface">Critical Voltage Drop Trigger</span>
                  <span className="text-primary font-bold">{profile.thresholds.criticalVoltageDrop}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={profile.thresholds.criticalVoltageDrop}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      thresholds: { ...profile.thresholds, criticalVoltageDrop: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-primary cursor-pointer"
                />
                <span className="text-label-sm text-on-surface-variant">Alert triggers when string voltage deviates by this percentage.</span>
              </div>

              <div>
                <div className="flex justify-between text-body-md mb-1 font-medium">
                  <span className="text-on-surface">Inverter Overheating Warning</span>
                  <span className="text-primary font-bold">{profile.thresholds.inverterTempAlert}°C</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="85"
                  value={profile.thresholds.inverterTempAlert}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      thresholds: { ...profile.thresholds, inverterTempAlert: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-primary cursor-pointer"
                />
                <span className="text-label-sm text-on-surface-variant">Threshold before forced thermal derating or cooling fan triggers.</span>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60 flex flex-col gap-space-md">
            <h2 className="text-headline-sm font-headline-sm text-on-surface">Notification Channels</h2>
            <div className="space-y-space-sm divide-y divide-surface-container">
              <div className="flex items-center justify-between py-2">
                <span className="text-body-md text-on-surface">Instant Email Alerts for Critical Anomalies</span>
                <input
                  type="checkbox"
                  checked={profile.notifications.emailAlerts}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, emailAlerts: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-body-md text-on-surface">SMS Urgent Dispatch Notifications</span>
                <input
                  type="checkbox"
                  checked={profile.notifications.smsAlerts}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, smsAlerts: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-body-md text-on-surface">Daily Generation &amp; CO2 Summary Digest</span>
                <input
                  type="checkbox"
                  checked={profile.notifications.dailyReportSummary}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      notifications: { ...profile.notifications, dailyReportSummary: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
