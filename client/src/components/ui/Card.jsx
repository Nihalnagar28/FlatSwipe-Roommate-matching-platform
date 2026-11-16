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
      className={`bg-white border border-[#E5E7E2] rounded-xl shadow-sm overflow-hidden transition-all duration-150 ${
        hover ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
