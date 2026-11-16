import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Rohan & Kabir',
      city: 'Bangalore (Koramangala)',
      matchScore: '96% Match',
      quote: 'My previous flatmate would play loud music at 2 AM on a Tuesday. With FlatMate, I matched with Kabir who also sleeps by 11 PM and loves quiet evenings. We’ve lived together for 8 months with zero conflicts.',
      avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      tag: 'Both Early Birds',
    },
    {
      name: 'Sneha & Tanvi',
      city: 'Mumbai (Bandra West)',
      matchScore: '92% Match',
      quote: 'Finding someone who is as crazy about kitchen cleanliness as I am felt impossible. FlatMate’s cleanliness breakdown saved me so much anxiety. We met for coffee using the pre-move checklist and clicked instantly.',
      avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      tag: 'Very Clean Kitchens',
    },
    {
      name: 'Aditya & Vikram',
      city: 'Delhi NCR (Cyber City)',
      matchScore: '91% Match',
      quote: 'Both of us work long hours in consulting and wanted an independent, quiet flat without weekend party drama. FlatMate’s non-negotiable filters delivered exactly that.',
      avatar1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      tag: 'WFH & Quiet Hours',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real people living in peaceful harmony
          </h2>
          <p className="mt-2 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            (Sample community user experiences)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 flex flex-col justify-between hover:shadow-card transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                    {r.matchScore}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-indigo-200 mb-2" />
                <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{r.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <Avatar src={r.avatar1} name={r.name} size="md" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{r.name}</h4>
                  <p className="text-xs text-slate-400">{r.city} • <span className="text-indigo-600 font-semibold">{r.tag}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
