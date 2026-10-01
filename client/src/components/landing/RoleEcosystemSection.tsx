import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Building2, ShieldCheck, Sparkles, ArrowRight, 
  BarChart3, CheckCircle2, TrendingUp, DollarSign, HeartHandshake
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RoleEcosystemSection: React.FC = () => {
  const { loginAs } = useAuth();
  const [activeTab, setActiveTab] = useState<'tourist' | 'business' | 'admin'>('tourist');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>FOUR-SIDED DIGITAL TOURISM PLATFORM</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Role-Based Tourism Ecosystem
        </h2>
        <p className="text-sm text-warmwhite-300/80 leading-relaxed">
          OorTrip AI bridges the gap between travelers, local artisan cooperatives, verified homestays, and state tourism authorities through unified intelligence.
        </p>
      </div>

      {/* 3D Ecosystem Architecture Diagram */}
      <div className="p-8 rounded-3xl bg-charcoal-900 border border-white/15 shadow-depth-3d mb-12 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-terracotta-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Node 1: Tourists */}
          <div
            onClick={() => setActiveTab('tourist')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activeTab === 'tourist'
                ? 'bg-charcoal-800 border-terracotta-500 shadow-glow-terracotta scale-102'
                : 'bg-charcoal-950/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">01. Tourists</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Personalized itineraries, offline audio guides, 1-tap SOS safety, and digital tourist passports with rewards.
            </p>
            <span className="text-[11px] text-terracotta-400 font-bold block pt-1">
              Active Portal: /dashboard →
            </span>
          </div>

          {/* Node 2: Local Businesses & Artisans */}
          <div
            onClick={() => setActiveTab('business')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activeTab === 'business'
                ? 'bg-charcoal-800 border-oceanblue-400 shadow-lg shadow-oceanblue-500/20 scale-102'
                : 'bg-charcoal-950/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-oceanblue-500/20 text-oceanblue-400 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">02. Local Businesses</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Fair-wage artisan sales, direct bookings for culinary classes and farm stays with zero middleman commissions.
            </p>
            <span className="text-[11px] text-oceanblue-400 font-bold block pt-1">
              Active Portal: /business →
            </span>
          </div>

          {/* Node 3: Tourism Administration (TTDC) */}
          <div
            onClick={() => setActiveTab('admin')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activeTab === 'admin'
                ? 'bg-charcoal-800 border-templegreen-400 shadow-lg shadow-templegreen-500/20 scale-102'
                : 'bg-charcoal-950/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-templegreen-500/20 text-templegreen-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">03. Tourism Admin (TTDC)</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Real-time crowd heatmaps, tourist footfall telemetry, sentiment tracking, and emergency broadcasting.
            </p>
            <span className="text-[11px] text-templegreen-400 font-bold block pt-1">
              Active Portal: /admin →
            </span>
          </div>

        </div>
      </div>

      {/* Interactive Portal Deep Dive Card based on Selected Tab */}
      <div className="rounded-3xl bg-charcoal-950 border border-white/15 p-6 sm:p-10 shadow-depth-md">
        
        {activeTab === 'tourist' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-terracotta-400 uppercase tracking-widest">
                  TOURIST PORTAL PREVIEW
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Traveler Command Center
                </h3>
              </div>
              <Link
                to="/dashboard"
                onClick={() => loginAs('tourist')}
                className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start"
              >
                <span>Launch Tourist Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Upcoming Trip</p>
                <p className="font-bold text-white text-sm mt-1">Chennai → Mahabalipuram</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Budget Remaining</p>
                <p className="font-bold text-emerald-400 text-sm mt-1">₹6,550 of ₹15,000</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Eco Score</p>
                <p className="font-bold text-white text-sm mt-1">92 / 100 Points</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Pass Tier</p>
                <p className="font-bold text-sand-300 text-sm mt-1">Explorer (12 Badges)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-oceanblue-400 uppercase tracking-widest">
                  LOCAL BUSINESS & ARTISAN PORTAL
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Vendor & Master Craftsperson Storefront
                </h3>
              </div>
              <Link
                to="/business"
                onClick={() => loginAs('business')}
                className="px-5 py-2.5 rounded-xl bg-oceanblue-500 hover:bg-oceanblue-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start"
              >
                <span>Launch Business Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Monthly Bookings</p>
                <p className="font-bold text-white text-sm mt-1">48 Sessions</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Direct Revenue</p>
                <p className="font-bold text-emerald-400 text-sm mt-1">₹42,800 this month</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Artisan Rating</p>
                <p className="font-bold text-amber-400 text-sm mt-1">★ 4.95 (142 reviews)</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Verification</p>
                <p className="font-bold text-templegreen-400 text-sm mt-1">TTDC GI Tag Verified</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-templegreen-400 uppercase tracking-widest">
                  TOURISM ADMINISTRATION (TTDC)
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Statewide Tourism Command & Analytics
                </h3>
              </div>
              <Link
                to="/admin"
                onClick={() => loginAs('admin')}
                className="px-5 py-2.5 rounded-xl bg-templegreen-500 hover:bg-templegreen-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start"
              >
                <span>Launch TTDC Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Statewide Footfall</p>
                <p className="font-bold text-white text-sm mt-1">1.48M Visitors</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Active Districts</p>
                <p className="font-bold text-white text-sm mt-1">38 Districts Connected</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Crowd Hotspots</p>
                <p className="font-bold text-rose-400 text-sm mt-1">2 Active Diversions</p>
              </div>
              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10">
                <p className="text-warmwhite-300/60">Tourism Revenue</p>
                <p className="font-bold text-emerald-400 text-sm mt-1">₹84.2 Cr Generated</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
