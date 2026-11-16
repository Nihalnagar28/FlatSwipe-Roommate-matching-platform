import React, { useState, useEffect } from 'react';
import {
  Users,
  Heart,
  MessageSquare,
  Home,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
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
    { label: 'Total Registered Users', val: stats?.totalUsers || 0, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Mutual Matches Created', val: stats?.totalMatches || 0, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Chat Messages Sent', val: stats?.totalMessages || 0, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Flat & Room Listings', val: stats?.totalListings || 0, icon: Home, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Pending Verifications', val: stats?.pendingVerifications || 0, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Reported Flags', val: stats?.pendingReports || 0, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center font-bold`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{s.val}</h3>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-soft">
        <h3 className="text-base font-bold text-slate-900 mb-2">Platform Health & Moderation</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          FlatMate system is operating normally. All Socket.io real-time chat clusters and Mongoose replica sets are active. Review pending verification cases or moderate room listings using the tabs above.
        </p>
      </div>
    </div>
  );
};
