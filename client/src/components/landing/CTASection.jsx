import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start in Under 2 Minutes</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Ready to find your ideal flatmate?
        </h2>

        <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop scrolling through sketchy classifieds. Join thousands of verified professionals finding compatible roommates across top Indian metros.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-slate-50 shadow-xl shadow-indigo-900/30 font-bold"
            >
              Create Free Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            >
              Sign In To Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
