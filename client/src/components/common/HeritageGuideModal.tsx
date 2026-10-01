import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, X, BookOpen, Landmark, Compass, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { Destination } from '../../types';

interface HeritageGuideModalProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
}

export const HeritageGuideModal: React.FC<HeritageGuideModalProps> = ({ destination, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handleToggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const text = `${destination.name}. ${destination.tagline}. ${destination.audioGuideText}. ${destination.history}. ${destination.architecture}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-charcoal-900 border border-white/20 shadow-depth-3d max-h-[88vh] overflow-y-auto p-6 space-y-6">
        
        {/* Header Banner */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-500/20 border border-terracotta-500/40 flex items-center justify-center text-terracotta-400">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-400">
                AI HERITAGE GUIDE • NO AR REQUIRED
              </span>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                {destination.name}
              </h3>
              <p className="text-xs text-sand-300 font-serif italic">{destination.tamilName}</p>
            </div>
          </div>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setIsPlaying(false);
              onClose();
            }}
            className="p-2 rounded-xl text-warmwhite-300 hover:text-white hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Player Action Bar */}
        <div className="p-4 rounded-2xl bg-charcoal-850 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isPlaying ? 'bg-terracotta-500 text-white animate-pulse' : 'bg-charcoal-800 text-terracotta-400'}`}>
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Audio Heritage Narrative</p>
              <p className="text-[11px] text-warmwhite-300/70">
                {isPlaying ? 'Playing immersive narration...' : 'Narrated with Dravidian architectural context'}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleAudio}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all shadow-md ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-terracotta-500 hover:bg-terracotta-600 text-white'
            }`}
          >
            {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlaying ? 'PAUSE GUIDE' : 'LISTEN TO GUIDE'}</span>
          </button>
        </div>

        {/* Heritage Sections */}
        <div className="space-y-4 text-xs text-warmwhite-200">
          
          {/* History */}
          <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-terracotta-400 font-semibold uppercase tracking-wider text-[11px]">
              <BookOpen className="w-4 h-4" />
              <span>Historical Legacy</span>
            </div>
            <p className="leading-relaxed text-warmwhite-300/90">{destination.history}</p>
          </div>

          {/* Architecture */}
          <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-sand-400 font-semibold uppercase tracking-wider text-[11px]">
              <Landmark className="w-4 h-4" />
              <span>Architectural Brilliance</span>
            </div>
            <p className="leading-relaxed text-warmwhite-300/90">{destination.architecture}</p>
          </div>

          {/* Cultural Significance */}
          <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-oceanblue-400 font-semibold uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4" />
              <span>Cultural Significance</span>
            </div>
            <p className="leading-relaxed text-warmwhite-300/90">{destination.culturalSignificance}</p>
          </div>

          {/* Interesting Facts */}
          <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Fascinating Discoveries</span>
            </div>
            <ul className="space-y-1.5">
              {destination.interestingFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-warmwhite-300/90">
                  <span className="text-terracotta-400 font-bold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby Sites */}
          <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-white/5 space-y-2">
            <p className="text-[11px] font-semibold text-warmwhite-300/70 uppercase tracking-wider">
              Recommended Nearby Spots
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {destination.nearbyPlaces.map((np) => (
                <div key={np.name} className="p-2.5 rounded-xl bg-charcoal-900 border border-white/5">
                  <p className="font-semibold text-white truncate text-[11px]">{np.name}</p>
                  <p className="text-[10px] text-terracotta-400">{np.distance} • {np.category}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
