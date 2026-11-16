import React from 'react';

export const ProgressBar = ({
  progress = 0,
  label,
  showPercentage = true,
  className = '',
  barColor = 'bg-[#315C4C]',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-[#737B74]">
          {label && <span>{label}</span>}
          {showPercentage && <span>{clamped}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-[#E8EAE3] rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 rounded-full`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
