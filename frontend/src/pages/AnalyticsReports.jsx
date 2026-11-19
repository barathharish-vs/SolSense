import React, { useState } from 'react';
import { analyticsData } from '../data/analyticsData';

export default function AnalyticsReports() {
  const [activePeriod, setActivePeriod] = useState('daily');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentPeriodData = analyticsData[activePeriod] || analyticsData.daily;

  const handleDownload = (format) => {
    setDropdownOpen(false);
    alert(`Generating simulated ${format.toUpperCase()} SolSense Performance Report...`);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-space-xl">
      {/* Top bar with tabs & actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
        {/* Period tabs */}
        <div className="flex items-center gap-space-sm bg-surface-container-low p-space-xs rounded-xl border border-surface-container-high/60">
          {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-space-md py-space-sm rounded-lg text-label-md capitalize transition-all ${
                activePeriod === period
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Export dropdown */}
        <div className="flex items-center gap-space-md relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-space-sm rounded-xl text-label-lg hover:bg-surface-tint transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Download Report</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-surface-container-lowest rounded-xl shadow-xl z-50 p-space-xs flex flex-col gap-space-xs border border-surface-container-high animate-in fade-in">
              <button
                onClick={() => handleDownload('pdf')}
                className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-body-md text-on-surface hover:bg-surface-container-low transition-all text-left"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">picture_as_pdf</span>
                <span>PDF Document</span>
              </button>
              <button
                onClick={() => handleDownload('csv')}
                className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-body-md text-on-surface hover:bg-surface-container-low transition-all text-left"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">csv</span>
                <span>CSV Spreadsheet</span>
              </button>
              <button
                onClick={() => handleDownload('excel')}
                className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-body-md text-on-surface hover:bg-surface-container-low transition-all text-left"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">table_chart</span>
                <span>Excel Workbook</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary Metrics Grid (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {/* Total Generation */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-low relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Generation</span>
            <span className="p-space-xs rounded-lg bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface mb-space-xs">
            {currentPeriodData.totalGeneration}
          </div>
          <div className="flex items-center gap-space-xs text-body-sm text-primary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>{currentPeriodData.generationDelta}</span>
          </div>
        </div>

        {/* CO2 Offset */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-low relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">CO2 Offset</span>
            <span className="p-space-xs rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[20px]">eco</span>
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface mb-space-xs">
            {currentPeriodData.co2Offset}
          </div>
          <div className="flex items-center gap-space-xs text-body-sm text-primary">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>{currentPeriodData.co2Equiv}</span>
          </div>
        </div>

        {/* Peak Efficiency */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-low relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Peak Efficiency</span>
            <span className="p-space-xs rounded-lg bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface mb-space-xs">
            {currentPeriodData.peakEfficiency}
          </div>
          <div className="flex items-center gap-space-xs text-body-sm text-primary">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{currentPeriodData.efficiencyLabel}</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart Breakdown */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-low">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
          <div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Generation Breakdown</h3>
            <p className="text-body-sm text-on-surface-variant">
              Periodical photovoltaic yield compared to baseline capacity model
            </p>
          </div>
          <div className="flex items-center gap-space-md text-label-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-primary"></span>
              <span className="text-on-surface font-medium">Actual Yield</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-secondary-container"></span>
              <span className="text-on-surface-variant">Baseline Model</span>
            </div>
          </div>
        </div>

        {/* SVG Bar Chart Visualization */}
        <div className="w-full h-64 flex items-end justify-around gap-2 pt-8 pb-4 border-b border-surface-container">
          {currentPeriodData.chartData.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="text-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                {bar.generation} MWh
              </div>
              <div className="w-full max-w-[48px] flex items-end gap-1.5 h-44 justify-center">
                {/* Actual Bar */}
                <div
                  className="w-1/2 bg-primary rounded-t-md hover:bg-surface-tint transition-all"
                  style={{ height: `${Math.min(100, (bar.generation / 160) * 100)}%` }}
                  title={`Actual: ${bar.generation}`}
                ></div>
                {/* Target Bar */}
                <div
                  className="w-1/2 bg-secondary-container rounded-t-md hover:bg-secondary transition-all"
                  style={{ height: `${Math.min(100, (bar.target / 160) * 100)}%` }}
                  title={`Target: ${bar.target}`}
                ></div>
              </div>
              <span className="text-label-sm text-on-surface font-medium">{bar.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-space-md flex flex-col sm:flex-row justify-between items-center text-body-sm text-on-surface-variant gap-2">
          <span>Yield metrics aggregated from inverters 1 through 6.</span>
          <span className="text-primary font-medium">Net Solar Plant Yield: +9.4% Year-to-date</span>
        </div>
      </div>
    </div>
  );
}
