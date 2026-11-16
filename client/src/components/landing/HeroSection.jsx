import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Heart, Check, Moon, Coffee, Sparkle } from 'lucide-react';
import { Button } from '../ui/Button';
import { getProfileFallback, handleImageError } from '../../utils/imageFallback';

export const HeroSection = () => {
  return (
    <section className="bg-[#F8F8F5] pt-14 pb-20 lg:pt-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#E8EAE3] border border-[#E5E7E2] text-[#315C4C] text-xs font-bold mb-6">
              <img src="/logo.png" alt="FlatSwipe" className="w-5 h-5 object-contain" />
              <span>Lifestyle Matching · PropTech</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202622] tracking-tight leading-[1.12] mb-6">
              Find your next home —{' '}
              <span className="text-[#315C4C]">and the people</span>
              {' '}to share it with.
            </h1>

            <p className="text-lg sm:text-xl text-[#737B74] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              FlatSwipe matches you on sleep routines, cleanliness standards, work schedules, and social habits — not just budget. Living together shouldn't be a gamble.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-[#315C4C] hover:bg-[#527565] text-white rounded-lg"
                >
                  Find Your Flatmate
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/listings" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border border-[#E5E7E2] text-[#202622] rounded-lg bg-white hover:bg-[#F8F8F5]"
                >
                  Browse Verified Rooms
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-[#E5E7E2] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#737B74] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#315C4C]" />
                <span>10,000+ Verified Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>5,200 Matches Made</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#315C4C]" />
                <span>98% Verified Users</span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Card Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Subtle offset card */}
              <div className="absolute top-3 left-3 right-3 bottom-0 bg-[#E8EAE3] rounded-xl -rotate-2 transform" />

              {/* Main Profile Card */}
              <div className="relative bg-white rounded-xl shadow-lg border border-[#E5E7E2] overflow-hidden">
                {/* Top section — real portrait photography */}
                <div className="relative h-64 sm:h-72 w-full bg-[#202622] overflow-hidden group">
                  <img
                    src="/hero-portrait.jpg"
                    alt="Ananya Deshmukh"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.retried) {
                        e.currentTarget.dataset.retried = 'true';
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';
                      } else {
                        handleImageError(e, 'profile', 'Ananya Deshmukh');
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient shadow for text & badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/85 via-[#202622]/20 to-black/25 pointer-events-none" />

                  {/* Verified ID pill top left */}
                  <div className="absolute top-4 left-4 bg-white/95 text-[#315C4C] font-bold text-[11px] px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#315C4C]" />
                    <span>ID Verified</span>
                  </div>

                  {/* Compatibility Badge top right */}
                  <div className="absolute top-4 right-4 bg-[#315C4C] text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                    <Sparkle className="w-3.5 h-3.5 fill-white" />
                    <span>94% Compatible</span>
                  </div>
                </div>

                <div className="p-5">
                  {/* Profile info */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-base font-bold text-[#202622]">Ananya Deshmukh</h3>
                      <span className="text-sm text-[#737B74]">24</span>
                    </div>
                    <p className="text-xs text-[#737B74] mt-0.5">Product Designer · Indiranagar, Bangalore</p>
                  </div>

                  {/* Habit tags */}
                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    <span className="bg-[#E8EAE3] text-[#315C4C] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5" /> Sleep: 11:30 PM
                    </span>
                    <span className="bg-[#E8EAE3] text-[#527565] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5" /> Very Clean
                    </span>
                    <span className="bg-[#FEF3E2] text-[#D9A16A] px-2.5 py-1 rounded-lg font-semibold">
                      ₹18K–₹25K Budget
                    </span>
                  </div>

                  <p className="text-xs text-[#737B74] line-clamp-2 leading-relaxed mb-4">
                    "Looking for a peaceful, clean flatmate to share a 2BHK. I work hybrid, love cooking pasta, and respect quiet hours."
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-4 pt-3 border-t border-[#E5E7E2]">
                    <button className="w-11 h-11 rounded-full border-2 border-[#E5E7E2] text-[#737B74] hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 flex items-center justify-center transition-all">
                      <span className="text-lg font-bold">✕</span>
                    </button>
                    <button className="w-13 h-13 w-14 h-14 rounded-full bg-[#315C4C] text-white flex items-center justify-center shadow-md hover:bg-[#527565] active:scale-95 transition-all">
                      <Heart className="w-6 h-6 fill-white" />
                    </button>
                    <button className="w-11 h-11 rounded-full border-2 border-[#E5E7E2] text-[#737B74] hover:text-[#315C4C] hover:border-[#315C4C] hover:bg-[#E8EAE3] flex items-center justify-center transition-all">
                      <Sparkle className="w-5 h-5" />
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
