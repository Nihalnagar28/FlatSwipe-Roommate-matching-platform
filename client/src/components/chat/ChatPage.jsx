import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { matchAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { FullProfileModal } from '../discovery/FullProfileModal';

export const ChatPage = () => {
  const { user } = useAuth();
  const { onlineUsers } = useSocket();
  const [searchParams, setSearchParams] = useSearchParams();

  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(searchParams.get('match') || null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    const urlMatchId = searchParams.get('match');
    if (urlMatchId) {
      setSelectedMatchId(urlMatchId);
    }
  }, [searchParams]);

  const fetchMatches = async () => {
    try {
      const res = await matchAPI.getMatches();
      if (res.data.success) {
        const data = res.data.data || [];
        setMatches(data);
        if (!selectedMatchId && data.length > 0) {
          setSelectedMatchId(data[0]._id);
        }
      }
    } catch (err) {
      console.error('Error fetching chat matches:', err);
    }
  };

  const handleSelectMatch = (matchId) => {
    setSelectedMatchId(matchId);
    setSearchParams({ match: matchId });
  };

  const selectedMatch = matches.find((m) => m._id === selectedMatchId);
  const partner = selectedMatch?.users?.find((u) => u._id !== user?._id) || selectedMatch?.users?.[0];

  return (
    <div className="h-[calc(100vh-8.5rem)] bg-white rounded-xl border border-[#E5E7E2] shadow-sm overflow-hidden flex">
      {/* Sidebar: Shown on desktop always, hidden on mobile if conversation selected */}
      <div className={`h-full ${selectedMatchId ? 'hidden lg:block' : 'w-full'}`}>
        <ChatSidebar
          matches={matches}
          selectedMatchId={selectedMatchId}
          onSelectMatch={handleSelectMatch}
          currentUserId={user?._id}
          onlineUsers={onlineUsers}
        />
      </div>

      {/* Chat Window */}
      <div className={`flex-1 h-full ${!selectedMatchId ? 'hidden lg:flex' : 'flex'}`}>
        {selectedMatch ? (
          <ChatWindow
            match={selectedMatch}
            currentUserId={user?._id}
            onBackMobile={() => setSelectedMatchId(null)}
            onOpenDetails={() => setShowProfileModal(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400 p-8">
            Select a match to start conversation
          </div>
        )}
      </div>

      {/* Partner profile details modal */}
      {showProfileModal && partner && (
        <FullProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          candidate={partner}
          compatibility={{
            score: selectedMatch?.compatibilityScore || 90,
            breakdown: selectedMatch?.compatibilityBreakdown || {},
            explanations: selectedMatch?.compatibilityExplanations || [],
          }}
        />
      )}
    </div>
  );
};
