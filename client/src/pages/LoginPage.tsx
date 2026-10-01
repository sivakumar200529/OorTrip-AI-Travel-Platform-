import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, User, Building2, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { loginAs, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('tourist');

  const handleInstantDemoLogin = (role: UserRole) => {
    loginAs(role);
    if (role === 'admin') navigate('/admin');
    else if (role === 'business') navigate('/business');
    else navigate('/dashboard');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await loginWithEmail(email, password, selectedRole);
    if (selectedRole === 'admin') navigate('/admin');
    else if (selectedRole === 'business') navigate('/business');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-charcoal-950">
      <div className="w-full max-w-lg rounded-3xl bg-charcoal-900 border border-white/15 p-8 sm:p-10 shadow-depth-3d space-y-8 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center text-white mx-auto shadow-md shadow-terracotta-500/30">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Welcome to OorTrip AI
          </h1>
          <p className="text-xs text-warmwhite-300/70">
            Choose your role or test immediately with 1-Click Demo Logins
          </p>
        </div>

        {/* 1-CLICK INSTANT DEMO LOGINS (Section 42) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-terracotta-400 font-mono">
              ★ Instant Hackathon Demo Logins
            </span>
            <span className="text-[10px] text-warmwhite-300/50">Zero Password Needed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleInstantDemoLogin('tourist')}
              className="p-3.5 rounded-2xl bg-charcoal-850 hover:bg-terracotta-500/20 border border-white/10 hover:border-terracotta-500/50 text-left transition-all group"
            >
              <User className="w-5 h-5 text-terracotta-400 group-hover:scale-110 transition-transform mb-2" />
              <p className="font-bold text-white text-xs">Tourist Demo</p>
              <p className="text-[10px] text-warmwhite-300/60 mt-0.5">Siva (1,250 Pts)</p>
            </button>

            <button
              onClick={() => handleInstantDemoLogin('business')}
              className="p-3.5 rounded-2xl bg-charcoal-850 hover:bg-oceanblue-500/20 border border-white/10 hover:border-oceanblue-500/50 text-left transition-all group"
            >
              <Building2 className="w-5 h-5 text-oceanblue-400 group-hover:scale-110 transition-transform mb-2" />
              <p className="font-bold text-white text-xs">Business Demo</p>
              <p className="text-[10px] text-warmwhite-300/60 mt-0.5">Meenakshi Stays</p>
            </button>

            <button
              onClick={() => handleInstantDemoLogin('admin')}
              className="p-3.5 rounded-2xl bg-charcoal-850 hover:bg-templegreen-500/20 border border-white/10 hover:border-templegreen-500/50 text-left transition-all group"
            >
              <ShieldCheck className="w-5 h-5 text-templegreen-400 group-hover:scale-110 transition-transform mb-2" />
              <p className="font-bold text-white text-xs">Admin Demo</p>
              <p className="text-[10px] text-warmwhite-300/60 mt-0.5">TTDC Tourism</p>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-charcoal-900 px-3 text-[11px] text-warmwhite-300/50 uppercase font-mono tracking-wider absolute">
            Or Sign In With Email
          </span>
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-warmwhite-300/80 font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-warmwhite-300/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white placeholder-warmwhite-300/40 focus:outline-none focus:border-terracotta-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-warmwhite-300/80 font-semibold">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-warmwhite-300/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white placeholder-warmwhite-300/40 focus:outline-none focus:border-terracotta-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-warmwhite-300/80 font-semibold">Select Account Role:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['tourist', 'business', 'admin'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    selectedRole === r
                      ? 'bg-terracotta-500/20 border-terracotta-500 text-terracotta-400'
                      : 'bg-charcoal-850 border-white/10 text-warmwhite-300 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md mt-2"
          >
            Sign In / Register
          </button>
        </form>

        {/* Google OAuth Placeholder (Section 2) */}
        <button
          onClick={() => handleInstantDemoLogin('tourist')}
          className="w-full py-2.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google (Demo Sign-In)</span>
        </button>

      </div>
    </div>
  );
};
