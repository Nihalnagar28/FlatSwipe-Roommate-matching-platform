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
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your password, notifications, and privacy</p>
      </div>

      {/* Change Password */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Change Password</h2>
        </div>

        {pwdMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{pwdMsg}</span>
          </div>
        )}

        {pwdError && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
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
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Eye className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Privacy & Visibility</h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="font-bold text-slate-800">Show My Profile in Discovery</p>
              <p className="text-slate-400">Allow other flatmate seekers in your city to find and like your profile</p>
            </div>
            <input
              type="checkbox"
              checked={discoveryVisible}
              onChange={(e) => setDiscoveryVisible(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="font-bold text-slate-800">Email Notifications</p>
              <p className="text-slate-400">Receive alerts when someone likes you or messages you</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Account Actions / Logout */}
      <Card className="p-6 sm:p-8 space-y-4 border-rose-100 bg-rose-50/20">
        <h2 className="text-base font-bold text-slate-900">Session & Danger Zone</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Log out from this browser session or temporarily hide your account while you take a break from flat hunting.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={handleLogout} variant="secondary" className="text-rose-600 border-rose-200">
            <LogOut className="w-4 h-4 mr-1.5" />
            Log Out
          </Button>
        </div>
      </Card>
    </div>
  );
};
