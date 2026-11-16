import React, { useState } from 'react';
import { Moon, Sun, Clock, Briefcase, Zap } from 'lucide-react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const Step3Sleep = ({ initialData = {}, onNext }) => {
  const [formData, setFormData] = useState({
    sleepTime: initialData.sleepTime || '23:30',
    wakeTime: initialData.wakeTime || '07:30',
    chronotype: initialData.chronotype || 'early-bird',
    workSchedule: initialData.workSchedule || '9 AM - 6 PM Regular',
    workFromHome: initialData.workFromHome || 'sometimes',
    weekendRoutine: initialData.weekendRoutine || 'Relaxing at home and meeting friends',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const chronotypes = [
    { id: 'early-bird', title: 'Early Bird 🌅', desc: 'Sleep by 10-11 PM, up before 7 AM' },
    { id: 'night-owl', title: 'Night Owl 🦉', desc: 'Active past midnight, up late' },
    { id: 'flexible', title: 'Flexible / Hybrid ⚡', desc: 'Varies with workload and weekends' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Chronotype selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Your Biological Chronotype
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {chronotypes.map((c) => (
            <div
              key={c.id}
              onClick={() => setFormData({ ...formData, chronotype: c.id })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                formData.chronotype === c.id
                  ? 'border-[#315C4C] bg-[#E8EAE3] ring-1 ring-[#315C4C]/30'
                  : 'border-[#E5E7E2] hover:border-[#C8CBBC] bg-white'
              }`}
            >
              <h4 className="text-sm font-bold text-[#202622]">{c.title}</h4>
              <p className="text-xs text-[#737B74] mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Typical Sleep Time"
          type="time"
          value={formData.sleepTime}
          onChange={(e) => setFormData({ ...formData, sleepTime: e.target.value })}
          icon={Moon}
          required
        />

        <Input
          label="Typical Wake-Up Time"
          type="time"
          value={formData.wakeTime}
          onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
          icon={Sun}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Work From Home Frequency"
          value={formData.workFromHome}
          onChange={(e) => setFormData({ ...formData, workFromHome: e.target.value })}
          options={[
            { value: 'always', label: '100% Remote (Always at home)' },
            { value: 'often', label: 'Hybrid: 3-4 days WFH' },
            { value: 'sometimes', label: 'Hybrid: 1-2 days WFH' },
            { value: 'rarely', label: 'Rarely WFH' },
            { value: 'never', label: '100% In-Office' },
          ]}
        />

        <Input
          label="Daily Work Hours"
          placeholder="e.g. 10 AM - 7 PM"
          value={formData.workSchedule}
          onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
          icon={Briefcase}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#737B74] uppercase tracking-wide mb-1.5">
          Typical Weekend Routine
        </label>
        <textarea
          rows={2}
          value={formData.weekendRoutine}
          onChange={(e) => setFormData({ ...formData, weekendRoutine: e.target.value })}
          placeholder="Do you travel, host brunch, chill quietly, or game all weekend?"
          className="w-full rounded-lg border border-[#E5E7E2] p-3 text-sm text-[#202622] placeholder:text-[#9EA397] focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C]"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Next: Lifestyle Habits →
      </Button>
    </form>
  );
};
