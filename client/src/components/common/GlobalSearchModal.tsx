import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, MapPin, Star, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { TAMIL_NADU_DESTINATIONS, LOCAL_EXPERIENCES } from '../../data/tamilNaduData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCrowd, setSelectedCrowd] = useState<string>('All');

  const categories = ['All', 'Heritage', 'Temples', 'Beaches', 'Culture', 'Hill Station', 'Nature', 'Village Experiences'];

  const results = useMemo(() => {
    return TAMIL_NADU_DESTINATIONS.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase())) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchCrowd = selectedCrowd === 'All' || d.crowdLevel === selectedCrowd;

      return matchSearch && matchCategory && matchCrowd;
    });
  }, [searchTerm, selectedCategory, selectedCrowd]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-charcoal-900 border border-white/15 shadow-depth-3d overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar Header */}
        <div className="p-4 bg-charcoal-850 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-terracotta-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Tamil Nadu destinations, temples, beaches, food, hill stations..."
            className="flex-1 bg-transparent text-sm text-white placeholder-warmwhite-300/40 focus:outline-none"
            autoFocus
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-warmwhite-300/60 hover:text-white text-xs">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-lg text-warmwhite-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-charcoal-950/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-warmwhite-300/60 uppercase font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-terracotta-500 text-white font-medium shadow-sm'
                  : 'bg-charcoal-800 text-warmwhite-300 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-warmwhite-300/60 pb-1">
            <span>FOUND {results.length} DESTINATIONS</span>
            <span className="text-[11px] font-mono text-terracotta-400">DEMO DATABASE</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-warmwhite-300/60 space-y-2">
              <p className="text-sm">No destinations found matching "{searchTerm}".</p>
              <p className="text-xs">Try searching "Mahabalipuram", "Temples", "Chettinad", or "Beach".</p>
            </div>
          ) : (
            results.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-2xl bg-charcoal-850 hover:bg-charcoal-800 border border-white/5 hover:border-white/20 transition-all group"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-terracotta-400 transition-colors truncate">
                      {dest.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-charcoal-900 text-sand-300 border border-white/10 shrink-0">
                      {dest.category}
                    </span>
                  </div>
                  <p className="text-xs text-warmwhite-300/80 truncate mt-0.5">{dest.tagline}</p>
                  <div className="flex items-center gap-3 text-[11px] text-warmwhite-300/60 mt-1">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {dest.rating}
                    </span>
                    <span>₹{dest.estimatedCost} avg</span>
                    <span>{dest.duration}</span>
                    <span className="text-terracotta-400">{dest.crowdLevel} CROWD</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-warmwhite-300/40 group-hover:text-terracotta-400 group-hover:translate-x-1 transition-all shrink-0 mr-2" />
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
