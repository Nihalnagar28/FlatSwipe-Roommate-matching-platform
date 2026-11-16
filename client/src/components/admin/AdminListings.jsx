import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

export const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getListings({ limit: 50 });
      if (res.data.success) {
        setListings(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerify = async (listingId) => {
    try {
      const res = await adminAPI.toggleListingVerification(listingId);
      if (res.data.success) {
        setListings((prev) =>
          prev.map((l) => (l._id === listingId ? res.data.data : l))
        );
      }
    } catch (err) {
      console.error('Toggle verify error:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-[#E5E7E2] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#202622]">Listings Moderation</h3>
          <p className="text-xs text-[#737B74] mt-0.5">{listings.length} properties submitted</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F8F5] text-[#737B74] font-semibold uppercase tracking-wider border-b border-[#E5E7E2]">
            <tr>
              <th className="py-3 px-4">Title & Area</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Rent</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Verified</th>
              <th className="py-3 px-4 text-right">Moderate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7E2]">
            {listings.map((l) => (
              <tr key={l._id} className="hover:bg-[#F8F8F5]/80 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-[#202622] block line-clamp-1">{l.title}</span>
                  <span className="text-[11px] text-[#737B74]">{l.location?.area}</span>
                </td>
                <td className="py-3.5 px-4 text-[#737B74]">{l.location?.city}</td>
                <td className="py-3.5 px-4 font-bold text-[#202622]">{formatCurrency(l.rent)}</td>
                <td className="py-3.5 px-4 text-[#737B74]">{l.owner?.fullName || '—'}</td>
                <td className="py-3.5 px-4">
                  {l.isVerified ? (
                    <span className="text-[#315C4C] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#315C4C]" /> Verified
                    </span>
                  ) : (
                    <span className="text-[#737B74]">Unverified</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Button
                    onClick={() => handleToggleVerify(l._id)}
                    variant={l.isVerified ? 'outline' : 'primary'}
                    size="sm"
                    className="text-xs py-1 px-2.5 h-auto"
                  >
                    {l.isVerified ? 'Unverify' : 'Mark Verified'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
