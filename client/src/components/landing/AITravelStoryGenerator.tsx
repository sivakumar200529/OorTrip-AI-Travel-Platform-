import React, { useState } from 'react';
import { 
  Sparkles, QrCode, Share2, Copy, Check, Heart, 
  MapPin, Award, BookOpen, Download, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AITravelStoryGenerator: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const stories = [
    {
      author: user?.name || 'Siva',
      title: `${user?.name || 'Siva'}’s Tamil Nadu Chronicle`,
      duration: '5 Days',
      destinationsCount: 7,
      experiencesCount: 14,
      badges: ['🏛️ Heritage Explorer', '🍛 Food Explorer', '🌱 Eco Traveler'],
      excerpt:
        '“From the dawn waves crashing against 1,300-year-old granite in Mahabalipuram to the hypnotic smell of jasmine garlands and Kari Dosa in Madurai... Every stone told a story of Kings, sculptors, and eternal devotion.”',
      stamps: ['Chennai', 'Mahabalipuram', 'Thanjavur', 'Madurai'],
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://oortrip.ai/story/siva-2026-tn'
    }
  ];

  const currentStory = stories[activeStoryIdx];

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://oortrip.ai/story/siva-2026-tn');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/15 p-6 sm:p-12 shadow-depth-3d grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Editorial Story Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-400/15 border border-sand-400/30 text-sand-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>AI MEMORY SYNTHESIS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            AI Travel Story Generator
          </h2>

          <p className="text-sm text-warmwhite-300/80 leading-relaxed">
            Turn your trip milestones, visited temple gateways, and dining memories into a cinematic digital keepsake. Share your verified travel timeline with friends and family.
          </p>

          {/* Story Preview Card */}
          <div className="p-6 rounded-2xl bg-charcoal-950/90 border border-white/15 space-y-4 shadow-depth-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold text-terracotta-400 uppercase tracking-widest">
                  GENERATED CHRONICLE
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                  {currentStory.title}
                </h3>
              </div>
              <span className="text-xs text-warmwhite-300/60 font-mono">
                {currentStory.duration} • {currentStory.destinationsCount} Hubs
              </span>
            </div>

            {/* Badges Earned */}
            <div className="flex flex-wrap gap-2">
              {currentStory.badges.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-charcoal-900 text-[11px] font-semibold text-warmwhite-200 border border-white/10"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Story Text Quote */}
            <p className="font-serif italic text-sm text-sand-200/90 leading-relaxed pl-3 border-l-2 border-terracotta-500">
              {currentStory.excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-warmwhite-300/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified by TTDC Digital Passport</span>
              </span>
              <span className="font-mono">TN-STORY-8842</span>
            </div>
          </div>
        </div>

        {/* Right Side: QR Share & Invite Box */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-charcoal-950 border border-white/15 text-center space-y-5 shadow-depth-md">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta-400">
              TRAVEL COMPANION SHARING
            </span>
            <h4 className="font-serif text-xl font-bold text-white">Share My Journey</h4>
            <p className="text-xs text-warmwhite-300/70">
              Friends can view your live route, upcoming stops, and safety status without exposing private data.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-4 rounded-2xl bg-white text-black shadow-lg">
            <img
              src={currentStory.qrCodeUrl}
              alt="Trip Sharing QR"
              className="w-36 h-36 mx-auto object-contain"
            />
          </div>

          <p className="text-[11px] text-warmwhite-300/60 font-mono">
            Scan to follow journey live
          </p>

          {/* Share Buttons */}
          <div className="w-full flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-3 px-4 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-100 font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Private Link'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'OorTrip AI Journey',
                    text: 'Follow my Tamil Nadu heritage journey on OorTrip AI!',
                    url: 'https://oortrip.ai/story/siva-2026-tn'
                  });
                } else {
                  handleCopyLink();
                }
              }}
              className="p-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white transition-colors"
              title="Share Story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
