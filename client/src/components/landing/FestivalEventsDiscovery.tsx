import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, Clock, ArrowRight, Tag } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface FestivalEvent {
  id: string;
  title: string;
  tamilTitle: string;
  timeframe: 'Today' | 'This Week' | 'This Month';
  dates: string;
  location: string;
  district: string;
  category: 'Temple Festival' | 'Cultural Dance' | 'Craft & Weaving' | 'Food Fair';
  description: string;
  attendees: string;
  image: string;
}

const EVENTS: FestivalEvent[] = [
  {
    id: 'evt-1',
    title: 'Madurai Chithirai Celestial Wedding & Procession',
    tamilTitle: 'மதுரை சித்திரை திருவிழா & திருக்கல்யாணம்',
    timeframe: 'Today',
    dates: 'Today, 06:00 PM – 11:30 PM',
    location: 'Meenakshi Temple & Vaigai Riverbed',
    district: 'Madurai',
    category: 'Temple Festival',
    description: 'Lord Kallazhagar enters the holy Vaigai river on a golden stallion amidst chanting of Sangam verses and lakhs of devotees.',
    attendees: '50,000+ Gathering',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-2',
    title: 'Thanjavur Natyanjali Classical Dance Fest',
    tamilTitle: 'தஞ்சாவூர் நாட்டியாஞ்சலி பரதநாட்டிய விழா',
    timeframe: 'This Week',
    dates: 'Thursday – Sunday Evenings',
    location: 'Brihadeeswara Big Temple Courtyard',
    district: 'Thanjavur',
    category: 'Cultural Dance',
    description: 'Eminent Bharatanatyam exponents perform against the floodlit 216-foot granite vimana as divine offering to Lord Nataraja.',
    attendees: 'Free Open Entry',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-3',
    title: 'Chettinad Heritage Food & Athangudi Fair',
    tamilTitle: 'செட்டிநாட்டு பாரம்பரிய உணவு & கைவினைத் திருவிழா',
    timeframe: 'This Week',
    dates: 'This Weekend (Sat & Sun)',
    location: 'Kanadukathan Palace Grounds',
    district: 'Sivaganga',
    category: 'Food Fair',
    description: 'Live masterclasses by 3rd-generation Achi chefs, Athangudi handmade tile casting demos, and authentic palm-jaggery sweets.',
    attendees: 'Artisan Passes Available',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-4',
    title: 'Mamallapuram Indian Dance Festival',
    tamilTitle: 'மாமல்லபுரம் இந்திய நாட்டிய விழா',
    timeframe: 'This Month',
    dates: 'Throughout October & November',
    location: 'Arjuna\'s Penance Open Air Stage',
    district: 'Chengalpattu',
    category: 'Cultural Dance',
    description: 'Four-week international celebration of Kathakali, Kuchipudi, Odissi, and Bharatanatyam carved into rock-cut seashore monolithic backgrounds.',
    attendees: 'Open Amphitheatre',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
  }
];

export const FestivalEventsDiscovery: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('All');

  const timeframes = ['All', 'Today', 'This Week', 'This Month'];

  const filteredEvents = selectedTimeframe === 'All'
    ? EVENTS
    : EVENTS.filter((e) => e.timeframe === selectedTimeframe);

  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-400/15 border border-sand-400/30 text-sand-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>STATEWIDE CULTURAL CALENDAR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            What’s Happening in Tamil Nadu?
          </h2>
          <p className="text-sm text-warmwhite-300/80 max-w-2xl leading-relaxed">
            Time your journey with thousand-year-old temple chariot processions, open-air seashore classical concerts, and regional harvest fairs.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedTimeframe === tf
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-charcoal-900 text-warmwhite-300 hover:text-white hover:bg-charcoal-800 border border-white/10'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="rounded-3xl bg-charcoal-900 border border-white/15 overflow-hidden shadow-depth-md flex flex-col justify-between hover:border-white/25 transition-all group"
          >
            <div className="relative h-48 overflow-hidden bg-charcoal-800">
              <ImageWithFallback
                src={evt.image}
                alt={evt.title}
                category="Culture"
                label={evt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent pointer-events-none" />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-400" />
                <span>{evt.district}</span>
              </span>

              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-sand-400/20 text-sand-300 text-[10px] font-bold border border-sand-400/40">
                {evt.timeframe}
              </span>

              <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-sand-300">{evt.category}</span>
                <h4 className="font-serif text-base font-bold text-white line-clamp-1">{evt.title}</h4>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-terracotta-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.dates}</span>
                </div>
                <p className="text-xs text-warmwhite-300/80 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-warmwhite-300/60 font-mono">
                  {evt.attendees}
                </span>
                <span className="text-terracotta-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
