import React from 'react';
import { Search, CheckCircle } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { formatRelativeTime } from '../../utils/helpers';

export const ChatSidebar = ({
  matches = [],
  selectedMatchId,
  onSelectMatch,
  currentUserId,
  onlineUsers = new Set(),
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMatches = matches.filter((m) => {
    const partner = m.users?.find((u) => u._id !== currentUserId) || m.users?.[0];
    return partner?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full lg:w-80 border-r border-[#E5E7E2] bg-white flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-[#E5E7E2]">
        <h2 className="text-lg font-bold text-[#202622] mb-3 tracking-tight">Messages</h2>
        <div className="relative">
          <Search className="w-4 h-4 text-[#737B74] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] text-[#202622] placeholder:text-[#9EA397] focus:bg-white focus:border-[#315C4C] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#E5E7E2]">
        {filteredMatches.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#737B74]">
            No active conversations
          </div>
        ) : (
          filteredMatches.map((match) => {
            const partner = match.users?.find((u) => u._id !== currentUserId) || match.users?.[0];
            if (!partner) return null;
            const isSelected = selectedMatchId === match._id;
            const isOnline = onlineUsers.has(partner._id) || partner.isOnline;

            return (
              <div
                key={match._id}
                onClick={() => onSelectMatch(match._id)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#E8EAE3] border-l-2 border-[#315C4C]' : 'hover:bg-[#F8F8F5]'
                }`}
              >
                <Avatar
                  src={partner.profilePicture}
                  name={partner.fullName}
                  size="md"
                  isOnline={isOnline}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 truncate">
                      <span className="font-bold text-xs text-[#202622] truncate">
                        {partner.fullName}
                      </span>
                      {partner.verificationBadge && (
                        <CheckCircle className="w-3 h-3 text-[#315C4C] fill-[#E8EAE3] shrink-0" />
                      )}
                    </div>
                    {match.lastMessageAt && (
                      <span className="text-[10px] text-[#737B74] shrink-0">
                        {formatRelativeTime(match.lastMessageAt)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#737B74] truncate">
                    {match.lastMessage?.content || 'Matched! Tap to chat.'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
