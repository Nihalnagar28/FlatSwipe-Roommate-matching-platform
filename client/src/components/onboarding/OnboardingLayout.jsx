import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-4 sm:px-8 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 hidden sm:inline">FlatMate</span>
            </Link>
          </div>

          {/* Step indicator badge */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              Step <span className="text-indigo-600">{step}</span> of {totalSteps}: {stepLabels[step - 1]}
            </span>
            {canSkip && onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors px-2 py-1"
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100">
          {children}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        FlatMate Onboarding • All responses are used only to compute compatibility
      </footer>
    </div>
  );
};
