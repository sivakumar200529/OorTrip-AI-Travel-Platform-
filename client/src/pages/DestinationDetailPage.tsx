import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Clock, Sparkles, Volume2, ShieldCheck, 
  Accessibility, Users, CloudRain, Heart, ArrowLeft, 
  CheckCircle2, AlertTriangle, MessageSquare, ThumbsUp, 
  ThumbsDown, ChevronRight, Share2
} from 'lucide-react';
import { TAMIL_NADU_DESTINATIONS } from '../data/tamilNaduData';
import { HeritageGuideModal } from '../components/common/HeritageGuideModal';
import { useAuth } from '../context/AuthContext';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, toggleSavedPlace } = useAuth();
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const destination = TAMIL_NADU_DESTINATIONS.find((d) => d.id === id) || TAMIL_NADU_DESTINATIONS[0];
  const isSaved = user?.savedPlaces?.includes(destination.id);

  // Sample reviews for this destination
  const reviews = [
    {
      id: 'rev-1',
      author: 'Karthik Raman',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '2 days ago',
      comment: 'The sunrise view of the Shore Temple is pure magic. Followed OorTrip AI recommendation to arrive at 6:30 AM and had the ocean stones entirely to myself before tour buses pulled in!',
      sentiment: 'positive',
      tags: ['Cleanliness', 'Timing', 'Photography']
    },
    {
      id: 'rev-2',
      author: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      rating: 4,
      date: '1 week ago',
      comment: 'Breathtaking Pallava sculptures! Parking near Five Rathas was slightly tight around noon, but the stone carving workshops along the street made the walk completely worthwhile.',
      sentiment: 'issue',
      tags: ['Parking', 'Artisans', 'Walking']
    }
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-warmwhite-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSavedPlace(destination.id)}
              className="px-3.5 py-1.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-850 text-warmwhite-200 border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isSaved ? 'Saved in Trip' : 'Save to Favorites'}</span>
            </button>
          </div>
        </div>

        {/* HERO BANNER SECTION */}
        <div className="rounded-3xl bg-charcoal-900 border border-white/15 overflow-hidden shadow-depth-3d">
          <div className="relative h-[340px] sm:h-[460px] overflow-hidden">
            <img
              src={selectedImage || destination.image}
              alt={destination.name}
              className="w-full h-full object-cover cinematic-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

            {/* Badges on Banner */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-xs font-bold text-white border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-terracotta-400" />
                {destination.location}
              </span>

              <span className="px-3 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-xs font-bold text-sand-300 border border-white/10">
                {destination.category}
              </span>
            </div>

            {/* Editorial Heading (Section 6) */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <p className="text-xs uppercase font-bold tracking-widest text-sand-400 font-mono">
                {destination.tamilName}
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {destination.name.toUpperCase()}
              </h1>
              <p className="font-serif text-base sm:text-xl text-warmwhite-200 italic max-w-2xl">
                "{destination.tagline}"
              </p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="p-4 sm:p-6 bg-charcoal-900 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Rating</p>
                <p className="font-bold text-white text-sm">★ {destination.rating} / 5.0</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Suggested Duration</p>
                <p className="font-bold text-white text-sm">{destination.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-oceanblue-500/15 text-oceanblue-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Estimated Spend</p>
                <p className="font-bold text-white text-sm">₹{destination.estimatedCost} avg</p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setGuideModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <Volume2 className="w-4 h-4" />
                <span>LISTEN TO GUIDE</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN TWO-COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Description & Highlights & Accessibility */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">About the Destination</h3>
              <p className="text-xs sm:text-sm text-warmwhite-300/90 leading-relaxed">
                {destination.description}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">Key Highlights</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-charcoal-850 border border-white/5 text-xs text-warmwhite-200 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accessibility Profile (Section 32) */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-templegreen-400" />
                  <h3 className="font-serif text-lg font-bold text-white">Accessible Travel Profile</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-templegreen-500/20 text-templegreen-400 font-semibold">
                  VERIFIED INFRASTRUCTURE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60">Wheelchair Ramps</p>
                  <p className="font-bold text-white mt-0.5">{destination.accessibility.wheelchair ? '✓ Available' : '✗ Limited'}</p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60">Steps / Incline</p>
                  <p className="font-bold text-white mt-0.5">{destination.accessibility.stepsCount} Steps</p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60">Seating & Rest Areas</p>
                  <p className="font-bold text-white mt-0.5">{destination.accessibility.seatingRestAreas ? '✓ Plentiful' : '✗ Limited'}</p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60">Disabled Parking</p>
                  <p className="font-bold text-white mt-0.5">{destination.accessibility.parkingAvailable ? '✓ Reserved Bays' : '✗ General Only'}</p>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60">Restrooms</p>
                  <p className="font-bold text-white mt-0.5">{destination.accessibility.restroomAvailable ? '✓ Main Gate' : '✗ Nearby'}</p>
                </div>
              </div>

              <p className="text-xs text-warmwhite-300/70 italic bg-charcoal-950 p-3 rounded-xl border border-white/5">
                Note: {destination.accessibility.notes}
              </p>
            </div>

            {/* Tourist Reviews & AI Sentiment Analysis (Section 33) */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-terracotta-400" />
                    Tourist Reviews & AI Sentiment Analysis
                  </h3>
                  <p className="text-xs text-warmwhite-300/70 mt-0.5">
                    Aggregated feedback analyzed by OorTrip Natural Language Engine
                  </p>
                </div>
              </div>

              {/* Sentiment Summary Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                  <p className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                    <ThumbsUp className="w-3.5 h-3.5" /> High Tourist Praise:
                  </p>
                  <p className="text-warmwhite-200 text-[11px]">
                    Shore Temple sunrise atmosphere, historic stone carvings preservation, authentic banana leaf food nearby.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                    <ThumbsDown className="w-3.5 h-3.5" /> Known Pain Points:
                  </p>
                  <p className="text-warmwhite-200 text-[11px]">
                    Midday sun exposure (carry umbrellas/hats), parking queue during Sunday afternoons.
                  </p>
                </div>
              </div>

              {/* Review Items */}
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-charcoal-850 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={r.avatar} alt={r.author} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-white text-xs">{r.author}</p>
                          <p className="text-[10px] text-warmwhite-300/50">{r.date}</p>
                        </div>
                      </div>
                      <span className="text-amber-400 font-bold text-xs">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-xs text-warmwhite-300/90 leading-relaxed">{r.comment}</p>
                    <div className="flex gap-1.5 pt-1">
                      {r.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-charcoal-900 text-warmwhite-300/70 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Crowd Prediction & Weather & Nearby */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Crowd Prediction Card (Section 29) */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-terracotta-400 font-bold">
                  PREDICTIVE CONGESTION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-950 text-warmwhite-300/60 font-mono">
                  DEMO DATA
                </span>
              </div>

              <h4 className="font-serif text-lg font-bold text-white">Crowd Forecast</h4>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60 uppercase">Morning</p>
                  <p className="font-bold text-amber-400 mt-1">MEDIUM</p>
                  <span className="text-[9px] text-warmwhite-300/50">07:00 – 11:00</span>
                </div>
                <div className="p-2.5 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60 uppercase">Afternoon</p>
                  <p className="font-bold text-rose-400 mt-1">HIGH</p>
                  <span className="text-[9px] text-warmwhite-300/50">12:00 – 15:30</span>
                </div>
                <div className="p-2.5 rounded-xl bg-charcoal-850 border border-white/5">
                  <p className="text-[10px] text-warmwhite-300/60 uppercase">Evening</p>
                  <p className="font-bold text-emerald-400 mt-1">MEDIUM</p>
                  <span className="text-[9px] text-warmwhite-300/50">16:00 – 18:30</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                <strong>Recommended Visiting Window:</strong> {destination.crowdForecast.bestTimeToVisit}
              </div>
            </div>

            {/* Weather Card (Section 30) */}
            {destination.weatherInfo && (
              <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-oceanblue-400 font-bold">
                    WEATHER RADAR
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal-950 text-warmwhite-300/60 font-mono">
                    DEMO DATA
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-2xl font-bold text-white">{destination.weatherInfo.temp}</p>
                    <p className="text-xs text-warmwhite-300/70">{destination.weatherInfo.condition}</p>
                  </div>
                  <CloudRain className="w-8 h-8 text-oceanblue-400" />
                </div>
                {destination.weatherInfo.alert && (
                  <p className="text-[11px] text-amber-300 bg-amber-500/15 p-2.5 rounded-xl border border-amber-500/30">
                    ⚠️ {destination.weatherInfo.alert}
                  </p>
                )}
              </div>
            )}

            {/* Nearby Attractions */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-white">Nearby Sites in Circuit</h4>
              <div className="space-y-2">
                {destination.nearbyPlaces.map((np) => (
                  <div key={np.name} className="p-3 rounded-xl bg-charcoal-850 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{np.name}</p>
                      <p className="text-[10px] text-terracotta-400">{np.category}</p>
                    </div>
                    <span className="font-mono text-[11px] text-warmwhite-300/60">{np.distance}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Heritage Guide Audio Modal */}
      <HeritageGuideModal
        destination={destination}
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </div>
  );
};
