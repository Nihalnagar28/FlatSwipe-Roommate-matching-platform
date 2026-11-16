import React from 'react';
import { DollarSign, MapPin, Moon, Sparkles, Cigarette, Users, Dog, Smile, CheckCircle, AlertTriangle } from 'lucide-react';

export const CompatibilityBreakdown = ({ compatibility = {} }) => {
  const { score = 0, breakdown = {}, explanations = [], nonNegotiableViolations = [] } = compatibility;

  const categories = [
    { name: 'Budget Compatibility', val: breakdown.budget || 0, weight: '20%', icon: DollarSign },
    { name: 'Location & Commute', val: breakdown.location || 0, weight: '15%', icon: MapPin },
    { name: 'Sleep & Daily Schedule', val: breakdown.sleepSchedule || 0, weight: '15%', icon: Moon },
    { name: 'Cleanliness Standards', val: breakdown.cleanliness || 0, weight: '15%', icon: Sparkles },
    { name: 'Smoking & Drinking', val: breakdown.smokingDrinking || 0, weight: '10%', icon: Cigarette },
    { name: 'Social & Party Habits', val: breakdown.socialParty || 0, weight: '10%', icon: Users },
    { name: 'Personality Alignment', val: breakdown.personality || 0, weight: '10%', icon: Smile },
    { name: 'Pets & Overnight Guests', val: breakdown.petsGuests || 0, weight: '5%', icon: Dog },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#E8EAE3] border border-[#E5E7E2]">
        <div>
          <span className="text-xs font-semibold text-[#315C4C] uppercase tracking-wide block">
            Overall Lifestyle Match
          </span>
          <p className="text-xs text-[#737B74] mt-0.5">Weighted across 8 living habits</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-[#315C4C]">{score}%</span>
          <span className="text-xs font-medium text-[#527565]">score</span>
        </div>
      </div>

      {/* Explanations bullets */}
      {explanations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-[#737B74]">
            Why You Might Be Great Flatmates
          </h4>
          <div className="space-y-1.5">
            {explanations.map((exp, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#202622]">
                <CheckCircle className="w-4 h-4 text-[#315C4C] shrink-0 mt-0.5" />
                <span>{exp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-negotiable warnings if any */}
      {nonNegotiableViolations.length > 0 && (
        <div className="p-3.5 rounded-lg bg-[#FEF3E2] border border-[#D9A16A]/30 text-[#9A6B30] text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-[#D9A16A]" />
            <span>Non-Negotiable Note</span>
          </div>
          {nonNegotiableViolations.map((v, i) => (
            <p key={i}>• {v}</p>
          ))}
        </div>
      )}

      {/* Category Bars */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-[#737B74]">
          Factor Breakdown
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.name} className="p-3 rounded-lg border border-[#E5E7E2] bg-[#F8F8F5]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-[#202622]">
                    <Icon className="w-3.5 h-3.5 text-[#315C4C]" />
                    <span>{c.name}</span>
                  </div>
                  <span className="font-semibold text-[#202622]">{c.val}%</span>
                </div>
                <div className="w-full bg-[#E5E7E2] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#315C4C] h-1.5 rounded-full" style={{ width: `${c.val}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
