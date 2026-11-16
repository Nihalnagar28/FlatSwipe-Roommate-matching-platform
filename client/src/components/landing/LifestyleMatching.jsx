import React from 'react';
import { DollarSign, MapPin, Moon, Sparkles, Cigarette, Users, Dog, Smile } from 'lucide-react';

export const LifestyleMatching = () => {
  const factors = [
    { name: 'Budget Compatibility', weight: '20%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500', desc: 'Overlapping budget bands, rent contribution & utility expectations' },
    { name: 'Location & Commute', weight: '15%', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500', desc: 'Neighborhood preferences, proximity to tech parks & metro lines' },
    { name: 'Sleep & Daily Schedule', weight: '15%', icon: Moon, color: 'text-purple-600', bg: 'bg-purple-50', bar: 'bg-purple-500', desc: 'Night owls vs early risers, wake-up hours, and WFH frequencies' },
    { name: 'Cleanliness & Chores', weight: '15%', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50', bar: 'bg-indigo-500', desc: 'Dishwashing habits, cleaning schedules, and common area upkeep' },
    { name: 'Smoking & Drinking', weight: '10%', icon: Cigarette, color: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500', desc: 'Habits, comfort with roommates who smoke/drink, balcony rules' },
    { name: 'Social & Party Habits', weight: '10%', icon: Users, color: 'text-pink-600', bg: 'bg-pink-50', bar: 'bg-pink-500', desc: 'Party frequency, quiet environment desires, and weekend vibes' },
    { name: 'Personality Alignment', weight: '10%', icon: Smile, color: 'text-teal-600', bg: 'bg-teal-50', bar: 'bg-teal-500', desc: 'Introvert, extrovert, communication style, and noise tolerance' },
    { name: 'Pets & Overnight Guests', weight: '5%', icon: Dog, color: 'text-rose-600', bg: 'bg-rose-50', bar: 'bg-rose-500', desc: 'Pet comfort, allergies, and expectations regarding visiting guests' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
            Scientific Compatibility
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How FlatMate calculates your compatibility score
          </h2>
          <p className="mt-4 text-base text-slate-600">
            A weighted lifestyle algorithm built to eliminate roommate friction before you even unpack your boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((factor) => {
            const Icon = factor.icon;
            return (
              <div
                key={factor.name}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-card transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${factor.bg} ${factor.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700">
                    {factor.weight}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1">{factor.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{factor.desc}</p>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${factor.bar} h-1.5 rounded-full`}
                    style={{ width: factor.weight }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 max-w-3xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-lg">
            92%
          </div>
          <div>
            <h4 className="text-sm font-bold text-indigo-950">Example Match Explanation</h4>
            <p className="text-xs text-indigo-800/80 mt-0.5 leading-relaxed">
              "Both prefer sleeping around midnight, have matching ₹18K–₹25K budgets, keep a clean kitchen, and neither regularly hosts weekday parties."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
