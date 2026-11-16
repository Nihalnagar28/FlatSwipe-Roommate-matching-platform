import React from 'react';
import { Check, CheckCheck, Coffee, AlertTriangle } from 'lucide-react';
import { formatTime } from '../../utils/helpers';

export const MessageBubble = ({ message, isMe, onReport }) => {
  const isMeetup = message.messageType === 'meetup-request';

  return (
    <div className={`flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'}`}>
      <div
        className={`relative max-w-xs sm:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isMe
            ? 'bg-indigo-600 text-white rounded-br-xs shadow-sm'
            : 'bg-white text-slate-800 border border-slate-100 rounded-bl-xs shadow-soft'
        } ${isMeetup ? 'border-2 border-indigo-400 bg-indigo-50/90 text-indigo-950' : ''}`}
      >
        {isMeetup && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 mb-1">
            <Coffee className="w-4 h-4" />
            <span>Meetup Proposal</span>
          </div>
        )}

        <p className="whitespace-pre-wrap break-words">{message.content}</p>

        {/* Timestamp and receipts */}
        <div
          className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 ${
            isMe ? 'text-indigo-200' : 'text-slate-400'
          }`}
        >
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          {isMe && (
            <span>
              {message.isRead ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Check className="w-3 h-3 text-indigo-300" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
