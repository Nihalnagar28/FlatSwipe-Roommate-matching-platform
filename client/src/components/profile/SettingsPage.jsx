import React, { useState } from 'react';
import { Lock, Bell, Eye, Shield, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [discoveryVisible, setDiscoveryVisible] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdMsg('');
    setPwdError('');

    if (newPassword !== confirmNewPassword) {
      setPwdError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPwdError('Password must be at least 6 characters');
      return;
    }

    setPwdLoading(true);
    try {
      await authAPI.updatePassword({ currentPassword, newPassword });
      setPwdMsg('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPwdMsg(''), 3000);
    } catch (err) {
      setPwdError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setPwdLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#202622] tracking-tight">Account Settings</h1>
        <p className="text-xs text-[#737B74] mt-1">Manage your password, notifications, and profile visibility</p>
      </div>

      {/* Change Password */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#E5E7E2]">
          <Lock className="w-5 h-5 text-[#315C4C]" />
          <h2 className="text-sm font-bold text-[#202622] uppercase tracking-wide">Change Password</h2>
        </div>

        {pwdMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{pwdMsg}</span>
          </div>
        )}

        {pwdError && (
          <div className="p-3 rounded-lg bg-red-50 text-[#C0392B] text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C0392B]" />
            <span>{pwdError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" loading={pwdLoading}>
            Update Password
          </Button>
        </form>
      </Card>

      {/* Privacy & Discovery Settings */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#E5E7E2]">
          <Eye className="w-5 h-5 text-[#315C4C]" />
          <h2 className="text-sm font-bold text-[#202622] uppercase tracking-wide">Privacy & Visibility</h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
            <div>
              <p className="font-semibold text-[#202622]">Show Profile in Discovery</p>
              <p className="text-[#737B74] mt-0.5">Allow other flatmate seekers in your city to find and like your profile</p>
            </div>
            <input
              type="checkbox"
              checked={discoveryVisible}
              onChange={(e) => setDiscoveryVisible(e.target.checked)}
              className="w-4 h-4 rounded text-[#315C4C] focus:ring-[#315C4C] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2]">
            <div>
              <p className="font-semibold text-[#202622]">Email Notifications</p>
              <p className="text-[#737B74] mt-0.5">Receive alerts when someone likes you or messages you</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 rounded text-[#315C4C] focus:ring-[#315C4C] cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Account Actions / Logout */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold text-[#202622] uppercase tracking-wide">Session Management</h2>
        <p className="text-xs text-[#737B74] leading-relaxed">
          Log out from this active session or return to login screen.
        </p>

        <div className="pt-2">
          <Button onClick={handleLogout} variant="secondary" className="text-[#C0392B] border-red-200 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-1.5" />
            Log Out of Account
          </Button>
        </div>
      </Card>
    </div>
  );
};
