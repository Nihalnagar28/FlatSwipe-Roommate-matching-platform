import React from 'react';

export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`border-b border-[#E5E7E2] flex gap-0 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2.5 inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
              isActive
                ? 'border-[#315C4C] text-[#315C4C]'
                : 'border-transparent text-[#737B74] hover:text-[#202622]'
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`ml-1.5 py-0.5 px-2 rounded-full text-xs font-semibold ${
                  isActive
                    ? 'bg-[#315C4C]/10 text-[#315C4C]'
                    : 'bg-[#E8EAE3] text-[#737B74]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
