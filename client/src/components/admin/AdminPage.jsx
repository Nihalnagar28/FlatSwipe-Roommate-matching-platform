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
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="border-b border-[#E5E7E2] pb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#737B74]">Administration</span>
        <h1 className="text-2xl font-bold text-[#202622] tracking-tight mt-1">Platform Operations</h1>
        <p className="text-xs text-[#737B74] mt-1">System telemetry, user moderation, verification queues, and listing management</p>
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
