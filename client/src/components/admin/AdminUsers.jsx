import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { CheckCircle, XCircle } from 'lucide-react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getUsers({ limit: 50 });
      if (res.data.success) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = !user.isActive;
    try {
      const res = await adminAPI.updateUserStatus(user._id, { isActive: newStatus });
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, isActive: newStatus } : u))
        );
      }
    } catch (err) {
      console.error('Update user status error:', err);
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
        <h3 className="text-base font-bold text-slate-900">User Management ({users.length})</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Verified</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <Avatar src={u.profilePicture} name={u.fullName} size="sm" />
                  <div>
                    <span className="font-bold text-slate-900 block">{u.fullName}</span>
                    <span className="text-[11px] text-slate-400">{u.email}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{u.currentCity || '—'}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                    u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {u.verificationBadge ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Yes
                    </span>
                  ) : (
                    <span className="text-slate-400">No</span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                    u.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {u.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {u.role !== 'admin' && (
                    <Button
                      onClick={() => handleToggleStatus(u)}
                      variant={u.isActive ? 'secondary' : 'primary'}
                      size="sm"
                      className="text-xs"
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
