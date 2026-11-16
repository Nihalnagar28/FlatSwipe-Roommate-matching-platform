import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('flatmate_token') || null);
  const [loading, setLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authAPI.getMe();
        if (res.data.success) {
          setUser(res.data.data);
          localStorage.setItem('flatmate_user', JSON.stringify(res.data.data));
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data.success) {
      const { user: loggedInUser, token: authToken } = res.data.data;
      setUser(loggedInUser);
      setToken(authToken);
      localStorage.setItem('flatmate_token', authToken);
      localStorage.setItem('flatmate_user', JSON.stringify(loggedInUser));
      return loggedInUser;
    }
  };

  const register = async (fullName, email, password) => {
    const res = await authAPI.register({ fullName, email, password });
    if (res.data.success) {
      const { user: registeredUser, token: authToken } = res.data.data;
      setUser(registeredUser);
      setToken(authToken);
      localStorage.setItem('flatmate_token', authToken);
      localStorage.setItem('flatmate_user', JSON.stringify(registeredUser));
      return registeredUser;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('flatmate_token');
    localStorage.removeItem('flatmate_user');
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('flatmate_user', JSON.stringify(updated));
      return updated;
    });
  };

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem('flatmate_user', JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.error('Refresh user failed', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
