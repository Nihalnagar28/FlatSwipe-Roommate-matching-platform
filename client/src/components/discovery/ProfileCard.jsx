import React from 'react';
import {
  Heart,
  X,
  Star,
  Info,
  MapPin,
  Moon,
  Sparkles,
  Cigarette,
  Wine,
  Dog,
  CheckCircle,
} from 'lucide-react';
import { formatCurrency, getCompatibilityBadgeColor } from '../../utils/helpers';

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
    <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Image Section */}
      <div className="relative h-80 sm:h-96 w-full bg-slate-900 group">
        <img
          src={candidate.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'}
          alt={candidate.fullName}
          className="w-full h-full object-cover"
        />

        {/* Gradient shadow for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/30 pointer-events-none" />

        {/* Compatibility pill top right */}
        {compatibility && (
          <button
            type="button"
            onClick={onViewDetails}
            className={`absolute top-4 right-4 text-xs font-black px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-md flex items-center gap-1.5 transition-transform hover:scale-105 ${getCompatibilityBadgeColor(
              compatibility.score
            )}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{compatibility.score}% Match</span>
          </button>
        )}

        {/* Info button top left */}
        <button
          type="button"
          onClick={onViewDetails}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/90 transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* Primary Info pinned at bottom of photo */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black">{candidate.fullName}</h2>
            <span className="text-xl font-bold opacity-90">{candidate.age}</span>
            {candidate.verificationBadge && (
              <CheckCircle className="w-5 h-5 text-indigo-400 fill-white shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-200 mt-0.5 truncate">
            {candidate.occupation} {candidate.company ? `@ ${candidate.company}` : ''}
          </p>
          <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-slate-400" />
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
          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl font-bold border border-emerald-100">
            {formatCurrency(candidate.budgetMin)} - {formatCurrency(candidate.budgetMax)}
          </span>

          <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-xl font-medium border border-purple-100 flex items-center gap-1">
            <Moon className="w-3 h-3" />
            {candidate.sleepTime || '11:00 PM'} ({candidate.chronotype || 'flexible'})
          </span>

          <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-xl font-medium border border-indigo-100 capitalize">
            {candidate.cleanlinessLevel?.replace('-', ' ') || 'Clean'}
          </span>

          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl font-medium capitalize">
            Smoking: {candidate.smokingHabit || 'Never'}
          </span>
        </div>

        {/* Bio summary */}
        {candidate.bio && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            "{candidate.bio}"
          </p>
        )}

        {/* Swipe Control Buttons */}
        <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100">
          {/* Pass / Dislike */}
          <button
            type="button"
            onClick={onPass}
            className="w-14 h-14 rounded-full border-2 border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-400 hover:bg-rose-50 flex items-center justify-center transition-all duration-150 shadow-sm hover:scale-105 active:scale-95"
            title="Pass (Swipe Left)"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Super-Like */}
          <button
            type="button"
            onClick={onSuperLike}
            className="w-11 h-11 rounded-full border-2 border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all duration-150 shadow-sm hover:scale-105 active:scale-95"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-current" />
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={onLike}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all duration-150"
            title="Like (Swipe Right)"
          >
            <Heart className="w-8 h-8 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
