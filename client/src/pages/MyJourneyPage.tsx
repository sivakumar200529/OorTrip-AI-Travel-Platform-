import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Camera, MapPin, Calendar, Wallet, Award, Share2, Sparkles, Heart } from 'lucide-react';
import { INITIAL_TOURIST_PASS, INITIAL_EXPENSES } from '../data/tamilNaduData';

export const MyJourneyPage: React.FC = () => {
  const memories = [
    {
      id: 'mem-1',
      title: 'Dawn Reflections at Shore Temple',
      location: 'Mahabalipuram',
      date: '01 Oct 2026',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      caption: 'The sunrise turned the granite columns molten gold while waves crashed against the stone sea wall.',
      foodSpot: 'Mylapore Rayar Mess Ghee Podi Idli'
    },
    {
      id: 'mem-2',
      title: 'Jacquard Pit Looms & Pure Zari',
      location: 'Kanchipuram',
      date: '01 Oct 2026',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      caption: 'Watched Parthasarathy craft the peacock border using pure silver-spun gold threads.',
      foodSpot: 'Kanchi Kovil Idli & Pepper Chutney'
    },
    {
      id: 'mem-3',
      title: 'Meenakshi Temple Night Procession',
      location: 'Madurai',
      date: '15 Sep 2026',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      caption: 'Fragrance of Madurai malli jasmine in the air as temple drums resounded under the illuminated gopurams.',
      foodSpot: 'Famous Jigarthanda & Kari Dosa'
    }
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 text-xs font-semibold border border-terracotta-500/30">
            <Camera className="w-3.5 h-3.5" />
            <span>TRAVEL MEMORY ARCHIVE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My Tamil Nadu Journey
          </h1>
          <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
            Curated memories, culinary footsteps, and milestones logged during your exploration of Tamil Nadu.
          </p>
        </div>

        {/* ELEGANT TRAVEL SUMMARY CARD (Section 34) */}
        <div className="rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/15 p-6 sm:p-8 shadow-depth-3d space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-sand-300 font-mono">
                EXPEDITION RECAP 2026
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Grand Tamil Nadu Heritage Circuit
              </h2>
            </div>

            <button
              onClick={() => alert('Exporting beautiful journey memory card as high-res PNG image!')}
              className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Share2 className="w-4 h-4 text-terracotta-400" />
              <span>Share Travel Card</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-white/5">
              <p className="text-[10px] text-warmwhite-300/60 uppercase">Distance Covered</p>
              <p className="font-serif text-2xl font-bold text-white mt-1">480 km</p>
              <span className="text-[10px] text-terracotta-400">ECR & NH32 Corridors</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-white/5">
              <p className="text-[10px] text-warmwhite-300/60 uppercase">Destinations Visited</p>
              <p className="font-serif text-2xl font-bold text-emerald-400 mt-1">4 Hubs</p>
              <span className="text-[10px] text-warmwhite-300/60">Chennai, Mahabs, Kanchi, Madurai</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-white/5">
              <p className="text-[10px] text-warmwhite-300/60 uppercase">Expenses Audited</p>
              <p className="font-serif text-2xl font-bold text-sand-300 mt-1">₹3,420</p>
              <span className="text-[10px] text-emerald-400">Within ₹5,000 threshold</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-white/5">
              <p className="text-[10px] text-warmwhite-300/60 uppercase">Badges Earned</p>
              <p className="font-serif text-2xl font-bold text-amber-400 mt-1">4 Badges</p>
              <span className="text-[10px] text-amber-300">Temple & Heritage Master</span>
            </div>
          </div>
        </div>

        {/* CHRONOLOGICAL PHOTO & STORY TIMELINE */}
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">Visual Memory Timeline</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memories.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl bg-charcoal-900 border border-white/10 overflow-hidden shadow-depth-sm flex flex-col group"
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white">
                    📍 {m.location}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-charcoal-950/80 text-[10px] font-mono text-warmwhite-300">
                    {m.date}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-serif text-base font-bold text-white">{m.title}</h4>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-xs">
                  <p className="text-warmwhite-300/80 leading-relaxed italic">
                    "{m.caption}"
                  </p>

                  <div className="pt-2 border-t border-white/5 text-[11px] text-sand-400 font-medium flex items-center gap-1.5">
                    <span>🍲 Culinary Stop:</span>
                    <span className="text-white">{m.foodSpot}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
