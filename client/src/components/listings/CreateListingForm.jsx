import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, DollarSign, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { listingAPI } from '../../services/api';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const CreateListingForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    city: 'Bangalore',
    area: '',
    address: '',
    rent: '',
    securityDeposit: '',
    availableRooms: 1,
    totalRooms: 3,
    furnishingStatus: 'furnished',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    amenities: 'WiFi, Power Backup, Washing Machine, Kitchen, Refrigerator, AC',
    houseRules: 'No smoking inside, Quiet hours after 11 PM, Clean kitchen after use',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        location: {
          city: formData.city,
          area: formData.area,
          address: formData.address,
        },
        rent: Number(formData.rent),
        securityDeposit: Number(formData.securityDeposit || formData.rent * 2),
        availableRooms: Number(formData.availableRooms),
        totalRooms: Number(formData.totalRooms),
        furnishingStatus: formData.furnishingStatus,
        images: [{ url: formData.imageUrl }],
        amenities: formData.amenities.split(',').map((s) => s.trim()).filter(Boolean),
        houseRules: formData.houseRules.split(',').map((s) => s.trim()).filter(Boolean),
        isVerified: true,
      };

      const res = await listingAPI.createListing(payload);
      if (res.data.success) {
        navigate(`/listings/${res.data.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Post a Flat / Room</h1>
        <p className="text-xs text-slate-500 mt-1">Publish an available room to find verified, compatible roommates</p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-soft border border-slate-100 space-y-6">
        <Input
          label="Listing Title"
          placeholder="e.g. Spacious Master Bedroom in Indiranagar 3BHK"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Property Type"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            options={[
              { value: 'apartment', label: 'Apartment / Society Flat' },
              { value: 'house', label: 'Independent House / Villa' },
              { value: 'studio', label: 'Studio Apartment' },
              { value: 'pg', label: 'Paying Guest (PG)' },
            ]}
          />

          <Select
            label="Furnishing Status"
            value={formData.furnishingStatus}
            onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value })}
            options={[
              { value: 'furnished', label: 'Fully Furnished' },
              { value: 'semi-furnished', label: 'Semi-Furnished' },
              { value: 'unfurnished', label: 'Unfurnished' },
            ]}
          />
        </div>

        {/* Location details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            options={[
              { value: 'Bangalore', label: 'Bangalore' },
              { value: 'Mumbai', label: 'Mumbai' },
              { value: 'Delhi NCR', label: 'Delhi NCR' },
              { value: 'Pune', label: 'Pune' },
              { value: 'Hyderabad', label: 'Hyderabad' },
            ]}
            required
          />

          <Input
            label="Area / Neighborhood"
            placeholder="e.g. Indiranagar 100ft Rd, Koramangala 4th Block"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            required
          />
        </div>

        <Input
          label="Street Address / Landmark"
          placeholder="e.g. Near Metro Station, 12th Main"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
          <Input
            label="Monthly Rent per Room (₹)"
            type="number"
            placeholder="e.g. 20000"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            required
          />

          <Input
            label="Security Deposit (₹)"
            type="number"
            placeholder="e.g. 50000"
            value={formData.securityDeposit}
            onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
          />
        </div>

        <Input
          label="Cover Photo URL"
          placeholder="https://..."
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          helperText="Paste direct image link (Unsplash or hosted photo)"
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the room, sunlight, society amenities, nearby transport, and what kind of flatmate you're looking for..."
            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            required
          />
        </div>

        <Input
          label="Amenities (Comma separated)"
          value={formData.amenities}
          onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
        />

        <Input
          label="House Rules (Comma separated)"
          value={formData.houseRules}
          onChange={(e) => setFormData({ ...formData, houseRules: e.target.value })}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
        >
          Publish Flat Listing
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  );
};
