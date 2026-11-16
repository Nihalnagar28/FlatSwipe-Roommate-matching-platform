import React from 'react';
import {
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { formatCurrency } from '../../utils/helpers';
import { getProfileFallback, handleImageError } from '../../utils/imageFallback';
import { CompatibilityBreakdown } from './CompatibilityBreakdown';

export const FullProfileModal = ({ isOpen, onClose, candidate, compatibility }) => {
  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" className="max-h-[90vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Header with image */}
        <div className="relative h-64 -mx-5 -mt-5 bg-[#202622] rounded-t-xl overflow-hidden">
          <img
            src={candidate.profilePicture || getProfileFallback(candidate.fullName)}
            alt={candidate.fullName}
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'profile', candidate.fullName)}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/90 via-[#202622]/30 to-transparent" />

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{candidate.fullName}, {candidate.age}</h2>
              {candidate.verificationBadge && (
                <CheckCircle className="w-5 h-5 text-white fill-[#315C4C]" />
              )}
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              {candidate.occupation} {candidate.company ? `@ ${candidate.company}` : ''} • {candidate.currentCity}
            </p>
          </div>
        </div>

        {/* Bio */}
        {candidate.bio && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#737B74] mb-1.5">About</h4>
            <p className="text-sm text-[#202622] leading-relaxed bg-[#F8F8F5] p-4 rounded-lg border border-[#E5E7E2]">
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
        <div className="space-y-4 pt-4 border-t border-[#E5E7E2]">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-[#737B74]">
            Daily Routine & Living Preferences
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
              <span className="text-[#737B74] block mb-0.5">Budget</span>
              <span className="font-semibold text-[#202622]">
                {formatCurrency(candidate.budgetMin)} – {formatCurrency(candidate.budgetMax)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
              <span className="text-[#737B74] block mb-0.5">Sleep Time</span>
              <span className="font-semibold text-[#202622]">
                {candidate.sleepTime || 'Flexible'} ({candidate.chronotype || 'Hybrid'})
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
              <span className="text-[#737B74] block mb-0.5">Cleanliness</span>
              <span className="font-semibold text-[#202622] capitalize">
                {candidate.cleanlinessLevel?.replace('-', ' ') || 'Clean'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
              <span className="text-[#737B74] block mb-0.5">Smoking</span>
              <span className="font-semibold text-[#202622] capitalize">
                {candidate.smokingHabit || 'Never'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
              <span className="text-[#737B74] block mb-0.5">Drinking</span>
              <span className="font-semibold text-[#202622] capitalize">
                {candidate.drinkingHabit || 'Occasionally'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
              <span className="text-[#737B74] block mb-0.5">Pets</span>
              <span className="font-semibold text-[#202622]">
                {candidate.hasPets ? (candidate.petType || 'Has Pets') : 'No Pets'}
              </span>
            </div>
          </div>
        </div>

        {/* Preferred Areas */}
        {candidate.preferredLocations && candidate.preferredLocations.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#737B74] mb-2">
              Preferred Neighborhoods
            </h4>
            <div className="flex flex-wrap gap-2">
              {candidate.preferredLocations.map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1 rounded-full bg-[#E8EAE3] text-[#315C4C] font-semibold text-xs border border-[#E5E7E2] flex items-center gap-1"
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
