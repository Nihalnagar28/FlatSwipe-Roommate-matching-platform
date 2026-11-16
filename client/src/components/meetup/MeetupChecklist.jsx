import React from 'react';
import { CheckSquare, Square, CheckCircle, Shield } from 'lucide-react';

export const MeetupChecklist = ({ checklist = {}, onToggleItem, isReadOnly = false }) => {
  const items = [
    { key: 'rentAndDeposit', title: 'Rent & Security Deposit Split', desc: 'Exact monthly share, due dates, and deposit return arrangement' },
    { key: 'bills', title: 'Electricity, Gas & Water Bills', desc: 'Split 50/50 via UPI on the 1st of every month' },
    { key: 'cleaning', title: 'Cleaning & Maid Arrangement', desc: 'Hiring cook/maid vs personal chore schedule rotation' },
    { key: 'groceries', title: 'Groceries & Kitchen Essentials', desc: 'Cooking oil, spices, dish soap, toilet paper policy' },
    { key: 'guests', title: 'Guests & Friends Policy', desc: 'Overnight visitors, advance notice, and weekend friends' },
    { key: 'noise', title: 'Noise & Work Hours', desc: 'Quiet hours after 11 PM, call boundaries for WFH days' },
    { key: 'sharedExpenses', title: 'WiFi & Household Appliances', desc: 'Router, microwave, washing machine maintenance costs' },
    { key: 'rentalAgreement', title: 'Rental Agreement & Notice Period', desc: 'Both names on lease, 1-month moving notice period' },
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            Pre-Move Discussion Checklist
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Discuss and align on these 8 essential points before deciding to sign a lease together.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
          {completedCount} of {items.length} Agreed ({progressPercent}%)
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => {
          const isChecked = !!checklist[item.key];
          return (
            <div
              key={item.key}
              onClick={() => !isReadOnly && onToggleItem && onToggleItem(item.key)}
              className={`p-3.5 rounded-2xl border transition-all ${
                isReadOnly ? 'cursor-default' : 'cursor-pointer hover:border-indigo-300'
              } ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-slate-50/50 border-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 text-emerald-600">
                  {isChecked ? (
                    <CheckCircle className="w-5 h-5 fill-emerald-100" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isChecked ? 'text-emerald-950' : 'text-slate-800'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
