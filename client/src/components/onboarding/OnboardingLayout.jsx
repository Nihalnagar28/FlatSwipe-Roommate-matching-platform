import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const OnboardingLayout = ({
  step,
  totalSteps = 7,
  title,
  subtitle,
  children,
  onBack,
  onSkip,
  canSkip = true,
}) => {
  const percentage = Math.round((step / totalSteps) * 100);

  const stepLabels = [
    'Personal Info',
    'Location & Budget',
    'Sleep & Schedule',
    'Lifestyle Habits',
    'Cleanliness & Chores',
    'Personality & Living',
    'Ideal Flatmate',
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5E7E2] py-4 px-4 sm:px-8 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-1.5 rounded-lg text-[#737B74] hover:bg-[#F8F8F5] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Logo to="/" size="sm" />
          </div>

          {/* Step indicator badge */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#737B74]">
              Step <span className="text-[#315C4C] font-bold">{step}</span> of {totalSteps}: {stepLabels[step - 1]}
            </span>
            {canSkip && onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="text-xs font-semibold text-[#737B74] hover:text-[#202622] transition-colors px-2 py-1"
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="max-w-3xl mx-auto mt-3">
          <div className="w-full bg-[#E5E7E2] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#315C4C] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-10">
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202622] tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-[#737B74]">{subtitle}</p>}
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E5E7E2]">
          {children}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-[#737B74] border-t border-[#E5E7E2] bg-white">
        FlatSwipe Onboarding • All responses are strictly used to compute flatmate compatibility
      </footer>
    </div>
  );
};
