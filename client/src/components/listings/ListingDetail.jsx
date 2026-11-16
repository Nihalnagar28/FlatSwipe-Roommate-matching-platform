import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Bookmark,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { listingAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Spinner } from '../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { getListingFallback, handleImageError } from '../../utils/imageFallback';

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
        <h2 className="text-xl font-bold text-[#202622]">Listing not found</h2>
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
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#737B74] hover:text-[#202622] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>
      </div>

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="relative h-80 sm:h-96 md:h-[420px] rounded-xl overflow-hidden bg-[#202622] shadow-sm">
          <img
            src={images[activeImageIndex]?.url || getListingFallback(listing.title)}
            alt={listing.title}
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'listing', listing.title)}
            className="w-full h-full object-cover"
          />

          {listing.isVerified && (
            <div className="absolute top-4 left-4 bg-[#315C4C] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Verified Flat Listing
            </div>
          )}

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleToggleSave}
              className={`p-2.5 rounded-full shadow-sm transition-colors ${
                isSaved ? 'bg-rose-500 text-white' : 'bg-white/90 text-[#202622] hover:bg-white'
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
                src={img.url || getListingFallback(listing.title)}
                alt="thumb"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'listing', listing.title)}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-16 rounded-lg object-cover cursor-pointer transition-all border-2 ${
                  activeImageIndex === idx ? 'border-[#315C4C]' : 'border-transparent opacity-70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Details and Sidebar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Details, Amenities, Rules */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#315C4C] uppercase tracking-wide mb-1.5">
              <span className="capitalize">{listing.propertyType}</span>
              <span>•</span>
              <span className="capitalize">{listing.furnishingStatus}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#202622] tracking-tight mb-2">
              {listing.title}
            </h1>

            <p className="text-sm text-[#737B74] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#527565]" />
              {listing.location?.address
                ? `${listing.location.address}, `
                : ''}
              {listing.location?.area}, {listing.location?.city}
            </p>
          </div>

          {/* Quick Stat Blocks */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white border border-[#E5E7E2] shadow-sm">
            <div>
              <span className="text-[11px] font-semibold text-[#737B74] block mb-0.5">Monthly Rent</span>
              <span className="text-base sm:text-lg font-bold text-[#202622]">
                {formatCurrency(listing.rent)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#737B74] block mb-0.5">Security Deposit</span>
              <span className="text-base sm:text-lg font-bold text-[#202622]">
                {formatCurrency(listing.securityDeposit || listing.rent * 2)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#737B74] block mb-0.5">Available From</span>
              <span className="text-base sm:text-lg font-bold text-[#202622]">
                {listing.availableFrom
                  ? new Date(listing.availableFrom).toLocaleDateString([], { month: 'short', day: 'numeric' })
                  : 'Immediately'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#202622]">About the flat & room</h3>
            <p className="text-sm text-[#737B74] leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-[#E5E7E2]">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#202622]">Society & Flat Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {listing.amenities.map((a) => (
                  <div
                    key={a}
                    className="p-3 rounded-lg bg-white border border-[#E5E7E2] flex items-center gap-2 text-xs font-semibold text-[#202622]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#315C4C]" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* House Rules */}
          {listing.houseRules && listing.houseRules.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#202622]">House Rules</h3>
              <ul className="space-y-2 text-xs text-[#737B74] bg-white p-4 rounded-xl border border-[#E5E7E2]">
                {listing.houseRules.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#315C4C] mt-1.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Owner card and contact CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5E7E2] shadow-sm space-y-6 sticky top-24">
            <div className="flex items-baseline justify-between border-b border-[#E5E7E2] pb-4">
              <div>
                <span className="text-2xl font-bold text-[#202622]">{formatCurrency(listing.rent)}</span>
                <span className="text-xs text-[#737B74]"> / month</span>
              </div>
              <span className="text-xs font-semibold text-[#315C4C] bg-[#E8EAE3] px-2.5 py-0.5 rounded-md">
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
                  <span className="text-[11px] font-semibold text-[#737B74] uppercase tracking-wide block">
                    Posted By
                  </span>
                  <h4 className="font-bold text-sm text-[#202622]">{listing.owner.fullName}</h4>
                  <p className="text-xs text-[#737B74]">Verified Resident / Owner</p>
                </div>
              </div>
            )}

            <div className="space-y-2.5">
              <Link to="/discover" className="block">
                <Button variant="primary" size="lg" className="w-full">
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

            <p className="text-[11px] text-[#737B74] text-center leading-normal">
              FlatSwipe verifies all landlord and roommate listings to eliminate scams and duplicate broker postings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
