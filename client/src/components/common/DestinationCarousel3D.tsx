import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, ArrowRight, MoveHorizontal } from 'lucide-react';
import { Destination } from '../../types';
import { ImageWithFallback } from './ImageWithFallback';

interface DestinationCarousel3DProps {
  destinations: Destination[];
}

export const DestinationCarousel3D: React.FC<DestinationCarousel3DProps> = ({ destinations }) => {
  // Feature top 7 iconic destinations for the carousel
  const carouselItems = destinations.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(1); // Center on Mahabalipuram initially

  // Swipe / Drag state tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setDragDistance(currentX - touchStartX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Verify it's a predominantly horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setDragDistance(0);
  };

  // Mouse drag handlers for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setDragStartX(e.clientX);
    setDragDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const diff = e.clientX - dragStartX;
    setDragDistance(diff);
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    if (Math.abs(dragDistance) > 45) {
      if (dragDistance < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragDistance(0);
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      if (Math.abs(dragDistance) > 45) {
        if (dragDistance < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      setDragDistance(0);
    }
  };

  return (
    <div className="relative w-full py-10 px-4 overflow-hidden select-none">
      
      {/* 3D Stage Container with Swipe / Drag Listeners */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`relative max-w-5xl mx-auto h-[510px] flex items-center justify-center perspective-container touch-pan-y ${
          isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {carouselItems.map((item, index) => {
          // Calculate distance from activeIndex
          let offset = index - activeIndex;
          if (offset < -Math.floor(carouselItems.length / 2)) {
            offset += carouselItems.length;
          } else if (offset > Math.floor(carouselItems.length / 2)) {
            offset -= carouselItems.length;
          }

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // Transform values for 3D depth with optional subtle drag deflection
          const dragInfluence = isCenter ? dragDistance * 0.25 : 0;
          const translateX = offset * 260 + dragInfluence; // Spread horizontally
          const translateZ = isCenter ? 60 : -100 * Math.abs(offset);
          const rotateY = isCenter ? (dragDistance ? dragDistance * -0.05 : 0) : offset > 0 ? -12 : 12;
          const scale = isCenter ? 1.05 : 0.82;
          const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.25;
          const zIndex = 30 - Math.abs(offset) * 10;

          return (
            <div
              key={item.id}
              onClick={() => {
                // If user just dragged, don't trigger click
                if (Math.abs(dragDistance) < 10) {
                  setActiveIndex(index);
                }
              }}
              className="absolute w-[310px] sm:w-[380px] rounded-3xl overflow-hidden bg-charcoal-900 border border-white/15 transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                boxShadow: isCenter
                  ? '0 30px 60px -12px rgba(0,0,0,0.8), 0 0 35px rgba(211,91,45,0.25)'
                  : '0 15px 30px -10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  category={item.category}
                  label={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white">
                  <MapPin className="w-3 h-3 text-terracotta-400" />
                  <span>{item.district}</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-terracotta-500/20 border border-terracotta-500/40 text-[10px] font-semibold text-terracotta-300">
                  {item.crowdLevel} CROWD
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[10px] uppercase font-semibold text-sand-300 tracking-wider">{item.category}</p>
                  <h4 className="font-serif text-2xl font-bold text-white tracking-wide">{item.name}</h4>
                  <p className="text-xs text-warmwhite-300/80 italic line-clamp-1">{item.tagline}</p>
                </div>
              </div>

              {/* Card Bottom Meta */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-warmwhite-300/90">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-[10px] text-warmwhite-300/50">({item.reviewCount})</span>
                  </div>
                  <div className="font-medium text-white">
                    ₹{item.estimatedCost} avg
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-warmwhite-300/70">
                    <Clock className="w-3 h-3 text-terracotta-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {isCenter ? (
                  <Link
                    to={`/destinations/${item.id}`}
                    onClick={(e) => {
                      if (Math.abs(dragDistance) > 10) {
                        e.preventDefault();
                      }
                      e.stopPropagation();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 pointer-events-auto"
                  >
                    <span>EXPLORE DESTINATION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div className="text-center text-[11px] text-warmwhite-300/60 font-medium">
                    Click or swipe to select
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe Hint */}
      <div className="flex items-center justify-center gap-2 text-xs text-warmwhite-300/50 -mt-2 mb-4">
        <MoveHorizontal className="w-3.5 h-3.5 text-terracotta-400 animate-pulse" />
        <span>Swipe left or right, or drag cards to explore</span>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-100 border border-white/10 hover:border-white/30 transition-all shadow-depth-sm active:scale-95"
          aria-label="Previous destination"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-terracotta-500' : 'w-2 bg-charcoal-700 hover:bg-charcoal-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-100 border border-white/10 hover:border-white/30 transition-all shadow-depth-sm active:scale-95"
          aria-label="Next destination"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
