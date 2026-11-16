import React from 'react';
import { getInitials } from '../../utils/helpers';

export const Avatar = ({
  src,
  name,
  size = 'md',
  isOnline = false,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
    '2xl': 'w-28 h-28 text-3xl font-bold',
  };

  const indicatorSizes = {
    sm: 'w-2 h-2 ring-1',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3.5 h-3.5 ring-2',
    xl: 'w-4 h-4 ring-2',
    '2xl': 'w-5 h-5 ring-4',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${sizes[size]} rounded-full object-cover border border-slate-200 bg-slate-100 shadow-sm`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className={`${sizes[size]} rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-medium shadow-sm ${
          src ? 'hidden' : 'flex'
        }`}
      >
        {getInitials(name)}
      </div>

      {isOnline && (
        <span
          className={`absolute bottom-0 right-0 block ${indicatorSizes[size]} rounded-full bg-emerald-500 ring-white`}
        />
      )}
    </div>
  );
};
