import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { authAPI } from '../../services/api';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-soft border border-slate-100 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">FlatMate</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reset password</h2>
          <p className="mt-1 text-xs text-slate-500">We'll send you instructions to reset your password</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Check your inbox</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              If an account exists for <span className="font-semibold text-slate-700">{email}</span>, we've sent password reset instructions.
            </p>
            <Link to="/login" className="inline-block mt-4 text-xs font-bold text-indigo-600 hover:underline">
              ← Return to Login
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
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

            <p className="text-center text-xs text-slate-500 pt-2">
              Remembered your password?{' '}
              <Link to="/login" className="font-bold text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
