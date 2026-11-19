import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardData } from '../data/dashboardData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedPlant, setSelectedPlant] = useState('SolarPlant Alpha - 500kW Rooftop Array');
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);

  const handleRunDiagnostics = () => {
    setDiagnosticsRunning(true);
    setTimeout(() => {
      setDiagnosticsRunning(false);
      navigate('/faults');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full space-y-space-xl pb-16">
      {/* Top Intro Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="inline-flex items-center px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md">
              <span className="w-2 h-2 rounded-full bg-primary mr-space-xs animate-pulse"></span>
              All Systems Optimal
            </span>
            <span className="text-body-sm text-on-surface-variant">• October 24, 2025</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Good morning, Alex</h1>
        </div>

        <div className="flex flex-wrap items-center gap-space-md">
          {/* Plant Selector */}
          <div className="relative inline-block">
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="appearance-none bg-surface-container-low text-on-surface px-space-md py-space-sm pr-10 rounded-xl text-label-lg font-label-lg focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high cursor-pointer"
            >
              <option>SolarPlant Alpha - 500kW Rooftop Array</option>
              <option>SolarPlant Beta - 250kW Ground Mount</option>
              <option>SolarPlant Gamma - 1MW Industrial Hub</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={handleRunDiagnostics}
            disabled={diagnosticsRunning}
            className="bg-primary hover:bg-surface-tint text-on-primary px-space-md py-space-sm rounded-xl text-label-lg font-label-lg transition-all flex items-center gap-space-sm shadow-sm cursor-pointer disabled:opacity-75"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            {diagnosticsRunning ? 'Scanning Arrays...' : 'Run Diagnostics'}
          </button>
        </div>
      </div>

      {/* Summary Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {dashboardData.summaryMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-low flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-space-md">
              <span className="text-body-sm text-on-surface-variant font-medium uppercase tracking-wider">
                {metric.label}
              </span>
              <div className="w-8 h-8 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">{metric.icon}</span>
              </div>
            </div>
            <div>
              <div className="text-headline-lg font-headline-lg text-on-surface mb-space-xs">
                {metric.value} {metric.unit && <span className="text-body-lg text-on-surface-variant font-normal">{metric.unit}</span>}
              </div>
              <div className="flex items-center text-label-md font-medium text-primary">
                {metric.trendPositive !== null && (
                  <span className="material-symbols-outlined text-[16px] mr-1">
                    {metric.trendPositive ? 'trending_up' : 'trending_down'}
                  </span>
                )}
                <span>{metric.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Actual vs Predicted Solar Generation Dual Curve Chart (2 cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg rounded-xl shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-low flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
            <div>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Power Generation Profile</h2>
              <p className="text-body-sm text-on-surface-variant">
                Actual Output (kW) vs Baseline Model (kW) — Today
              </p>
            </div>
            <div className="flex items-center gap-space-md text-label-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-on-surface font-medium">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-sm bg-tertiary"></span>
                <span className="text-on-surface-variant">Model Target</span>
              </div>
            </div>
          </div>

          {/* SVG Generation Curve Visualizer */}
          <div className="w-full h-64 relative flex flex-col justify-between my-2">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25">
              <div className="border-b border-outline"></div>
              <div className="border-b border-outline"></div>
              <div className="border-b border-outline"></div>
              <div className="border-b border-outline"></div>
            </div>

            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="primaryAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#176B45" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#176B45" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Baseline curve (dashed yellow/tertiary) */}
              <path
                d="M 30,170 Q 150,150 250,70 T 400,45 T 570,165"
                fill="none"
                stroke="#785900"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              {/* Actual generation curve & gradient fill */}
              <path
                d="M 30,170 Q 150,140 250,60 T 400,35 T 570,165 L 570,195 L 30,195 Z"
                fill="url(#primaryAreaGrad)"
              />
              <path
                d="M 30,170 Q 150,140 250,60 T 400,35 T 570,165"
                fill="none"
                stroke="#005131"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Data point anchors */}
              <circle cx="400" cy="35" r="4.5" fill="#005131" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Time Axis Labels */}
            <div className="flex justify-between text-label-sm text-on-surface-variant pt-2 border-t border-surface-container-high">
              <span>06:00</span>
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00 (Peak: 490kW)</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>
            </div>
          </div>

          <div className="mt-space-md pt-space-sm flex items-center justify-between text-body-sm text-on-surface-variant border-t border-surface-container">
            <span>Peak solar irradiance recorded at 12:45 PM: 910 W/m²</span>
            <button
              onClick={() => navigate('/solar-performance')}
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              <span>View Full Matrix</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* System Health & Quick Status (1 col) */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-low flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Fleet Telemetry</h2>
              <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-primary text-label-sm font-semibold">
                Live
              </span>
            </div>

            <div className="space-y-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">electric_bolt</span>
                  <span className="text-body-md text-on-surface">Active Inverters</span>
                </div>
                <span className="text-headline-sm font-headline-sm text-on-surface">6 / 6</span>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">solar_power</span>
                  <span className="text-body-md text-on-surface">PV Strings Online</span>
                </div>
                <span className="text-headline-sm font-headline-sm text-primary">142 / 144</span>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">warning</span>
                  <span className="text-body-md text-on-surface">Detected Warnings</span>
                </div>
                <span className="text-headline-sm font-headline-sm text-tertiary">2</span>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">thermostat</span>
                  <span className="text-body-md text-on-surface">Module Average Temp</span>
                </div>
                <span className="text-headline-sm font-headline-sm text-on-surface">42.4°C</span>
              </div>
            </div>
          </div>

          <div className="mt-space-lg pt-space-md border-t border-surface-container">
            <button
              onClick={() => navigate('/faults')}
              className="w-full py-space-sm px-space-md rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md font-medium transition-all text-center"
            >
              Inspect Fleet Anomalies
            </button>
          </div>
        </div>
      </div>

      {/* Inverter Status Data Table */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-low">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Inverter Performance Telemetry</h3>
            <p className="text-body-sm text-on-surface-variant">Real-time status across operational power blocks</p>
          </div>
          <button
            onClick={() => navigate('/solar-performance')}
            className="text-primary hover:underline text-label-md font-medium flex items-center gap-1"
          >
            <span>Full String Matrix</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-label-sm font-medium text-on-surface-variant uppercase tracking-wider">
                <th className="py-space-sm px-space-md">Inverter</th>
                <th className="py-space-sm px-space-md">Array Location</th>
                <th className="py-space-sm px-space-md">DC Voltage</th>
                <th className="py-space-sm px-space-md">DC Current</th>
                <th className="py-space-sm px-space-md">AC Power</th>
                <th className="py-space-sm px-space-md">Efficiency</th>
                <th className="py-space-sm px-space-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-md">
              {dashboardData.telemetryTable.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-space-md px-space-md font-semibold text-on-surface">{row.id}</td>
                  <td className="py-space-md px-space-md text-on-surface-variant">{row.location}</td>
                  <td className="py-space-md px-space-md text-on-surface">{row.voltage}</td>
                  <td className="py-space-md px-space-md text-on-surface">{row.current}</td>
                  <td className="py-space-md px-space-md font-semibold text-primary">{row.power}</td>
                  <td className="py-space-md px-space-md text-on-surface">{row.efficiency}</td>
                  <td className="py-space-md px-space-md">
                    <span
                      className={`inline-flex items-center px-space-sm py-0.5 rounded-full text-label-sm font-medium ${
                        row.status === 'Optimal'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          row.status === 'Optimal' ? 'bg-primary' : 'bg-tertiary'
                        }`}
                      ></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
