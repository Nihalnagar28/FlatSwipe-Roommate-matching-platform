import React, { forwardRef } from 'react';

export const Select = forwardRef(({
  label,
  error,
  options = [],
  className = '',
  containerClassName = '',
  placeholder = 'Select an option',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`block w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm py-2.5 px-3.5 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors duration-150 ${
          error ? 'border-rose-400 focus:border-rose-500' : ''
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
