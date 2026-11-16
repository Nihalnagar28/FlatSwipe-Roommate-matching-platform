import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Heart, MessageSquare, Home, Sparkles, User, Settings, LogOut, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { notificationAPI } from '../../services/api';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              FlatMate
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        {user && (
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/discover"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/discover'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Discover
            </Link>
            <Link
              to="/matches"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/matches' || location.pathname === '/likes'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Matches
            </Link>
            <Link
              to="/messages"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname.startsWith('/messages')
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-purple-500" />
              Chat
            </Link>
            <Link
              to="/listings"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname.startsWith('/listings')
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4 text-teal-500" />
              Listings
            </Link>
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
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 relative transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs font-medium text-indigo-600 hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-6 text-center">No notifications yet</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            className={`py-3 px-2 rounded-xl transition-colors ${
                              !n.isRead ? 'bg-indigo-50/50' : ''
                            }`}
                          >
                            <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
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
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-100 transition-all"
                >
                  <Avatar
                    src={user.profilePicture}
                    name={user.fullName}
                    size="sm"
                    isOnline={true}
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.fullName}</p>
                        {user.verificationBadge && (
                          <CheckCircle className="w-4 h-4 text-indigo-600 fill-indigo-100 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Sparkles className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                        >
                          <Shield className="w-4 h-4 text-indigo-600" />
                          Admin Panel
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1">
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
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-sm shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
