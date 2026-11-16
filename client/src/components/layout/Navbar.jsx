import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Heart, MessageSquare, Home, Sparkles, User, Settings, LogOut, CheckCircle, Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Logo } from '../ui/Logo';
import { notificationAPI } from '../../services/api';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
    }
  }, [user, location.pathname]);

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationAPI.getUnreadCount();
      if (res.data.success) {
        setUnreadCount(res.data.data.count);
      }
    } catch (e) {
      // ignore
    }
  };

  const handleOpenNotifications = async () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    if (!showNotifications) {
      try {
        const res = await notificationAPI.getNotifications({ limit: 5 });
        if (res.data.success) {
          setNotifications(res.data.data);
        }
      } catch (e) {
        // ignore
      }
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (e) {
      // ignore
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/discover', label: 'Discover', icon: Sparkles },
    { to: '/matches', label: 'Matches', icon: Heart },
    { to: '/messages', label: 'Chat', icon: MessageSquare },
    { to: '/listings', label: 'Listings', icon: Home },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <img src="/logo.png" alt="FlatSwipe" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
          <span className="font-bold text-[#202622] text-base tracking-tight hidden sm:block">FlatSwipe</span>
        </Link>

        {/* Center Desktop Navigation — authenticated */}
        {user && (
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === to || location.pathname.startsWith(to + '/')
                    ? 'bg-[#E8EAE3] text-[#315C4C]'
                    : 'text-[#737B74] hover:text-[#202622] hover:bg-[#F8F8F5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Landing nav links — unauthenticated */}
        {!user && (
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium text-[#737B74] hover:text-[#202622] transition-colors">How it works</a>
            <a href="#pricing" className="text-sm font-medium text-[#737B74] hover:text-[#202622] transition-colors">Pricing</a>
            <a href="#safety" className="text-sm font-medium text-[#737B74] hover:text-[#202622] transition-colors">Safety</a>
          </nav>
        )}

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={handleOpenNotifications}
                  className="p-2 rounded-lg text-[#737B74] hover:bg-[#F8F8F5] relative transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E5E7E2] p-4 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E7E2]">
                      <h4 className="font-semibold text-sm text-[#202622]">Notifications</h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs font-medium text-[#315C4C] hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-[#E5E7E2] max-h-72 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-[#737B74] py-6 text-center">No notifications yet</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            className={`py-3 px-2 rounded-lg transition-colors ${
                              !n.isRead ? 'bg-[#E8EAE3]/50' : ''
                            }`}
                          >
                            <p className="text-xs font-semibold text-[#202622]">{n.title}</p>
                            <p className="text-xs text-[#737B74] mt-0.5">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#E8EAE3] transition-all"
                >
                  <Avatar
                    src={user.profilePicture}
                    name={user.fullName}
                    size="sm"
                    isOnline={true}
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-[#E5E7E2] py-2 z-50">
                    <div className="px-4 py-3 border-b border-[#E5E7E2]">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-[#202622] truncate">{user.fullName}</p>
                        {user.verificationBadge && (
                          <CheckCircle className="w-4 h-4 text-[#315C4C] fill-[#E8EAE3] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#737B74] truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#202622] hover:bg-[#F8F8F5]"
                      >
                        <User className="w-4 h-4 text-[#737B74]" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#202622] hover:bg-[#F8F8F5]"
                      >
                        <Sparkles className="w-4 h-4 text-[#737B74]" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#202622] hover:bg-[#F8F8F5]"
                      >
                        <Settings className="w-4 h-4 text-[#737B74]" />
                        Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#315C4C] hover:bg-[#E8EAE3]"
                        >
                          <Shield className="w-4 h-4 text-[#315C4C]" />
                          Admin Panel
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#E5E7E2] pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile hamburger — authenticated */}
              <button
                className="md:hidden p-2 rounded-lg text-[#737B74] hover:bg-[#F8F8F5]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-[#737B74] hover:text-[#202622] px-3 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-[#315C4C] hover:bg-[#527565] px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
              {/* Mobile hamburger — unauthenticated */}
              <button
                className="md:hidden p-2 rounded-lg text-[#737B74] hover:bg-[#F8F8F5]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7E2] bg-white px-4 py-3 space-y-1">
          {user ? (
            navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#737B74] hover:text-[#202622] hover:bg-[#F8F8F5]"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))
          ) : (
            <>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-[#737B74] hover:text-[#202622]">How it works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-[#737B74] hover:text-[#202622]">Pricing</a>
              <a href="#safety" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-[#737B74] hover:text-[#202622]">Safety</a>
            </>
          )}
        </div>
      )}
    </header>
  );
};
