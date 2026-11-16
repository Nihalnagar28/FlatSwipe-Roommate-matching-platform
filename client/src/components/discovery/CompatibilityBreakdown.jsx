import React from 'react';
import { DollarSign, MapPin, Moon, Sparkles, Cigarette, Users, Dog, Smile, CheckCircle, AlertTriangle } from 'lucide-react';
import { getCompatibilityBadgeColor } from '../../utils/helpers';

export const CompatibilityBreakdown = ({ compatibility = {} }) => {
  const { score = 0, breakdown = {}, explanations = [], nonNegotiableViolations = [] } = compatibility;

  const categories = [
    { name: 'Budget Compatibility', val: breakdown.budget || 0, weight: '20%', icon: DollarSign, color: 'text-emerald-600', bar: 'bg-emerald-500' },
    { name: 'Location & Commute', val: breakdown.location || 0, weight: '15%', icon: MapPin, color: 'text-blue-600', bar: 'bg-blue-500' },
    { name: 'Sleep & Daily Schedule', val: breakdown.sleepSchedule || 0, weight: '15%', icon: Moon, color: 'text-purple-600', bar: 'bg-purple-500' },
    { name: 'Cleanliness Standards', val: breakdown.cleanliness || 0, weight: '15%', icon: Sparkles, color: 'text-indigo-600', bar: 'bg-indigo-500' },
    { name: 'Smoking & Drinking', val: breakdown.smokingDrinking || 0, weight: '10%', icon: Cigarette, color: 'text-amber-600', bar: 'bg-amber-500' },
    { name: 'Social & Party Habits', val: breakdown.socialParty || 0, weight: '10%', icon: Users, color: 'text-pink-600', bar: 'bg-pink-500' },
    { name: 'Personality Alignment', val: breakdown.personality || 0, weight: '10%', icon: Smile, color: 'text-teal-600', bar: 'bg-teal-500' },
    { name: 'Pets & Overnight Guests', val: breakdown.petsGuests || 0, weight: '5%', icon: Dog, color: 'text-rose-600', bar: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
        <div>
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
            Overall Lifestyle Match
          </span>
          <p className="text-xs text-indigo-700/80 mt-0.5">Weighted across 8 living habits</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-indigo-700">{score}%</span>
          <span className="text-xs font-bold text-indigo-500">score</span>
        </div>
      </div>

      {/* Explanations bullets */}
      {explanations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Why You Might Be Great Flatmates
          </h4>
          <div className="space-y-1.5">
            {explanations.map((exp, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{exp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-negotiable warnings if any */}
      {nonNegotiableViolations.length > 0 && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Non-Negotiable Note</span>
          </div>
          {nonNegotiableViolations.map((v, i) => (
            <p key={i}>• {v}</p>
          ))}
        </div>
      )}

      {/* Category Bars */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Factor Breakdown
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.name} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Icon className={`w-3.5 h-3.5 ${c.color}`} />
                    <span>{c.name}</span>
                  </div>
                  <span className="font-bold text-slate-700">{c.val}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className={`${c.bar} h-1.5 rounded-full`} style={{ width: `${c.val}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
