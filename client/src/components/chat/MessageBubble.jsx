import React from 'react';
import { Check, CheckCheck, Coffee } from 'lucide-react';

export const MessageBubble = ({ message, isMe, onReport }) => {
  const isMeetup = message.messageType === 'meetup-request';

  return (
    <div className={`flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'}`}>
      <div
        className={`relative max-w-xs sm:max-w-md px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
          isMe
            ? 'bg-[#315C4C] text-white rounded-br-xs shadow-xs'
            : 'bg-white text-[#202622] border border-[#E5E7E2] rounded-bl-xs shadow-xs'
        } ${isMeetup ? 'border border-[#D9A16A] bg-[#FEF3E2] text-[#202622]' : ''}`}
      >
        {isMeetup && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D9A16A] mb-1">
            <Coffee className="w-4 h-4" />
            <span>Meetup Proposal</span>
          </div>
        )}

        <p className="whitespace-pre-wrap break-words">{message.content}</p>

        {/* Timestamp and receipts */}
        <div
          className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${
            isMe ? 'text-white/70' : 'text-[#737B74]'
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
                <CheckCheck className="w-3.5 h-3.5 text-[#AAC9B8]" />
              ) : (
                <Check className="w-3 h-3 text-white/60" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
