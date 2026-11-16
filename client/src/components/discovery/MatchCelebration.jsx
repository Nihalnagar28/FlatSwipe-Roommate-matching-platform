import React from 'react';
import { Heart, MessageSquare, Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const MatchCelebration = ({ isOpen, onClose, match, currentUser, onStartChat }) => {
  const navigate = useNavigate();

  if (!isOpen || !match) return null;

  // Find the other user in the match
  const matchedUser = match.users?.find((u) => u._id !== currentUser?._id) || match.users?.[0];

  const handleChat = () => {
    onClose();
    if (onStartChat) {
      onStartChat(match._id);
    } else {
      navigate(`/messages?match=${match._id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 text-center shadow-2xl border border-indigo-500/30 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow behind avatars */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Mutual Interest Confirmed</span>
        </div>

        <h2 className="text-3xl font-black tracking-tight mb-2">It's a Match! 🎉</h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-8 max-w-xs mx-auto">
          You and <span className="font-bold text-white">{matchedUser?.fullName}</span> both liked each other’s lifestyles!
        </p>

        {/* Dual Avatars with heart center */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative">
            <Avatar
              src={currentUser?.profilePicture}
              name={currentUser?.fullName}
              size="2xl"
              className="ring-4 ring-indigo-500 shadow-xl"
            />
          </div>

          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 -mx-6 z-10 animate-bounce">
            <Heart className="w-6 h-6 fill-white" />
          </div>

          <div className="relative">
            <Avatar
              src={matchedUser?.profilePicture}
              name={matchedUser?.fullName}
              size="2xl"
              className="ring-4 ring-purple-500 shadow-xl"
            />
          </div>
        </div>

        {/* Compatibility badge */}
        <div className="mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 max-w-xs mx-auto">
          <span className="text-xs text-indigo-300 font-semibold block mb-0.5">
            Harmony Rating
          </span>
          <span className="text-xl font-black text-emerald-400">
            {match.compatibilityScore || 92}% Lifestyle Compatible
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleChat}
            variant="gradient"
            size="lg"
            className="w-full shadow-lg shadow-indigo-600/30 font-bold"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start Chatting Now
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            size="md"
            className="w-full text-slate-400 hover:text-white hover:bg-white/5"
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
};
