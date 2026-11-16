import React from 'react';
import {
  MapPin,
  DollarSign,
  Moon,
  Sparkles,
  Cigarette,
  Wine,
  Dog,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  Shield,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';
import { CompatibilityBreakdown } from './CompatibilityBreakdown';

export const FullProfileModal = ({ isOpen, onClose, candidate, compatibility }) => {
  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" className="max-h-[90vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Header with image */}
        <div className="relative h-64 -mx-6 -mt-6 bg-slate-900">
          <img
            src={candidate.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
            alt={candidate.fullName}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black">{candidate.fullName}, {candidate.age}</h2>
              {candidate.verificationBadge && (
                <CheckCircle className="w-5 h-5 text-indigo-400 fill-white" />
              )}
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {candidate.occupation} {candidate.company ? `@ ${candidate.company}` : ''} • {candidate.currentCity}
            </p>
          </div>
        </div>

        {/* Bio */}
        {candidate.bio && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">About Me</h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              "{candidate.bio}"
            </p>
          </div>
        )}

        {/* Compatibility Breakdown section */}
        {compatibility && (
          <div>
            <CompatibilityBreakdown compatibility={compatibility} />
          </div>
        )}

        {/* Detailed Lifestyle Matrix */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Daily Routine & Living Preferences
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Budget</span>
              <span className="font-bold text-slate-800">
                {formatCurrency(candidate.budgetMin)} - {formatCurrency(candidate.budgetMax)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Sleep Time</span>
              <span className="font-bold text-slate-800">
                {candidate.sleepTime || 'Flexible'} ({candidate.chronotype || 'Hybrid'})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Cleanliness</span>
              <span className="font-bold text-slate-800 capitalize">
                {candidate.cleanlinessLevel?.replace('-', ' ') || 'Clean'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Smoking</span>
              <span className="font-bold text-slate-800 capitalize">
                {candidate.smokingHabit || 'Never'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Drinking</span>
              <span className="font-bold text-slate-800 capitalize">
                {candidate.drinkingHabit || 'Occasionally'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Pets</span>
              <span className="font-bold text-slate-800">
                {candidate.hasPets ? (candidate.petType || 'Has Pets') : 'No Pets'}
              </span>
            </div>
          </div>
        </div>

        {/* Preferred Areas */}
        {candidate.preferredLocations && candidate.preferredLocations.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Preferred Neighborhoods
            </h4>
            <div className="flex flex-wrap gap-2">
              {candidate.preferredLocations.map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100 flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {loc}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
