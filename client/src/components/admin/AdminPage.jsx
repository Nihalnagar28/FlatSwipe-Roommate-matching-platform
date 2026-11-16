import React, { useState } from 'react';
import { LayoutDashboard, Users, Home, ShieldCheck } from 'lucide-react';
import { Tabs } from '../ui/Tabs';
import { AdminDashboard } from './AdminDashboard';
import { AdminUsers } from './AdminUsers';
import { AdminListings } from './AdminListings';
import { AdminVerifications } from './AdminVerifications';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Platform Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'listings', label: 'Listings Moderation', icon: Home },
    { id: 'verifications', label: 'ID Verifications', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Operations Panel</h1>
        <p className="text-xs text-slate-500 mt-1">Platform-wide statistics, user moderation, and safety verifications</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div>
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'listings' && <AdminListings />}
        {activeTab === 'verifications' && <AdminVerifications />}
      </div>
    </div>
  );
};
