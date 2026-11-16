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
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#E5E7E2] p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E8EAE3] text-[#315C4C] font-semibold'
                    : 'text-[#737B74] hover:text-[#202622] hover:bg-[#F8F8F5]'
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
        <div className="mt-auto p-4 rounded-xl bg-[#F8F8F5] border border-[#E5E7E2]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#202622]">Profile Completion</span>
            <span className="text-xs font-bold text-[#315C4C]">
              {user.profileCompletionPercentage || 0}%
            </span>
          </div>
          <div className="w-full bg-[#E5E7E2] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#315C4C] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${user.profileCompletionPercentage || 0}%` }}
            />
          </div>
          {user.profileCompletionPercentage < 100 && (
            <NavLink
              to="/profile"
              className="mt-2.5 block text-xs font-semibold text-[#315C4C] hover:text-[#27503F] hover:underline"
            >
              Complete Profile →
            </NavLink>
          )}
        </div>
      )}
    </aside>
  );
};
