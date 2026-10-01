import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Compass, MapPin, Star, ArrowRight, ShieldCheck, 
  Clock, Users, ChevronLeft, ChevronRight, MoveHorizontal, Heart
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroDestination {
  id: string;
  name: string;
  tamilName: string;
  tagline: string;
  subtitle: string;
  category: string;
  rating: number;
  reviews: string;
  crowd: string;
  cost: string;
  duration: string;
  timing: string;
  badge: string;
  image: string;
  bgImage: string;
}

const HERO_DESTINATIONS: HeroDestination[] = [
  {
    id: 'mahabalipuram',
    name: 'MAHABALIPURAM',
    tamilName: 'மகாபலிபுரம் (மாமல்லபுரம்)',
    tagline: 'Where history meets the sea.',
    subtitle: 'Ancient Shore Temple & Monoliths',
    category: 'Heritage',
    rating: 4.8,
    reviews: '3.8k reviews',
    crowd: 'MEDIUM CROWD',
    cost: '₹800',
    duration: '3–4 hours',
    timing: 'Optimal Darshan: 6:30 AM',
    badge: 'UNESCO World Heritage',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'chennai',
    name: 'CHENNAI',
    tamilName: 'சென்னை',
    tagline: 'Gateway to South India & Cultural Capital.',
    subtitle: 'Mylapore Temples & Marina Promenade',
    category: 'Culture',
    rating: 4.7,
    reviews: '9.1k reviews',
    crowd: 'MEDIUM CROWD',
    cost: '₹1,500',
    duration: '1–2 days',
    timing: 'Morning Walk: 5:45 AM',
    badge: 'Cultural Gateway',
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'kanchipuram',
    name: 'KANCHIPURAM',
    tamilName: 'காஞ்சிபுரம்',
    tagline: 'City of a Thousand Temples & Silk.',
    subtitle: 'Pallava Sandstone Shrines & Silk Looms',
    category: 'Temples',
    rating: 4.8,
    reviews: '4.2k reviews',
    crowd: 'LOW CROWD',
    cost: '₹1,200',
    duration: '4–6 hours',
    timing: 'Temple Darshan: 7:00 AM',
    badge: 'Moksha Puri & Silk Heritage',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'pondicherry',
    name: 'PONDICHERRY',
    tamilName: 'பாண்டிச்சேரி (புதுச்சேரி)',
    tagline: 'A French Colonial Coastal Promenade.',
    subtitle: 'Cobbled Lanes & Promenade Beach',
    category: 'Beaches',
    rating: 4.8,
    reviews: '6.8k reviews',
    crowd: 'MEDIUM CROWD',
    cost: '₹2,000',
    duration: '1–2 days',
    timing: 'Promenade Breeze: 6:00 AM',
    badge: 'Franco-Tamil Heritage',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'thanjavur',
    name: 'THANJAVUR',
    tamilName: 'தஞ்சாவூர்',
    tagline: 'The Imperial Throne of the Great Cholas.',
    subtitle: 'Brihadeeswara 1,000-Year Vimana',
    category: 'Heritage',
    rating: 4.9,
    reviews: '5.4k reviews',
    crowd: 'MEDIUM CROWD',
    cost: '₹950',
    duration: '4–5 hours',
    timing: 'Golden Sunset: 4:30 PM',
    badge: 'UNESCO Living Chola Wonder',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'madurai',
    name: 'MADURAI',
    tamilName: 'மதுரை',
    tagline: 'The Sleepless City of Jasmine and Kings.',
    subtitle: 'Meenakshi Amman 14 Tower Gopuram',
    category: 'Culture',
    rating: 4.9,
    reviews: '8.8k reviews',
    crowd: 'HIGH CROWD',
    cost: '₹1,400',
    duration: '1–2 days',
    timing: 'Palliarai Pooja: 9:00 PM',
    badge: 'Pandyan Crown & Malli GI',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'ooty',
    name: 'OOTY',
    tamilName: 'ஊட்டி (உதகமண்டலம்)',
    tagline: 'Queen of Hill Stations in Blue Mountains.',
    subtitle: 'Emerald Tea Gardens & Toy Train',
    category: 'Hill Station',
    rating: 4.8,
    reviews: '8.2k reviews',
    crowd: 'MEDIUM CROWD',
    cost: '₹2,800',
    duration: '2–3 days',
    timing: 'Morning Tea Walk: 7:30 AM',
    badge: 'UNESCO Mountain Railway',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=80',
  }
];

export const Hero3D: React.FC = () => {
  const { t } = useLanguage();
  const { user, toggleSavedPlace } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  // Active Card Index for 3D Swipable Deck
  const [activeIndex, setActiveIndex] = useState(0);

  // Swipe & Drag Gesture State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Parallax offsets
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffsets({ x, y });
  };

  const handleMouseLeave = () => {
    setOffsets({ x: 0, y: 0 });
    if (isMouseDown) {
      handleDragEnd();
    }
  };

  // Cycle to Next Card
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % HERO_DESTINATIONS.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Cycle to Previous Card
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? HERO_DESTINATIONS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Touch Handlers (Mobile Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setDragDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - touchStartX;
    setDragDeltaX(delta);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setDragDeltaX(0);
  };

  // Mouse Drag Handlers (Desktop Swipe)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
  };

  const handleMouseDrag = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    if (Math.abs(dragDeltaX) > 45) {
      if (dragDeltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragDeltaX(0);
  };

  // Get current active & layered background destinations
  const currentDest = HERO_DESTINATIONS[activeIndex];
  const nextDest1 = HERO_DESTINATIONS[(activeIndex + 1) % HERO_DESTINATIONS.length];
  const nextDest2 = HERO_DESTINATIONS[(activeIndex + 2) % HERO_DESTINATIONS.length];
  const nextDest3 = HERO_DESTINATIONS[(activeIndex + 3) % HERO_DESTINATIONS.length];

  const isCurrentSaved = user?.savedPlaces?.includes(currentDest.id);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-charcoal-950 py-16 lg:py-24 select-none"
    >
      {/* Background Cinematic Backdrop with Smooth Dynamic Transition */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-out scale-105"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(18, 21, 26, 0.5) 0%, rgba(11, 13, 16, 0.96) 85%), url("${currentDest.bgImage}")`,
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${offsets.x * -18}px, ${offsets.y * -18}px, 0px) scale(1.06)`,
        }}
      />

      {/* Subtle Ambient Atmosphere Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/20 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-oceanblue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Typography & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-850/90 border border-white/10 text-xs text-warmwhite-200 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-medium tracking-wide">
                DISCOVER TAMIL NADU • DIGITAL TOURISM
              </span>
            </div>

            {/* Editorial Heading */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                OORTRIP <span className="text-terracotta-500">AI</span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-sand-300 font-medium">
                Your Intelligent Tamil Nadu Travel Companion
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-warmwhite-300/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Plan smarter. Explore deeper. Experience Tamil Nadu with real-time crowd prediction, authentic local artisan encounters, and seamless AI itinerary personalization.
            </p>

            {/* Key Value Micro-Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-warmwhite-300/70 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-templegreen-400" />
                Crowd & Weather Aware
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-terracotta-400" />
                Dynamic Itineraries
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-oceanblue-400" />
                Local Artisan Guilds
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/planner"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-sm tracking-wide shadow-depth-md hover:shadow-glow-terracotta transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                <span>PLAN MY TRIP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/destinations"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-charcoal-850/90 hover:bg-charcoal-800 text-warmwhite-100 font-medium text-sm tracking-wide border border-white/10 hover:border-white/25 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-sand-400" />
                <span>EXPLORE TAMIL NADU</span>
              </Link>
            </div>
          </div>

          {/* Right Layered 3D Swipable Card Showcase */}
          <div className="lg:col-span-6 relative perspective-container py-8 flex flex-col items-center justify-center min-h-[500px]">
            
            {/* Gesture Hint Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900/90 border border-white/15 text-[11px] text-warmwhite-300/80 mb-3 shadow-depth-sm">
              <MoveHorizontal className="w-3.5 h-3.5 text-terracotta-400 animate-pulse" />
              <span>Swipe card left/right or click back cards</span>
            </div>

            {/* The 3D Swipable Stage Container */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseDrag}
              onMouseUp={handleDragEnd}
              className={`relative w-full max-w-sm sm:max-w-md h-[430px] flex items-center justify-center touch-pan-y ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              
              {/* BACKGROUND CARD LEFT: Click to Switch */}
              <div
                onClick={() => setActiveIndex((activeIndex + 1) % HERO_DESTINATIONS.length)}
                className="absolute w-60 sm:w-72 rounded-2xl overflow-hidden glass-panel border border-white/10 p-3 shadow-depth-md transition-all duration-500 cursor-pointer hidden sm:block hover:border-terracotta-500/50 hover:opacity-100"
                style={{
                  top: '6%',
                  left: '-4%',
                  zIndex: 10,
                  transform: isReducedMotion
                    ? 'rotate(-7deg) scale(0.88)'
                    : `translate3d(${offsets.x * 25 - 25}px, ${offsets.y * 25 + 10}px, -45px) rotate(-7deg) scale(0.9)`,
                  opacity: 0.78,
                }}
                title={`Click to view ${nextDest1.name}`}
              >
                <div className="h-28 rounded-xl overflow-hidden relative mb-2">
                  <ImageWithFallback
                    src={nextDest1.image}
                    alt={nextDest1.name}
                    label={nextDest1.name}
                    category={nextDest1.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm">
                    {nextDest1.name}
                  </span>
                </div>
                <p className="text-xs text-warmwhite-200 font-medium truncate">{nextDest1.subtitle}</p>
                <p className="text-[10px] text-terracotta-400 font-semibold mt-0.5">Click to view ↗</p>
              </div>

              {/* BACKGROUND CARD RIGHT: Click to Switch */}
              <div
                onClick={() => setActiveIndex((activeIndex + 2) % HERO_DESTINATIONS.length)}
                className="absolute w-60 sm:w-72 rounded-2xl overflow-hidden glass-panel border border-white/10 p-3 shadow-depth-md transition-all duration-500 cursor-pointer hidden sm:block hover:border-terracotta-500/50 hover:opacity-100"
                style={{
                  top: '12%',
                  right: '-4%',
                  zIndex: 12,
                  transform: isReducedMotion
                    ? 'rotate(6deg) scale(0.9)'
                    : `translate3d(${offsets.x * -20 + 25}px, ${offsets.y * -20 - 10}px, -35px) rotate(6deg) scale(0.9)`,
                  opacity: 0.82,
                }}
                title={`Click to view ${nextDest2.name}`}
              >
                <div className="h-28 rounded-xl overflow-hidden relative mb-2">
                  <ImageWithFallback
                    src={nextDest2.image}
                    alt={nextDest2.name}
                    label={nextDest2.name}
                    category={nextDest2.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 to-transparent pointer-events-none" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm">
                    {nextDest2.name}
                  </span>
                </div>
                <p className="text-xs text-warmwhite-200 font-medium truncate">{nextDest2.subtitle}</p>
                <p className="text-[10px] text-terracotta-400 font-semibold mt-0.5">Click to view ↗</p>
              </div>

              {/* BACKGROUND CARD BOTTOM-LEFT: Click to Switch */}
              <div
                onClick={() => setActiveIndex((activeIndex + 3) % HERO_DESTINATIONS.length)}
                className="absolute w-60 sm:w-72 rounded-2xl overflow-hidden glass-panel border border-white/10 p-2.5 shadow-depth-md transition-all duration-500 cursor-pointer hidden md:block hover:border-terracotta-500/50 hover:opacity-100"
                style={{
                  bottom: '-2%',
                  left: '6%',
                  zIndex: 14,
                  transform: isReducedMotion
                    ? 'rotate(-3deg) scale(0.92)'
                    : `translate3d(${offsets.x * 15}px, ${offsets.y * 15 + 20}px, -20px) rotate(-3deg) scale(0.92)`,
                  opacity: 0.88,
                }}
                title={`Click to view ${nextDest3.name}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={nextDest3.image}
                      alt={nextDest3.name}
                      label={nextDest3.name}
                      category={nextDest3.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{nextDest3.name}</p>
                    <p className="text-[10px] text-terracotta-400 truncate">{nextDest3.subtitle}</p>
                    <p className="text-[9px] text-warmwhite-300/60 font-medium">★ {nextDest3.rating} • Tap to view</p>
                  </div>
                </div>
              </div>

              {/* MAIN DOMINANT FOREGROUND SWIPABLE 3D CARD */}
              <div
                className="relative w-full rounded-3xl overflow-hidden bg-charcoal-900/95 border border-white/25 p-4 sm:p-5 shadow-depth-3d transition-transform duration-300 ease-out z-20 group"
                style={{
                  transform: isReducedMotion
                    ? `translateX(${dragDeltaX}px)`
                    : `translate3d(${offsets.x * -35 + dragDeltaX}px, ${offsets.y * -35}px, 40px) rotateX(${offsets.y * -8}deg) rotateY(${offsets.x * 8 + dragDeltaX * 0.04}deg) rotateZ(${dragDeltaX * 0.02}deg)`,
                }}
              >
                {/* Destination Image with Cinematic Crop */}
                <div className="h-56 sm:h-64 rounded-2xl overflow-hidden relative pointer-events-none">
                  <ImageWithFallback
                    src={currentDest.image}
                    alt={currentDest.name}
                    label={currentDest.name}
                    category={currentDest.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent pointer-events-none" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-terracotta-400" />
                      {currentDest.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-amber-500/40">
                      {currentDest.crowd}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavedPlace(currentDest.id);
                      }}
                      className="p-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-warmwhite-200 hover:text-rose-400 border border-white/10 pointer-events-auto transition-colors"
                      title={isCurrentSaved ? 'Remove from Saved' : 'Save Destination'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isCurrentSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Destination Heading on Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-sand-300">
                      Featured Destination • {activeIndex + 1} of {HERO_DESTINATIONS.length}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      {currentDest.name}
                    </h2>
                    <p className="text-xs text-warmwhite-200 italic mt-0.5 line-clamp-1">
                      "{currentDest.tagline}"
                    </p>
                  </div>
                </div>

                {/* Card Meta & Stats */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{currentDest.rating}</span>
                      <span className="text-warmwhite-300/60 font-normal">({currentDest.reviews})</span>
                    </div>
                    <div className="text-warmwhite-300/80">
                      <span className="font-semibold text-white">{currentDest.cost}</span> average • {currentDest.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs text-emerald-400 font-medium">{currentDest.timing}</span>
                    </div>

                    <Link
                      to={`/destinations/${currentDest.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 pointer-events-auto"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Swipe Controls: Arrows & Indicators */}
            <div className="flex items-center justify-center gap-4 mt-4 z-20">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-charcoal-900/90 hover:bg-charcoal-800 text-warmwhite-100 border border-white/15 hover:border-white/30 transition-all shadow-depth-sm active:scale-95 flex items-center justify-center"
                aria-label="Previous destination card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {HERO_DESTINATIONS.map((dest, i) => (
                  <button
                    key={dest.id}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-7 bg-terracotta-500'
                        : 'w-2 bg-charcoal-700 hover:bg-charcoal-600'
                    }`}
                    aria-label={`Switch to ${dest.name}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-charcoal-900/90 hover:bg-charcoal-800 text-warmwhite-100 border border-white/15 hover:border-white/30 transition-all shadow-depth-sm active:scale-95 flex items-center justify-center"
                aria-label="Next destination card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
