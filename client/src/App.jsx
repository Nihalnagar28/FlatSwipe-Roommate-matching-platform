import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { Spinner } from './components/ui/Spinner';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { ResetPasswordForm } from './components/auth/ResetPasswordForm';

import { DashboardPage } from './components/dashboard/DashboardPage';
import { DiscoveryPage } from './components/discovery/DiscoveryPage';
import { LikesPage } from './components/matches/LikesPage';
import { MatchesPage } from './components/matches/MatchesPage';
import { ChatPage } from './components/chat/ChatPage';
import { ListingsPage } from './components/listings/ListingsPage';
import { CreateListingForm } from './components/listings/CreateListingForm';
import { ListingDetail } from './components/listings/ListingDetail';
import { MeetupPage } from './components/meetup/MeetupPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { SettingsPage } from './components/profile/SettingsPage';
import { AdminPage } from './components/admin/AdminPage';

// Protected Route Guard
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <RegisterForm />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

      {/* Onboarding Flow */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      {/* Authenticated Application AppLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/new" element={<CreateListingForm />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/meetup/:matchId" element={<MeetupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
