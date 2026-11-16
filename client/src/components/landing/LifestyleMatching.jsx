import React from 'react';
import { DollarSign, MapPin, Moon, Sparkles, Cigarette, Users, Dog, Smile } from 'lucide-react';

export const LifestyleMatching = () => {
  const factors = [
    { name: 'Budget Compatibility', weight: '20%', icon: DollarSign, desc: 'Overlapping budget bands, rent contribution & utility expectations' },
    { name: 'Location & Commute', weight: '15%', icon: MapPin, desc: 'Neighborhood preferences, proximity to tech parks & transit corridors' },
    { name: 'Sleep & Daily Schedule', weight: '15%', icon: Moon, desc: 'Night owls vs early risers, wake-up hours, and remote work rhythms' },
    { name: 'Cleanliness & Chores', weight: '15%', icon: Sparkles, desc: 'Dishwashing habits, cleaning schedules, and common area standards' },
    { name: 'Smoking & Drinking', weight: '10%', icon: Cigarette, desc: 'Personal habits, tolerance for roommates who smoke/drink, balcony rules' },
    { name: 'Social & Hosting Habits', weight: '10%', icon: Users, desc: 'Party frequency, quiet hours expectations, and social gathering volume' },
    { name: 'Personality Alignment', weight: '10%', icon: Smile, desc: 'Introvert, extrovert, communication style, and noise comfort level' },
    { name: 'Pets & Overnight Guests', weight: '5%', icon: Dog, desc: 'Pet comfort, allergies, and expectations regarding visiting partners & friends' },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#315C4C] mb-2 block">
            Weighted Compatibility Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202622] tracking-tight">
            How FlatSwipe scores human compatibility
          </h2>
          <p className="mt-4 text-base text-[#737B74]">
            An 8-dimension lifestyle model calibrated to eliminate living conflict before you sign a lease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {factors.map((factor) => {
            const Icon = factor.icon;
            return (
              <div
                key={factor.name}
                className="p-5 rounded-xl border border-[#E5E7E2] bg-[#F8F8F5] hover:bg-white hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8EAE3] text-[#315C4C] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 bg-white border border-[#E5E7E2] rounded-md text-[#315C4C]">
                      {factor.weight}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#202622] mb-1.5">{factor.name}</h4>
                  <p className="text-xs text-[#737B74] leading-relaxed mb-4">{factor.desc}</p>
                </div>

                <div className="w-full bg-[#E5E7E2] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#315C4C] h-1.5 rounded-full"
                    style={{ width: factor.weight }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Explainability Callout */}
        <div className="mt-12 p-5 sm:p-6 rounded-xl bg-[#F8F8F5] border border-[#E5E7E2] max-w-3xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#315C4C] text-white flex items-center justify-center shrink-0 font-extrabold text-lg">
            92%
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#202622]">Algorithmic Explainability</h4>
            <p className="text-xs text-[#737B74] mt-0.5 leading-relaxed">
              "Both prefer sleeping around midnight, have overlapping ₹18K–₹25K budgets, keep a clean kitchen, and neither regularly hosts weekday gatherings."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
