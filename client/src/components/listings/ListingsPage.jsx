import React, { useState, useEffect } from 'react';
import { Home, Plus, Search, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listingAPI } from '../../services/api';
import { ListingCard } from './ListingCard';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

export const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [furnishingFilter, setFurnishingFilter] = useState('');
  const [maxRent, setMaxRent] = useState('');

  useEffect(() => {
    fetchListings();
  }, [cityFilter, furnishingFilter, maxRent]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = {};
      if (cityFilter) params.city = cityFilter;
      if (furnishingFilter) params.furnishingStatus = furnishingFilter;
      if (maxRent) params.maxRent = maxRent;

      const res = await listingAPI.getListings(params);
      if (res.data.success) {
        setListings(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter((l) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      l.title?.toLowerCase().includes(term) ||
      l.location?.city?.toLowerCase().includes(term) ||
      l.location?.area?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#202622] tracking-tight flex items-center gap-2">
            <Home className="w-6 h-6 text-[#315C4C]" />
            Verified Flats & Rooms
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Browse verified available rooms posted directly by roommates and verified owners
          </p>
        </div>

        <Link to="/listings/new">
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            Post Available Room
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl shadow-sm border border-[#E5E7E2] flex flex-wrap gap-3 items-center">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#737B74] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by area, society, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] text-[#202622] placeholder:text-[#9EA397] focus:bg-white focus:border-[#315C4C] focus:outline-none transition-colors"
          />
        </div>

        {/* City Filter */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="text-xs py-2 px-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] font-medium text-[#202622] focus:border-[#315C4C] focus:outline-none"
        >
          <option value="">All Cities</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi NCR">Delhi NCR</option>
          <option value="Pune">Pune</option>
        </select>

        {/* Furnishing Filter */}
        <select
          value={furnishingFilter}
          onChange={(e) => setFurnishingFilter(e.target.value)}
          className="text-xs py-2 px-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] font-medium text-[#202622] focus:border-[#315C4C] focus:outline-none"
        >
          <option value="">All Furnishing</option>
          <option value="furnished">Furnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>

        {/* Max Budget Filter */}
        <select
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="text-xs py-2 px-3 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] font-medium text-[#202622] focus:border-[#315C4C] focus:outline-none"
        >
          <option value="">Any Budget</option>
          <option value="15000">Under ₹15,000</option>
          <option value="25000">Under ₹25,000</option>
          <option value="35000">Under ₹35,000</option>
          <option value="50000">Under ₹50,000</option>
        </select>

        {(cityFilter || furnishingFilter || maxRent || searchTerm) && (
          <button
            onClick={() => {
              setCityFilter('');
              setFurnishingFilter('');
              setMaxRent('');
              setSearchTerm('');
            }}
            className="text-xs text-[#C0392B] hover:underline px-2 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="py-24 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-[#E5E7E2] max-w-md mx-auto shadow-sm">
          <Home className="w-10 h-10 text-[#C8CBBC] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#202622]">No listings match your criteria</h3>
          <p className="text-xs text-[#737B74] mt-1 mb-4">Try relaxing your filters or check other cities.</p>
          <Button onClick={fetchListings} variant="secondary" size="sm">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Reset & Refresh
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
