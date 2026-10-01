import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Shield, Phone, Sparkles, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-charcoal-950 border-t border-white/10 text-warmwhite-300 py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-terracotta-600/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-terracotta-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                OORTRIP<span className="text-terracotta-500 ml-1">AI</span>
              </span>
            </div>

            <p className="text-xs text-warmwhite-300/80 max-w-sm leading-relaxed">
              "Discover Tamil Nadu. Your Journey, Intelligently Planned."
              Connecting discerning tourists, heritage destinations, indigenous artisans, and regional administration through next-generation AI and immersive travel design.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-warmwhite-300/60 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Digital Tourism Hackathon Prototype • 100% Client/Server Live</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Explore</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/planner" className="hover:text-terracotta-400 transition-colors">AI Trip Planner</Link></li>
              <li><Link to="/destinations" className="hover:text-terracotta-400 transition-colors">All 14 Destinations</Link></li>
              <li><Link to="/map" className="hover:text-terracotta-400 transition-colors">Interactive Smart Map</Link></li>
              <li><Link to="/experiences" className="hover:text-terracotta-400 transition-colors">Artisan Marketplace</Link></li>
              <li><Link to="/pass" className="hover:text-terracotta-400 transition-colors">Digital Tourist Pass</Link></li>
            </ul>
          </div>

          {/* Dashboards */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Portals</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-terracotta-400 transition-colors">Tourist Dashboard</Link></li>
              <li><Link to="/business" className="hover:text-terracotta-400 transition-colors">Local Business Portal</Link></li>
              <li><Link to="/admin" className="hover:text-terracotta-400 transition-colors">Tourism Admin Analytics</Link></li>
              <li><Link to="/budget" className="hover:text-terracotta-400 transition-colors">Smart Budget Tracker</Link></li>
              <li><Link to="/journey" className="hover:text-terracotta-400 transition-colors">My Travel Memories</Link></li>
            </ul>
          </div>

          {/* Tourism Emergency Contacts */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">TN Helplines</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Tourist Help: <strong className="text-white">1363</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Police Control: <strong className="text-white">100</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span>Medical Emergency: <strong className="text-white">108</strong></span>
              </div>
              <p className="text-[10px] text-warmwhite-300/50 pt-1">
                TTDC Tourism Complex, Wallajah Road, Chennai 600002
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmwhite-300/60">
          <p>© 2026 OorTrip AI. Built for the Tamil Nadu Digital Tourism Initiative.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Respecting prefers-reduced-motion</span>
            <span>•</span>
            <span>Zero AR/VR overhead</span>
            <span>•</span>
            <span>Pure CSS 3D Depth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
