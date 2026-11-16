import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  containerClassName = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-semibold text-[#737B74] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9EA397]">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full bg-white border border-[#E5E7E2] rounded-lg px-3.5 py-2.5 text-sm text-[#202622] placeholder:text-[#9EA397] focus:outline-none focus:ring-2 focus:ring-[#315C4C]/20 focus:border-[#315C4C] transition-colors ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-[#C0392B] focus:ring-red-400/20 focus:border-[#C0392B]' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-[#C0392B] font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-[#737B74]">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
