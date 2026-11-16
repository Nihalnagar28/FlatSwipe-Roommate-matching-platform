import React from 'react';

export const Button = ({
  children, type = 'button', variant = 'primary', size = 'md',
  className = '', disabled = false, loading = false, onClick, icon: Icon, ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:      'bg-[#315C4C] text-white hover:bg-[#27503F] focus:ring-[#315C4C]/40',
    secondary:    'bg-white text-[#315C4C] border border-[#E5E7E2] hover:bg-stone-50 hover:border-[#C8CBBC] focus:ring-[#315C4C]/30',
    outline:      'border border-[#315C4C] text-[#315C4C] hover:bg-[#315C4C]/5 focus:ring-[#315C4C]/30',
    ghost:        'text-[#737B74] hover:text-[#202622] hover:bg-[#E8EAE3] focus:ring-[#315C4C]/20',
    danger:       'bg-[#C0392B] text-white hover:bg-[#A93226] focus:ring-red-400/40',
    accent:       'bg-[#D9A16A] text-white hover:bg-[#C8904F] focus:ring-[#D9A16A]/40',
    white:        'bg-white text-[#315C4C] border border-white/20 hover:bg-white/90 focus:ring-white/50 font-semibold',
    whiteOutline: 'border border-white/60 text-white hover:bg-white/10 focus:ring-white/40 font-semibold',
  };

  const sizes = {
    sm:   'text-xs px-3 py-1.5 gap-1.5 rounded-md',
    md:   'text-sm px-4 py-2.5 gap-2 rounded-lg',
    lg:   'text-sm px-6 py-3 gap-2 rounded-lg',
    icon: 'p-2.5 rounded-lg',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      ) : Icon ? (
        <Icon className={`w-4 h-4 ${children ? '' : ''}`} />
      ) : null}
      {children}
    </button>
  );
};
