import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, Shield, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password);
      // Brand new user navigates straight to multi-step lifestyle onboarding
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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

          <h1 className="text-2xl font-bold text-[#202622] mb-1">Create your account</h1>
          <p className="text-sm text-[#737B74] mb-8">
            Join FlatSwipe to find compatible roommates in your city
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-[#C0392B] text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              icon={User}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              icon={Lock}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              icon={Lock}
              required
            />

            <p className="text-xs text-[#737B74] leading-relaxed pt-1">
              By creating an account, you agree to our Terms of Service and Privacy Policy. All members undergo verified safety guidelines.
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Continue to Onboarding
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#737B74]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#315C4C] hover:underline">
              Sign in
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
            Start your journey to the perfect flatshare.
          </h2>
          <p className="text-sm text-white/70 mb-10">
            Answer a few questions about your lifestyle and we'll find people you'll actually enjoy living with.
          </p>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#D9A16A]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Free to join</p>
                <p className="text-xs text-white/60 mt-0.5">
                  Create your profile and start swiping at no cost. Upgrade anytime.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-[#D9A16A]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Safe & verified</p>
                <p className="text-xs text-white/60 mt-0.5">
                  ID verification and reporting tools keep the community safe.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-5 h-5 text-[#D9A16A]" />
              </div>
              <div>
                <p className="font-semibold text-sm">Smart compatibility scoring</p>
                <p className="text-xs text-white/60 mt-0.5">
                  Goes beyond budget — habits, personality and values all factor in.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
