import React, { useEffect } from 'react';
import { Award, Sparkles, MapPin, CheckCircle2, QrCode, Shield, Compass, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_TOURIST_PASS } from '../data/tamilNaduData';
import { useAuth } from '../context/AuthContext';

export const DigitalPassPage: React.FC = () => {
  const { user } = useAuth();
  const pass = INITIAL_TOURIST_PASS;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D35B2D', '#D4AF37', '#10B981', '#2F80ED']
    });
  };

  useEffect(() => {
    triggerCelebration();
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>DIGITAL TOURISM PASSPORT & REWARDS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tamil Nadu Tourist Pass
          </h1>
          <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
            Your verified state-wide digital credentials. Collect stamps, advance tier rankings, and unlock exclusive discounts at participating heritage stays and artisan guilds.
          </p>
        </div>

        {/* 3D-STYLE PASSPORT CARD (Section 27) */}
        <div className="relative max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-[#1C1F26] via-[#14171D] to-[#0D0F13] border-2 border-amber-500/30 p-6 sm:p-10 shadow-depth-3d space-y-8 overflow-hidden group">
          
          {/* Subtle gold watermark emblem */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-4 right-6 opacity-10 text-amber-400 font-serif text-8xl font-black select-none pointer-events-none">
            TN
          </div>

          {/* Top Passport Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.avatar || pass.avatar}
                  alt={user?.name || pass.touristName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/60 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-charcoal-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    {user?.name || pass.touristName}
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {pass.tier}
                  </span>
                </div>
                <p className="text-xs text-sand-300 font-mono mt-0.5">
                  ID: {pass.touristId} • PASS #{pass.passNumber}
                </p>
                <p className="text-[10px] text-warmwhite-300/50 mt-0.5">
                  Issued: October 2026 • Tamil Nadu Tourism Development Corporation
                </p>
              </div>
            </div>

            {/* QR Code and Points */}
            <div className="flex items-center gap-4 self-end sm:self-center">
              <div className="text-right">
                <p className="text-[10px] text-warmwhite-300/60 uppercase font-semibold">Accumulated Points</p>
                <p className="font-serif text-3xl font-extrabold text-amber-400">{user?.points || pass.points} PTS</p>
                <span className="text-[10px] text-emerald-400 font-medium">Eco Score: {user?.ecoScore || pass.ecoScore}/100</span>
              </div>
              <div className="p-2 rounded-xl bg-white text-charcoal-950 shadow-md">
                <QrCode className="w-10 h-10" />
              </div>
            </div>
          </div>

          {/* Gamification Progress Bar (Section 28) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-warmwhite-200">District Exploration Milestone</span>
              <span className="text-amber-400 font-mono">{pass.visitedCount} of {pass.totalDestinations} Districts Visited (31.5%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-charcoal-950 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-terracotta-500 rounded-full transition-all duration-700"
                style={{ width: `${(pass.visitedCount / pass.totalDestinations) * 100}%` }}
              />
            </div>
          </div>

          {/* Visited City Stamps */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold tracking-wider text-amber-400 font-mono">
              Official City Stamps
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pass.stamps.map((stamp) => (
                <div
                  key={stamp.city}
                  className="p-3.5 rounded-2xl bg-charcoal-900/80 border border-amber-500/20 text-center space-y-1 relative group hover:border-amber-500/50 transition-colors"
                >
                  <span className="text-2xl block">{stamp.icon}</span>
                  <p className="font-serif text-xs font-bold text-white">{stamp.city}</p>
                  <p className="text-[10px] text-sand-400 font-medium">{stamp.badgeName}</p>
                  <span className="text-[9px] text-warmwhite-300/40 font-mono block">{stamp.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Earned Badges Showcase */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase font-bold tracking-wider text-amber-400 font-mono">
                Gamification Badges
              </p>
              <button
                onClick={triggerCelebration}
                className="text-[11px] text-amber-300 hover:text-white flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" /> Celebrate Level
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pass.badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    b.earned
                      ? 'bg-charcoal-850/80 border-amber-500/30 text-white'
                      : 'bg-charcoal-950/40 border-white/5 opacity-50'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-charcoal-900 border border-white/10">
                    {b.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">{b.name}</p>
                      <span className="text-[10px] font-mono text-amber-400">+{b.points} Pts</span>
                    </div>
                    <p className="text-[10px] text-warmwhite-300/70 mt-0.5 line-clamp-2">{b.description}</p>
                    {b.unlockedAt && (
                      <span className="text-[9px] text-emerald-400 font-mono mt-1 block">
                        ✓ Unlocked {b.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification Points Rules */}
          <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
            <div>
              <p className="text-amber-400 font-bold text-sm">+100</p>
              <p className="text-[10px] text-warmwhite-300/70">Heritage Visit</p>
            </div>
            <div>
              <p className="text-terracotta-400 font-bold text-sm">+150</p>
              <p className="text-[10px] text-warmwhite-300/70">Local Experience</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold text-sm">+250</p>
              <p className="text-[10px] text-warmwhite-300/70">Complete Itinerary</p>
            </div>
            <div>
              <p className="text-oceanblue-400 font-bold text-sm">+50</p>
              <p className="text-[10px] text-warmwhite-300/70">Submit Review</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
