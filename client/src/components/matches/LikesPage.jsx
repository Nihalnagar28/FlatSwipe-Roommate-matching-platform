import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, UserCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { likeAPI } from '../../services/api';
import { Tabs } from '../ui/Tabs';
import { MiniProfileCard } from './MiniProfileCard';
import { Spinner } from '../ui/Spinner';
import { MatchCelebration } from '../discovery/MatchCelebration';
import { useAuth } from '../../context/AuthContext';

export const LikesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('received');
  const [receivedLikes, setReceivedLikes] = useState([]);
  const [sentLikes, setSentLikes] = useState([]);
  const [superLikes, setSuperLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMatch, setActiveMatch] = useState(null);

  useEffect(() => {
    fetchLikes();
  }, [activeTab]);

  const fetchLikes = async () => {
    setLoading(true);
    try {
      if (activeTab === 'received') {
        const res = await likeAPI.getReceivedLikes();
        if (res.data.success) {
          setReceivedLikes(res.data.data || []);
        }
      } else if (activeTab === 'sent') {
        const res = await likeAPI.getSentLikes();
        if (res.data.success) {
          setSentLikes(res.data.data || []);
        }
      } else if (activeTab === 'superlikes') {
        const res = await likeAPI.getSuperLikes();
        if (res.data.success) {
          setSuperLikes(res.data.data || []);
        }
      }
    } catch (err) {
      console.error('Fetch likes error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptLike = async (fromUserId) => {
    try {
      const res = await likeAPI.likeUser(fromUserId, 'like');
      if (res.data.data?.isMatch) {
        setActiveMatch(res.data.data.match);
      }
      // Remove from list
      setReceivedLikes((prev) => prev.filter((item) => item.fromUser._id !== fromUserId));
    } catch (err) {
      console.error('Accept error:', err);
    }
  };

  const handleRejectLike = async (fromUserId) => {
    try {
      await likeAPI.passUser(fromUserId);
      setReceivedLikes((prev) => prev.filter((item) => item.fromUser._id !== fromUserId));
    } catch (err) {
      console.error('Reject error:', err);
    }
  };

  const tabs = [
    { id: 'received', label: 'Liked Me', icon: Heart, count: receivedLikes.length },
    { id: 'sent', label: 'I Liked', icon: Sparkles, count: sentLikes.length },
    { id: 'superlikes', label: 'Super Likes', icon: Star, count: superLikes.length },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Likes & Interest</h1>
        <p className="text-xs text-slate-500 mt-1">Review people who expressed interest in living with you</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : activeTab === 'received' ? (
        receivedLikes.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8">
            <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900">No new incoming likes</h3>
            <p className="text-xs text-slate-500 mt-1">Make sure your profile is 100% complete so you appear higher in discovery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {receivedLikes.map((item) => (
              <MiniProfileCard
                key={item._id}
                user={item.fromUser}
                type="received-like"
                onAccept={() => handleAcceptLike(item.fromUser._id)}
                onReject={() => handleRejectLike(item.fromUser._id)}
              />
            ))}
          </div>
        )
      ) : activeTab === 'sent' ? (
        sentLikes.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900">No pending sent likes</h3>
            <p className="text-xs text-slate-500 mt-1">Explore profiles in discovery to start connecting!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sentLikes.map((item) => (
              <MiniProfileCard
                key={item._id}
                user={item.toUser}
                type="sent-like"
              />
            ))}
          </div>
        )
      ) : (
        superLikes.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8">
            <Star className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900">No super likes yet</h3>
            <p className="text-xs text-slate-500 mt-1">Super-likes highlight top priority roommate matches.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {superLikes.map((item) => (
              <MiniProfileCard
                key={item._id}
                user={item.fromUser}
                type="received-like"
                onAccept={() => handleAcceptLike(item.fromUser._id)}
                onReject={() => handleRejectLike(item.fromUser._id)}
              />
            ))}
          </div>
        )
      )}

      {/* Match celebration modal */}
      {activeMatch && (
        <MatchCelebration
          isOpen={!!activeMatch}
          onClose={() => setActiveMatch(null)}
          match={activeMatch}
          currentUser={user}
        />
      )}
    </div>
  );
};
