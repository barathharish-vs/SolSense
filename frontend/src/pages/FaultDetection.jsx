import React, { useState } from 'react';
import { faultDetectionData } from '../data/faultData';

export default function FaultDetection() {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [anomalyList, setAnomalyList] = useState(faultDetectionData.anomalies);

  const filteredAnomalies = anomalyList.filter((a) => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  const handleAcknowledge = (id) => {
    setAnomalyList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Acknowledged (Investigating)' } : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-space-xl">
      {/* Top Overview Banner & Metrics Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Health Score Card (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden border border-surface-container-high/60">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <span className="text-label-lg font-label-lg text-on-surface-variant uppercase tracking-wider">
                System Health Index
              </span>
              <span className="px-space-md py-space-xs bg-primary-container text-on-primary-container rounded-full text-label-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Optimal
              </span>
            </div>
            <div className="flex items-baseline gap-space-md">
              <h2 className="text-headline-lg font-headline-lg text-on-surface">
                {faultDetectionData.healthScore}
              </h2>
              <span className="text-body-sm text-primary font-medium flex items-center">
                {faultDetectionData.healthDelta}
              </span>
            </div>
          </div>
          <div className="mt-space-lg pt-space-md">
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '98.4%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-space-sm text-body-sm text-on-surface-variant">
              <span>Active Strings: {faultDetectionData.activeStrings}</span>
              <span>{faultDetectionData.aiEngine}</span>
            </div>
          </div>
        </div>

        {/* Active Diagnostics Quick Stats (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-space-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-space-lg border border-surface-container-high/60">
          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-sm">
              <span className="text-label-md uppercase tracking-wider font-label-md">Critical Alerts</span>
              <span className="material-symbols-outlined text-error">error</span>
            </div>
            <div>
              <div className="text-headline-md font-headline-md text-on-surface">
                {faultDetectionData.criticalCount} Units
              </div>
              <span className="text-body-sm text-on-surface-variant">Immediate action required</span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-sm">
              <span className="text-label-md uppercase tracking-wider font-label-md">Warnings</span>
              <span className="material-symbols-outlined text-tertiary">warning</span>
            </div>
            <div>
              <div className="text-headline-md font-headline-md text-on-surface">
                {faultDetectionData.warningCount} Strings
              </div>
              <span className="text-body-sm text-on-surface-variant">Scheduled inspection</span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-sm">
              <span className="text-label-md uppercase tracking-wider font-label-md">AI Confidence</span>
              <span className="material-symbols-outlined text-primary">psychology</span>
            </div>
            <div>
              <div className="text-headline-md font-headline-md text-on-surface">
                {faultDetectionData.aiConfidence}
              </div>
              <span className="text-body-sm text-on-surface-variant">High telemetry accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Banner (Matches Stitch fault_detection_solsense) */}
      <div className="bg-secondary-container/60 px-space-lg py-space-md rounded-xl flex items-center gap-space-md text-on-secondary-container border border-secondary-container">
        <span className="material-symbols-outlined text-primary shrink-0">info</span>
        <p className="text-body-md font-body-md">
          <strong>Note:</strong> AI diagnostics indicate possible performance abnormalities, not confirmed physical diagnoses. Please cross-reference with site logs prior to dispatching maintenance crews.
        </p>
      </div>

      {/* Events Section Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div>
          <h3 className="text-headline-md font-headline-md text-on-surface">Detected Anomalies</h3>
          <p className="text-body-md text-on-surface-variant">
            Real-time telemetry variance analysis across all active solar arrays.
          </p>
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container p-space-xs rounded-xl">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-space-md py-space-xs rounded-lg text-label-md font-label-md transition-all ${
              filterSeverity === 'all'
                ? 'bg-surface text-on-surface shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All ({anomalyList.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-space-md py-space-xs rounded-lg text-label-md font-label-md transition-all ${
              filterSeverity === 'critical'
                ? 'bg-surface text-error shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterSeverity('warning')}
            className={`px-space-md py-space-xs rounded-lg text-label-md font-label-md transition-all ${
              filterSeverity === 'warning'
                ? 'bg-surface text-tertiary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Warnings
          </button>
        </div>
      </div>

      {/* Anomaly Cards List */}
      <div className="space-y-space-md">
        {filteredAnomalies.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-low rounded-xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col md:flex-row md:items-center justify-between gap-space-md"
          >
            <div className="flex items-start gap-space-md">
              <div
                className={`p-space-sm rounded-xl shrink-0 mt-1 ${
                  item.severity === 'critical'
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-tertiary-container text-on-tertiary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {item.severity === 'critical' ? 'error' : 'warning'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className="text-headline-sm font-headline-sm text-on-surface">{item.issue}</span>
                  <span
                    className={`px-space-sm py-0.5 rounded-full text-label-sm font-medium uppercase ${
                      item.severity === 'critical'
                        ? 'bg-error text-on-error'
                        : 'bg-tertiary text-on-tertiary'
                    }`}
                  >
                    {item.severity}
                  </span>
                  <span className="text-body-sm text-on-surface-variant">• {item.timestamp}</span>
                </div>
                <div className="text-body-md text-on-surface font-medium">
                  {item.stringId} — <span className="text-on-surface-variant font-normal">{item.component}</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  <strong>Diagnostic Hypothesis:</strong> {item.potentialCause}
                </p>
                <div className="text-label-sm text-primary font-medium flex items-center gap-1 pt-1">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  <span>Model Confidence: {item.confidence}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-space-sm shrink-0 border-t md:border-t-0 border-surface-container-high pt-space-sm md:pt-0">
              <span className="px-space-md py-1 rounded-full bg-surface text-on-surface text-label-sm font-medium border border-surface-container-high">
                {item.status}
              </span>
              <button
                onClick={() => handleAcknowledge(item.id)}
                className="bg-primary hover:bg-surface-tint text-on-primary px-space-md py-space-xs rounded-xl text-label-md font-medium transition-all shadow-xs cursor-pointer"
              >
                Acknowledge Alert
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
