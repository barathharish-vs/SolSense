import React from 'react';
import { solarPerformanceData } from '../data/performanceData';

export default function SolarPerformance() {
  const { summary, strings } = solarPerformanceData;

  const handleExport = () => {
    alert('Simulated Telemetry Export: solsense_telemetry_oct24.csv');
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-space-xl">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <span className="text-label-sm font-label-sm uppercase tracking-wider text-primary mb-space-xs block">
            Telemetry &amp; Generation
          </span>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Solar Performance Matrix</h1>
        </div>
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-container-high/60">
            <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
            <span className="text-body-md text-on-surface font-label-md">Today, Oct 24, 2024</span>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-space-xs bg-primary text-on-primary px-space-lg py-space-sm rounded-xl font-label-lg hover:opacity-95 transition-opacity shadow-[0px_2px_8px_rgba(32,41,35,0.04)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Telemetry</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Cards (5 Columns on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {/* DC Voltage */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md font-label-md text-on-surface-variant">DC Voltage</span>
            <span className="p-space-xs bg-primary-fixed/20 text-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </span>
          </div>
          <div>
            <div className="text-headline-md font-headline-md text-on-surface mb-space-xs">
              {summary.dcVoltage}
            </div>
            <div className="flex items-center gap-space-xs text-label-sm text-primary">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>{summary.dcVoltageDelta}</span>
            </div>
          </div>
        </div>

        {/* String Current */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md font-label-md text-on-surface-variant">String Current</span>
            <span className="p-space-xs bg-primary-fixed/20 text-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">tab_duplicate</span>
            </span>
          </div>
          <div>
            <div className="text-headline-md font-headline-md text-on-surface mb-space-xs">
              {summary.stringCurrent}
            </div>
            <div className="flex items-center gap-space-xs text-label-sm text-primary">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>{summary.stringCurrentStatus}</span>
            </div>
          </div>
        </div>

        {/* Actual Power */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md font-label-md text-on-surface-variant">Actual Power</span>
            <span className="p-space-xs bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">solar_power</span>
            </span>
          </div>
          <div>
            <div className="text-headline-md font-headline-md text-on-surface mb-space-xs">
              {summary.actualPower}
            </div>
            <div className="flex items-center gap-space-xs text-label-sm text-primary">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>{summary.actualPowerDelta}</span>
            </div>
          </div>
        </div>

        {/* Predicted Power */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md font-label-md text-on-surface-variant">Predicted Power</span>
            <span className="p-space-xs bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
            </span>
          </div>
          <div>
            <div className="text-headline-md font-headline-md text-on-surface mb-space-xs">
              {summary.predictedPower}
            </div>
            <div className="flex items-center gap-space-xs text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>{summary.modelTag}</span>
            </div>
          </div>
        </div>

        {/* PR Ratio */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md font-label-md text-on-surface-variant">PR Ratio</span>
            <span className="p-space-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </span>
          </div>
          <div>
            <div className="text-headline-md font-headline-md text-on-surface mb-space-xs">
              {summary.prRatio}
            </div>
            <div className="flex items-center gap-space-xs text-label-sm text-primary">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>{summary.prRatioDelta}</span>
            </div>
          </div>
        </div>
      </div>

      {/* String Current Telemetry Table */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-high/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
          <div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Active String Level Telemetry</h3>
            <p className="text-body-sm text-on-surface-variant">
              Real-time multi-string electrical distribution and temperature balance
            </p>
          </div>
          <span className="text-label-sm text-primary font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Telemetry Poll: 500ms
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-label-sm font-medium text-on-surface-variant uppercase tracking-wider">
                <th className="py-space-sm px-space-md">String Identifier</th>
                <th className="py-space-sm px-space-md">DC Voltage (V)</th>
                <th className="py-space-sm px-space-md">Current (A)</th>
                <th className="py-space-sm px-space-md">Power Yield (kW)</th>
                <th className="py-space-sm px-space-md">Cell Temp (°C)</th>
                <th className="py-space-sm px-space-md">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-md">
              {strings.map((str) => (
                <tr key={str.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-space-md px-space-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">solar_power</span>
                    {str.id}
                  </td>
                  <td className="py-space-md px-space-md text-on-surface">{str.voltage} V</td>
                  <td className="py-space-md px-space-md text-on-surface">{str.current} A</td>
                  <td className="py-space-md px-space-md font-semibold text-primary">{str.power} kW</td>
                  <td className="py-space-md px-space-md text-on-surface-variant">{str.temp}°C</td>
                  <td className="py-space-md px-space-md">
                    <span
                      className={`inline-flex items-center px-space-sm py-0.5 rounded-full text-label-sm font-medium ${
                        str.status === 'Optimal'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          str.status === 'Optimal' ? 'bg-primary' : 'bg-tertiary'
                        }`}
                      ></span>
                      {str.status}
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
