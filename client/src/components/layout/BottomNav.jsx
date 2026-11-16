import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Heart, MessageSquare, Home, User } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { to: '/discover', label: 'Discover', icon: Sparkles },
    { to: '/matches', label: 'Matches', icon: Heart },
    { to: '/messages', label: 'Chat', icon: MessageSquare },
    { to: '/listings', label: 'Listings', icon: Home },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7E2] px-2 py-1.5 shadow-sm">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#315C4C] font-semibold'
                    : 'text-[#737B74] hover:text-[#202622] font-medium'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
