import React from 'react';
import { UserCheck, Sliders, Flame, MessageCircle } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Build Your Lifestyle Profile',
      desc: 'Answer quick questions about your wake-up time, cleanliness rituals, noise comfort, work routines, and hosting habits.',
      icon: UserCheck,
    },
    {
      num: '02',
      title: 'Set Your Non-Negotiables',
      desc: 'Specify your budget range, target neighbourhoods, pet policies, and dealbreakers like smoking or party frequency.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'Swipe & Match',
      desc: "Browse verified candidates with deep compatibility scores. Swipe right to like. When interest is mutual, it's a match!",
      icon: Flame,
    },
    {
      num: '04',
      title: 'Meet Before You Move',
      desc: 'Chat securely, schedule a coffee meetup, and review our shared expenses & chore checklist before signing any lease.',
      icon: MessageCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F8F8F5] border-y border-[#E5E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-[#527565] mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202622] tracking-tight">
            Find your dream flatmate in four steps
          </h2>
          <p className="mt-4 text-base text-[#737B74]">
            No endless Facebook groups or awkward cold calls. Just transparent, algorithm-backed living harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col gap-4">
                {/* Number circle */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#315C4C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  <div className="h-px flex-1 bg-[#E5E7E2]" />
                </div>

                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#E8EAE3] text-[#315C4C] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#202622] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#737B74] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
