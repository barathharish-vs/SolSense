import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const routeTitles = {
  '/': 'Dashboard',
  '/weather': 'Weather Monitoring',
  '/solar-performance': 'Solar Performance',
  '/faults': 'Fault Detection',
  '/analytics': 'Analytics & Reports',
  '/settings': 'Settings & Profile',
};

export default function AppLayout({ children, onSignOut }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const currentTitle = routeTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      {/* Desktop Fixed Sidebar (w-64) */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 z-50">
        <Sidebar onSignOut={onSignOut} />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className="w-64 h-full bg-surface-container-low shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onCloseMobile={() => setMobileNavOpen(false)} onSignOut={onSignOut} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Top Fixed Header */}
        <Header
          title={currentTitle}
          onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
        />

        {/* Page Content Viewport */}
        <main className="relative pt-16 flex-1 bg-surface p-space-md sm:p-space-lg">
          {/* Demonstration Data Banner indicator */}
          <div className="mb-4 px-3 py-1.5 rounded-lg bg-surface-container border border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-tertiary">info</span>
              <span><strong>Demonstration Mode:</strong> UI displaying realistic sample telemetry data. Real Python/Flask backend and hardware connections will link via the API service layer.</span>
            </span>
          </div>

          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
