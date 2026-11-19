import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/weather', label: 'Weather Monitoring', icon: 'sunny' },
  { path: '/solar-performance', label: 'Solar Performance', icon: 'solar_power' },
  { path: '/faults', label: 'Fault Detection', icon: 'bolt' },
  { path: '/analytics', label: 'Analytics & Reports', icon: 'bar_chart' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ onCloseMobile, onSignOut }) {
  return (
    <aside className="h-full w-64 bg-surface-container-low flex flex-col pt-space-xl pb-space-xl border-r border-surface-container">
      {/* Brand Logo Header */}
      <div className="px-space-lg mb-space-xl flex items-center justify-between">
        <NavLink to="/dashboard" className="flex items-center gap-space-md" onClick={onCloseMobile}>
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[20px] fill-1">solar_power</span>
          </div>
          <span className="text-headline-sm font-headline-sm tracking-tight uppercase text-primary">
            SolSense
          </span>
        </NavLink>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface rounded-lg"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-space-md space-y-space-xs">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center px-space-md py-space-md rounded-xl transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined mr-space-md text-[20px]">
              {item.icon}
            </span>
            <span className="text-body-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Demo indicator & Sign Out */}
      <div className="px-space-lg pt-space-md border-t border-surface-container-high/60 space-y-space-sm">
        <div className="bg-surface-container-high/40 p-2.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-label-sm font-medium text-primary mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Demo Telemetry Mode
          </div>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            Simulated solar array data for frontend review.
          </p>
        </div>

        {onSignOut && (
          <button
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-label-md text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
