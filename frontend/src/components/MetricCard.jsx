import React from 'react';

/**
 * MetricCard - Shared component for telemetry and analytics key-performance indicators
 * Matches Google Stitch SolSense design system.
 */
export default function MetricCard({
  title,
  value,
  unit = '',
  icon,
  trend,
  trendPositive = null,
  badge = null,
  className = '',
}) {
  return (
    <div
      className={`bg-surface-container-lowest p-space-lg rounded-xl shadow-[0px_2px_8px_rgba(32,41,35,0.04)] border border-surface-container-low flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-space-md">
        <span className="text-body-sm text-on-surface-variant font-medium uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          </div>
        )}
        {badge && <div>{badge}</div>}
      </div>

      <div>
        <div className="text-headline-lg font-headline-lg text-on-surface mb-space-xs">
          {value} {unit && <span className="text-body-lg text-on-surface-variant font-normal">{unit}</span>}
        </div>
        {trend && (
          <div
            className={`flex items-center text-label-md font-medium ${
              trendPositive === true
                ? 'text-primary'
                : trendPositive === false
                ? 'text-error'
                : 'text-on-surface-variant'
            }`}
          >
            {trendPositive !== null && (
              <span className="material-symbols-outlined text-[16px] mr-1">
                {trendPositive ? 'trending_up' : 'trending_down'}
              </span>
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
