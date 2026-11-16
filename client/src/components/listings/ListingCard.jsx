import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Bookmark } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/helpers';
import { getListingFallback, handleImageError } from '../../utils/imageFallback';

export const ListingCard = ({ listing, onToggleSave, isSaved }) => {
  if (!listing) return null;

  return (
    <Card className="overflow-hidden flex flex-col justify-between" hover>
      <div>
        {/* Image Preview */}
        <div className="relative h-48 bg-[#E8EAE3]">
          <img
            src={listing.images?.[0]?.url || getListingFallback(listing.title)}
            alt={listing.title}
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'listing', listing.title)}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 bg-[#202622]/85 text-white font-extrabold text-sm px-2.5 py-1 rounded-lg shadow-sm">
            {formatCurrency(listing.rent)}
            <span className="text-[11px] font-normal text-white/70">/mo</span>
          </div>

          {listing.isVerified && (
            <div className="absolute top-3 left-3 bg-[#315C4C] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Flat
            </div>
          )}

          {onToggleSave && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSave(listing._id);
              }}
              className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-colors ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-[#202622] hover:bg-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#737B74]">
            <span className="capitalize font-semibold text-[#202622]">{listing.furnishingStatus || 'Furnished'}</span>
            <span>•</span>
            <span>{listing.availableRooms || 1} room available</span>
          </div>

          <h3 className="font-bold text-sm text-[#202622] line-clamp-1 hover:text-[#315C4C] transition-colors">
            <Link to={`/listings/${listing._id}`}>{listing.title}</Link>
          </h3>

          <p className="text-xs text-[#737B74] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#527565] shrink-0" />
            <span className="truncate">{listing.location?.area || listing.location?.city}</span>
          </p>

          {/* Key Amenities */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {listing.amenities?.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[10px] bg-[#E8EAE3] text-[#527565] px-2 py-0.5 rounded-md font-medium"
              >
                {a}
              </span>
            ))}
            {listing.amenities?.length > 3 && (
              <span className="text-[10px] text-[#737B74] self-center">
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link to={`/listings/${listing._id}`}>
          <button className="w-full py-2 px-3 text-xs font-semibold text-[#315C4C] bg-[#E8EAE3] hover:bg-[#dde0d9] rounded-lg transition-colors text-center block">
            View Property Details
          </button>
        </Link>
      </div>
    </Card>
  );
};
