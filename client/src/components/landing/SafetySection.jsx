import React from 'react';
import { ShieldCheck, Lock, EyeOff, AlertTriangle, Coffee, CheckCircle2 } from 'lucide-react';

export const SafetySection = () => {
  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: 'Verified Badges Only After ID Check',
      desc: 'Users must verify government credentials (Aadhaar, Passport, DL) before receiving the verified trust badge. No unverified badges.',
    },
    {
      icon: Lock,
      title: 'Private Document Vault',
      desc: 'Your uploaded identity documents are never publicly visible or shared with other members. Cryptographic verification references only.',
    },
    {
      icon: EyeOff,
      title: 'Granular Privacy Controls',
      desc: 'Control who can view your profile, mask your exact workplace until mutual match, and block unwanted individuals anytime.',
    },
    {
      icon: Coffee,
      title: 'Meet Before You Move Flow',
      desc: 'Built-in public meetup scheduler with an essential 8-point discussion checklist for bills, guests, and chores.',
    },
    {
      icon: AlertTriangle,
      title: 'Zero Tolerance Policy',
      desc: 'Dedicated safety moderation actively reviews reported conversations, harassment, spam, and fraudulent listings.',
    },
    {
      icon: CheckCircle2,
      title: 'Mutual Match Messaging Only',
      desc: 'No unsolicited DMs. Only mutually matched people who have reciprocally liked each other can initiate conversations.',
    },
  ];

  return (
    <section id="safety" className="py-20 bg-[#F8F8F5] border-b border-[#E5E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#315C4C] mb-2 block">
            Trust & Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202622] tracking-tight">
            Your safety and peace of mind come first
          </h2>
          <p className="mt-4 text-base text-[#737B74]">
            Moving in with someone is a significant financial and personal decision. We build every layer with verified trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-xl bg-white border border-[#E5E7E2] shadow-sm hover:shadow-md transition-all duration-150"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8EAE3] text-[#315C4C] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#202622] mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-[#737B74] leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
