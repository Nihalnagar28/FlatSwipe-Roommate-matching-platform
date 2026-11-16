import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Bookmark, Home, Bed, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';

export const ListingCard = ({ listing, onToggleSave, isSaved }) => {
  if (!listing) return null;

  return (
    <Card className="overflow-hidden flex flex-col justify-between" hover>
      <div>
        {/* Image Preview */}
        <div className="relative h-48 bg-slate-100">
          <img
            src={
              listing.images?.[0]?.url ||
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600'
            }
            alt={listing.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-extrabold text-sm px-3 py-1 rounded-xl">
            {formatCurrency(listing.rent)}
            <span className="text-[11px] font-normal text-slate-300">/mo</span>
          </div>

          {listing.isVerified && (
            <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
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
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-colors ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="capitalize font-semibold text-slate-700">{listing.furnishingStatus || 'Furnished'}</span>
            <span>•</span>
            <span>{listing.availableRooms || 1} room available</span>
          </div>

          <h3 className="font-bold text-sm text-slate-900 line-clamp-1 hover:text-indigo-600 transition-colors">
            <Link to={`/listings/${listing._id}`}>{listing.title}</Link>
          </h3>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{listing.location?.area || listing.location?.city}</span>
          </p>

          {/* Key Amenities */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {listing.amenities?.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
              >
                {a}
              </span>
            ))}
            {listing.amenities?.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link to={`/listings/${listing._id}`}>
          <button className="w-full py-2 px-3 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors text-center block">
            View Property Details
          </button>
        </Link>
      </div>
    </Card>
  );
};
