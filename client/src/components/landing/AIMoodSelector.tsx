import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass, Heart, MapPin, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface MoodOption {
  id: string;
  icon: string;
  label: string;
  tagline: string;
  route: string;
  cities: string[];
  days: number;
  estCost: number;
  highlights: string[];
  image: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'food',
    icon: '🍛',
    label: 'Food & Culinary',
    tagline: 'Legendary Chettinad spices, Kari Dosa & filter coffee',
    route: 'Madurai → Chettinad → Thanjavur',
    cities: ['Madurai', 'Chettinad', 'Thanjavur'],
    days: 3,
    estCost: 6500,
    highlights: ['Famous Jigarthanda', 'Chettinad Banana Leaf Feast', 'Degree Filter Coffee'],
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'heritage',
    icon: '🏛️',
    label: 'Heritage & UNESCO',
    tagline: '1,000-year-old Chola vimanas & Pallava coastal monoliths',
    route: 'Chennai → Mahabalipuram → Thanjavur',
    cities: ['Mahabalipuram', 'Thanjavur', 'Kanchipuram'],
    days: 3,
    estCost: 5200,
    highlights: ['UNESCO Shore Temple', 'Brihadeeswara Big Temple', 'Kailasanathar Shrines'],
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'relax',
    icon: '🌊',
    label: 'Relax & Coastal',
    tagline: 'French cobbled boulevards & sunrise ocean breeze',
    route: 'Chennai ECR → Pondicherry → Mahabalipuram',
    cities: ['Pondicherry', 'Mahabalipuram', 'Chennai'],
    days: 2,
    estCost: 4500,
    highlights: ['Promenade Beach Walk', 'Auroville Matrimandir', 'Secluded Covelong Bay'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nature',
    icon: '🌿',
    label: 'Nature & Mist',
    tagline: 'Emerald tea slopes, Nilgiri toy trains & pine valleys',
    route: 'Coimbatore → Ooty → Kodaikanal',
    cities: ['Ooty', 'Kodaikanal', 'Coimbatore'],
    days: 4,
    estCost: 9800,
    highlights: ['Nilgiri Mountain Railway', 'Pine Forest Trail', 'Pykara Lake Boating'],
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spiritual',
    icon: '🛕',
    label: 'Spiritual Darshan',
    tagline: 'Sacred Moksha puris, holy sea theerthams & thousand pillars',
    route: 'Kanchipuram → Trichy → Madurai → Rameswaram',
    cities: ['Rameswaram', 'Madurai', 'Trichy'],
    days: 4,
    estCost: 7200,
    highlights: ['Pamban Island Sea Wells', 'Meenakshi 14 Towers', 'Srirangam Ranganatha'],
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'adventure',
    icon: '🧗',
    label: 'Adventure & Hills',
    tagline: 'Western Ghats wilderness trails, dolphins nose & waterfalls',
    route: 'Pollachi → Topslip → Kodaikanal',
    cities: ['Kodaikanal', 'Coimbatore', 'Yercaud'],
    days: 3,
    estCost: 6800,
    highlights: ['Vattakanal Trek', 'Anamalai Safari', 'Kiliyur Falls Hike'],
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    label: 'Family Comfort',
    tagline: 'Wheelchair-accessible shrines, toy trains & safe beaches',
    route: 'Chennai → Mahabalipuram → Pondicherry',
    cities: ['Chennai', 'Mahabalipuram', 'Pondicherry'],
    days: 3,
    estCost: 8500,
    highlights: ['Marina Disabled Boardwalk', 'Shore Temple Lawns', 'French Quarter Cafes'],
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'romantic',
    icon: '❤️',
    label: 'Romantic Escapes',
    tagline: 'Secluded heritage villas, candlelit French dinners & sunset peaks',
    route: 'Pondicherry → Chettinad Palaces → Yercaud',
    cities: ['Pondicherry', 'Chettinad', 'Yercaud'],
    days: 3,
    estCost: 11500,
    highlights: ['Heritage Mansion Suites', 'Promenade Golden Hour', 'Emerald Lake Stroll'],
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  }
];

export const AIMoodSelector: React.FC = () => {
  const [selectedMoodId, setSelectedMoodId] = useState<string>('food');
  const [naturalQuery, setNaturalQuery] = useState<string>('');
  const [customRecommendation, setCustomRecommendation] = useState<{
    route: string;
    days: number;
    cost: number;
    tags: string[];
    description: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const activeMood = MOODS.find((m) => m.id === selectedMoodId) || MOODS[0];

  // Natural Language AI matcher
  const handleAnalyzePrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!naturalQuery.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const q = naturalQuery.toLowerCase();
      let match = {
        route: 'Madurai → Chettinad → Thanjavur',
        days: 3,
        cost: 8500,
        tags: ['Food', 'Heritage', 'Culture'],
        description: 'Authentic Chettinad spicy feasts, iconic Brihadeeswara stone architecture, and Madurai night bazaar.',
      };

      if (q.includes('beach') || q.includes('sea') || q.includes('relax') || q.includes('peace')) {
        match = {
          route: 'Chennai ECR → Mahabalipuram → Pondicherry',
          days: 2,
          cost: 5400,
          tags: ['Beaches', 'French Quarter', 'Sunset'],
          description: 'Scenic East Coast Road coastal drive, shore monuments, and French boulevard tranquility.',
        };
      } else if (q.includes('cool') || q.includes('hill') || q.includes('tea') || q.includes('mountain')) {
        match = {
          route: 'Coimbatore → Ooty → Kodaikanal',
          days: 4,
          cost: 10200,
          tags: ['Hill Station', 'Tea Gardens', 'Nature'],
          description: 'Crisp mountain mist, UNESCO toy train through tunnels, and tranquil boat rides on Kodai Lake.',
        };
      } else if (q.includes('temple') || q.includes('spiritual') || q.includes('darshan')) {
        match = {
          route: 'Kanchipuram → Thanjavur → Madurai',
          days: 3,
          cost: 6200,
          tags: ['Temples', 'Chola Architecture', 'Darshan'],
          description: 'Ancient Pallava stone shrines, golden hour at the Big Temple, and divine evening prayers in Madurai.',
        };
      }

      setCustomRecommendation(match);
      setIsAnalyzing(false);
    }, 450);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-terracotta-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTUITIVE AI DISCOVERY</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          What’s Your Journey Mood?
        </h2>
        <p className="text-sm sm:text-base text-warmwhite-300/80 leading-relaxed">
          Select your vibe or describe your dream vacation in plain words. OorTrip AI tailors Tamil Nadu’s landscape to match your state of mind.
        </p>
      </div>

      {/* 3D Mood Interactive Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {MOODS.map((m) => {
          const isSelected = m.id === selectedMoodId;
          return (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMoodId(m.id);
                setCustomRecommendation(null);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                isSelected
                  ? 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white border-terracotta-400 shadow-glow-terracotta scale-105'
                  : 'bg-charcoal-900/90 text-warmwhite-200 border-white/10 hover:border-white/25 hover:bg-charcoal-850'
              }`}
            >
              <span className="text-base">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Mood Result Card */}
      <div className="rounded-3xl bg-charcoal-900 border border-white/15 overflow-hidden shadow-depth-3d mb-16 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Destination Imagery */}
        <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[280px] overflow-hidden">
          <ImageWithFallback
            src={activeMood.image}
            alt={activeMood.label}
            category={activeMood.label}
            label={activeMood.route}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal-950 via-charcoal-950/40 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/10 flex items-center gap-1.5">
              <span>{activeMood.icon}</span>
              <span>{activeMood.label.toUpperCase()}</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <p className="text-xs uppercase tracking-widest font-bold text-sand-300">
              OPTIMIZED TRAIL
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {activeMood.route}
            </h3>
          </div>
        </div>

        {/* Right Side: AI Route Details */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-terracotta-400 uppercase tracking-wider">AI Curated Match</span>
              <p className="text-base sm:text-lg text-warmwhite-100 font-serif font-medium mt-1">
                "{activeMood.tagline}"
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-charcoal-950/80 border border-white/10 text-xs">
              <div>
                <p className="text-[10px] text-warmwhite-300/60 font-medium uppercase">Ideal Duration</p>
                <p className="font-bold text-white text-sm mt-0.5">{activeMood.days} Days</p>
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 font-medium uppercase">Est. Spend</p>
                <p className="font-bold text-white text-sm mt-0.5">₹{activeMood.estCost}</p>
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 font-medium uppercase">Pace</p>
                <p className="font-bold text-emerald-400 text-sm mt-0.5">Balanced</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-warmwhite-300 uppercase tracking-wider">Curated Highlights</p>
              <div className="flex flex-wrap gap-2">
                {activeMood.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-charcoal-800 text-xs text-warmwhite-200 border border-white/10 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-terracotta-400" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to={`/planner?mood=${activeMood.id}&dest=${activeMood.cities[0].toLowerCase()}`}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build This Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/destinations/${activeMood.cities[0].toLowerCase()}`}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-200 text-xs font-semibold border border-white/10 transition-colors text-center"
            >
              Explore {activeMood.cities[0]}
            </Link>
          </div>
        </div>

      </div>

      {/* SECTION 12: "WHERE SHOULD I GO?" NATURAL LANGUAGE PROMPT */}
      <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/15 p-6 sm:p-10 shadow-depth-md">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase font-bold tracking-widest text-sand-400">
              NATURAL LANGUAGE DISCOVERY
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Not Sure Where to Go?
            </h3>
            <p className="text-xs sm:text-sm text-warmwhite-300/80">
              Describe your dream getaway naturally in plain English or Tamil words:
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleAnalyzePrompt} className="relative flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              placeholder="e.g. I want a peaceful 3-day trip with good food and quiet temples..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-charcoal-950 border border-white/15 text-sm text-white placeholder-warmwhite-300/40 focus:outline-none focus:border-terracotta-500 transition-colors shadow-inner"
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Ask AI'}</span>
            </button>
          </form>

          {/* Quick Clickable Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-warmwhite-300/70">
            <span>Try:</span>
            {[
              'Peaceful beach weekend from Chennai',
              'Ancient temple architecture and silk looms',
              'Cool misty hill station with tea plantations',
              'Chettinad food safari with family'
            ].map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNaturalQuery(s);
                  setTimeout(() => handleAnalyzePrompt(), 50);
                }}
                className="px-2.5 py-1 rounded-lg bg-charcoal-800/80 hover:bg-charcoal-800 text-sand-300 hover:text-white border border-white/10 transition-colors text-[11px]"
              >
                "{s}"
              </button>
            ))}
          </div>

          {/* AI Result Card */}
          {customRecommendation && (
            <div className="p-5 rounded-2xl bg-charcoal-950 border border-terracotta-500/40 shadow-depth-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-terracotta-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>YOUR AI RECOMMENDATION</span>
                </span>
                <span className="text-xs text-warmwhite-300/60 font-medium">
                  {customRecommendation.days} Days • ₹{customRecommendation.cost} estimated
                </span>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-white">{customRecommendation.route}</h4>
                <p className="text-xs text-warmwhite-300/90 mt-1 leading-relaxed">
                  {customRecommendation.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  {customRecommendation.tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-warmwhite-200">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to="/planner"
                  className="px-5 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>✦ Build This Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
};
