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
      btnVariant: 'secondary',
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
      btnVariant: 'white',
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
      btnVariant: 'secondary',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F8F8F5] border-b border-[#E5E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#315C4C] mb-2 block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202622] tracking-tight">
            Fair, simple plans with zero hidden fees
          </h2>
          <p className="mt-4 text-base text-[#737B74]">
            Trust and ID verification are 100% free for everyone. Upgrade only when you want faster matches or featured listings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl p-8 flex flex-col justify-between transition-all duration-150 relative ${
                p.popular
                  ? 'bg-[#315C4C] text-white shadow-md border border-[#315C4C]'
                  : 'bg-white border border-[#E5E7E2] shadow-sm text-[#202622]'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D9A16A] text-white font-semibold text-xs px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold mb-2 ${p.popular ? 'text-white' : 'text-[#202622]'}`}>
                  {p.name}
                </h3>
                <p className={`text-xs mb-6 ${p.popular ? 'text-[#D5E5DC]' : 'text-[#737B74]'}`}>
                  {p.description}
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-4xl font-extrabold tracking-tight ${p.popular ? 'text-white' : 'text-[#202622]'}`}>
                    {p.price}
                  </span>
                  <span className={`text-xs ${p.popular ? 'text-[#D5E5DC]' : 'text-[#737B74]'}`}>
                    {p.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.popular ? 'text-[#AAC9B8]' : 'text-[#315C4C]'}`} />
                      <span className={p.popular ? 'text-[#EDF3F0]' : 'text-[#737B74]'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/register" className="w-full">
                <Button variant={p.btnVariant} size="lg" className="w-full">
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
