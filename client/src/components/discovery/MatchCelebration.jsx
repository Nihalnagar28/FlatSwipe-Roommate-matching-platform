import React from 'react';
import { Heart, MessageSquare, Sparkles, X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202622]/60 backdrop-blur-[2px]">
      <div className="relative w-full max-w-md bg-white text-[#202622] rounded-xl p-8 text-center shadow-lg border border-[#E5E7E2] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#737B74] hover:text-[#202622] rounded-lg hover:bg-[#F8F8F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="FlatSwipe" className="h-10 w-auto object-contain" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EAE3] text-[#315C4C] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mutual Interest Confirmed</span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight mb-1.5">It's a Match!</h2>
        <p className="text-xs text-[#737B74] mb-6 max-w-xs mx-auto">
          You and <span className="font-semibold text-[#202622]">{matchedUser?.fullName}</span> both liked each other’s lifestyles!
        </p>

        {/* Dual Avatars with heart center */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <Avatar
              src={currentUser?.profilePicture}
              name={currentUser?.fullName}
              size="2xl"
              className="ring-2 ring-[#E5E7E2]"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-[#315C4C] text-white flex items-center justify-center shadow-sm -mx-5 z-10">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div className="relative">
            <Avatar
              src={matchedUser?.profilePicture}
              name={matchedUser?.fullName}
              size="2xl"
              className="ring-2 ring-[#E5E7E2]"
            />
          </div>
        </div>

        {/* Compatibility badge */}
        <div className="mb-6 p-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] max-w-xs mx-auto">
          <span className="text-[11px] text-[#737B74] font-medium block mb-0.5">
            Harmony Rating
          </span>
          <span className="text-lg font-extrabold text-[#315C4C]">
            {match.compatibilityScore || 92}% Lifestyle Compatible
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <Button
            onClick={handleChat}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start Chatting Now
          </Button>

          <Button
            onClick={onClose}
            variant="secondary"
            size="md"
            className="w-full"
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
};
