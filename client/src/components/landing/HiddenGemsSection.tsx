import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Clock, Users, ArrowDown, Compass } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface GemPair {
  id: string;
  popular: {
    name: string;
    location: string;
    crowd: string;
    image: string;
  };
  hidden: {
    name: string;
    location: string;
    distance: string;
    time: string;
    experienceType: string;
    crowd: string;
    description: string;
    image: string;
  };
}

const GEMS: GemPair[] = [
  {
    id: 'gem-1',
    popular: {
      name: 'Shore Temple, Mahabalipuram',
      location: 'Chengalpattu District',
      crowd: 'HIGH CROWD (90-min wait)',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    },
    hidden: {
      name: 'Sadras Dutch Fort & Coastal Cannons',
      location: '14 km South of Mahabalipuram',
      distance: '14 km away',
      time: '20 min drive',
      experienceType: '17th-Century Coastal Fort & Cemetery',
      crowd: 'ZERO QUEUES (Peaceful)',
      description: 'Well-preserved brick ramparts, Dutch governor mansion, and secluded coastline overlooking fishing catamarans with no ticket queues.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    }
  },
  {
    id: 'gem-2',
    popular: {
      name: 'Ooty Botanical Gardens',
      location: 'Nilgiris District',
      crowd: 'HIGH DENSITY (Tour buses)',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    },
    hidden: {
      name: 'Kotagiri Longwood Shola Forest',
      location: '28 km East of Ooty',
      distance: '28 km away',
      time: '45 min drive',
      experienceType: 'Pristine Indigenous Rainforest Trek',
      crowd: 'PRISTINE & SERENE',
      description: 'Last natural primeval shola forest of the Nilgiris, home to barking deer, giant Malabar squirrels, and ancient moss-draped evergreen canopies.',
      image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80',
    }
  },
  {
    id: 'gem-3',
    popular: {
      name: 'Brihadeeswara Big Temple',
      location: 'Thanjavur Center',
      crowd: 'PEAK DARSHAN SPIKE',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    },
    hidden: {
      name: 'Darasuram Airavatesvara Temple',
      location: '36 km North-East (Kumbakonam)',
      distance: '36 km away',
      time: '50 min drive',
      experienceType: 'Intricate UNESCO Chola Jewel',
      crowd: 'CALM & INTIMATE',
      description: 'Built by Rajaraja II with sculpted stone chariot wheels pulled by horses and musical steps producing seven swaras, free of heavy crowds.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    }
  }
];

export const HiddenGemsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTELLIGENT CROWD DISPERSAL</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Discover Beyond the Crowds
        </h2>
        <p className="text-sm text-warmwhite-300/80 leading-relaxed">
          Skip 90-minute queues and crowded tour buses. When iconic landmarks experience peak traffic, OorTrip AI recommends nearby tranquil wonders.
        </p>
      </div>

      {/* 3 Gem Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {GEMS.map((pair) => (
          <div
            key={pair.id}
            className="rounded-3xl bg-charcoal-900 border border-white/15 p-5 shadow-depth-md flex flex-col justify-between space-y-5 hover:border-white/25 transition-all"
          >
            {/* Top: Popular Landmark (Crowded) */}
            <div className="p-3.5 rounded-2xl bg-charcoal-950/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-warmwhite-300/60 uppercase">POPULAR LANDMARK</span>
                <span className="text-rose-400 font-mono">{pair.popular.crowd}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={pair.popular.image}
                    alt={pair.popular.name}
                    label={pair.popular.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-bold text-white truncate">{pair.popular.name}</h4>
                  <p className="text-[11px] text-warmwhite-300/60 truncate">{pair.popular.location}</p>
                </div>
              </div>
            </div>

            {/* Middle: AI Alternative Indicator */}
            <div className="flex items-center justify-center gap-2 text-terracotta-400 text-xs font-bold uppercase tracking-wider py-1">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>OorTrip AI Alternative</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* Bottom: Less Crowded Hidden Gem */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-charcoal-850 to-charcoal-950 border border-emerald-500/30 space-y-3 flex-1 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                    {pair.hidden.crowd}
                  </span>
                  <span className="text-[11px] text-sand-300 font-mono">{pair.hidden.distance}</span>
                </div>

                <div className="relative h-32 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={pair.hidden.image}
                    alt={pair.hidden.name}
                    label={pair.hidden.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 text-[10px] text-warmwhite-200 font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                    {pair.hidden.time}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-white">{pair.hidden.name}</h4>
                  <p className="text-[11px] text-terracotta-400 font-semibold">{pair.hidden.experienceType}</p>
                  <p className="text-xs text-warmwhite-300/80 mt-1.5 line-clamp-2 leading-relaxed">
                    {pair.hidden.description}
                  </p>
                </div>
              </div>

              <Link
                to="/map"
                className="w-full py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-terracotta-500 hover:text-white text-warmwhite-100 font-semibold text-xs text-center border border-white/10 transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Discover On Smart Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
