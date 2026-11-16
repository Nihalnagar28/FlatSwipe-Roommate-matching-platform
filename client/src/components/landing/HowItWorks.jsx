import React from 'react';
import { UserCheck, Sliders, Flame, MessageCircle } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Build Your Lifestyle DNA',
      desc: 'Answer quick questions about your wake-up time, cleanliness rituals, noise comfort, work routines, and hosting habits.',
      icon: UserCheck,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      num: '02',
      title: 'Set Hard Non-Negotiables',
      desc: 'Specify your budget range, target neighborhoods, pet policies, and dealbreakers (like smoking or party frequency).',
      icon: Sliders,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      num: '03',
      title: 'Swipe & Match In Real-Time',
      desc: 'Browse verified candidates with deep compatibility scores. Swipe right to like or pass. When interest is mutual, it’s a match!',
      icon: Flame,
      color: 'from-rose-500 to-pink-600',
    },
    {
      num: '04',
      title: 'Meet Before You Move',
      desc: 'Chat securely, schedule a coffee meetup, and review our shared expenses & chore checklist before signing any lease.',
      icon: MessageCircle,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">How It Works</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Finding your dream flatmate in four seamless steps
          </p>
          <p className="mt-4 text-base text-slate-600">
            No endless Facebook groups or awkward interviews. Just transparent, algorithm-backed living harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 hover:shadow-card transition-all duration-200 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
