import React, { useState, useEffect } from 'react';
import {
  Users,
  Heart,
  MessageSquare,
  Home,
  ShieldCheck,
  AlertTriangle,
  Activity,
  CheckCircle,
} from 'lucide-react';
import { adminAPI } from '../../services/api';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await adminAPI.getDashboardStats();
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Registered Users', val: stats?.totalUsers || 0, icon: Users, color: 'text-[#315C4C]', bg: 'bg-[#E8EAE3]' },
    { label: 'Mutual Matches Created', val: stats?.totalMatches || 0, icon: Heart, color: 'text-[#D9A16A]', bg: 'bg-[#D9A16A]/10' },
    { label: 'Chat Messages Sent', val: stats?.totalMessages || 0, icon: MessageSquare, color: 'text-[#315C4C]', bg: 'bg-[#E8EAE3]' },
    { label: 'Flat & Room Listings', val: stats?.totalListings || 0, icon: Home, color: 'text-[#527565]', bg: 'bg-[#527565]/10' },
    { label: 'Pending Verifications', val: stats?.pendingVerifications || 0, icon: ShieldCheck, color: 'text-[#D9A16A]', bg: 'bg-[#D9A16A]/15' },
    { label: 'Reported Flags', val: stats?.pendingReports || 0, icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-[#E5E7E2] p-5 shadow-sm hover:border-[#315C4C]/40 transition-all flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-lg ${s.bg} ${s.color} flex items-center justify-center font-bold flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#737B74] uppercase tracking-wider truncate">{s.label}</p>
                <h3 className="text-2xl font-bold text-[#202622] tracking-tight mt-0.5">{s.val}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-xl bg-white border border-[#E5E7E2] shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-[#315C4C]" />
          <h3 className="text-sm font-bold text-[#202622]">Platform Operations & Health</h3>
        </div>
        <p className="text-xs text-[#737B74] leading-relaxed">
          FlatSwipe systems are operational. Active Socket.io real-time connection pools, match calculation engines, and database clusters are responsive. Manage pending user verification requests or moderate property listings using the navigation above.
        </p>
      </div>
    </div>
  );
};
