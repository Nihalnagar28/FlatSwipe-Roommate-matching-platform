import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const Step7Preferences = ({ initialData = {}, onNext, loading = false }) => {
  const [formData, setFormData] = useState({
    preferredBudgetMin: initialData.preferredBudgetMin || 15000,
    preferredBudgetMax: initialData.preferredBudgetMax || 30000,
    preferredSleepSchedule: initialData.preferredSleepSchedule || 'early-bird',
    preferredSmokingHabit: initialData.preferredSmokingHabit || 'never',
    preferredDrinkingHabit: initialData.preferredDrinkingHabit || 'any',
    preferredPetPolicy: initialData.preferredPetPolicy || 'any-pets',
    preferredPartyFrequency: initialData.preferredPartyFrequency || 'rarely',
    preferredCleanlinessLevel: initialData.preferredCleanlinessLevel || 'very-clean',
    preferredGender: initialData.preferredGender || 'any',
    otherRequirements: initialData.otherRequirements || '',
    // Non-negotiables checkboxes
    noSmokingNonNegotiable: true,
    cleanlinessNonNegotiable: true,
    budgetNonNegotiable: false,
    noPetsNonNegotiable: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nonNegotiables = [];
    if (formData.noSmokingNonNegotiable) {
      nonNegotiables.push({ factor: 'smoking', value: 'never' });
    }
    if (formData.cleanlinessNonNegotiable) {
      nonNegotiables.push({ factor: 'cleanliness', value: 'very-clean' });
    }
    if (formData.noPetsNonNegotiable) {
      nonNegotiables.push({ factor: 'pets', value: 'no' });
    }

    onNext({
      ...formData,
      preferredBudgetMin: Number(formData.preferredBudgetMin),
      preferredBudgetMax: Number(formData.preferredBudgetMax),
      nonNegotiables,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Ideal Roommate Min Budget (₹)"
          type="number"
          step="1000"
          value={formData.preferredBudgetMin}
          onChange={(e) => setFormData({ ...formData, preferredBudgetMin: e.target.value })}
        />

        <Input
          label="Ideal Roommate Max Budget (₹)"
          type="number"
          step="1000"
          value={formData.preferredBudgetMax}
          onChange={(e) => setFormData({ ...formData, preferredBudgetMax: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Ideal Sleep Schedule"
          value={formData.preferredSleepSchedule}
          onChange={(e) => setFormData({ ...formData, preferredSleepSchedule: e.target.value })}
          options={[
            { value: 'early-bird', label: 'Early Bird (Up before 8 AM)' },
            { value: 'night-owl', label: 'Night Owl' },
            { value: 'flexible', label: 'Flexible / Any' },
          ]}
        />

        <Select
          label="Ideal Cleanliness Standard"
          value={formData.preferredCleanlinessLevel}
          onChange={(e) => setFormData({ ...formData, preferredCleanlinessLevel: e.target.value })}
          options={[
            { value: 'very-clean', label: 'Very Clean & Organized' },
            { value: 'clean', label: 'Clean' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'any', label: 'Any / Flexible' },
          ]}
        />

        <Select
          label="Preferred Roommate Gender"
          value={formData.preferredGender}
          onChange={(e) => setFormData({ ...formData, preferredGender: e.target.value })}
          options={[
            { value: 'any', label: 'Any gender' },
            { value: 'male', label: 'Male only' },
            { value: 'female', label: 'Female only' },
          ]}
        />
      </div>

      {/* Non-negotiables dealbreakers */}
      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Strict Non-Negotiable Dealbreakers
          </h4>
        </div>
        <p className="text-xs text-amber-800/80 mb-4 leading-relaxed">
          Profiles violating your checked dealbreakers will automatically be filtered out of discovery.
        </p>

        <div className="space-y-2.5 text-xs font-medium text-[#202622]">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.noSmokingNonNegotiable}
              onChange={(e) => setFormData({ ...formData, noSmokingNonNegotiable: e.target.checked })}
              className="rounded text-[#315C4C] focus:ring-[#315C4C] h-4 w-4"
            />
            <span>Must be a 100% non-smoker (Zero smoking in flat)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.cleanlinessNonNegotiable}
              onChange={(e) => setFormData({ ...formData, cleanlinessNonNegotiable: e.target.checked })}
              className="rounded text-[#315C4C] focus:ring-[#315C4C] h-4 w-4"
            />
            <span>Must clean dishes immediately & maintain clean common areas</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.noPetsNonNegotiable}
              onChange={(e) => setFormData({ ...formData, noPetsNonNegotiable: e.target.checked })}
              className="rounded text-[#315C4C] focus:ring-[#315C4C] h-4 w-4"
            />
            <span>No pets allowed due to personal allergies or preferences</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#737B74] uppercase tracking-wide mb-1.5">
          Additional Notes or Expectations
        </label>
        <textarea
          rows={2}
          value={formData.otherRequirements}
          onChange={(e) => setFormData({ ...formData, otherRequirements: e.target.value })}
          placeholder="Anything else you want potential flatmates to know before matching?"
          className="w-full rounded-lg border border-[#E5E7E2] p-3 text-sm text-[#202622] placeholder:text-[#9EA397] focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C]"
          maxLength={300}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loading}
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Complete Onboarding & Enter Discovery
      </Button>
    </form>
  );
};
