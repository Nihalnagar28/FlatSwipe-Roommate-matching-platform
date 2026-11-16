import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
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

  // Keyboard navigation for swipe actions
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is in modal or typing
      if (selectedCandidate || activeMatch) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleLike();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePass();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleSuperLike();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProfile, selectedCandidate, activeMatch]);

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

  const handleResetSwipes = async () => {
    setLoading(true);
    try {
      await likeAPI.resetLikes(true);
      await fetchProfiles();
    } catch (err) {
      console.error('Reset error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      {/* Top Discover Bar */}
      <div className="w-full flex items-center justify-between mb-6 px-2">
        <div>
          <h1 className="text-xl font-bold text-[#202622] tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#315C4C]" />
            Discover Flatmates
          </h1>
          <p className="text-xs text-[#737B74]">
            {profiles.length > 0 && currentIndex < profiles.length
              ? `Profile ${currentIndex + 1} of ${profiles.length} available`
              : 'Weighted lifestyle matching'}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchProfiles}
          className="p-2 rounded-lg text-[#737B74] hover:text-[#202622] hover:bg-[#E8EAE3] border border-[#E5E7E2] transition-colors"
          title="Refresh Profiles"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Swiping Card Area */}
      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <Spinner size="lg" />
          <p className="text-xs text-[#737B74] font-medium">Calculating lifestyle compatibility scores...</p>
        </div>
      ) : currentProfile ? (
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Subtle card layer beneath to create depth */}
          {currentIndex + 1 < profiles.length && (
            <div className="absolute top-2.5 w-full max-w-sm sm:max-w-md h-[480px] bg-[#E8EAE3] rounded-xl scale-[0.97] pointer-events-none -z-10 border border-[#E5E7E2]" />
          )}

          <ProfileCard
            candidate={currentProfile.user}
            compatibility={currentProfile.compatibility}
            onLike={handleLike}
            onPass={handlePass}
            onSuperLike={handleSuperLike}
            onViewDetails={() => setSelectedCandidate(currentProfile)}
          />

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#737B74] mt-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7E2] rounded text-[10px] font-mono shadow-xs text-[#202622]">←</kbd> to Pass</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7E2] rounded text-[10px] font-mono shadow-xs text-[#202622]">→</kbd> to Like</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-[#E5E7E2] rounded text-[10px] font-mono shadow-xs text-[#202622]">↑</kbd> to Super Like</span>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-sm border border-[#E5E7E2] max-w-md w-full">
          <div className="w-14 h-14 rounded-xl bg-[#E8EAE3] text-[#315C4C] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#202622] mb-1.5">You've explored everyone for now!</h3>
          <p className="text-xs text-[#737B74] leading-relaxed mb-6">
            There are no more new profiles matching your current filters in {user?.currentCity || 'your city'}.
            Check back soon or adjust your budget range in profile settings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={fetchProfiles} variant="primary" className="w-full sm:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Check For New People
            </Button>
            <Button onClick={handleResetSwipes} variant="secondary" className="w-full sm:w-auto border border-[#E5E7E2]">
              Reset Swipes & Explore Again
            </Button>
          </div>
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
