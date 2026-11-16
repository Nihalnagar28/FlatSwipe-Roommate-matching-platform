import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { authAPI } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send reset link. Please check the email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F8F5]">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-[#E5E7E2]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo to="/" size="md" />
          </div>
          <h2 className="text-2xl font-bold text-[#202622] tracking-tight">Reset password</h2>
          <p className="mt-1.5 text-sm text-[#737B74]">We'll send you instructions to reset your password</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-[#E8EAE3] text-[#315C4C] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#202622]">Check your inbox</h3>
            <p className="text-xs text-[#737B74] leading-relaxed">
              If an account exists for <span className="font-semibold text-[#202622]">{email}</span>, we've sent password reset instructions.
            </p>
            <Link to="/login" className="inline-block mt-4 text-xs font-semibold text-[#315C4C] hover:underline">
              ← Return to Login
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#C0392B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={Mail}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Send Reset Link
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-center text-xs text-[#737B74] pt-2">
              Remembered your password?{' '}
              <Link to="/login" className="font-semibold text-[#315C4C] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
