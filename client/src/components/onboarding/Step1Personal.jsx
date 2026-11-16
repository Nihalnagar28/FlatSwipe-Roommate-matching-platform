import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { getProfileFallback, handleImageError } from '../../utils/imageFallback';

export const Step1Personal = ({ initialData = {}, onNext }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    age: initialData.age || 24,
    gender: initialData.gender || 'male',
    occupation: initialData.occupation || '',
    company: initialData.company || '',
    bio: initialData.bio || '',
    profilePicture: initialData.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  });

  const [avatarPresets] = useState([
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture & Presets */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-4 border-b border-slate-100">
        <div className="relative group">
          <img
            src={formData.profilePicture || getProfileFallback(formData.fullName || 'You')}
            alt="Profile Preview"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'profile', formData.fullName || 'You')}
            className="w-24 h-24 rounded-xl object-cover shadow-sm border border-[#E5E7E2]"
          />
          <div className="absolute inset-0 bg-[#202622]/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <label className="block text-xs font-semibold text-[#737B74] uppercase tracking-wide mb-1.5">
            Choose Profile Picture
          </label>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {avatarPresets.map((preset, idx) => (
              <img
                key={idx}
                src={preset}
                alt="Preset"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'profile', `User ${idx + 1}`)}
                onClick={() => setFormData({ ...formData, profilePicture: preset })}
                className={`w-10 h-10 rounded-lg object-cover cursor-pointer transition-all border-2 ${
                  formData.profilePicture === preset
                    ? 'border-[#315C4C] ring-2 ring-[#315C4C]/20'
                    : 'border-transparent hover:opacity-80'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-[#737B74] mt-2">
            Click any avatar or paste an image URL in your profile later.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Age (18+)"
            type="number"
            min="18"
            max="99"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            required
          />

          <Select
            label="Gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'non-binary', label: 'Non-binary' },
              { value: 'prefer-not-to-say', label: 'Prefer not to say' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Occupation"
          placeholder="e.g. Software Engineer, Designer"
          value={formData.occupation}
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          required
        />

        <Input
          label="College / Company"
          placeholder="e.g. Google, IIT Bombay"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#737B74] uppercase tracking-wide mb-1.5">
          Short Bio (About you)
        </label>
        <textarea
          rows={3}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell prospective flatmates a little about yourself, your hobbies, and what you enjoy doing on weekends..."
          className="w-full rounded-lg border border-[#E5E7E2] p-3 text-sm text-[#202622] placeholder:text-[#9EA397] focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C]"
          maxLength={400}
        />
        <p className="text-[11px] text-slate-400 text-right mt-1">
          {formData.bio.length}/400 characters
        </p>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Next: Location & Budget →
      </Button>
    </form>
  );
};
