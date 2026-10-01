import React, { useState } from 'react';
import { Sparkles, Check, CheckSquare, Compass, ShieldCheck, Sun, CloudRain } from 'lucide-react';

export const AIPackingAssistant: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>('kodaikanal');
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'item-0': true,
    'item-1': true,
  });

  const packingData: { [key: string]: { label: string; weather: string; items: string[] } } = {
    kodaikanal: {
      label: 'Kodaikanal (Hill Station)',
      weather: '18°C Misty, Rain Chance 60%',
      items: [
        'Warm fleece jacket or windbreaker',
        'Sturdy grip walking shoes (pine trails)',
        'Compact umbrella or rain poncho',
        'Moisturizer & lip balm (high altitude)',
        'Universal power bank & phone charger',
        'Official Govt Photo ID (entry gates)',
        'Personal essentials & first-aid pack'
      ]
    },
    mahabalipuram: {
      label: 'Mahabalipuram (Coastal Shore)',
      weather: '29°C Sunny, Coastal Humidity',
      items: [
        'Breathable linen / lightweight cotton wear',
        'UV Sunglasses & broad sun hat',
        'High-SPF mineral sunscreen lotion',
        'Flip-flops for beach walks & easy slip-off for temple gates',
        'Hydro-flask water bottle (heat hydration)',
        'Camera or smartphone wide lens',
        'Official Govt Photo ID'
      ]
    },
    madurai: {
      label: 'Madurai (Temple Heritage)',
      weather: '31°C Warm & Vibrant',
      items: [
        'Traditional cotton dhoti / saree or modest attire (temple dress code)',
        'Shoulder scarf / dupatta for sanctum entry',
        'Easily removable footwear (socks for warm granite slabs)',
        'Hand sanitizer & wet wipes',
        'Cash & UPI wallet for street food stalls',
        'Power bank for evening temple photo sessions',
        'Official Govt Photo ID'
      ]
    }
  };

  const currentPack = packingData[selectedDestination] || packingData.kodaikanal;

  const toggleCheck = (idx: number) => {
    const key = `item-${idx}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/15 p-6 sm:p-10 shadow-depth-3d grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Explanation & Controls */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-400/15 border border-sand-400/30 text-sand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WEATHER-AWARE PACKING ALGORITHM</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Pack Smarter with AI
          </h2>

          <p className="text-sm text-warmwhite-300/80 leading-relaxed">
            Never forget temple-appropriate dress codes, hill station rain gear, or coastal hydration essentials. The AI analyzes weather forecasts and cultural norms to generate your customized checklist.
          </p>

          {/* Destination & Duration Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-warmwhite-300/70 block mb-1.5 uppercase">
                Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => {
                  setSelectedDestination(e.target.value);
                  setCheckedItems({});
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-white/15 text-xs text-white focus:outline-none focus:border-terracotta-500"
              >
                <option value="kodaikanal">Kodaikanal (Hill Station)</option>
                <option value="mahabalipuram">Mahabalipuram (Coastal Shore)</option>
                <option value="madurai">Madurai (Temple Heritage)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-warmwhite-300/70 block mb-1.5 uppercase">
                Duration
              </label>
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-white/15 text-xs text-white focus:outline-none focus:border-terracotta-500"
              >
                <option value={2}>2 Days Weekend</option>
                <option value={3}>3 Days Short Trip</option>
                <option value={5}>5+ Days Grand Tour</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-warmwhite-300/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Includes Tamil Nadu temple dress codes & monsoon intelligence</span>
          </div>
        </div>

        {/* Right Generated Checklist Card */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-charcoal-950/90 border border-white/15 shadow-depth-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h4 className="font-serif text-base font-bold text-white">{currentPack.label}</h4>
              <p className="text-[11px] text-terracotta-400 font-medium">{currentPack.weather}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-[10px] font-bold text-terracotta-300 uppercase">
              {selectedDays} Days Checklist
            </span>
          </div>

          <div className="space-y-2">
            {currentPack.items.map((item, idx) => {
              const checked = !!checkedItems[`item-${idx}`];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    checked
                      ? 'bg-charcoal-900/60 border-emerald-500/30 text-warmwhite-300/50 line-through'
                      : 'bg-charcoal-900 border-white/10 text-warmwhite-100 hover:border-white/25'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      checked ? 'bg-emerald-500 text-white' : 'border border-white/20 bg-charcoal-950'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-medium">{item}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-warmwhite-300/60 font-mono">
              ✦ Auto-synced with OorTrip AI Trip Planner
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
