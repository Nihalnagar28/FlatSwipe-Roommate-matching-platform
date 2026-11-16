import React from 'react';
import {
  Heart,
  X,
  Star,
  Info,
  MapPin,
  Moon,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { getProfileFallback, handleImageError } from '../../utils/imageFallback';

export const ProfileCard = ({
  candidate,
  compatibility,
  onLike,
  onPass,
  onSuperLike,
  onViewDetails,
}) => {
  if (!candidate) return null;

  return (
    <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-sm border border-[#E5E7E2] overflow-hidden flex flex-col justify-between select-none">
      {/* Top Image Section */}
      <div className="relative h-80 sm:h-96 w-full bg-[#202622] group">
        <img
          src={candidate.profilePicture || getProfileFallback(candidate.fullName)}
          alt={candidate.fullName}
          referrerPolicy="no-referrer"
          onError={(e) => handleImageError(e, 'profile', candidate.fullName)}
          className="w-full h-full object-cover"
        />

        {/* Gradient shadow for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#202622]/90 via-[#202622]/25 to-black/20 pointer-events-none" />

        {/* Compatibility pill top right */}
        {compatibility && (
          <button
            type="button"
            onClick={onViewDetails}
            className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm bg-white/95 text-[#315C4C] border border-[#E5E7E2] flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{compatibility.score}% Match</span>
          </button>
        )}

        {/* Info button top left */}
        <button
          type="button"
          onClick={onViewDetails}
          className="absolute top-4 left-4 p-2 rounded-full bg-[#202622]/50 text-white hover:bg-[#202622]/80 transition-colors"
          title="View profile details"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* Primary Info pinned at bottom of photo */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold">{candidate.fullName}</h2>
            <span className="text-xl font-bold opacity-90">{candidate.age}</span>
            {candidate.verificationBadge && (
              <CheckCircle className="w-5 h-5 text-white fill-[#315C4C] shrink-0" />
            )}
          </div>
          <p className="text-xs text-white/80 mt-0.5 truncate">
            {candidate.occupation} {candidate.company ? `@ ${candidate.company}` : ''}
          </p>
          <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-[#D5E5DC]" />
            {candidate.currentCity}
            {candidate.preferredLocations && candidate.preferredLocations.length > 0
              ? ` (${candidate.preferredLocations.slice(0, 2).join(', ')})`
              : ''}
          </p>
        </div>
      </div>

      {/* Habits & Quick Lifestyle Snippets */}
      <div className="p-5 space-y-4">
        {/* Habit chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-[#E8EAE3] text-[#315C4C] px-2.5 py-1 rounded-md font-semibold">
            {formatCurrency(candidate.budgetMin)} – {formatCurrency(candidate.budgetMax)}
          </span>

          <span className="bg-[#F8F8F5] text-[#527565] px-2.5 py-1 rounded-md font-medium border border-[#E5E7E2] flex items-center gap-1">
            <Moon className="w-3 h-3" />
            {candidate.sleepTime || '11:00 PM'} ({candidate.chronotype || 'flexible'})
          </span>

          <span className="bg-[#F8F8F5] text-[#202622] px-2.5 py-1 rounded-md font-medium border border-[#E5E7E2] capitalize">
            {candidate.cleanlinessLevel?.replace('-', ' ') || 'Clean'}
          </span>

          <span className="bg-[#F8F8F5] text-[#737B74] px-2.5 py-1 rounded-md font-medium border border-[#E5E7E2] capitalize">
            Smoking: {candidate.smokingHabit || 'Never'}
          </span>
        </div>

        {/* Bio summary */}
        {candidate.bio && (
          <p className="text-xs text-[#737B74] line-clamp-2 leading-relaxed">
            "{candidate.bio}"
          </p>
        )}

        {/* Swipe Control Buttons */}
        <div className="flex items-center justify-center gap-6 pt-3 border-t border-[#E5E7E2]">
          {/* Pass / Dislike */}
          <button
            type="button"
            onClick={onPass}
            className="w-14 h-14 rounded-full border border-[#E5E7E2] bg-white text-[#737B74] hover:text-[#C0392B] hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all duration-150 shadow-sm hover:scale-105 active:scale-95"
            title="Pass (Swipe Left)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Super-Like */}
          <button
            type="button"
            onClick={onSuperLike}
            className="w-11 h-11 rounded-full border border-[#E5E7E2] bg-white text-[#D9A16A] hover:bg-[#D9A16A]/10 flex items-center justify-center transition-all duration-150 shadow-sm hover:scale-105 active:scale-95"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-current" />
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={onLike}
            className="w-16 h-16 rounded-full bg-[#315C4C] text-white hover:bg-[#27503F] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            title="Like (Swipe Right)"
          >
            <Heart className="w-7 h-7 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
