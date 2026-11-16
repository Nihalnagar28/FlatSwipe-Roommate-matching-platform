import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { Avatar } from '../ui/Avatar';
import { Check, X, ShieldCheck } from 'lucide-react';

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
    <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-[#E5E7E2] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#202622]">Government ID Verification Queue</h3>
          <p className="text-xs text-[#737B74] mt-0.5">{verifications.length} submissions pending review</p>
        </div>
      </div>

      {verifications.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#737B74]">
          No verification requests submitted yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F5] text-[#737B74] font-semibold uppercase tracking-wider border-b border-[#E5E7E2]">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7E2]">
              {verifications.map((v) => (
                <tr key={v._id} className="hover:bg-[#F8F8F5]/80 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <Avatar src={v.user?.profilePicture} name={v.user?.fullName} size="sm" />
                    <div>
                      <span className="font-semibold text-[#202622] block">{v.user?.fullName}</span>
                      <span className="text-[11px] text-[#737B74]">{v.user?.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize font-medium text-[#202622]">
                    {v.type?.replace('-', ' ')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        v.status === 'approved'
                          ? 'bg-[#E8EAE3] text-[#315C4C]'
                          : v.status === 'pending'
                          ? 'bg-[#D9A16A]/15 text-[#9A622A]'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#737B74]">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {v.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleReject(v._id)}
                          variant="outline"
                          size="sm"
                          className="text-xs text-rose-700 border-rose-200 hover:bg-rose-50 py-1 px-2.5 h-auto"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApprove(v._id)}
                          variant="primary"
                          size="sm"
                          className="text-xs py-1 px-2.5 h-auto"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Approve ID
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[#737B74] text-xs">Reviewed</span>
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
