import React from 'react';
import { Sparkles, MapPin, Heart, X, MessageSquare, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { formatCurrency, getCompatibilityBadgeColor } from '../../utils/helpers';

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
        <div className="relative h-44 rounded-2xl overflow-hidden mb-3 bg-slate-100">
          <img
            src={user.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={user.fullName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-md">
            {compatibilityScore}% Match
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-1">
          <h4 className="font-bold text-sm text-slate-900 truncate">{user.fullName}</h4>
          <span className="text-xs font-semibold text-slate-500">{user.age}</span>
          {user.verificationBadge && (
            <CheckCircle className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100 shrink-0" />
          )}
        </div>

        <p className="text-xs text-slate-500 truncate mb-1">
          {user.occupation} • {user.currentCity}
        </p>

        <p className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-3">
          {formatCurrency(user.budgetMin)} - {formatCurrency(user.budgetMax)}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-100">
        {type === 'received-like' ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onReject}
              variant="secondary"
              size="sm"
              className="w-full text-xs text-rose-600 hover:bg-rose-50"
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
            className="w-full text-xs text-slate-500"
          >
            Pending Response
          </Button>
        )}
      </div>
    </Card>
  );
};
