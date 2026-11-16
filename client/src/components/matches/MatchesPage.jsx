import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, MessageSquare, Coffee, Trash2, CheckCircle, Sparkles, MapPin } from 'lucide-react';
import { matchAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { formatCurrency, formatRelativeTime } from '../../utils/helpers';
import { FullProfileModal } from '../discovery/FullProfileModal';

export const MatchesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await matchAPI.getMatches();
      if (res.data.success) {
        setMatches(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnmatch = async (matchId) => {
    if (!window.confirm('Are you sure you want to unmatch? This conversation will be permanently closed.')) {
      return;
    }
    try {
      await matchAPI.unmatch(matchId);
      setMatches((prev) => prev.filter((m) => m._id !== matchId));
    } catch (err) {
      console.error('Unmatch error:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-100" />
            Mutual Matches
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            People who mutually liked your profile. You can message each other directly!
          </p>
        </div>

        <Link to="/discover">
          <Button variant="primary" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Find More
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-24 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 max-w-md mx-auto shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">No mutual matches yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            When you and someone else both swipe right, your match will appear here so you can chat and plan a meetup.
          </p>
          <Link to="/discover">
            <Button variant="gradient" size="lg" className="mx-auto">
              Start Swiping in Discovery
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => {
            const partner = match.users?.find((u) => u._id !== user?._id) || match.users?.[0];
            if (!partner) return null;

            return (
              <Card key={match._id} className="p-5 flex flex-col justify-between" hover>
                <div>
                  {/* Top user row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={partner.profilePicture}
                        name={partner.fullName}
                        size="lg"
                        isOnline={partner.isOnline}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-base text-slate-900">{partner.fullName}</h3>
                          <span className="text-xs font-semibold text-slate-500">{partner.age}</span>
                        </div>
                        <p className="text-xs text-slate-500">{partner.occupation}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {partner.currentCity}
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2.5 py-1 rounded-xl border border-emerald-200 shrink-0">
                      {match.compatibilityScore || 88}% Match
                    </div>
                  </div>

                  {/* Last message preview */}
                  <div className="p-3 rounded-2xl bg-slate-50 text-xs mb-4">
                    <span className="text-slate-400 font-medium block mb-0.5">Last Message</span>
                    <p className="text-slate-700 line-clamp-1 italic">
                      {match.lastMessage?.content || 'Say hello and introduce yourself!'}
                    </p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/messages?match=${match._id}`)}
                      variant="primary"
                      size="sm"
                      className="text-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1" />
                      Chat
                    </Button>

                    <Button
                      onClick={() => navigate(`/meetup/${match._id}`)}
                      variant="secondary"
                      size="sm"
                      className="text-xs text-indigo-700"
                    >
                      <Coffee className="w-3.5 h-3.5 mr-1" />
                      Meetup
                    </Button>
                  </div>

                  <button
                    onClick={() => handleUnmatch(match._id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Unmatch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
