import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Sparkles, Map, Wallet, Award, Heart, 
  MessageSquare, User, Settings, Clock, ArrowRight, 
  Leaf, MapPin, CheckCircle2, ChevronRight, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TAMIL_NADU_DESTINATIONS, INITIAL_EXPENSES } from '../data/tamilNaduData';

export const TouristDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const savedList = TAMIL_NADU_DESTINATIONS.filter((d) =>
    user?.savedPlaces?.includes(d.id)
  );

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Greeting Banner (Section 13) */}
        <div className="rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-depth-md">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ACTIVE EXPEDITION PASSPORT</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Good evening, {user?.name || 'Siva'}
            </h1>
            <p className="text-xs sm:text-sm text-warmwhite-300/80">
              Welcome back to your Tamil Nadu travel command center. Your Day 1 route to Mahabalipuram is ready.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/planner"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>CUSTOMIZE TRIP</span>
            </Link>
          </div>
        </div>

        {/* METRICS ROW (Upcoming Trip, Budget, Places Visited, Points, Eco Score) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Upcoming Trip</p>
            <p className="font-serif text-base sm:text-lg font-bold text-white truncate">Shore Circuit</p>
            <span className="text-[11px] text-terracotta-400 block font-medium">Tomorrow, 09:00 AM</span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Budget Remaining</p>
            <p className="font-serif text-base sm:text-lg font-bold text-emerald-400">₹1,580</p>
            <span className="text-[11px] text-warmwhite-300/60 block">of ₹5,000 budget</span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Places Visited</p>
            <p className="font-serif text-base sm:text-lg font-bold text-white">12 / 38</p>
            <span className="text-[11px] text-sand-300 block font-medium">Tamil Nadu Districts</span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Tourist Points</p>
            <p className="font-serif text-base sm:text-lg font-bold text-amber-400">{user?.points || 1250} Pts</p>
            <span className="text-[11px] text-warmwhite-300/60 block">Tier: Discoverer</span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 shadow-depth-sm col-span-2 sm:col-span-1">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Eco Score</p>
            <p className="font-serif text-base sm:text-lg font-bold text-emerald-400 flex items-center gap-1">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>{user?.ecoScore || 92} / 100</span>
            </p>
            <span className="text-[11px] text-emerald-300/80 block">Green transit certified</span>
          </div>

        </div>

        {/* TWO-COLUMN DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left: Current Itinerary Preview */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Current Active Itinerary
                  </h3>
                  <p className="text-xs text-sand-300 mt-0.5">
                    Chennai → Mahabalipuram → Kanchipuram (2 Days)
                  </p>
                </div>
                <Link
                  to="/planner"
                  className="text-xs font-semibold text-terracotta-400 hover:text-terracotta-300 flex items-center gap-1"
                >
                  <span>Full View</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Day 1 Quick View */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 font-mono text-xs font-bold">
                    DAY 01 SCHEDULE
                  </span>
                  <span className="text-xs text-warmwhite-300/60">56 km Scenic ECR Drive</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-charcoal-850 border border-white/5 space-y-1">
                    <p className="text-[10px] text-terracotta-400 font-mono">09:00 AM</p>
                    <p className="font-bold text-white">Mylapore Rayar's Mess</p>
                    <p className="text-[11px] text-warmwhite-300/70">Authentic breakfast & degree coffee</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-charcoal-850 border border-white/5 space-y-1">
                    <p className="text-[10px] text-terracotta-400 font-mono">10:30 AM</p>
                    <p className="font-bold text-white">UNESCO Shore Temple</p>
                    <p className="text-[11px] text-warmwhite-300/70">Audio heritage walk & monoliths</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-charcoal-850 border border-white/5 space-y-1">
                    <p className="text-[10px] text-terracotta-400 font-mono">01:00 PM</p>
                    <p className="font-bold text-white">Seaview Banana Leaf Mess</p>
                    <p className="text-[11px] text-warmwhite-300/70">Traditional regional feast</p>
                  </div>
                </div>
              </div>

              {/* Dynamic suggestion notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Real-time Crowd Insight:</p>
                  <p className="text-warmwhite-200 mt-0.5 text-[11px]">
                    Shore Temple crowds peak around 11:30 AM. Arriving at 09:30 AM guarantees effortless parking and pristine photography angles.
                  </p>
                </div>
              </div>
            </div>

            {/* Saved Places */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  Saved Places ({savedList.length})
                </h3>
                <Link to="/destinations" className="text-xs text-terracotta-400 hover:text-white">
                  Explore More
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {savedList.map((d) => (
                  <Link
                    key={d.id}
                    to={`/destinations/${d.id}`}
                    className="p-3 rounded-2xl bg-charcoal-850 border border-white/5 hover:border-white/20 transition-all flex items-center gap-3 group"
                  >
                    <img src={d.image} alt={d.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate group-hover:text-terracotta-400 transition-colors">
                        {d.name}
                      </p>
                      <p className="text-[10px] text-warmwhite-300/60 truncate">{d.district}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Passport & Fast Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Digital Passport Preview */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Tourist Passport
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  ACTIVE
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/5 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-white">{user?.name || 'Siva'}</p>
                    <p className="text-[10px] text-terracotta-400 font-mono">ID: TN-884291</p>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] text-warmwhite-300/70">
                    <span>District Progress</span>
                    <span>12 / 38 Stamped</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-charcoal-800 overflow-hidden">
                    <div className="h-full bg-terracotta-500 rounded-full w-[31.5%]" />
                  </div>
                </div>
              </div>

              <Link
                to="/pass"
                className="w-full py-2.5 rounded-xl bg-charcoal-800 hover:bg-terracotta-500 hover:text-white text-warmwhite-200 text-xs font-semibold text-center transition-colors block border border-white/10"
              >
                OPEN DIGITAL TRAVEL PASS
              </Link>
            </div>

            {/* Quick Links Nav List */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-4 space-y-1 text-xs">
              <Link to="/map" className="p-3 rounded-xl hover:bg-charcoal-800 flex items-center justify-between text-warmwhite-200 hover:text-white transition-colors">
                <span className="flex items-center gap-2.5">
                  <Map className="w-4 h-4 text-oceanblue-400" />
                  <span>Smart Geographic Map</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link to="/budget" className="p-3 rounded-xl hover:bg-charcoal-800 flex items-center justify-between text-warmwhite-200 hover:text-white transition-colors">
                <span className="flex items-center gap-2.5">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>Smart Budget Tracker</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link to="/experiences" className="p-3 rounded-xl hover:bg-charcoal-800 flex items-center justify-between text-warmwhite-200 hover:text-white transition-colors">
                <span className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-sand-400" />
                  <span>Artisan Marketplace</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link to="/journey" className="p-3 rounded-xl hover:bg-charcoal-800 flex items-center justify-between text-warmwhite-200 hover:text-white transition-colors">
                <span className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-terracotta-400" />
                  <span>My Tamil Nadu Journey</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
