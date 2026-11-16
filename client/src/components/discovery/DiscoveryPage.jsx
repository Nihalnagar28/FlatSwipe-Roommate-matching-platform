import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, SlidersHorizontal, Heart, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { discoveryAPI, likeAPI } from '../../services/api';
import { ProfileCard } from './ProfileCard';
import { FullProfileModal } from './FullProfileModal';
import { MatchCelebration } from './MatchCelebration';
import { Spinner } from '../ui/Spinner';
import { Button } from '../ui/Button';

export const DiscoveryPage = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeMatch, setActiveMatch] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await discoveryAPI.getProfiles({ limit: 20 });
      if (res.data.success) {
        setProfiles(res.data.data || []);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error('Error fetching discovery candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentProfile = profiles[currentIndex];

  const handleLike = async () => {
    if (!currentProfile) return;
    try {
      const res = await likeAPI.likeUser(currentProfile.user._id, 'like');
      if (res.data.data?.isMatch) {
        setActiveMatch(res.data.data.match);
      }
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Like error:', err);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePass = async () => {
    if (!currentProfile) return;
    try {
      await likeAPI.passUser(currentProfile.user._id);
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Pass error:', err);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSuperLike = async () => {
    if (!currentProfile) return;
    try {
      const res = await likeAPI.likeUser(currentProfile.user._id, 'super-like');
      if (res.data.data?.isMatch) {
        setActiveMatch(res.data.data.match);
      }
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Super-like error:', err);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      {/* Top Discover Bar */}
      <div className="w-full flex items-center justify-between mb-6 px-2">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Discover Flatmates
          </h1>
          <p className="text-xs text-slate-500">
            {profiles.length > 0 && currentIndex < profiles.length
              ? `Profile ${currentIndex + 1} of ${profiles.length}`
              : 'Lifestyle matching'}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchProfiles}
          className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-white border border-slate-200 transition-colors"
          title="Refresh Profiles"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Swiping Card Area */}
      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <Spinner size="lg" />
          <p className="text-xs text-slate-500 font-medium">Calculating lifestyle scores...</p>
        </div>
      ) : currentProfile ? (
        <div className="relative w-full flex justify-center">
          {/* Card beneath to create depth */}
          {currentIndex + 1 < profiles.length && (
            <div className="absolute top-3 w-full max-w-sm sm:max-w-md h-full bg-slate-200/60 rounded-3xl scale-95 pointer-events-none -z-10" />
          )}

          <ProfileCard
            candidate={currentProfile.user}
            compatibility={currentProfile.compatibility}
            onLike={handleLike}
            onPass={handlePass}
            onSuperLike={handleSuperLike}
            onViewDetails={() => setSelectedCandidate(currentProfile)}
          />
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-card border border-slate-100 max-w-md w-full">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">You've explored everyone for now!</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            There are no more new profiles matching your current filters in {user?.currentCity || 'your city'}.
            Check back soon or expand your budget range in settings.
          </p>
          <Button onClick={fetchProfiles} variant="primary" className="mx-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Check For New People
          </Button>
        </div>
      )}

      {/* Full Profile Modal */}
      {selectedCandidate && (
        <FullProfileModal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          candidate={selectedCandidate.user}
          compatibility={selectedCandidate.compatibility}
        />
      )}

      {/* Mutual Match Celebration Modal */}
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
