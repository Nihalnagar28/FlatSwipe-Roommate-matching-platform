import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden transition-all duration-200 ${
        hover ? 'hover:shadow-card hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
