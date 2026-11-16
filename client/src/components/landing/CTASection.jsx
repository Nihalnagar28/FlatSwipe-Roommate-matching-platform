import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const CTASection = () => {
  return (
    <section className="py-20 bg-[#315C4C] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl p-3 inline-block shadow-sm">
            <img src="/logo.png" alt="FlatSwipe" className="h-12 w-auto object-contain" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A16A]" />
          <span>Profile Setup Takes 2 Minutes</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Ready to find your ideal flatmate?
        </h2>

        <p className="text-base sm:text-lg text-[#D5E5DC] max-w-xl mx-auto mb-8 leading-relaxed">
          Skip the chaotic classifieds and awkward interviews. Join thousands of verified professionals finding compatible roommates across top metros.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/register" className="w-full sm:w-auto">
            <Button
              variant="white"
              size="lg"
              className="w-full sm:w-auto shadow-sm"
            >
              Create Free Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button
              variant="whiteOutline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Sign In To Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
