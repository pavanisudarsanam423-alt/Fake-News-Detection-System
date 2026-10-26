import React, { useState } from 'react';
import { AuthSession } from '../types';
import { authService } from '../services/auth';
import { ShieldCheck, ArrowRight, Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthViewProps {
  onAuthenticated: (session: AuthSession) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const res = await authService.register(name, email, password);
        if (res.success && res.session) {
          onAuthenticated(res.session);
        } else {
          setError(res.error || 'Failed to create account.');
        }
      } else {
        const res = await authService.login(email, password);
        if (res.success && res.session) {
          onAuthenticated(res.session);
        } else {
          setError(res.error || 'Invalid credentials.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setMode('login');
    setEmail('analyst@fakenewsdetector.org');
    setPassword('demo1234');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500 filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500 filter blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Banner with image */}
        <div className="mb-6 rounded-xl overflow-hidden border border-slate-700/60 shadow-lg relative h-28 bg-gradient-to-r from-slate-800 to-indigo-950">
          <img
            src="/src/assets/images/fake_news_detector_banner_1790694967486.jpg"
            alt="NLP & Machine Learning News Headline Verification"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-end p-3">
            <span className="text-[11px] font-mono font-medium text-slate-300">
              Natural Language Processing & ML Classification
            </span>
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
          {mode === 'login' ? 'FAKE NEWS DETECTOR' : 'CREATE ACCOUNT'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          {mode === 'login'
            ? 'Sign in to access the machine learning headline verification dashboard'
            : 'Register a new account to test and analyze news headlines'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-800/90 border border-slate-700/80 py-8 px-6 sm:px-10 rounded-xl shadow-xl backdrop-blur-sm">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-200 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              {mode === 'signup' && (
                <p className="mt-1 text-[11px] text-slate-400">
                  Must be at least 6 characters (hashed with SHA-256)
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : mode === 'login' ? (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>SIGN UP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Fill button */}
          {mode === 'login' && (
            <div className="mt-4 pt-4 border-t border-slate-700/60">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-1.5 px-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/60 rounded text-xs text-slate-300 font-medium transition-colors text-center cursor-pointer"
              >
                Use Pre-configured Analyst Account (demo1234)
              </button>
            </div>
          )}

          {/* Switch Mode Section */}
          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-slate-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                  }}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 ml-1 cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 ml-1 cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Informational footer note */}
        <div className="mt-6 text-center text-xs text-slate-500">
          NLP Preprocessing · TF-IDF Vectorizer · Multinomial Naive Bayes & Logistic Regression
        </div>
      </div>
    </div>
  );
};
