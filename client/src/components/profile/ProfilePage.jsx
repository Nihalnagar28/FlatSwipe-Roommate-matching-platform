import React, { useState } from 'react';
import {
  User,
  MapPin,
  Moon,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Camera,
  Edit2,
  Save,
  AlertCircle,
  Upload,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userAPI, verificationAPI } from '../../services/api';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency } from '../../utils/helpers';

export const ProfilePage = () => {
  const { user, updateUser, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [idType, setIdType] = useState('government-id');
  const [verificationRequested, setVerificationRequested] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    age: user?.age || 24,
    gender: user?.gender || 'male',
    occupation: user?.occupation || '',
    company: user?.company || '',
    bio: user?.bio || '',
    currentCity: user?.currentCity || 'Bangalore',
    preferredLocations: user?.preferredLocations?.join(', ') || '',
    budgetMin: user?.budgetMin || 15000,
    budgetMax: user?.budgetMax || 25000,
    sleepTime: user?.sleepTime || '23:30',
    wakeTime: user?.wakeTime || '07:30',
    chronotype: user?.chronotype || 'flexible',
    smokingHabit: user?.smokingHabit || 'never',
    drinkingHabit: user?.drinkingHabit || 'occasionally',
    cleanlinessLevel: user?.cleanlinessLevel || 'very-clean',
    dishWashing: user?.dishWashing || 'immediately',
    environmentPreference: user?.environmentPreference || 'balanced',
    personalityType: user?.personalityType || 'ambivert',
    profilePicture: user?.profilePicture || '',
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      const locations = formData.preferredLocations
        .split(',')
        .map((l) => l.trim())
        .filter(Boolean);

      const res = await userAPI.updateProfile({
        ...formData,
        preferredLocations: locations,
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax),
        age: Number(formData.age),
      });

      if (res.data.success) {
        updateUser(res.data.data);
        setEditing(false);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestVerification = async () => {
    setVerificationLoading(true);
    try {
      const res = await verificationAPI.requestVerification({
        type: idType,
        documentUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600', // sample verified doc hash
      });
      if (res.data.success) {
        setVerificationRequested(true);
      }
    } catch (err) {
      console.error('Verification error:', err);
      alert(err.response?.data?.message || 'Verification request already pending');
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Banner & Avatar */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <Avatar
                src={user?.profilePicture}
                name={user?.fullName}
                size="2xl"
                className="ring-4 ring-indigo-50 shadow-md"
              />
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900">{user?.fullName}</h1>
                {user?.verificationBadge && (
                  <CheckCircle className="w-5 h-5 text-indigo-600 fill-indigo-100 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user?.occupation} {user?.company ? `@ ${user?.company}` : ''} • {user?.currentCity}
              </p>
              <p className="text-xs text-indigo-600 font-bold mt-1.5">
                {formatCurrency(user?.budgetMin)} - {formatCurrency(user?.budgetMax)} / month budget
              </p>
            </div>
          </div>

          <Button
            onClick={() => setEditing(!editing)}
            variant={editing ? 'secondary' : 'primary'}
            size="md"
          >
            {editing ? (
              'Cancel Editing'
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-1.5" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Completion Bar */}
        <div className="pt-6">
          <ProgressBar
            progress={user?.profileCompletionPercentage || 90}
            label="Profile Harmony Strength"
          />
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Identity Verification Trust Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 rounded-3xl shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-300 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              Government ID Verification
              {user?.verificationBadge ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                  Verified
                </span>
              ) : (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-900">
                  Unverified
                </span>
              )}
            </h3>
            <p className="text-xs text-indigo-200 mt-0.5">
              Verified members get 3x more match responses. Documents are strictly encrypted and never shared.
            </p>
          </div>
        </div>

        {!user?.verificationBadge && (
          <div className="shrink-0">
            {verificationRequested ? (
              <span className="text-xs font-bold px-4 py-2 rounded-xl bg-white/10 text-emerald-300">
                ✓ Verification Pending Review
              </span>
            ) : (
              <Button
                onClick={handleRequestVerification}
                variant="primary"
                size="md"
                className="bg-white text-indigo-950 hover:bg-slate-100 font-bold shadow-md"
                loading={verificationLoading}
              >
                Submit ID For Review
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Edit Form or View Cards */}
      {editing ? (
        <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-soft space-y-6">
          <h3 className="text-base font-bold text-slate-900">Edit Personal & Living Preferences</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <Input
              label="Occupation"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              value={formData.currentCity}
              onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
              required
            />
            <Input
              label="Min Budget (₹)"
              type="number"
              value={formData.budgetMin}
              onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
              required
            />
            <Input
              label="Max Budget (₹)"
              type="number"
              value={formData.budgetMax}
              onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
              required
            />
          </div>

          <Input
            label="Preferred Areas"
            value={formData.preferredLocations}
            onChange={(e) => setFormData({ ...formData, preferredLocations: e.target.value })}
            helperText="Comma separated"
          />

          <Input
            label="Profile Picture URL"
            value={formData.profilePicture}
            onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
            helperText="Direct image URL"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Chronotype"
              value={formData.chronotype}
              onChange={(e) => setFormData({ ...formData, chronotype: e.target.value })}
              options={[
                { value: 'early-bird', label: 'Early Bird' },
                { value: 'night-owl', label: 'Night Owl' },
                { value: 'flexible', label: 'Flexible' },
              ]}
            />

            <Select
              label="Cleanliness"
              value={formData.cleanlinessLevel}
              onChange={(e) => setFormData({ ...formData, cleanlinessLevel: e.target.value })}
              options={[
                { value: 'very-clean', label: 'Very Clean' },
                { value: 'clean', label: 'Clean' },
                { value: 'moderate', label: 'Moderate' },
              ]}
            />

            <Select
              label="Smoking Habit"
              value={formData.smokingHabit}
              onChange={(e) => setFormData({ ...formData, smokingHabit: e.target.value })}
              options={[
                { value: 'never', label: 'Never' },
                { value: 'occasionally', label: 'Occasionally' },
                { value: 'regularly', label: 'Regularly' },
              ]}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              onClick={() => setEditing(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        /* Read Only Overview */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Living & Sleep Habits
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Chronotype:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.chronotype || 'Flexible'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Sleep Time:</span>
                <span className="font-bold text-slate-700">{user?.sleepTime || '23:30'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Wake Time:</span>
                <span className="font-bold text-slate-700">{user?.wakeTime || '07:30'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Cleanliness:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.cleanlinessLevel || 'Very clean'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Dishwashing:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.dishWashing || 'Immediately'}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Lifestyle & Atmosphere
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Smoking:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.smokingHabit || 'Never'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Drinking:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.drinkingHabit || 'Occasionally'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Pets:</span>
                <span className="font-bold text-slate-700">{user?.hasPets ? (user.petType || 'Has Pets') : 'None'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Vibe:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.environmentPreference || 'Balanced'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Personality:</span>
                <span className="font-bold text-slate-700 capitalize">{user?.personalityType || 'Ambivert'}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
