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

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 overflow-hidden shadow-card">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Lifestyle-Based Matching Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {user?.fullName?.split(' ')[0] || 'Friend'}! 👋
            </h1>
            <p className="text-sm text-indigo-200 max-w-xl">
              We found compatible flatmates searching around {user?.currentCity || 'your city'}. Review your matches or start swiping!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/discover">
              <Button variant="primary" size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold shadow-lg shadow-black/10">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Discovering
              </Button>
            </Link>
            <Link to="/listings/new">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Post Room
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 text-indigo-600 fill-indigo-100" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Matches</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.matchCount}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Likes</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.likesReceived}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <MessageSquare className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unread Chats</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.unreadMessages}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ID Verification</p>
            <h3 className="text-sm font-bold text-slate-900 mt-1">
              {user?.verificationBadge ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Verified
                </span>
              ) : (
                <Link to="/profile" className="text-indigo-600 hover:underline">
                  Submit ID →
                </Link>
              )}
            </h3>
          </div>
        </Card>
      </div>

      {/* Recommended Flatmates Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Highly Compatible Flatmates</h2>
            <p className="text-xs text-slate-500">Based on your sleep, cleanliness, and lifestyle preferences</p>
          </div>
          <Link to="/discover" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Open Discovery <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl p-8 text-center border border-slate-100">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">All caught up for now!</p>
              <p className="text-xs text-slate-400 mt-1">Check back later for new roommate profiles in {user?.currentCity}.</p>
            </div>
          ) : (
            recommended.map((item) => (
              <Card key={item.user._id} className="p-4 flex flex-col justify-between" hover>
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.user.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                      alt={item.user.fullName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
                      {item.compatibility?.score || 85}% Match
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="font-bold text-sm text-slate-900">{item.user.fullName}</h4>
                    <span className="text-xs font-medium text-slate-500">{item.user.age}</span>
                  </div>

                  <p className="text-xs text-slate-500 mb-2 truncate">
                    {item.user.occupation} • {item.user.currentCity}
                  </p>

                  <div className="flex flex-wrap gap-1 text-[10px] mb-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {item.user.chronotype || 'flexible'}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {item.user.cleanlinessLevel || 'clean'}
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">
                      {formatCurrency(item.user.budgetMin)} - {formatCurrency(item.user.budgetMax)}
                    </span>
                  </div>
                </div>

                <Link to="/discover">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    View in Discovery
                  </Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Available Flats in your city */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Verified Flats in {user?.currentCity || 'Your Area'}</h2>
            <p className="text-xs text-slate-500">Available rooms posted directly by roommates and owners</p>
          </div>
          <Link to="/listings" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Browse All Listings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentListings.map((listing) => (
            <Card key={listing._id} className="overflow-hidden flex flex-col justify-between" hover>
              <div>
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={listing.images?.[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600'}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-extrabold text-sm px-3 py-1 rounded-xl">
                    {formatCurrency(listing.rent)}/mo
                  </div>
                  {listing.isVerified && (
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Flat
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">{listing.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {listing.location?.area || listing.location?.city}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {listing.amenities?.slice(0, 3).map((a) => (
                      <span key={a} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
