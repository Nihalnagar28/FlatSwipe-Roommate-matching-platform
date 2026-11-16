import React, { useState, useEffect } from 'react';
import { getInitials } from '../../utils/helpers';

export const Avatar = ({
  src,
  name,
  size = 'md',
  isOnline = false,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const sizes = {
    sm:   'w-8 h-8 text-xs',
    md:   'w-10 h-10 text-sm',
    lg:   'w-14 h-14 text-base font-semibold',
    xl:   'w-20 h-20 text-xl font-bold',
    '2xl': 'w-28 h-28 text-3xl font-bold',
  };

  const indicatorSizes = {
    sm:   'w-2 h-2 ring-1',
    md:   'w-2.5 h-2.5 ring-2',
    lg:   'w-3.5 h-3.5 ring-2',
    xl:   'w-4 h-4 ring-2',
    '2xl': 'w-5 h-5 ring-4',
  };

  const showImage = src && !hasError;

  return (
    <div className={`relative inline-block ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`${sizes[size] || sizes.md} rounded-full object-cover ring-2 ring-[#E5E7E2] bg-[#E8EAE3]`}
        />
      ) : (
        <div
          className={`${sizes[size] || sizes.md} rounded-full bg-[#E8EAE3] text-[#315C4C] border border-[#E5E7E2] flex items-center justify-center font-bold tracking-tight select-none`}
        >
          {getInitials(name)}
        </div>
      )}

      {isOnline && (
        <span
          className={`absolute bottom-0 right-0 block ${indicatorSizes[size] || indicatorSizes.md} rounded-full bg-[#3D7A5C] border-2 border-white`}
        />
      )}
    </div>
  );
};

export default Avatar;
