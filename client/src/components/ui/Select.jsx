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
        <label className="block text-xs font-semibold text-[#737B74] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full bg-white border border-[#E5E7E2] rounded-lg px-3.5 py-2.5 text-sm text-[#202622] focus:outline-none focus:ring-2 focus:ring-[#315C4C]/20 focus:border-[#315C4C] transition-colors ${
          error ? 'border-[#C0392B] focus:ring-red-400/20 focus:border-[#C0392B]' : ''
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
      {error && <p className="mt-1 text-xs text-[#C0392B] font-medium">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
