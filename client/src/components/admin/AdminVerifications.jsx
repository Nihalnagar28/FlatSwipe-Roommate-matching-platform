import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { Avatar } from '../ui/Avatar';
import { Check, X, ShieldCheck, FileText } from 'lucide-react';

export const AdminVerifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getVerifications();
      if (res.data.success) {
        setVerifications(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching verifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await adminAPI.approveVerification(id);
      if (res.data.success) {
        setVerifications((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status: 'approved' } : v))
        );
      }
    } catch (err) {
      console.error('Approve error:', err);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Please provide reason for rejection:', 'Document unreadable');
    if (!reason) return;

    try {
      const res = await adminAPI.rejectVerification(id, { reason });
      if (res.data.success) {
        setVerifications((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status: 'rejected', rejectionReason: reason } : v))
        );
      }
    } catch (err) {
      console.error('Reject error:', err);
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
        <h3 className="text-base font-bold text-slate-900">
          Government ID Verification Cases ({verifications.length})
        </h3>
      </div>

      {verifications.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400">
          No verification requests submitted yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verifications.map((v) => (
                <tr key={v._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <Avatar src={v.user?.profilePicture} name={v.user?.fullName} size="sm" />
                    <div>
                      <span className="font-bold text-slate-900 block">{v.user?.fullName}</span>
                      <span className="text-[11px] text-slate-400">{v.user?.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize font-medium text-slate-700">
                    {v.type?.replace('-', ' ')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                        v.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {v.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleReject(v._id)}
                          variant="secondary"
                          size="sm"
                          className="text-xs text-rose-600 hover:bg-rose-50"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApprove(v._id)}
                          variant="primary"
                          size="sm"
                          className="text-xs"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Approve ID
                        </Button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
