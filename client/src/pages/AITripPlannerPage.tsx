import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Compass, MapPin, Calendar, Wallet, Heart, 
  Users, Car, Utensils, Accessibility, ArrowRight, ArrowLeft, 
  Check, Clock, AlertTriangle, ShieldCheck, ChevronDown, 
  Play, RotateCcw, Share2, Printer
} from 'lucide-react';
import { api } from '../services/api';
import { Itinerary, ItineraryDay } from '../types';
import { DynamicChangeAlert } from '../components/common/DynamicChangeAlert';
import { useAuth } from '../context/AuthContext';

export const AITripPlannerPage: React.FC = () => {
  const { updatePoints } = useAuth();

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStageIndex, setGenerationStageIndex] = useState(0);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  // Dynamic Suggestion acceptance state
  const [isDynamicAccepted, setIsDynamicAccepted] = useState(false);

  // Form Fields
  const [startCity, setStartCity] = useState('Chennai');
  const [targetDestination, setTargetDestination] = useState('Mahabalipuram & Beyond');
  const [daysCount, setDaysCount] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Heritage', 'Temples', 'Food']);
  const [travelGroup, setTravelGroup] = useState('Solo / Friends');
  const [transport, setTransport] = useState('Comfort AC Car / Taxi');
  const [foodPreference, setFoodPreference] = useState('Vegetarian');
  const [accessibilityPref, setAccessibilityPref] = useState('Senior Friendly');

  const generationStages = [
    'Understanding your travel style...',
    'Finding the best Tamil Nadu destinations...',
    'Optimizing your route and highway timings...',
    'Balancing your budget against meals and tickets...',
    'Creating your personalized layered journey...',
    'YOUR PERFECT TAMIL NADU JOURNEY IS READY'
  ];

  const cityOptions = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tirunelveli', 'Pondicherry', 'Kanyakumari'];
  
  const destinationOptions = [
    'Mahabalipuram & Beyond (Coastal & Temple Circuit)',
    'Thanjavur & Chola Heartland (Great Living Temples)',
    'Madurai & Rameswaram (Pilgrim & Sacred Islands)',
    'Nilgiris & Ooty (Tea Hills & Mountain Rail)',
    'Chettinad Heritage & Gastronomy',
    'Full Tamil Nadu Grand Explorer (Multi-zone)'
  ];

  const interestOptions = [
    { label: 'Heritage', icon: '🏛️' },
    { label: 'Temples', icon: '🛕' },
    { label: 'Beaches', icon: '🌊' },
    { label: 'Food', icon: '🍲' },
    { label: 'Nature', icon: '🌿' },
    { label: 'Adventure', icon: '🧗' },
    { label: 'Shopping', icon: '🛍️' },
    { label: 'Culture', icon: '🎭' },
    { label: 'Village Experiences', icon: '🚜' }
  ];

  const groupOptions = ['Solo', 'Couple', 'Family', 'Friends', 'Senior Citizens'];
  const transportOptions = ['Public Transport / Bus', 'Comfort AC Car / Taxi', 'Self-Drive Bike / Car', 'Express Train'];
  const foodOptions = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain', 'No Preference'];
  const accessibilityOptions = ['Wheelchair', 'Senior Friendly', 'Low Walking', 'No Special Requirement'];

  const toggleInterest = (val: string) => {
    setSelectedInterests((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStageIndex(0);

    // Stagger through generation stages
    for (let i = 0; i < generationStages.length; i++) {
      setGenerationStageIndex(i);
      await new Promise((r) => setTimeout(r, 650));
    }

    const generated = await api.generateTrip({
      startingLocation: startCity,
      destination: targetDestination,
      daysCount,
      budget,
      interests: selectedInterests,
      travelGroup,
      transportPreference: transport,
      foodPreference,
      accessibility: accessibilityPref
    });

    setItinerary(generated);
    setIsGenerating(false);
    updatePoints(250); // reward tourist points for completing AI itinerary
  };

  // Reset
  const handleReset = () => {
    setItinerary(null);
    setCurrentStep(1);
    setIsDynamicAccepted(false);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 text-xs font-semibold border border-terracotta-500/30">
            <Sparkles className="w-4 h-4" />
            <span>AUTHENTIC TAMIL NADU AI ENGINE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Travel Route Planner
          </h1>
          <p className="text-xs sm:text-sm text-warmwhite-300/80">
            Configure your personalized travel style across 9 intelligent parameters.
          </p>
        </div>

        {/* LOADING ANIMATION SCREEN */}
        {isGenerating && (
          <div className="py-24 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-terracotta-500/20 border-t-terracotta-500 animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-oceanblue-500/20 border-b-oceanblue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
              <Compass className="w-12 h-12 text-terracotta-400 animate-pulse" />
            </div>

            <div className="text-center space-y-3 max-w-md">
              <p className="font-serif text-2xl font-bold text-white transition-all duration-300">
                {generationStages[generationStageIndex]}
              </p>
              <div className="w-64 h-2 rounded-full bg-charcoal-850 mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-terracotta-500 to-amber-400 transition-all duration-500 rounded-full"
                  style={{ width: `${((generationStageIndex + 1) / generationStages.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-warmwhite-300/60 font-mono">
                Stage {generationStageIndex + 1} of {generationStages.length}
              </p>
            </div>
          </div>
        )}

        {/* RESULT SCREEN: LAYERED ITINERARY */}
        {!isGenerating && itinerary && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
            
            {/* Top Itinerary Hero Banner */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/15 p-6 sm:p-8 shadow-depth-3d space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                      ✓ ITINERARY OPTIMIZED & READY
                    </span>
                    <span className="text-xs text-warmwhite-300/60 font-mono">+250 Tourist Pts Earned</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {itinerary.title}
                  </h2>
                  <p className="text-xs text-sand-300">
                    Starting from <strong>{itinerary.startingLocation}</strong> • {itinerary.daysCount} Days • Budget: ₹{itinerary.budget.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-200 border border-white/10 text-xs flex items-center gap-1.5 transition-colors"
                    title="Print Itinerary"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Plan Another Trip</span>
                  </button>
                </div>
              </div>

              {/* Smart Route Stats Card (Section 18) */}
              {(() => {
                const totalKmValue = itinerary.totalDistanceKm ?? itinerary.days.reduce((acc, d) => {
                  const m = d.distance.match(/(\d+)/);
                  return acc + (m ? parseInt(m[1], 10) : 0);
                }, 0);
                const totalTimeValue = itinerary.totalTravelTime ?? '3h 30m Driving';
                const breakdown = itinerary.costBreakdown ?? {
                  transport: Math.round(totalKmValue * 14 + (itinerary.daysCount * 400)),
                  stay: Math.max(itinerary.daysCount - 1, 0) * 1600,
                  food: itinerary.daysCount * 450,
                  activities: 360,
                  misc: itinerary.daysCount * 180,
                  total: itinerary.totalEstimatedCost
                };
                const budgetDiff = itinerary.budget - itinerary.totalEstimatedCost;
                const isWithinBudget = budgetDiff >= 0;

                return (
                  <div className="space-y-4">
                    {/* Primary Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                        <p className="text-[10px] text-warmwhite-300/60 uppercase">Starting City</p>
                        <p className="font-bold text-white text-sm mt-0.5 truncate">{itinerary.startingLocation}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                        <p className="text-[10px] text-warmwhite-300/60 uppercase">Road Distance</p>
                        <p className="font-bold text-emerald-400 text-sm mt-0.5">{totalKmValue} km Total</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                        <p className="text-[10px] text-warmwhite-300/60 uppercase">Travel Time</p>
                        <p className="font-bold text-white text-sm mt-0.5">{totalTimeValue}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                        <p className="text-[10px] text-warmwhite-300/60 uppercase">Transit Mode</p>
                        <p className="font-bold text-white text-sm mt-0.5 truncate">{itinerary.transportPreference}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                        <p className="text-[10px] text-warmwhite-300/60 uppercase">User Budget</p>
                        <p className="font-bold text-terracotta-400 text-sm mt-0.5">₹{itinerary.budget.toLocaleString()}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                        <p className="text-[10px] text-warmwhite-300/60 uppercase">Estimated Spend</p>
                        <p className={`font-bold text-sm mt-0.5 ${isWithinBudget ? 'text-emerald-400' : 'text-amber-400'}`}>
                          ₹{itinerary.totalEstimatedCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Itemized Cost Breakdown Card */}
                    <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-white/10 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-white/5 pb-2.5">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Wallet className="w-3.5 h-3.5 text-terracotta-400" />
                          <span>AI Transparent Cost Breakdown</span>
                        </span>
                        <span className="text-[11px] text-sand-300 font-mono">
                          {itinerary.travelGroup} • {itinerary.foodPreference}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-[11px]">
                        <div className="p-2.5 rounded-xl bg-charcoal-900 border border-white/5">
                          <span className="text-warmwhite-300/60 block text-[10px]">🚗 Transit / Fuel</span>
                          <span className="font-bold text-white text-xs mt-0.5 block">₹{breakdown.transport.toLocaleString()}</span>
                          <span className="text-[9px] text-warmwhite-300/50">For {totalKmValue} km</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-charcoal-900 border border-white/5">
                          <span className="text-warmwhite-300/60 block text-[10px]">🏨 Stays & Lodging</span>
                          <span className="font-bold text-white text-xs mt-0.5 block">₹{breakdown.stay.toLocaleString()}</span>
                          <span className="text-[9px] text-warmwhite-300/50">{Math.max(itinerary.daysCount - 1, 0)} Nights</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-charcoal-900 border border-white/5">
                          <span className="text-warmwhite-300/60 block text-[10px]">🍲 Regional Dining</span>
                          <span className="font-bold text-white text-xs mt-0.5 block">₹{breakdown.food.toLocaleString()}</span>
                          <span className="text-[9px] text-warmwhite-300/50">{itinerary.daysCount} Days</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-charcoal-900 border border-white/5">
                          <span className="text-warmwhite-300/60 block text-[10px]">🏛️ Passes & Sights</span>
                          <span className="font-bold text-white text-xs mt-0.5 block">₹{breakdown.activities.toLocaleString()}</span>
                          <span className="text-[9px] text-warmwhite-300/50">Scheduled Stops</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-charcoal-900 border border-white/5 col-span-2 sm:col-span-1">
                          <span className="text-warmwhite-300/60 block text-[10px]">🛍️ Local & Misc</span>
                          <span className="font-bold text-white text-xs mt-0.5 block">₹{breakdown.misc.toLocaleString()}</span>
                          <span className="text-[9px] text-warmwhite-300/50">Buffer & Tips</span>
                        </div>
                      </div>

                      {/* Budget Health Alert */}
                      <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        isWithinBudget 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}>
                        <div className="shrink-0 mt-0.5">
                          {isWithinBudget ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <p className="font-semibold text-white">
                            {isWithinBudget 
                              ? `Within Budget: ₹${budgetDiff.toLocaleString()} surplus remaining` 
                              : `Budget Exceeded by ₹${Math.abs(budgetDiff).toLocaleString()}`}
                          </p>
                          <p className="text-[11px] opacity-90 leading-relaxed">
                            {itinerary.budgetHealth?.tip || (
                              isWithinBudget
                                ? `Your planned budget comfortably covers all highway transit, entry passes, and regional meals.`
                                : `Consider switching from private AC taxi to Southern Railway express train or choosing TTDC accommodation to save up to ₹1,800.`
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Dynamic Route Alert (Section 19) */}
              <DynamicChangeAlert
                originalDestination="Mahabalipuram Shore Temple"
                suggestedAlternative="Sadras Dutch Fort & Coastal Battery"
                reason="High weekend crowds detected at Shore Temple (approx. 45-min delay). Sadras Fort is 14 km south with serene sea views and zero entry lines."
                savingsOrAdvantage="Save 45 minutes queue time • Free entry • Ideal photography lighting"
                isAccepted={isDynamicAccepted}
                onAccept={() => setIsDynamicAccepted(true)}
                onReject={() => setIsDynamicAccepted(false)}
              />
            </div>

            {/* DAY-BY-DAY LAYERED CARDS */}
            <div className="space-y-8">
              {itinerary.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className="rounded-3xl bg-charcoal-900 border border-white/10 overflow-hidden shadow-depth-md"
                >
                  {/* Day Header Banner */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={day.heroImage}
                      alt={day.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-terracotta-500 text-white font-mono text-xs font-bold shadow-md">
                        DAY 0{day.dayNumber}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-warmwhite-200">
                        {day.distance} • {day.travelTime}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                        {day.fromCity} <span className="text-terracotta-400">↓</span> {day.toCity}
                      </h3>
                      <p className="text-xs text-sand-300 font-medium mt-0.5">{day.title}</p>
                    </div>
                  </div>

                  {/* Day Stops Timeline */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-white/10">
                      {day.stops.map((stop, stopIdx) => {
                        // If user accepted dynamic change for stop-1-2 (Shore Temple), substitute with Sadras Fort!
                        const isSubstituted = isDynamicAccepted && stop.id === 'stop-1-2';
                        const displayTitle = isSubstituted ? 'Sadras Dutch Fort & Coastal Battery' : stop.title;
                        const displaySubtitle = isSubstituted ? '17th-century seaside brick fortification' : stop.subtitle;
                        const displayDesc = isSubstituted
                          ? 'Explore undisturbed coastal ramparts, ancient cannons overlooking the sea, and historic brick vaults without crowds.'
                          : stop.description;
                        const displayCost = isSubstituted ? 0 : stop.cost;
                        const displayCrowd = isSubstituted ? 'LOW' : stop.crowdLevel;

                        return (
                          <div key={stop.id} className="relative flex items-start gap-4 sm:gap-6 pl-2 group">
                            {/* Marker dot */}
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ring-4 ring-charcoal-900 z-10 ${
                              isSubstituted ? 'bg-emerald-500' : 'bg-terracotta-500'
                            }`}>
                              {stopIdx + 1}
                            </div>

                            {/* Stop Card */}
                            <div className="flex-1 rounded-2xl bg-charcoal-850/80 border border-white/5 hover:border-white/20 p-4 transition-all group-hover:bg-charcoal-850">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-bold text-terracotta-400">
                                      {stop.time}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-charcoal-950 text-warmwhite-300/80 border border-white/5">
                                      {stop.category}
                                    </span>
                                    {isSubstituted && (
                                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                                        DYNAMIC REPLACEMENT
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="font-serif text-base font-bold text-white mt-1">
                                    {displayTitle}
                                  </h4>
                                  <p className="text-xs text-sand-300">{displaySubtitle}</p>
                                </div>

                                <div className="text-left sm:text-right shrink-0">
                                  <span className="text-xs font-bold text-white">₹{displayCost}</span>
                                  <span className="text-[10px] text-warmwhite-300/60 block">{stop.duration}</span>
                                </div>
                              </div>

                              <p className="text-xs text-warmwhite-300/80 mt-2 leading-relaxed">
                                {displayDesc}
                              </p>

                              <div className="flex items-center justify-between text-[11px] text-warmwhite-300/60 pt-3 mt-3 border-t border-white/5">
                                <span>📍 {stop.location}</span>
                                <span className={displayCrowd === 'LOW' ? 'text-emerald-400' : displayCrowd === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}>
                                  {displayCrowd} Crowd
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-base font-bold text-white">Ready to begin this Tamil Nadu circuit?</h4>
                <p className="text-xs text-warmwhite-300/70">Sync with Smart Map or download offline directions.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Starting live GPS navigation simulation for Day 01!')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>START JOURNEY</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* WIZARD FORM (STEPS 1 TO 9) */}
        {!isGenerating && !itinerary && (
          <div className="rounded-3xl bg-charcoal-900 border border-white/10 shadow-depth-3d p-6 sm:p-10 space-y-8">
            
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-warmwhite-300/70">
                <span className="font-semibold text-terracotta-400 uppercase tracking-wider font-mono">
                  STEP {currentStep} OF 9
                </span>
                <span>{Math.round((currentStep / 9) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-charcoal-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-terracotta-500 to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 9) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: WHERE ARE YOU STARTING? */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 1: Where are you starting?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Select your starting city or arrival hub in Tamil Nadu.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cityOptions.map((city) => (
                    <button
                      key={city}
                      onClick={() => setStartCity(city)}
                      className={`p-4 rounded-2xl border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-2 ${
                        startCity === city
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                      }`}
                    >
                      <MapPin className={`w-5 h-5 ${startCity === city ? 'text-terracotta-400' : 'text-warmwhite-300/60'}`} />
                      <span>{city}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: WHERE DO YOU WANT TO GO? */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 2: Where do you want to go?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Choose a regional corridor or let the AI select the optimal circuit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destinationOptions.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setTargetDestination(dest)}
                      className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        targetDestination === dest
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                      }`}
                    >
                      <span>{dest}</span>
                      {targetDestination === dest && <Check className="w-4 h-4 text-terracotta-400 shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: HOW MANY DAYS? */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 3: How many days?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Choose the duration of your trip (1 to 5+ days).
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setDaysCount(num)}
                      className={`p-6 rounded-2xl border text-center font-bold text-lg transition-all ${
                        daysCount === num
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md scale-105'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-300 hover:bg-charcoal-800'
                      }`}
                    >
                      <p className="font-serif text-2xl">{num === 5 ? '5+' : num}</p>
                      <p className="text-[10px] text-warmwhite-300/60 uppercase font-sans font-normal mt-1">
                        {num === 1 ? 'Day' : 'Days'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: WHAT IS YOUR BUDGET? */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 4: What is your budget?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Set your approximate overall budget in Indian Rupees (₹).
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-charcoal-850 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warmwhite-300/60 font-semibold uppercase">Total Trip Budget</span>
                    <span className="font-serif text-3xl font-extrabold text-terracotta-400">
                      ₹{budget.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1500"
                    max="25000"
                    step="500"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-terracotta-500 cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-warmwhite-300/60">
                    <span>₹1,500 (Budget Day Trip)</span>
                    <span>₹5,000 (Recommended 2-Day)</span>
                    <span>₹25,000+ (Luxury Heritage)</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: WHAT DO YOU LOVE? */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 5: What do you love?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Select your favorite travel interests (multi-select).
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interestOptions.map((item) => {
                    const isSelected = selectedInterests.includes(item.label);
                    return (
                      <button
                        key={item.label}
                        onClick={() => toggleInterest(item.label)}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                            : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-terracotta-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: WHO ARE YOU TRAVELLING WITH? */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 6: Who are you travelling with?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Pacing and itineraries adjust according to your travel companions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {groupOptions.map((g) => (
                    <button
                      key={g}
                      onClick={() => setTravelGroup(g)}
                      className={`p-4 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        travelGroup === g
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-terracotta-400" />
                        <span>{g}</span>
                      </div>
                      {travelGroup === g && <Check className="w-4 h-4 text-terracotta-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: HOW WILL YOU TRAVEL? */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 7: How will you travel?
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Transport speeds, route selections, and parking recommendations adapt to your vehicle.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {transportOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTransport(t)}
                      className={`p-4 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        transport === t
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-oceanblue-400" />
                        <span>{t}</span>
                      </div>
                      {transport === t && <Check className="w-4 h-4 text-terracotta-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: FOOD PREFERENCE */}
            {currentStep === 8 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 8: Food Preference
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    We match lunch and dinner halts to authentic, hygienic messes and restaurants.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {foodOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFoodPreference(f)}
                      className={`p-4 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        foodPreference === f
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-amber-400" />
                        <span>{f}</span>
                      </div>
                      {foodPreference === f && <Check className="w-4 h-4 text-terracotta-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 9: ACCESSIBILITY PREFERENCE */}
            {currentStep === 9 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Step 9: Accessibility Requirements
                  </h3>
                  <p className="text-xs text-warmwhite-300/70">
                    Every tourist deserves dignified access to Tamil Nadu's monuments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {accessibilityOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAccessibilityPref(a)}
                      className={`p-4 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        accessibilityPref === a
                          ? 'bg-terracotta-500/20 border-terracotta-500 text-white shadow-md'
                          : 'bg-charcoal-850 border-white/10 text-warmwhite-200 hover:bg-charcoal-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Accessibility className="w-4 h-4 text-templegreen-400" />
                        <span>{a}</span>
                      </div>
                      {accessibilityPref === a && <Check className="w-4 h-4 text-terracotta-400" />}
                    </button>
                  ))}
                </div>

                {/* Summary Box Before Submitting */}
                <div className="p-4 rounded-2xl bg-charcoal-950 border border-white/10 space-y-2 text-xs">
                  <p className="font-semibold text-white">Your Trip Summary:</p>
                  <p className="text-warmwhite-300/80">
                    From <strong>{startCity}</strong> • <strong>{daysCount} Days</strong> • Budget <strong>₹{budget.toLocaleString()}</strong> • <strong>{selectedInterests.join(', ')}</strong> • <strong>{foodPreference}</strong> food • <strong>{accessibilityPref}</strong> mode
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 disabled:opacity-30 text-warmwhite-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              {currentStep < 9 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(9, prev + 1))}
                  className="px-6 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all"
                >
                  <span>NEXT STEP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleStartGeneration}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-terracotta-500/30 flex items-center gap-2 animate-pulse"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CREATE MY ITINERARY WITH AI</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
