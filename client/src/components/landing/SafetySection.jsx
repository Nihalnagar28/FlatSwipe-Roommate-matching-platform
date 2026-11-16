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
      desc: 'Your uploaded identity documents are never publicly visible or shared with other members. We store cryptographic hashes only.',
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
      title: 'Instant Report & Ban Policy',
      desc: '24/7 moderation team actively reviews reported conversations, harassment, spam, and fraudulent listings.',
    },
    {
      icon: CheckCircle2,
      title: 'Mutual Match Messaging Only',
      desc: 'No unsolicited DMs. Only mutually matched people who have liked each other can initiate conversations.',
    },
  ];

  return (
    <section id="safety" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
            Trust & Community Safety
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your safety and peace of mind come first
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Moving in with someone is a major life decision. We build every layer of the platform with enterprise-grade privacy and verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safetyFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/50 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
