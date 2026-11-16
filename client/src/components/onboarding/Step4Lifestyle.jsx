import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const Step4Lifestyle = ({ initialData = {}, onNext }) => {
  const [formData, setFormData] = useState({
    smokingHabit: initialData.smokingHabit || 'never',
    comfortWithSmokers: initialData.comfortWithSmokers || 'no',
    drinkingHabit: initialData.drinkingHabit || 'occasionally',
    comfortWithDrinkers: initialData.comfortWithDrinkers || 'yes',
    hasPets: initialData.hasPets || false,
    petType: initialData.petType || '',
    comfortWithPets: initialData.comfortWithPets || 'yes',
    guestFrequency: initialData.guestFrequency || 'sometimes',
    partyHabit: initialData.partyHabit || 'rarely',
    environmentPreference: initialData.environmentPreference || 'balanced',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Smoking Habits */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Smoking & Tobacco
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Do you smoke?"
            value={formData.smokingHabit}
            onChange={(e) => setFormData({ ...formData, smokingHabit: e.target.value })}
            options={[
              { value: 'never', label: 'Never' },
              { value: 'occasionally', label: 'Occasionally (Socially)' },
              { value: 'regularly', label: 'Regularly' },
            ]}
          />
          <Select
            label="Comfortable living with smokers?"
            value={formData.comfortWithSmokers}
            onChange={(e) => setFormData({ ...formData, comfortWithSmokers: e.target.value })}
            options={[
              { value: 'no', label: 'No (Non-negotiable non-smoking)' },
              { value: 'outside-only', label: 'Only outside / balcony' },
              { value: 'yes', label: 'Yes, completely fine' },
            ]}
          />
        </div>
      </div>

      {/* Drinking Habits */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Alcohol & Social Drinking
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Do you drink alcohol?"
            value={formData.drinkingHabit}
            onChange={(e) => setFormData({ ...formData, drinkingHabit: e.target.value })}
            options={[
              { value: 'never', label: 'Never' },
              { value: 'occasionally', label: 'Occasionally / Weekends' },
              { value: 'regularly', label: 'Regularly' },
            ]}
          />
          <Select
            label="Comfortable with flatmate drinking?"
            value={formData.comfortWithDrinkers}
            onChange={(e) => setFormData({ ...formData, comfortWithDrinkers: e.target.value })}
            options={[
              { value: 'yes', label: 'Yes, perfectly fine' },
              { value: 'occasionally', label: 'Occasional only' },
              { value: 'no', label: 'No alcohol in flat' },
            ]}
          />
        </div>
      </div>

      {/* Pets */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Pets Policy
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Do you own any pets?
            </label>
            <div className="flex gap-4 items-center pt-2">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="hasPets"
                  checked={!formData.hasPets}
                  onChange={() => setFormData({ ...formData, hasPets: false, petType: '' })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                No pets
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="hasPets"
                  checked={formData.hasPets}
                  onChange={() => setFormData({ ...formData, hasPets: true })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Yes, I have pets
              </label>
            </div>
            {formData.hasPets && (
              <input
                type="text"
                placeholder="What kind of pet? (e.g. 1 golden retriever)"
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                className="mt-2 block w-full rounded-xl border-slate-200 text-xs p-2.5 border"
              />
            )}
          </div>

          <Select
            label="Comfortable living with pets?"
            value={formData.comfortWithPets}
            onChange={(e) => setFormData({ ...formData, comfortWithPets: e.target.value })}
            options={[
              { value: 'yes', label: 'Yes! Love pets' },
              { value: 'depends', label: 'Depends on the pet/allergies' },
              { value: 'no', label: 'No pets please' },
            ]}
          />
        </div>
      </div>

      {/* Guests & Home Environment */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Guest Frequency"
          value={formData.guestFrequency}
          onChange={(e) => setFormData({ ...formData, guestFrequency: e.target.value })}
          options={[
            { value: 'never', label: 'Rarely / Never' },
            { value: 'sometimes', label: '1-2 times a week' },
            { value: 'often', label: 'Frequent visitors' },
          ]}
        />

        <Select
          label="Party / Hosting Habit"
          value={formData.partyHabit}
          onChange={(e) => setFormData({ ...formData, partyHabit: e.target.value })}
          options={[
            { value: 'never', label: 'No house parties' },
            { value: 'rarely', label: 'Rare occasions' },
            { value: 'sometimes', label: 'Weekend hangouts' },
            { value: 'often', label: 'Love hosting' },
          ]}
        />

        <Select
          label="Preferred Atmosphere"
          value={formData.environmentPreference}
          onChange={(e) => setFormData({ ...formData, environmentPreference: e.target.value })}
          options={[
            { value: 'quiet', label: 'Quiet & peaceful sanctuary' },
            { value: 'balanced', label: 'Balanced chill vibe' },
            { value: 'social', label: 'Vibrant & social living' },
          ]}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Next: Cleanliness & Chores →
      </Button>
    </form>
  );
};
