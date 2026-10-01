import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowRight, Sparkles, Filter, Compass } from 'lucide-react';
import { TAMIL_NADU_DESTINATIONS } from '../../data/tamilNaduData';
import { Destination } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const DestinationUniverse3D: React.FC = () => {
  const [selectedDestId, setSelectedDestId] = useState<string>('mahabalipuram');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Heritage', 'Temples', 'Beaches', 'Hill Station', 'Culture', 'Nature', 'Village Experiences'];

  const filtered = selectedFilter === 'All'
    ? TAMIL_NADU_DESTINATIONS
    : TAMIL_NADU_DESTINATIONS.filter((d) => d.category === selectedFilter);

  const activeDestination = TAMIL_NADU_DESTINATIONS.find((d) => d.id === selectedDestId) || TAMIL_NADU_DESTINATIONS[0];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-400/15 border border-sand-400/30 text-sand-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-sand-400" />
            <span>14 SIGNATURE HUBS • 38 DISTRICTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            3D Destination Universe
          </h2>
          <p className="text-sm text-warmwhite-300/80 max-w-2xl leading-relaxed">
            Hover over any landmark to see it lift with 3D elevation. Explore the royal dynasties, sacred corridors, and mist-clad hills of Tamil Nadu.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === c
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-charcoal-900 text-warmwhite-300/80 hover:text-white hover:bg-charcoal-800 border border-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Spatial Grid + Focused Preview Flyout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 3D Spatial Matrix (14 destinations) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 perspective-container">
          {filtered.map((dest) => {
            const isSelected = dest.id === selectedDestId;
            return (
              <div
                key={dest.id}
                onClick={() => setSelectedDestId(dest.id)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border ${
                  isSelected
                    ? 'border-terracotta-500 ring-2 ring-terracotta-500/50 shadow-glow-terracotta scale-105 z-20'
                    : 'border-white/10 hover:border-white/30 hover:scale-102 bg-charcoal-900'
                }`}
                style={{
                  transform: isSelected
                    ? 'translateZ(30px) rotateX(4deg)'
                    : 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative h-32 sm:h-36 overflow-hidden">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    category={dest.category}
                    label={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent pointer-events-none" />

                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-white border border-white/10">
                    {dest.district}
                  </span>

                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <p className="text-[9px] uppercase font-bold text-sand-300 truncate">{dest.category}</p>
                    <h4 className="font-serif text-sm font-bold text-white truncate">{dest.name}</h4>
                  </div>
                </div>

                <div className="p-2.5 bg-charcoal-900/90 flex items-center justify-between text-[11px] border-t border-white/5">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{dest.rating}</span>
                  </span>
                  <span className="text-warmwhite-300/70 font-medium">₹{dest.estimatedCost}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Destination Preview Card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-3xl bg-charcoal-900 border border-white/20 p-5 shadow-depth-3d space-y-4">
            
            {/* Image Header */}
            <div className="relative h-56 rounded-2xl overflow-hidden bg-charcoal-800">
              <ImageWithFallback
                src={activeDestination.image}
                alt={activeDestination.name}
                category={activeDestination.category}
                label={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-400" />
                <span>{activeDestination.location}</span>
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-terracotta-500/20 border border-terracotta-500/40 text-[10px] font-bold text-terracotta-300">
                {activeDestination.crowdLevel} CROWD
              </div>

              <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                <p className="text-xs uppercase font-bold text-sand-300 tracking-wider">
                  {activeDestination.tamilName}
                </p>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {activeDestination.name}
                </h3>
                <p className="text-xs text-warmwhite-300/90 italic line-clamp-1">
                  "{activeDestination.tagline}"
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-white/10">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>★ {activeDestination.rating} / 5.0</span>
              </div>
              <div className="text-right text-warmwhite-200 font-medium">
                ₹{activeDestination.estimatedCost} avg spend
              </div>
              <div className="flex items-center gap-1 text-warmwhite-300/70 text-[11px]">
                <Clock className="w-3 h-3 text-terracotta-400" />
                <span>{activeDestination.duration}</span>
              </div>
              <div className="text-right text-emerald-400 text-[11px] font-medium truncate">
                {activeDestination.bestTime.split('(')[0]}
              </div>
            </div>

            <p className="text-xs text-warmwhite-300/80 line-clamp-3 leading-relaxed">
              {activeDestination.description}
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to={`/planner?dest=${activeDestination.id}`}
                className="py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-100 font-semibold text-xs text-center border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Plan Route</span>
              </Link>

              <Link
                to={`/destinations/${activeDestination.id}`}
                className="py-2.5 px-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Explore Place</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
