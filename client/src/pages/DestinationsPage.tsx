import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';
import { TAMIL_NADU_DESTINATIONS } from '../data/tamilNaduData';
import { DestinationCard3D } from '../components/common/DestinationCard3D';

export const DestinationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [crowdFilter, setCrowdFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'cost' | 'name'>('rating');

  const categories = ['All', 'Heritage', 'Temples', 'Beaches', 'Culture', 'Hill Station', 'Nature', 'Village Experiences'];
  const crowdOptions = ['All', 'LOW', 'MEDIUM', 'HIGH'];

  const filtered = useMemo(() => {
    return TAMIL_NADU_DESTINATIONS.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = category === 'All' || d.category === category;
      const matchCrowd = crowdFilter === 'All' || d.crowdLevel === crowdFilter;
      return matchSearch && matchCat && matchCrowd;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'cost') return a.estimatedCost - b.estimatedCost;
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, category, crowdFilter, sortBy]);

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 text-xs font-semibold border border-terracotta-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVER ALL 14 ICONIC HUBS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tamil Nadu Travel Catalog
          </h1>
          <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
            From the rock relief of Arjuna's Penance to the emerald tea gardens of Doddabetta and the Dravidian towers of Madurai.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-5 shadow-depth-sm space-y-4">
          
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-warmwhite-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, temple, beach, or district..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-xs text-white placeholder-warmwhite-300/40 focus:outline-none focus:border-terracotta-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-warmwhite-300/60 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-charcoal-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-terracotta-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="cost">Lowest Cost</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category & Crowd Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-white/5">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    category === c
                      ? 'bg-terracotta-500 text-white shadow-sm'
                      : 'bg-charcoal-850 text-warmwhite-300 hover:text-white border border-white/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Crowd Level Filter */}
            <div className="flex items-center gap-1.5 shrink-0 text-xs">
              <span className="text-warmwhite-300/60 font-semibold uppercase text-[10px]">Crowd:</span>
              {crowdOptions.map((co) => (
                <button
                  key={co}
                  onClick={() => setCrowdFilter(co)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    crowdFilter === co
                      ? 'bg-charcoal-700 text-white border border-white/20'
                      : 'text-warmwhite-300/60 hover:text-white'
                  }`}
                >
                  {co}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Count & Mock Notice */}
        <div className="flex items-center justify-between text-xs text-warmwhite-300/60 px-1">
          <p>SHOWING {filtered.length} OF 14 DESTINATIONS</p>
          <span className="font-mono text-[10px] text-terracotta-400 bg-charcoal-900 px-2 py-0.5 rounded border border-white/5">
            DEMO DATA VERIFIED
          </span>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((destination) => (
            <DestinationCard3D key={destination.id} destination={destination} />
          ))}
        </div>

      </div>
    </div>
  );
};
