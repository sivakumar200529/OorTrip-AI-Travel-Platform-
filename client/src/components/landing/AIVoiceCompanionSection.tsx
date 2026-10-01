import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, MessageSquare, Play, Pause } from 'lucide-react';

interface VoiceQueryDemo {
  query: string;
  langLabel: string;
  response: string;
  tamilResponse: string;
}

const VOICE_SAMPLES: VoiceQueryDemo[] = [
  {
    query: '“Madurai-la evening enna panna?”',
    langLabel: 'Tanglish / Tamil',
    response:
      'You can explore the illuminated Meenakshi Amman Temple east tower, savor famous cold Famous Jigarthanda at East Marret Street, and witness the 9:00 PM Palliarai Pooja ceremony.',
    tamilResponse:
      'மதுரை மீனாட்சி அம்மன் கோவில் மாலை தரிசனம், விளக்கேற்றல், சுவையான ஜிகர்தண்டா மற்றும் இரவு பல்லியறை பூஜை தரிசனம் செய்யலாம்.',
  },
  {
    query: '“What should I wear to Kanchipuram temple?”',
    langLabel: 'English',
    response:
      'Traditional modest attire is required. Men should wear dhoti, veshti or pants with a shirt. Women should wear saree, salwar kameez or churidar with dupatta. Footwear must be removed at the outer gopuram entrance.',
    tamilResponse:
      'பாரம்பரிய ஆடை அணிவது அவசியம். ஆண்கள் வேட்டி அல்லது பேண்ட்; பெண்கள் புடவை அல்லது துப்பட்டாவுடன் சுடிதார் அணியலாம்.',
  },
  {
    query: '“Ooty toy train tickets eppadi book panradhu?”',
    langLabel: 'Tanglish',
    response:
      'Nilgiri Mountain Railway (Toy Train) opens on IRCTC 120 days in advance. OorTrip AI recommends the morning 07:10 AM departure from Mettupalayam to Ooty for the most scenic valley mist views.',
    tamilResponse:
      'IRCTC இணையதளத்தில் 120 நாட்களுக்கு முன்பே பதிவு செய்யலாம். காலை 7:10 மணி மேட்டுப்பாளையம் - ஊட்டி ரயில் மிக அழகான காட்சிகளைத் தரும்.',
  }
];

export const AIVoiceCompanionSection: React.FC = () => {
  const [activeSampleIdx, setActiveSampleIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const activeSample = VOICE_SAMPLES[activeSampleIdx];

  const handleToggleVoice = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeSample.response);
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const handleSimulateRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setActiveSampleIdx((prev) => (prev + 1) % VOICE_SAMPLES.length);
    }, 1200);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-6 sm:p-12 shadow-depth-3d grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Voice Capabilities */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold">
            <Mic className="w-3.5 h-3.5" />
            <span>MULTILINGUAL VOICE RECOGNITION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI Voice Travel Companion
          </h2>

          <p className="text-sm text-warmwhite-300/80 leading-relaxed">
            Speak naturally in Tamil, English, or conversational Tanglish. Ask about temple timings, local auto fares, authentic food stalls, or crowd forecasts on the go.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {VOICE_SAMPLES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (isPlayingAudio && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                  }
                  setActiveSampleIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  idx === activeSampleIdx
                    ? 'bg-terracotta-500/20 text-terracotta-300 border-terracotta-500/50 shadow-sm'
                    : 'bg-charcoal-950 text-warmwhite-300 hover:text-white border-white/10'
                }`}
              >
                Sample {idx + 1}: {s.langLabel}
              </button>
            ))}
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              onClick={handleSimulateRecord}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-depth-sm ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isRecording ? 'Listening...' : '🎙 Ask OorTrip'}</span>
            </button>

            <span className="text-xs text-warmwhite-300/60 font-mono">
              Supports Tanglish dialect matching
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Audio Wave Card */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-charcoal-950 border border-white/15 shadow-depth-md space-y-6">
          
          {/* User Query Speech Bubble */}
          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex-shrink-0">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-warmwhite-300/60 uppercase">
                YOU SPOKE ({activeSample.langLabel})
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-white mt-0.5">
                {activeSample.query}
              </p>
            </div>
          </div>

          {/* AI Response Speech Bubble */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-charcoal-850 to-charcoal-900 border border-terracotta-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-terracotta-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OORTRIP AI AUDIO NARRATION</span>
              </span>

              <button
                onClick={handleToggleVoice}
                className="p-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Play Audio Guide"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Stop' : 'Listen'}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-warmwhite-200 leading-relaxed">
              {activeSample.response}
            </p>

            <div className="pt-2 border-t border-white/10">
              <p className="text-xs text-sand-300/90 font-mono">
                {activeSample.tamilResponse}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
