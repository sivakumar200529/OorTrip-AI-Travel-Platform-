import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { TamilNaduLogo } from '../common/TamilNaduLogo';

export const FinalHeroCTA: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      
      {/* Background card container */}
      <div className="relative rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 border border-white/20 p-8 sm:p-16 lg:p-20 shadow-depth-3d text-center overflow-hidden">
        
        {/* Full-bleed background texture image with deep gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 pointer-events-none"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2000&q=80")',
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-terracotta-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-sand-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          
          {/* Official Tamil Nadu Tourism Seal */}
          <div className="flex flex-col items-center justify-center gap-2">
            <TamilNaduLogo size={56} showText={false} />
            <span className="text-[11px] font-bold text-sand-300 uppercase tracking-widest font-mono">
              தமிழ்நாடு அரசு • TAMIL NADU TOURISM DEVELOPMENT CORPORATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            YOUR NEXT <br />
            <span className="bg-gradient-to-r from-white via-sand-200 to-terracotta-400 bg-clip-text text-transparent">
              TAMIL NADU STORY
            </span> <br />
            STARTS HERE.
          </h2>

          <p className="text-base sm:text-lg text-warmwhite-300/80 max-w-xl mx-auto leading-relaxed">
            Plan less. Explore more. Let OorTrip AI intelligently design your route, budget, and cultural encounters across Tamil Nadu.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/planner"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-sm tracking-wider uppercase shadow-depth-md hover:shadow-glow-terracotta transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4" />
              <span>✦ PLAN MY JOURNEY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/destinations"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-charcoal-900/90 hover:bg-charcoal-800 text-warmwhite-100 font-medium text-sm tracking-wider uppercase border border-white/15 hover:border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-sand-400" />
              <span>EXPLORE DESTINATIONS</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-warmwhite-300/60 border-t border-white/10 max-w-lg mx-auto">
            <span>✓ 38 Districts Covered</span>
            <span>✓ Zero Clunky VR / No AR</span>
            <span>✓ 100% Free AI Planner</span>
          </div>

        </div>

      </div>

    </section>
  );
};
