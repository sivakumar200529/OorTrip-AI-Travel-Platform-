import React, { useState, useEffect } from 'react';
import { 
  CloudSun, Users, Car, Calendar, Sparkles, IndianRupee, 
  Activity, ArrowUpRight, ShieldAlert, Radio, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveTamilNaduDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: 'Statewide Weather',
      value: '28°C',
      sub: 'Clear Skies & Coastal Breeze',
      icon: CloudSun,
      accent: 'text-amber-400',
      badge: 'Live Sensor Grid',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Tourist Density',
      value: 'Moderate',
      sub: 'Peak at Mahabalipuram & Madurai',
      icon: Users,
      accent: 'text-terracotta-400',
      badge: 'AI Crowd Sensor',
      badgeColor: 'bg-terracotta-500/10 text-terracotta-400 border-terracotta-500/30'
    },
    {
      title: 'Highway Corridors',
      value: 'Normal Flow',
      sub: 'ECR & NH32 Flowing Freely',
      icon: Car,
      accent: 'text-emerald-400',
      badge: 'Highway Telemetry',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Active Cultural Events',
      value: '12 Today',
      sub: 'Chithirai Fest & Tanjore Natyanjali',
      icon: Calendar,
      accent: 'text-oceanblue-400',
      badge: 'Cultural Bureau',
      badgeColor: 'bg-oceanblue-500/10 text-oceanblue-400 border-oceanblue-500/30'
    },
    {
      title: 'Local Experiences',
      value: '24 Available',
      sub: 'Loom walks & culinary masters',
      icon: Sparkles,
      accent: 'text-sand-400',
      badge: 'Verified Guilds',
      badgeColor: 'bg-sand-500/10 text-sand-400 border-sand-500/30'
    },
    {
      title: 'Average Daily Spend',
      value: '₹1,250 avg',
      sub: 'Comfort food & monument passes',
      icon: IndianRupee,
      accent: 'text-rose-400',
      badge: 'Real-time Index',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-6 sm:p-10 shadow-depth-3d relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-terracotta-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>TELEMETRY DASHBOARD</span>
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Live Tamil Nadu
            </h2>
            <p className="text-xs sm:text-sm text-warmwhite-300/80">
              Statewide tourist flow, climate intelligence, and cultural vibrancy refreshed live.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-white/10 text-xs text-warmwhite-200 font-mono flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-sand-400" />
              <span>IST {currentTime || '22:45'}</span>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-warmwhite-300/60 uppercase font-mono">
              DEMO TELEMETRY
            </span>
          </div>
        </div>

        {/* 6 Glass Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-charcoal-950/70 border border-white/10 hover:border-white/20 transition-all duration-300 space-y-3 group hover:bg-charcoal-950"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                  <div className={`p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${s.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-warmwhite-300/70 font-medium">{s.title}</p>
                  <h4 className="font-serif text-2xl font-bold text-white tracking-tight mt-0.5">{s.value}</h4>
                  <p className="text-[11px] text-warmwhite-300/60 mt-1">{s.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick-Action Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-warmwhite-300/70">
            <Radio className="w-4 h-4 text-terracotta-400 animate-pulse" />
            <span>AI monitors 38 districts for weather warnings, road diversions, and festival crowds.</span>
          </div>

          <Link
            to="/map"
            className="text-terracotta-400 hover:text-terracotta-300 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Open Interactive Map</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
