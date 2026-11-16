import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#202622]/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-xl border border-[#E5E7E2] shadow-lg max-h-[90vh] overflow-y-auto w-full ${maxWidth} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="p-5 border-b border-[#E5E7E2] flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#202622]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-[#737B74] hover:bg-[#E8EAE3] hover:text-[#202622] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
