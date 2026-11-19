import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title = 'Dashboard', onToggleMobileNav }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg border-b border-surface-container">
      {/* Left side: Hamburger button (mobile) + Page Title */}
      <div className="flex items-center gap-space-md">
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <span className="text-headline-sm font-headline-sm text-on-surface truncate">
          {title}
        </span>
      </div>

      {/* Right side: Weather Pill, Date, Notification Icon, User Profile */}
      <div className="flex items-center gap-space-md sm:gap-space-lg">
        {/* Weather Pill */}
        <div className="hidden sm:flex items-center gap-space-xs bg-secondary-container px-space-md py-space-xs rounded-full text-on-secondary-container text-label-md">
          <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
          <span>28°C, Clear</span>
        </div>

        {/* Date Display */}
        <span className="hidden md:inline-block text-body-md text-on-surface-variant">
          Oct 24, 2024
        </span>

        {/* Notifications Button with Dropdown Mock */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high p-space-md z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high mb-2">
                <span className="text-label-lg font-headline-sm text-on-surface">Notifications (Demo)</span>
                <span className="text-label-sm text-primary cursor-pointer hover:underline" onClick={() => setShowNotifications(false)}>Clear</span>
              </div>
              <div className="space-y-2 text-body-sm">
                <div className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer" onClick={() => { setShowNotifications(false); navigate('/faults'); }}>
                  <div className="flex items-center gap-1.5 text-error font-medium text-xs">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    Critical Anomaly Detected
                  </div>
                  <p className="text-on-surface-variant text-xs mt-0.5">Voltage drop &gt; 15% on Array B • String 07.</p>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer" onClick={() => { setShowNotifications(false); navigate('/weather'); }}>
                  <div className="flex items-center gap-1.5 text-primary font-medium text-xs">
                    <span className="material-symbols-outlined text-[14px]">wb_sunny</span>
                    Peak Irradiance Forecast
                  </div>
                  <p className="text-on-surface-variant text-xs mt-0.5">850 W/m² maintained across Rooftop Alpha.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar (Navigates to Settings & Profile) */}
        <button
          onClick={() => navigate('/settings')}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2 ring-offset-surface"
          title="Alex Rivera — Senior Plant Operator"
        >
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </button>
      </div>
    </header>
  );
}
