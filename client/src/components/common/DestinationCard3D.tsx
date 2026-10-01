import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight, Heart, Users } from 'lucide-react';
import { Destination } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ImageWithFallback } from './ImageWithFallback';

interface DestinationCard3DProps {
  destination: Destination;
}

export const DestinationCard3D: React.FC<DestinationCard3DProps> = ({ destination }) => {
  const { user, toggleSavedPlace } = useAuth();
  const isSaved = user?.savedPlaces?.includes(destination.id);

  const crowdColors = {
    LOW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    MEDIUM: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    HIGH: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  };

  return (
    <div className="relative group tilt-card rounded-2xl bg-charcoal-900 border border-white/10 overflow-hidden shadow-depth-sm transition-all duration-300 flex flex-col h-full">
      
      {/* Top Image Container */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          category={destination.category}
          label={destination.name}
          className="w-full h-full object-cover cinematic-img group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-terracotta-400" />
            {destination.district}
          </span>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border ${crowdColors[destination.crowdLevel]}`}>
              {destination.crowdLevel} CROWD
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSavedPlace(destination.id);
              }}
              className="p-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-warmwhite-200 hover:text-rose-400 border border-white/10 transition-colors"
              title={isSaved ? 'Remove from Saved' : 'Save Destination'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title Overlay on Image Bottom */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-sand-300">
            {destination.category}
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-terracotta-400 transition-colors">
            {destination.name}
          </h3>
          <p className="text-[11px] text-warmwhite-300/80 italic line-clamp-1">
            "{destination.tagline}"
          </p>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <p className="text-xs text-warmwhite-300/80 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>★ {destination.rating}</span>
            <span className="text-[10px] text-warmwhite-300/60 font-normal">({destination.reviewCount})</span>
          </div>

          <div className="text-right text-warmwhite-200 font-medium">
            <span className="text-white font-semibold">₹{destination.estimatedCost}</span>
            <span className="text-[10px] text-warmwhite-300/60 ml-1">avg</span>
          </div>

          <div className="flex items-center gap-1.5 text-warmwhite-300/70 text-[11px]">
            <Clock className="w-3 h-3 text-terracotta-400" />
            <span>{destination.duration}</span>
          </div>

          <div className="text-right text-[11px] text-warmwhite-300/70 truncate">
            <span>{destination.bestTime.split('(')[0]}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-warmwhite-300/50 font-mono">
            {destination.highlights[0]}
          </span>

          <Link
            to={`/destinations/${destination.id}`}
            className="px-4 py-2 rounded-lg bg-terracotta-500/15 hover:bg-terracotta-500 text-terracotta-400 hover:text-white text-xs font-semibold tracking-wide border border-terracotta-500/30 transition-all duration-200 flex items-center gap-1.5 group/btn"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
