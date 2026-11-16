import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const Step5Cleanliness = ({ initialData = {}, onNext }) => {
  const [formData, setFormData] = useState({
    cleanlinessLevel: initialData.cleanlinessLevel || 'very-clean',
    cleaningFrequency: initialData.cleaningFrequency || 'weekly',
    sharesCleaningDuties: initialData.sharesCleaningDuties !== undefined ? initialData.sharesCleaningDuties : true,
    dishWashing: initialData.dishWashing || 'immediately',
    cookingHabit: initialData.cookingHabit || 'sometimes',
    sharesGroceries: initialData.sharesGroceries !== undefined ? initialData.sharesGroceries : true,
    choreArrangement: initialData.choreArrangement || 'schedule',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const cleanlinessLevels = [
    { id: 'very-clean', title: 'Spotless / Very Clean ✨', desc: 'Dishes done immediately, clutter-free counters' },
    { id: 'clean', title: 'Clean & Tidy 🧹', desc: 'Consistent cleaning schedule, reasonable order' },
    { id: 'moderate', title: 'Moderate 🛋️', desc: 'Comfortable lived-in space, clean on weekends' },
    { id: 'relaxed', title: 'Relaxed / Easygoing 🪴', desc: 'Not stressed about dishes or slight mess' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cleanliness rating */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Personal Cleanliness Standard
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cleanlinessLevels.map((lvl) => (
            <div
              key={lvl.id}
              onClick={() => setFormData({ ...formData, cleanlinessLevel: lvl.id })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                formData.cleanlinessLevel === lvl.id
                  ? 'border-[#315C4C] bg-[#E8EAE3] ring-1 ring-[#315C4C]/30'
                  : 'border-[#E5E7E2] hover:border-[#C8CBBC] bg-white'
              }`}
            >
              <h4 className="text-sm font-bold text-[#202622]">{lvl.title}</h4>
              <p className="text-xs text-[#737B74] mt-1">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Dishwashing Habit"
          value={formData.dishWashing}
          onChange={(e) => setFormData({ ...formData, dishWashing: e.target.value })}
          options={[
            { value: 'immediately', label: 'Washed immediately after eating' },
            { value: 'same-day', label: 'Washed before bed same day' },
            { value: 'when-needed', label: 'Accumulate in sink / when needed' },
          ]}
        />

        <Select
          label="Cleaning Frequency"
          value={formData.cleaningFrequency}
          onChange={(e) => setFormData({ ...formData, cleaningFrequency: e.target.value })}
          options={[
            { value: 'daily', label: 'Daily dusting / sweeping' },
            { value: 'weekly', label: 'Deep clean weekly' },
            { value: 'bi-weekly', label: 'Every two weeks' },
            { value: 'monthly', label: 'Monthly' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Cooking Habits"
          value={formData.cookingHabit}
          onChange={(e) => setFormData({ ...formData, cookingHabit: e.target.value })}
          options={[
            { value: 'daily', label: 'Cook daily meals' },
            { value: 'often', label: 'Cook 3-4 times a week' },
            { value: 'sometimes', label: 'Weekend cooking only' },
            { value: 'rarely', label: 'Order in / Meal subscriptions' },
            { value: 'never', label: 'Never cook' },
          ]}
        />

        <Select
          label="Chore Management Preference"
          value={formData.choreArrangement}
          onChange={(e) => setFormData({ ...formData, choreArrangement: e.target.value })}
          options={[
            { value: 'schedule', label: 'Fixed rotation or Maid/Cook hired' },
            { value: 'informal', label: 'Informal cooperative splitting' },
            { value: 'independent', label: 'Everyone cleans their own mess' },
          ]}
        />
      </div>

      <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E5E7E2] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#202622]">Share Common Groceries?</h4>
          <p className="text-xs text-[#737B74]">Oil, spices, dish soap, toilet paper, cleaning supplies</p>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-[#202622] cursor-pointer">
            <input
              type="radio"
              name="groceries"
              checked={formData.sharesGroceries}
              onChange={() => setFormData({ ...formData, sharesGroceries: true })}
              className="text-[#315C4C] focus:ring-[#315C4C]"
            />
            Yes, split 50/50
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#202622] cursor-pointer">
            <input
              type="radio"
              name="groceries"
              checked={!formData.sharesGroceries}
              onChange={() => setFormData({ ...formData, sharesGroceries: false })}
              className="text-[#315C4C] focus:ring-[#315C4C]"
            />
            No, keep separate
          </label>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Next: Personality & Living →
      </Button>
    </form>
  );
};
