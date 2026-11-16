import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const PricingSection = () => {
  const plans = [
    {
      name: 'Free Starter',
      price: '₹0',
      period: 'forever',
      description: 'Everything you need to discover flatmates and verify your credentials safely.',
      features: [
        'Free Government ID Verification',
        '10 Profile Likes per day',
        'Direct Chat with mutual matches',
        'Standard Compatibility algorithm',
        'Browse all verified room listings',
        'Meet Before You Move checklist',
      ],
      popular: false,
      cta: 'Get Started Free',
      variant: 'secondary',
    },
    {
      name: 'Premium Match',
      price: '₹499',
      period: '/month',
      description: 'Unlimited likes, priority matching, and advanced lifestyle filters.',
      features: [
        'Everything in Free Starter',
        'Unlimited Daily Likes & Rewinds',
        'See Who Liked Your Profile',
        'Advanced Non-Negotiable Filters',
        'Read Receipts in Conversations',
        '5 Super-Likes per week',
        'Priority Customer Support',
      ],
      popular: true,
      cta: 'Upgrade to Premium',
      variant: 'gradient',
    },
    {
      name: 'Pro Flat Owner',
      price: '₹999',
      period: '/month',
      description: 'For property owners or flatmates seeking immediate occupancy.',
      features: [
        'Everything in Premium Match',
        '1 Featured Room Listing included',
        '3x Profile Visibility boost in Discovery',
        'Verified Property Owner badge',
        'Assisted Flatmate Compatibility review',
        'Dedicated move-in coordinator call',
      ],
      popular: false,
      cta: 'Choose Pro Plan',
      variant: 'secondary',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
            Transparent Monetization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple, fair pricing for everyone
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Safety and identity verification are always 100% free. Upgrade only when you want faster matches or featured listings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 relative ${
                p.popular
                  ? 'bg-gradient-to-b from-indigo-900 to-slate-900 text-white shadow-2xl ring-2 ring-indigo-500 scale-105 z-10'
                  : 'bg-white border border-slate-200 shadow-soft text-slate-900'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold mb-2 ${p.popular ? 'text-white' : 'text-slate-900'}`}>
                  {p.name}
                </h3>
                <p className={`text-xs mb-6 ${p.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {p.description}
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-4xl font-extrabold tracking-tight ${p.popular ? 'text-white' : 'text-slate-900'}`}>
                    {p.price}
                  </span>
                  <span className={`text-xs ${p.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.popular ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      <span className={p.popular ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/register" className="w-full">
                <Button variant={p.variant} size="lg" className="w-full">
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
