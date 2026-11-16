import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Moon, Coffee, Sparkle, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-indigo-50/60 via-white to-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-300/30 to-purple-300/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-bold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lifestyle-First Flatmate Matching</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
              Don't just find a flat.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
                Find your kind of people.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Living together shouldn't be a gamble. FlatMate pairs you based on sleep routines, cleanliness standards, work schedules, and social habits — not just budget.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-200/50">
                  Find Your Flatmate
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/listings" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Verified Rooms
                </Button>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Govt. ID Verified Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>94% Mutual Harmony Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Zero Brokerage Direct Matching</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tinder-like Card Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Back card subtle illusion */}
              <div className="absolute top-3 left-3 right-3 bottom-0 bg-indigo-100/60 rounded-3xl -rotate-2 transform transition-transform" />
              
              {/* Main Profile Card Mockup */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-72">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700"
                    alt="Sample match"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  {/* Compatibility Badge */}
                  <div className="absolute top-4 right-4 bg-emerald-500/95 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 fill-white" />
                    <span>94% Compatible</span>
                  </div>

                  {/* Profile info on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold">Ananya Deshmukh</h3>
                      <span className="text-sm font-semibold opacity-90">24</span>
                    </div>
                    <p className="text-xs text-slate-200 mt-0.5">Product Designer • Indiranagar, Bangalore</p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Habit tags */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5" /> Sleep: 11:30 PM
                    </span>
                    <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5" /> Very Clean
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg font-semibold">
                      ₹18K - ₹25K Budget
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    "Looking for a peaceful, clean flatmate to share a 2BHK. I work hybrid, love cooking pasta, and respect quiet hours."
                  </p>

                  {/* Swipe Action Buttons */}
                  <div className="flex items-center justify-center gap-4 pt-2 border-t border-slate-100">
                    <button className="w-12 h-12 rounded-full border-2 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 flex items-center justify-center transition-all shadow-sm">
                      <span className="text-xl font-bold">✕</span>
                    </button>
                    <button className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all">
                      <Heart className="w-6 h-6 fill-white" />
                    </button>
                    <button className="w-12 h-12 rounded-full border-2 border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 flex items-center justify-center transition-all shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
