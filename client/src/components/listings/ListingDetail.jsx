import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Bookmark,
  Share2,
  Calendar,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Home,
  MessageSquare,
} from 'lucide-react';
import { listingAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Spinner } from '../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';

export const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    setLoading(true);
    try {
      const res = await listingAPI.getListing(id);
      if (res.data.success) {
        setListing(res.data.data);
        if (user && res.data.data.savedBy?.includes(user._id)) {
          setIsSaved(true);
        }
      }
    } catch (err) {
      console.error('Error fetching listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = async () => {
    try {
      const res = await listingAPI.saveListing(id);
      if (res.data.success) {
        setIsSaved(res.data.data.saved);
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Listing not found</h2>
        <Link to="/listings">
          <Button variant="secondary">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const images =
    listing.images && listing.images.length > 0
      ? listing.images
      : [{ url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' }];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>
      </div>

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="relative h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden bg-slate-900 shadow-card">
          <img
            src={images[activeImageIndex]?.url}
            alt={listing.title}
            className="w-full h-full object-cover"
          />

          {listing.isVerified && (
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Verified Flat Listing
            </div>
          )}

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleToggleSave}
              className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-colors ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-800 hover:bg-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Thumbnail row if multiple images */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt="thumb"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-16 rounded-xl object-cover cursor-pointer transition-all border-2 ${
                  activeImageIndex === idx ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Details and Sidebar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Details, Amenities, Rules */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
              <span className="capitalize">{listing.propertyType}</span>
              <span>•</span>
              <span className="capitalize">{listing.furnishingStatus}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {listing.title}
            </h1>

            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {listing.location?.address
                ? `${listing.location.address}, `
                : ''}
              {listing.location?.area}, {listing.location?.city}
            </p>
          </div>

          {/* Quick Stat Blocks */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-soft">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Monthly Rent</span>
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatCurrency(listing.rent)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Security Deposit</span>
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatCurrency(listing.securityDeposit || listing.rent * 2)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Available From</span>
              <span className="text-base sm:text-lg font-black text-slate-900">
                {listing.availableFrom
                  ? new Date(listing.availableFrom).toLocaleDateString([], { month: 'short', day: 'numeric' })
                  : 'Immediately'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">About the flat & room</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">Society & Flat Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {listing.amenities.map((a) => (
                  <div
                    key={a}
                    className="p-3 rounded-xl bg-white border border-slate-100 shadow-xs flex items-center gap-2 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* House Rules */}
          {listing.houseRules && listing.houseRules.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">House Rules</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {listing.houseRules.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Owner card and contact CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-6 sticky top-24">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-2xl font-black text-slate-900">{formatCurrency(listing.rent)}</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Available
              </span>
            </div>

            {/* Owner Snippet */}
            {listing.owner && (
              <div className="flex items-center gap-3">
                <Avatar
                  src={listing.owner.profilePicture}
                  name={listing.owner.fullName}
                  size="lg"
                />
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Posted By
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{listing.owner.fullName}</h4>
                  <p className="text-xs text-slate-500">Verified Resident / Owner</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Link to="/discover" className="block">
                <Button variant="gradient" size="lg" className="w-full font-bold">
                  Find Roommate & Apply
                </Button>
              </Link>
              <Button
                onClick={handleToggleSave}
                variant="secondary"
                size="md"
                className="w-full"
              >
                <Bookmark className="w-4 h-4 mr-1.5" />
                {isSaved ? 'Saved in My Flats' : 'Save Property'}
              </Button>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-normal">
              FlatMate verifies all landlord and roommate listings to eliminate scams and duplicate broker postings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
