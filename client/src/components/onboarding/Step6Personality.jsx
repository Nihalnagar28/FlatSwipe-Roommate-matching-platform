import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const Step6Personality = ({ initialData = {}, onNext }) => {
  const [formData, setFormData] = useState({
    personalityType: initialData.personalityType || 'ambivert',
    socialPreference: initialData.socialPreference || 'balanced',
    livingStyle: initialData.livingStyle || 'independent',
    communicationStyle: initialData.communicationStyle || 'direct',
    noiseTolerance: initialData.noiseTolerance || 'moderate',
    interactionLevel: initialData.interactionLevel || 'moderate',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const personalities = [
    { id: 'introvert', title: 'Introvert 🧘', desc: 'Recharge in solitude, values quiet & personal space' },
    { id: 'ambivert', title: 'Ambivert ⚖️', desc: 'Adaptable mix of socializing and quiet downtime' },
    { id: 'extrovert', title: 'Extrovert ⚡', desc: 'High energy, loves chatting, cooking and hanging out' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Social Energy
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {personalities.map((p) => (
            <div
              key={p.id}
              onClick={() => setFormData({ ...formData, personalityType: p.id })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                formData.personalityType === p.id
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Living Style"
          value={formData.livingStyle}
          onChange={(e) => setFormData({ ...formData, livingStyle: e.target.value })}
          options={[
            { value: 'independent', label: 'Independent (Do our own things)' },
            { value: 'shared-activities', label: 'Shared Activities (Cook, movie nights, gym)' },
            { value: 'flexible', label: 'Flexible depending on mood' },
          ]}
        />

        <Select
          label="Conflict & Communication Style"
          value={formData.communicationStyle}
          onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
          options={[
            { value: 'direct', label: 'Direct & Open (Address issues immediately)' },
            { value: 'diplomatic', label: 'Diplomatic & Gentle (Thoughtful chat)' },
            { value: 'casual', label: 'Casual / WhatsApp group note' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Noise Tolerance"
          value={formData.noiseTolerance}
          onChange={(e) => setFormData({ ...formData, noiseTolerance: e.target.value })}
          options={[
            { value: 'low', label: 'Low (Need pin-drop silence for focus/sleep)' },
            { value: 'moderate', label: 'Moderate (Standard background sounds okay)' },
            { value: 'high', label: 'High (Music, chatter never bothers me)' },
          ]}
        />

        <Select
          label="Interaction Level With Flatmate"
          value={formData.interactionLevel}
          onChange={(e) => setFormData({ ...formData, interactionLevel: e.target.value })}
          options={[
            { value: 'minimal', label: 'Minimal (Polite hello, mostly private)' },
            { value: 'moderate', label: 'Moderate (Occasional chat & catchups)' },
            { value: 'high', label: 'High (Looking to become close friends)' },
          ]}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Next: Ideal Flatmate Preferences →
      </Button>
    </form>
  );
};
