import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  MessageSquare,
  Home,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userAPI, discoveryAPI, matchAPI, listingAPI } from '../../services/api';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';
import { getProfileFallback, getListingFallback, handleImageError } from '../../utils/imageFallback';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    profileCompletion: 85,
    matchCount: 0,
    unreadMessages: 0,
    likesReceived: 0,
  });
  const [recommended, setRecommended] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, discoverRes, listingsRes] = await Promise.all([
          userAPI.getDashboardStats(),
          discoveryAPI.getProfiles({ limit: 4 }),
          listingAPI.getListings({ limit: 3, city: user?.currentCity || '' }),
        ]);

        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
        if (discoverRes.data.success) {
          setRecommended(discoverRes.data.data || []);
        }
        if (listingsRes.data.success) {
          setRecentListings(listingsRes.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#202622] tracking-tight">
            {greeting()}, {user?.fullName?.split(' ')[0] || 'Friend'} 👋
          </h1>
          <p className="text-sm text-[#737B74] mt-1">
            We found compatible flatmates searching around {user?.currentCity || 'your city'}. Review your matches or start swiping!
          </p>
        </div>

        {/* Profile Completion Bar */}
        <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#737B74] uppercase tracking-wide">Profile Strength</span>
            <span className="text-xs font-bold text-[#315C4C]">{stats.profileCompletion || 85}%</span>
          </div>
          <div className="w-full bg-[#E8EAE3] rounded-full h-2">
            <div
              className="bg-[#315C4C] h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.profileCompletion || 85}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link to="/discover">
            <Button variant="primary" size="lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Discovering
            </Button>
          </Link>
          <Link to="/listings/new">
            <Button variant="secondary" size="lg">
              Post Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#E8EAE3] flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-[#315C4C]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#737B74] uppercase tracking-wide">Active Matches</p>
            <h3 className="text-2xl font-black text-[#202622]">{stats.matchCount}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#E8EAE3] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#315C4C]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#737B74] uppercase tracking-wide">New Likes</p>
            <h3 className="text-2xl font-black text-[#202622]">{stats.likesReceived}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#E8EAE3] flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-[#315C4C]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#737B74] uppercase tracking-wide">Unread Chats</p>
            <h3 className="text-2xl font-black text-[#202622]">{stats.unreadMessages}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#E8EAE3] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#315C4C]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#737B74] uppercase tracking-wide">ID Verification</p>
            <h3 className="text-sm font-bold text-[#202622] mt-1">
              {user?.verificationBadge ? (
                <span className="text-[#315C4C] flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              ) : (
                <Link to="/profile" className="text-[#315C4C] hover:underline">
                  Submit ID →
                </Link>
              )}
            </h3>
          </div>
        </div>
      </div>

      {/* Recommended Flatmates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#202622]">Highly Compatible Flatmates</h2>
            <p className="text-xs text-[#737B74]">Based on your sleep, cleanliness, and lifestyle preferences</p>
          </div>
          <Link to="/discover" className="text-xs font-bold text-[#315C4C] hover:text-[#264a3c] flex items-center gap-1">
            Open Discovery <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl p-8 text-center border border-[#E5E7E2]">
              <Sparkles className="w-8 h-8 text-[#315C4C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#202622]">All caught up for now!</p>
              <p className="text-xs text-[#737B74] mt-1">Check back later for new roommate profiles in {user?.currentCity}.</p>
            </div>
          ) : (
            recommended.map((item) => (
              <div key={item.user._id} className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.user.profilePicture || getProfileFallback(item.user.fullName)}
                      alt={item.user.fullName}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'profile', item.user.fullName)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#315C4C] text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
                      {item.compatibility?.score || 85}% Match
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="font-bold text-sm text-[#202622]">{item.user.fullName}</h4>
                    <span className="text-xs font-medium text-[#737B74]">{item.user.age}</span>
                  </div>

                  <p className="text-xs text-[#737B74] mb-2 truncate">
                    {item.user.occupation} • {item.user.currentCity}
                  </p>

                  <div className="flex flex-wrap gap-1 text-[10px] mb-3">
                    <span className="bg-[#E8EAE3] text-[#202622] px-2 py-0.5 rounded-md font-medium">
                      {item.user.chronotype || 'flexible'}
                    </span>
                    <span className="bg-[#E8EAE3] text-[#202622] px-2 py-0.5 rounded-md font-medium">
                      {item.user.cleanlinessLevel || 'clean'}
                    </span>
                    <span className="bg-[#E8EAE3] text-[#315C4C] px-2 py-0.5 rounded-md font-medium">
                      {formatCurrency(item.user.budgetMin)} - {formatCurrency(item.user.budgetMax)}
                    </span>
                  </div>
                </div>

                <Link to="/discover">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    View in Discovery
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Flats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#202622]">Verified Flats in {user?.currentCity || 'Your Area'}</h2>
            <p className="text-xs text-[#737B74]">Available rooms posted directly by roommates and owners</p>
          </div>
          <Link to="/listings" className="text-xs font-bold text-[#315C4C] hover:text-[#264a3c] flex items-center gap-1">
            Browse All Listings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentListings.map((listing) => (
            <div key={listing._id} className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-48 bg-[#E8EAE3]">
                  <img
                    src={listing.images?.[0]?.url || getListingFallback(listing.title)}
                    alt={listing.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, 'listing', listing.title)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 text-white font-extrabold text-sm px-3 py-1 rounded-xl">
                    {formatCurrency(listing.rent)}/mo
                  </div>
                  {listing.isVerified && (
                    <div className="absolute top-3 right-3 bg-[#315C4C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Flat
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm text-[#202622] line-clamp-1 mb-1">{listing.title}</h3>
                  <p className="text-xs text-[#737B74] flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#737B74]" />
                    {listing.location?.area || listing.location?.city}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {listing.amenities?.slice(0, 3).map((a) => (
                      <span key={a} className="text-[10px] bg-[#E8EAE3] text-[#202622] px-2 py-0.5 rounded-md">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <Link to={`/listings/${listing._id}`}>
                  <Button variant="secondary" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
