import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Compass, ShieldCheck, Clock, Users, ArrowRight, 
  MapPin, Star, Heart, CheckCircle2, ChevronRight, Zap, 
  Coins, Award, BarChart3, HelpCircle, Utensils, Landmark,
  Map as MapIcon, Calendar, ArrowUpRight
} from 'lucide-react';
import { Hero3D } from '../components/common/Hero3D';
import { DestinationCarousel3D } from '../components/common/DestinationCarousel3D';
import { DestinationCard3D } from '../components/common/DestinationCard3D';
import { TAMIL_NADU_DESTINATIONS, LOCAL_EXPERIENCES, ARTISANS } from '../data/tamilNaduData';
import { useLanguage } from '../context/LanguageContext';

// New specialized modular sections
import { AIMoodSelector } from '../components/landing/AIMoodSelector';
import { LiveTamilNaduDashboard } from '../components/landing/LiveTamilNaduDashboard';
import { DestinationUniverse3D } from '../components/landing/DestinationUniverse3D';
import { SmartJourneyTimeline } from '../components/landing/SmartJourneyTimeline';
import { HiddenGemsSection } from '../components/landing/HiddenGemsSection';
import { SmartFoodDiscovery } from '../components/landing/SmartFoodDiscovery';
import { AIPackingAssistant } from '../components/landing/AIPackingAssistant';
import { FestivalEventsDiscovery } from '../components/landing/FestivalEventsDiscovery';
import { AITravelStoryGenerator } from '../components/landing/AITravelStoryGenerator';
import { AIVoiceCompanionSection } from '../components/landing/AIVoiceCompanionSection';
import { RoleEcosystemSection } from '../components/landing/RoleEcosystemSection';
import { FinalHeroCTA } from '../components/landing/FinalHeroCTA';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'All' | 'Heritage' | 'Temples' | 'Beaches' | 'Hill Station'>('All');

  const filteredDestinations = activeTab === 'All'
    ? TAMIL_NADU_DESTINATIONS.slice(0, 6)
    : TAMIL_NADU_DESTINATIONS.filter(d => d.category === activeTab).slice(0, 6);

  return (
    <div className="w-full bg-charcoal-950 text-warmwhite-100 overflow-x-hidden">
      
      {/* 1. CINEMATIC 3D HERO (100vh height with swipable cards and dynamic background) */}
      <Hero3D />

      {/* 2. AI MOOD SELECTOR & "WHERE SHOULD I GO?" NATURAL LANGUAGE ADVISORY */}
      <AIMoodSelector />

      {/* 3. LIVE TAMIL NADU GLASS DASHBOARD (Telemetry: Weather, Crowd, Highway Flow, Events, Spend) */}
      <LiveTamilNaduDashboard />

      {/* 4. 3D TAMIL NADU DESTINATION UNIVERSE (14 Destinations with 3D Elevation & Preview Flyout) */}
      <DestinationUniverse3D />

      {/* 5. WHY OORTRIP AI — TRAVEL DIFFERENTLY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <p className="text-xs uppercase tracking-widest font-bold text-terracotta-400">
            THE DIGITAL TOURISM ADVANTAGE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Travel Differently
          </h2>
          <p className="text-sm sm:text-base text-warmwhite-300/80 leading-relaxed">
            Unlike generic travel booking engines or static guidebooks, OorTrip AI combines deep regional Dravidian heritage intelligence with real-time predictive optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 hover:border-terracotta-500/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">AI Trip Planning</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Personalized journeys based on your budget, interests, group requirements, and transit pace in seconds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 hover:border-sand-400/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-sand-400/15 border border-sand-400/30 flex items-center justify-center text-sand-400 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Smart Discovery</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Discover famous UNESCO monuments and tranquil hidden gems before crowds arrive with predictive timing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 hover:border-oceanblue-400/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-oceanblue-400/15 border border-oceanblue-400/30 flex items-center justify-center text-oceanblue-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Local Experiences</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Connect directly with generational master artisans, pit-loom silk guilds, and culinary masters with zero middlemen.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 hover:border-templegreen-400/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-templegreen-400/15 border border-templegreen-400/30 flex items-center justify-center text-templegreen-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Intelligent Travel</h3>
            <p className="text-xs text-warmwhite-300/80 leading-relaxed">
              Dynamically adapt plans according to live weather conditions, festival crowds, and accessible transit needs.
            </p>
          </div>

        </div>
      </section>

      {/* 6. AI TRIP PLANNER INTERACTIVE PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/15 p-8 sm:p-12 shadow-depth-3d relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-600/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 text-xs font-semibold border border-terracotta-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NINE-PARAMETER AI ALGORITHM</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                "I have ₹5,000. I have 2 days. Starting from Chennai..."
              </h2>
              <p className="text-sm text-warmwhite-300/80 leading-relaxed">
                Feed your starting location, budget, travel group, and interests into OorTrip AI. In seconds, receive an hour-by-hour itinerary with scenic transit times, verified food stops, and automated budget balancing.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-charcoal-950 border border-white/10 text-warmwhite-200">
                  📍 Start: Chennai
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-charcoal-950 border border-white/10 text-warmwhite-200">
                  💰 Budget: ₹5,000
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-charcoal-950 border border-white/10 text-warmwhite-200">
                  🗓️ Duration: 2 Days
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-charcoal-950 border border-white/10 text-terracotta-400">
                  🏛️ Heritage + 🍲 Vegetarian Food
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-charcoal-950/80 border border-white/10 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center text-white shadow-lg shadow-terracotta-500/40">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Experience AI Planner</h4>
                <p className="text-xs text-warmwhite-300/70 mt-1">Multi-step interactive flow with instant 3D route rendering</p>
              </div>
              <Link
                to="/planner"
                className="w-full py-3.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>✦ GENERATE MY JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. 3D-STYLE DESTINATION CAROUSEL WITH SWIPE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <p className="text-xs uppercase tracking-widest font-bold text-terracotta-400">
            CINEMATIC IMMERSION
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            3D Destination Carousel
          </h2>
          <p className="text-xs sm:text-sm text-warmwhite-300/70">
            Swipe left or right, or drag cards with your mouse to discover signature Tamil Nadu landmarks.
          </p>
        </div>

        <DestinationCarousel3D destinations={TAMIL_NADU_DESTINATIONS} />
      </section>

      {/* 8. SMART JOURNEY TIMELINE & AI DYNAMIC REROUTING BANNER */}
      <SmartJourneyTimeline />

      {/* 9. SMART INTERACTIVE MAP SHOWCASE (MAPBOX HD TILES & HERITAGE CORRIDOR) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-8 sm:p-12 relative overflow-hidden shadow-depth-3d">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-terracotta-400">
                MAPBOX HD VECTOR ENGINE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Interactive Smart Map & Heritage Corridor
              </h2>
              <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
                Explore our 2D OpenStreetMap & Mapbox HD canvas. Toggle seamlessly between Dark Mode, Outdoors, and Satellite views, and trace the illuminated Heritage Corridor across 8 historic districts.
              </p>

              <div className="flex flex-wrap gap-2 text-xs pt-1">
                <span className="px-3 py-1 rounded-xl bg-charcoal-950 border border-white/10 text-warmwhite-200">
                  🗺️ Mapbox Dark & Satellite
                </span>
                <span className="px-3 py-1 rounded-xl bg-charcoal-950 border border-white/10 text-warmwhite-200">
                  📍 14 Live Coordinate Pins
                </span>
                <span className="px-3 py-1 rounded-xl bg-charcoal-950 border border-white/10 text-warmwhite-200">
                  ⚡ Animated "Fly-To" Camera
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  <MapIcon className="w-4 h-4" />
                  <span>EXPLORE SMART MAP →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl bg-charcoal-950 border border-white/10 p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Heritage Corridor Active
                </span>
                <span className="text-xs text-sand-300 font-mono">8 DISTRIC TRAIL</span>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-white/5 space-y-2 text-xs">
                <p className="text-warmwhite-200 font-medium">
                  <strong>Corridor:</strong> Chennai → Mahabalipuram → Kanchipuram → Thanjavur → Trichy → Madurai → Rameswaram → Kanyakumari
                </p>
                <p className="text-[11px] text-warmwhite-300/70">
                  Connects Dravidian stone architecture with pristine ocean horizons across 780 km.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. HIDDEN GEMS: DISCOVER BEYOND THE CROWDS */}
      <HiddenGemsSection />

      {/* 11. LOCAL EXPERIENCES & ARTISAN STORIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-terracotta-400">
              MEET THE PEOPLE BEHIND THE CULTURE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Local Experiences & Artisans
            </h2>
            <p className="text-xs sm:text-sm text-warmwhite-300/70 mt-1">
              Immerse yourself in authentic Tamil traditions curated by local families and national awardees.
            </p>
          </div>
          <Link
            to="/experiences"
            className="text-xs font-semibold text-terracotta-400 hover:text-terracotta-300 flex items-center gap-1"
          >
            <span>Browse All Experiences</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCAL_EXPERIENCES.map((exp) => (
            <div key={exp.id} className="rounded-2xl bg-charcoal-900 border border-white/10 overflow-hidden shadow-depth-sm flex flex-col group">
              <div className="h-44 relative overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white">
                  {exp.category}
                </span>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-terracotta-500 text-white text-[11px] font-bold">
                  ₹{exp.price} / person
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-terracotta-400 transition-colors line-clamp-1">
                    {exp.title}
                  </h4>
                  <p className="text-[11px] text-warmwhite-300/70 mt-0.5">By {exp.hostName} ({exp.location})</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-amber-400 font-semibold">★ {exp.rating} ({exp.reviewsCount})</span>
                  <span className="text-warmwhite-300/60 text-[11px]">{exp.duration}</span>
                </div>

                <Link
                  to="/experiences"
                  className="w-full py-2 rounded-lg bg-charcoal-800 hover:bg-terracotta-500 hover:text-white text-warmwhite-200 text-xs font-semibold text-center transition-colors border border-white/10"
                >
                  VIEW & BOOK
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. SMART FOOD DISCOVERY (DIETARY FILTERS & LOCAL SPECIALTIES) */}
      <SmartFoodDiscovery />

      {/* 13. AI PACKING ASSISTANT (DESTINATION & DURATION AWARE) */}
      <AIPackingAssistant />

      {/* 14. DIGITAL TOURIST PASS, ECO SCORE & SMART BUDGET DASHBOARD */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Digital Tourist Pass Widget */}
          <div className="lg:col-span-6 rounded-3xl bg-charcoal-900 border border-white/15 p-8 space-y-6 shadow-depth-3d">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-terracotta-400">
                  DIGITAL PASSPORT & GAMIFICATION
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Digital Tourist Pass
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                1,250 PTS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
              Earn verified stamps as you explore Tamil Nadu's 38 districts. Collect heritage explorer badges, accumulate tourist credits for eco-transit choices, and celebrate travel milestones.
            </p>

            <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold">Pass # TN-PASS-2026-8842</span>
                <span className="text-sand-300 font-semibold">Tier: Explorer</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Chennai 🏛️', 'Mahabalipuram 🌊', 'Kanchipuram 🪡', 'Madurai 🪔'].map((stamp) => (
                  <span key={stamp} className="px-3 py-1 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white">
                    {stamp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-warmwhite-300/60 block">Eco Travel Score</span>
                <span className="text-base font-bold text-emerald-400">92 / 100 Points</span>
              </div>
              <Link
                to="/pass"
                className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                <span>OPEN MY PASS →</span>
              </Link>
            </div>
          </div>

          {/* Smart Budget Widget */}
          <div className="lg:col-span-6 rounded-3xl bg-charcoal-900 border border-white/15 p-8 space-y-6 shadow-depth-3d">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-sand-400">
                  REAL-TIME EXPENSE TRACKER
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Smart Budget Optimizer
                </h3>
              </div>
              <span className="text-xs font-bold text-terracotta-400">₹15,000 BUDGET</span>
            </div>

            <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
              Real-time spend categorization against your initial plan with automatic currency formatting and AI public transport savings tips.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/5">
                <p className="text-[11px] text-warmwhite-300/60">Spent So Far</p>
                <p className="font-serif text-2xl font-bold text-white mt-1">₹8,450</p>
                <span className="text-[10px] text-amber-400">56% utilized</span>
              </div>
              <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/5">
                <p className="text-[11px] text-warmwhite-300/60">Remaining Balance</p>
                <p className="font-serif text-2xl font-bold text-emerald-400 mt-1">₹6,550</p>
                <span className="text-[10px] text-emerald-400">Safe budget margin</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
              💡 <strong>AI Tip:</strong> You can save approximately ₹850 by taking the scenic suburban train along the coast between Chennai and Chengalpattu.
            </div>

            <div className="pt-1 text-right">
              <Link
                to="/budget"
                className="inline-flex items-center gap-2 text-xs font-bold text-terracotta-400 hover:text-terracotta-300"
              >
                <span>TRACK MY EXPENSES →</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 15. AI VOICE TRAVEL COMPANION (MULTILINGUAL SPOKEN PROMPTS) */}
      <AIVoiceCompanionSection />

      {/* 16. AI TRAVEL STORY GENERATOR & TRAVEL COMPANION SHARING */}
      <AITravelStoryGenerator />

      {/* 17. FESTIVAL & EVENTS DISCOVERY */}
      <FestivalEventsDiscovery />

      {/* 18. ROLE-BASED TOURISM ECOSYSTEM (TOURISTS + LOCAL BUSINESS + TTDC ADMIN) */}
      <RoleEcosystemSection />

      {/* 19. FINAL CINEMATIC HERO CTA (WITH OFFICIAL TAMIL NADU SEAL) */}
      <FinalHeroCTA />

    </div>
  );
};
