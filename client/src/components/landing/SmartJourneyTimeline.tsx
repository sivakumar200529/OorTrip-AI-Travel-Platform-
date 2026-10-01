import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Clock, MapPin, AlertTriangle, CheckCircle, 
  CloudRain, ShieldAlert, Sparkles, Navigation, Check
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface TimelineNode {
  id: string;
  name: string;
  order: number;
  distanceFromPrev: string;
  travelTime: string;
  estimatedSpend: string;
  crowd: 'LOW' | 'MEDIUM' | 'HIGH';
  activities: string[];
  image: string;
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    id: 'chennai',
    name: 'Chennai',
    order: 1,
    distanceFromPrev: 'Origin',
    travelTime: 'Start Point',
    estimatedSpend: '₹1,500',
    crowd: 'MEDIUM',
    activities: ['Kapaleeshwarar Darshan', 'Mylapore Filter Coffee', 'Marina Beach Sunrise Walk'],
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    order: 2,
    distanceFromPrev: '56 km via ECR',
    travelTime: '1 hr 15 mins',
    estimatedSpend: '₹800',
    crowd: 'HIGH',
    activities: ['UNESCO Shore Temple', "Krishna's Butterball", 'Five Rathas Stone Workshop'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    order: 3,
    distanceFromPrev: '66 km inland',
    travelTime: '1 hr 30 mins',
    estimatedSpend: '₹1,200',
    crowd: 'LOW',
    activities: ['Kanchi Kailasanathar Sandstone', 'Traditional Silk Pit-Loom Guild', 'Ekambareswarar Shrine'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    order: 4,
    distanceFromPrev: '240 km scenic highway',
    travelTime: '3 hrs 45 mins',
    estimatedSpend: '₹950',
    crowd: 'MEDIUM',
    activities: ['Brihadeeswara 1000-Yr Vimana', 'Maratha Royal Palace', 'Saraswathi Mahal Palm Leaves'],
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'madurai',
    name: 'Madurai',
    order: 5,
    distanceFromPrev: '190 km expressway',
    travelTime: '2 hrs 40 mins',
    estimatedSpend: '₹1,400',
    crowd: 'HIGH',
    activities: ['Meenakshi Amman 14 Towers', 'Famous Jigarthanda Tasting', 'Thirumalai Nayakkar Light Show'],
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
  }
];

export const SmartJourneyTimeline: React.FC = () => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(1); // Mahabalipuram default
  const [rerouteState, setRerouteState] = useState<'pending' | 'accepted' | 'dismissed'>('pending');

  const activeNode = TIMELINE_NODES[selectedNodeIndex];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-terracotta-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5" />
          <span>CONNECTED HISTORIC TRAIL</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Smart Journey Timeline
        </h2>
        <p className="text-sm text-warmwhite-300/80 leading-relaxed">
          Watch your trip unfold as a sequence of connected 3D milestone nodes. Tap any stop to review photos, transit estimates, and crowd predictions.
        </p>
      </div>

      {/* Section 18: AI DYNAMIC REROUTING NOTIFICATION BANNER */}
      {rerouteState !== 'dismissed' && (
        <div className="mb-12 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-amber-950/70 via-charcoal-900 to-charcoal-900 border border-amber-500/40 p-5 sm:p-6 shadow-depth-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex-shrink-0 mt-0.5">
              <CloudRain className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>JOURNEY UPDATE ALERT</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-mono">
                  LIVE CLIMATE RE-ROUTE
                </span>
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                Heavy rain expected in Kodaikanal.
              </h4>
              <p className="text-xs text-warmwhite-300/80 max-w-xl">
                {rerouteState === 'accepted'
                  ? '✓ Route adjusted to Yercaud (Eastern Ghats). Clear skies, similar coffee valleys, and savings of ₹1,400.'
                  : 'AI recommends switching to Yercaud: better weather forecast, similar tranquil nature, and 0 road closures.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-shrink-0">
            {rerouteState === 'pending' ? (
              <>
                <button
                  onClick={() => setRerouteState('accepted')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Accept AI Reroute</span>
                </button>
                <button
                  onClick={() => setRerouteState('dismissed')}
                  className="px-3.5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-warmwhite-300 text-xs font-medium border border-white/10 transition-colors"
                >
                  Keep Original
                </button>
              </>
            ) : (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle className="w-4 h-4" />
                <span>Reroute Active</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3D Horizontal Stepper Pipeline */}
      <div className="relative mb-12 py-6 overflow-x-auto no-scrollbar">
        <div className="min-w-[700px] flex items-center justify-between relative px-6">
          
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-terracotta-500 via-amber-500 to-terracotta-500 -translate-y-1/2 z-0 opacity-40 rounded-full" />

          {TIMELINE_NODES.map((node, idx) => {
            const isSelected = idx === selectedNodeIndex;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeIndex(idx)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                {/* 3D Floating Node Sphere */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-bold text-base transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white border-white/40 shadow-glow-terracotta scale-110 -translate-y-2'
                      : 'bg-charcoal-900 text-warmwhite-300 border-white/15 hover:border-terracotta-500/50 hover:bg-charcoal-800'
                  }`}
                >
                  <span>0{node.order}</span>
                </div>

                <div className="text-center mt-3">
                  <p className={`font-serif text-sm font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-warmwhite-300 group-hover:text-white'
                  }`}>
                    {node.name}
                  </p>
                  <p className="text-[10px] text-warmwhite-300/60 font-mono mt-0.5">
                    {node.distanceFromPrev}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Active Node Detailed Card */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-charcoal-900 border border-white/15 overflow-hidden shadow-depth-3d grid grid-cols-1 md:grid-cols-12 gap-0">
        
        <div className="md:col-span-5 relative h-56 md:h-auto min-h-[260px] overflow-hidden">
          <ImageWithFallback
            src={activeNode.image}
            alt={activeNode.name}
            label={activeNode.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal-950 via-charcoal-950/40 to-transparent pointer-events-none" />

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
            STOP 0{activeNode.order} OF 05
          </div>

          <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-sand-300">MILESTONE DESTINATION</span>
            <h3 className="font-serif text-2xl font-bold text-white">{activeNode.name}</h3>
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Meta Row */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-charcoal-950 border border-white/10 text-xs">
              <div>
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Transit Time</p>
                <p className="font-bold text-white text-xs mt-0.5">{activeNode.travelTime}</p>
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Est. Spend</p>
                <p className="font-bold text-white text-xs mt-0.5">{activeNode.estimatedSpend}</p>
              </div>
              <div>
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Crowd Status</p>
                <p className={`font-bold text-xs mt-0.5 ${
                  activeNode.crowd === 'LOW' ? 'text-emerald-400' : activeNode.crowd === 'HIGH' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {activeNode.crowd}
                </p>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-warmwhite-300 uppercase tracking-wider">Suggested Activities</p>
              <div className="space-y-1.5">
                {activeNode.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-warmwhite-200">
                    <CheckCircle className="w-3.5 h-3.5 text-terracotta-400 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-warmwhite-300/70 font-medium">
              Segment {activeNode.order} of 5
            </span>

            <Link
              to={`/destinations/${activeNode.id}`}
              className="px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore {activeNode.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
};
