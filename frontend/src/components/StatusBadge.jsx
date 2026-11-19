import React from 'react';

/**
 * StatusBadge - Reusable badge component for SolSense operational states
 * Matches Google Stitch SolSense design system.
 */
export default function StatusBadge({ status, variant = 'auto', className = '' }) {
  let colorStyles = 'bg-secondary-container text-on-secondary-container';
  let dotColor = 'bg-secondary';

  const normalized = (status || '').toLowerCase();

  if (variant === 'optimal' || normalized === 'optimal' || normalized === 'active' || normalized === 'online') {
    colorStyles = 'bg-secondary-fixed text-on-secondary-fixed';
    dotColor = 'bg-primary';
  } else if (variant === 'warning' || normalized === 'warning' || normalized === 'monitoring') {
    colorStyles = 'bg-tertiary-fixed text-on-tertiary-fixed';
    dotColor = 'bg-tertiary';
  } else if (variant === 'critical' || normalized === 'critical' || normalized === 'error') {
    colorStyles = 'bg-error-container text-on-error-container';
    dotColor = 'bg-error';
  }

  return (
    <span
      className={`inline-flex items-center px-space-sm py-0.5 rounded-full text-label-sm font-medium ${colorStyles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}`}></span>
      {status}
    </span>
  );
}
