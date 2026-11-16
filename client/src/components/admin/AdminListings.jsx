import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { ShieldCheck, MapPin } from 'lucide-react';
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
    <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Listings Moderation ({listings.length})</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">Title & Area</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Rent</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Verified</th>
              <th className="py-3 px-4 text-right">Moderate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.map((l) => (
              <tr key={l._id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-bold text-slate-900 block line-clamp-1">{l.title}</span>
                  <span className="text-[11px] text-slate-400">{l.location?.area}</span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{l.location?.city}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{formatCurrency(l.rent)}</td>
                <td className="py-3.5 px-4 text-slate-600">{l.owner?.fullName || '—'}</td>
                <td className="py-3.5 px-4">
                  {l.isVerified ? (
                    <span className="text-indigo-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="text-slate-400">Unverified</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Button
                    onClick={() => handleToggleVerify(l._id)}
                    variant={l.isVerified ? 'secondary' : 'primary'}
                    size="sm"
                    className="text-xs"
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
