import React from 'react';
import { MapPin, Heart, X, MessageSquare, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { getProfileFallback, handleImageError } from '../../utils/imageFallback';

export const MiniProfileCard = ({
  user,
  compatibilityScore = 85,
  type = 'match', // 'match' | 'received-like' | 'sent-like'
  onAccept,
  onReject,
  onChat,
  onViewProfile,
}) => {
  if (!user) return null;

  return (
    <Card className="p-4 flex flex-col justify-between" hover>
      <div>
        <div className="relative h-44 rounded-lg overflow-hidden mb-3 bg-[#E8EAE3]">
          <img
            src={user.profilePicture || getProfileFallback(user.fullName)}
            alt={user.fullName}
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'profile', user.fullName)}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 right-2.5 bg-[#315C4C] text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-sm">
            {compatibilityScore}% Match
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-1">
          <h4 className="font-bold text-sm text-[#202622] truncate">{user.fullName}</h4>
          <span className="text-xs font-semibold text-[#737B74]">{user.age}</span>
          {user.verificationBadge && (
            <CheckCircle className="w-3.5 h-3.5 text-[#315C4C] fill-[#E8EAE3] shrink-0" />
          )}
        </div>

        <p className="text-xs text-[#737B74] truncate mb-1">
          {user.occupation} • {user.currentCity}
        </p>

        <p className="text-[11px] font-semibold text-[#315C4C] bg-[#E8EAE3] px-2 py-0.5 rounded-md inline-block mb-3">
          {formatCurrency(user.budgetMin)} – {formatCurrency(user.budgetMax)}
        </p>
      </div>

      <div className="pt-2 border-t border-[#E5E7E2]">
        {type === 'received-like' ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onReject}
              variant="secondary"
              size="sm"
              className="w-full text-xs text-[#C0392B] hover:bg-red-50 border-red-200"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Pass
            </Button>
            <Button
              onClick={onAccept}
              variant="primary"
              size="sm"
              className="w-full text-xs"
            >
              <Heart className="w-3.5 h-3.5 mr-1 fill-white" />
              Match
            </Button>
          </div>
        ) : type === 'match' ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onViewProfile}
              variant="secondary"
              size="sm"
              className="w-full text-xs"
            >
              Profile
            </Button>
            <Button
              onClick={onChat}
              variant="primary"
              size="sm"
              className="w-full text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              Chat
            </Button>
          </div>
        ) : (
          <Button
            onClick={onViewProfile}
            variant="secondary"
            size="sm"
            className="w-full text-xs text-[#737B74]"
          >
            Pending Response
          </Button>
        )}
      </div>
    </Card>
  );
};
