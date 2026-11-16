import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Heart, MessageSquare, Home, User, Settings, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user, isAdmin } = useAuth();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/discover', label: 'Discover', icon: Sparkles },
    { to: '/matches', label: 'Matches', icon: Heart },
    { to: '/messages', label: 'Messages', icon: MessageSquare },
    { to: '/listings', label: 'Listings', icon: Home },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  if (isAdmin) {
    links.push({ to: '/admin', label: 'Admin', icon: ShieldCheck });
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {user && (
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-900">Profile Completion</span>
            <span className="text-xs font-bold text-indigo-600">
              {user.profileCompletionPercentage || 0}%
            </span>
          </div>
          <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${user.profileCompletionPercentage || 0}%` }}
            />
          </div>
          {user.profileCompletionPercentage < 100 && (
            <NavLink
              to="/profile"
              className="mt-3 block text-center text-xs font-semibold text-indigo-700 hover:text-indigo-800 hover:underline"
            >
              Complete Profile →
            </NavLink>
          )}
        </div>
      )}
    </aside>
  );
};
