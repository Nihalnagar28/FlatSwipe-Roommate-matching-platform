import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { CheckCircle } from 'lucide-react';

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
    <div className="bg-white rounded-xl border border-[#E5E7E2] shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-[#E5E7E2] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#202622]">Registered Users</h3>
          <p className="text-xs text-[#737B74] mt-0.5">{users.length} accounts loaded</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F8F5] text-[#737B74] font-semibold uppercase tracking-wider border-b border-[#E5E7E2]">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Verified</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7E2]">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-[#F8F8F5]/80 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <Avatar src={u.profilePicture} name={u.fullName} size="sm" />
                  <div>
                    <span className="font-semibold text-[#202622] block">{u.fullName}</span>
                    <span className="text-[11px] text-[#737B74]">{u.email}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#737B74]">{u.currentCity || '—'}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${
                      u.role === 'admin'
                        ? 'bg-[#E8EAE3] text-[#315C4C]'
                        : 'bg-[#F8F8F5] text-[#737B74] border border-[#E5E7E2]'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {u.verificationBadge ? (
                    <span className="text-[#315C4C] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#315C4C]" /> Verified
                    </span>
                  ) : (
                    <span className="text-[#737B74]">Pending</span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      u.isActive
                        ? 'bg-[#E8EAE3] text-[#315C4C]'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {u.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {u.role !== 'admin' && (
                    <Button
                      onClick={() => handleToggleStatus(u)}
                      variant={u.isActive ? 'outline' : 'primary'}
                      size="sm"
                      className="text-xs py-1 px-2.5 h-auto"
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
