import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const variants = {
    default:  'bg-[#E8EAE3] text-[#527565]',
    primary:  'bg-[#315C4C]/10 text-[#315C4C]',
    green:    'bg-[#315C4C]/10 text-[#315C4C]',
    success:  'bg-[#315C4C]/10 text-[#315C4C]',
    amber:    'bg-[#D9A16A]/15 text-[#9A6B30]',
    warning:  'bg-[#D9A16A]/15 text-[#9A6B30]',
    red:      'bg-red-50 text-red-600',
    danger:   'bg-red-50 text-red-600',
    error:    'bg-red-50 text-red-600',
    blue:     'bg-blue-50 text-blue-600',
    purple:   'bg-[#E8EAE3] text-[#527565]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.md} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};
