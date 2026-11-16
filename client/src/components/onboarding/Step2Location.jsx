import React, { useState } from 'react';
import { MapPin, DollarSign, Home, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const Step2Location = ({ initialData = {}, onNext }) => {
  const [formData, setFormData] = useState({
    currentCity: initialData.currentCity || 'Bangalore',
    preferredLocations: initialData.preferredLocations?.join(', ') || 'Indiranagar, Koramangala',
    budgetMin: initialData.budgetMin || 15000,
    budgetMax: initialData.budgetMax || 25000,
    expectedRent: initialData.expectedRent || 20000,
    maxUtilities: initialData.maxUtilities || 3000,
    moveInDate: initialData.moveInDate ? new Date(initialData.moveInDate).toISOString().split('T')[0] : '',
    roomPreference: initialData.roomPreference || 'private',
    furnishingPreference: initialData.furnishingPreference || 'furnished',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedLocations = formData.preferredLocations
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    onNext({
      ...formData,
      preferredLocations: cleanedLocations,
      budgetMin: Number(formData.budgetMin),
      budgetMax: Number(formData.budgetMax),
      expectedRent: Number(formData.expectedRent),
      maxUtilities: Number(formData.maxUtilities),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Target City"
          value={formData.currentCity}
          onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
          options={[
            { value: 'Bangalore', label: 'Bangalore' },
            { value: 'Mumbai', label: 'Mumbai' },
            { value: 'Delhi NCR', label: 'Delhi NCR' },
            { value: 'Pune', label: 'Pune' },
            { value: 'Hyderabad', label: 'Hyderabad' },
            { value: 'Chennai', label: 'Chennai' },
          ]}
          required
        />

        <Input
          label="Preferred Localities / Areas"
          placeholder="e.g. Indiranagar, HSR, Koramangala"
          value={formData.preferredLocations}
          onChange={(e) => setFormData({ ...formData, preferredLocations: e.target.value })}
          helperText="Comma separated list"
          icon={MapPin}
          required
        />
      </div>

      {/* Budget Range */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-indigo-600" />
          Monthly Rent Budget (₹ INR)
        </h4>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input
            label="Min Budget (₹)"
            type="number"
            step="1000"
            value={formData.budgetMin}
            onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
            required
          />
          <Input
            label="Max Budget (₹)"
            type="number"
            step="1000"
            value={formData.budgetMax}
            onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Target Rent (₹)"
            type="number"
            step="500"
            value={formData.expectedRent}
            onChange={(e) => setFormData({ ...formData, expectedRent: e.target.value })}
          />
          <Input
            label="Max Utility Bills (₹)"
            type="number"
            step="500"
            value={formData.maxUtilities}
            onChange={(e) => setFormData({ ...formData, maxUtilities: e.target.value })}
            helperText="Electricity, WiFi, Water"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Room Preference"
          value={formData.roomPreference}
          onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
          options={[
            { value: 'private', label: 'Private Room' },
            { value: 'shared', label: 'Shared Room (Twin)' },
            { value: 'any', label: 'Open to Either' },
          ]}
        />

        <Select
          label="Furnishing"
          value={formData.furnishingPreference}
          onChange={(e) => setFormData({ ...formData, furnishingPreference: e.target.value })}
          options={[
            { value: 'furnished', label: 'Fully Furnished' },
            { value: 'unfurnished', label: 'Unfurnished' },
            { value: 'any', label: 'Either / Flexible' },
          ]}
        />

        <Input
          label="Preferred Move-in Date"
          type="date"
          value={formData.moveInDate}
          onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
          icon={Calendar}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Next: Sleep & Schedule →
      </Button>
    </form>
  );
};
