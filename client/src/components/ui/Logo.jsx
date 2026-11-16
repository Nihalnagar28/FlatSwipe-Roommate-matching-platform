import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({
  size = 'md',
  className = '',
  to,
  alt = 'FlatSwipe - Swipe. Match. Move In.',
}) => {
  const sizes = {
    xs:     'h-7',
    sm:     'h-8 sm:h-9',
    md:     'h-10 sm:h-11',
    navbar: 'h-11 sm:h-12',
    lg:     'h-14 sm:h-16',
    xl:     'h-20 sm:h-24',
  };

  const imgElement = (
    <img
      src="/logo.png"
      alt={alt}
      className={`${sizes[size] || size} w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${className}`}
    />
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center">
        {imgElement}
      </Link>
    );
  }

  return imgElement;
};

export default Logo;
