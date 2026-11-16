import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Shield, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (!user.onboardingCompleted) {
        navigate('/onboarding');
      } else {
        navigate('/discover');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setError('');
    setLoading(true);
    try {
      const user = await login(demoEmail, 'password123');
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (!user.onboardingCompleted) {
        navigate('/onboarding');
      } else {
        navigate('/discover');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Left — Form Panel (60%) */}
      <div className="flex-1 lg:w-[60%] flex flex-col items-center justify-center px-6 py-12 bg-[#F8F8F5]">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8">
            <Logo to="/" size="md" />
          </div>

          <h1 className="text-2xl font-bold text-[#202622] mb-1">Welcome back</h1>
          <p className="text-sm text-[#737B74] mb-8">
            Sign in to find compatible flatmates and manage your matches
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-[#C0392B] text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={Mail}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-[#202622]">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#315C4C] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={Lock}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Demo Quick Login */}
          <div className="mt-6 pt-5 border-t border-[#E5E7E2]">
            <p className="text-center text-[11px] font-bold uppercase tracking-wider text-[#737B74] mb-3">
              Quick Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('aarav@example.com')}
                className="py-2 px-2.5 rounded-lg border border-[#E5E7E2] text-[#202622] font-medium hover:bg-[#F8F8F5] transition-colors truncate"
              >
                🧑 Aarav (Tech/Indiranagar)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('priya@example.com')}
                className="py-2 px-2.5 rounded-lg border border-[#E5E7E2] text-[#202622] font-medium hover:bg-[#F8F8F5] transition-colors truncate"
              >
                👩 Priya (Design/Koramangala)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@flatmate.com')}
                className="col-span-2 py-2 px-2.5 rounded-lg border border-[#E5E7E2] bg-[#E8EAE3] text-[#315C4C] font-semibold hover:bg-[#dde0d9] transition-colors truncate text-center"
              >
                🛡️ Platform Admin User
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[#737B74]">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#315C4C] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Brand Panel (40%) — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[40%] flex-col items-center justify-center bg-[#315C4C] text-white px-10 py-12">
        <div className="max-w-xs w-full">
          <div className="mb-10">
            <Logo to="/" size="md" />
          </div>

          <h2 className="text-3xl font-bold leading-tight mb-4">
            Find your perfect flatmate, not just a roommate.
          </h2>
          <p className="text-sm text-white/70 mb-10">
            FlatSwipe matches you based on lifestyle, habits, and personality — not just price.
          </p>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#D9A16A]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Compatibility-first matching</p>
                <p className="text-xs text-white/60 mt-0.5">
                  Our algorithm considers sleep schedules, cleanliness, budget and more.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-[#D9A16A]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Verified profiles</p>
                <p className="text-xs text-white/60 mt-0.5">
                  Every member goes through ID verification for a safe experience.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-5 h-5 text-[#D9A16A]" />
              </div>
              <div>
                <p className="font-semibold text-sm">10,000+ successful matches</p>
                <p className="text-xs text-white/60 mt-0.5">
                  Thousands of people found their ideal living situation on FlatSwipe.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
