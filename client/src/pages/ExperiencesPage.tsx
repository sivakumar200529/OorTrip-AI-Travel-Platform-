import React, { useState } from 'react';
import { 
  Sparkles, MapPin, Star, Clock, Users, Globe, 
  ShoppingBag, CheckCircle2, Heart, ArrowRight, ShieldCheck, X 
} from 'lucide-react';
import { LOCAL_EXPERIENCES, ARTISANS } from '../data/tamilNaduData';
import { LocalExperience, Artisan, ArtisanProduct } from '../types';
import { useAuth } from '../context/AuthContext';

export const ExperiencesPage: React.FC = () => {
  const { updatePoints } = useAuth();
  const [activeTab, setActiveTab] = useState<'experiences' | 'artisans'>('experiences');
  const [bookingModalItem, setBookingModalItem] = useState<LocalExperience | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState<ArtisanProduct | null>(null);

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    updatePoints(150); // reward points for local experience
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalItem(null);
    }, 2800);
  };

  const handleBuyProduct = (product: ArtisanProduct) => {
    setPurchasedProduct(product);
    updatePoints(100);
    setTimeout(() => setPurchasedProduct(null), 3000);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 text-xs font-semibold border border-terracotta-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ETHICAL DIRECT COMMERCE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Local Experiences & Artisan Guilds
          </h1>
          <p className="text-xs sm:text-sm text-warmwhite-300/80 leading-relaxed">
            Support indigenous weavers, temple sculptors, organic farm homestays, and Chettiar culinary masters across Tamil Nadu with 0% middleman commissions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="p-1 rounded-2xl bg-charcoal-900 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'experiences'
                  ? 'bg-terracotta-500 text-white shadow-md'
                  : 'text-warmwhite-300 hover:text-white'
              }`}
            >
              Immersive Experiences ({LOCAL_EXPERIENCES.length})
            </button>
            <button
              onClick={() => setActiveTab('artisans')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'artisans'
                  ? 'bg-terracotta-500 text-white shadow-md'
                  : 'text-warmwhite-300 hover:text-white'
              }`}
            >
              Artisan Guilds & Crafts ({ARTISANS.length})
            </button>
          </div>
        </div>

        {/* Success Banners */}
        {purchasedProduct && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Direct Artisan Purchase Confirmed: <strong>{purchasedProduct.title}</strong> (₹{purchasedProduct.price}). +100 Tourist Points added to your pass!</span>
            </div>
          </div>
        )}

        {/* TAB 1: LOCAL EXPERIENCES (Section 25) */}
        {activeTab === 'experiences' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LOCAL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="rounded-3xl bg-charcoal-900 border border-white/10 overflow-hidden shadow-depth-md flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                      {exp.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-terracotta-500 text-white text-xs font-bold shadow-md">
                      ₹{exp.price} / person
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[11px] uppercase font-bold text-sand-300">{exp.tamilTitle}</p>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{exp.title}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Host info */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-charcoal-850 border border-white/5">
                    <img src={exp.hostAvatar} alt={exp.hostName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white text-xs">{exp.hostName}</p>
                      <p className="text-[10px] text-warmwhite-300/60">{exp.hostRole} • {exp.location}</p>
                    </div>
                  </div>

                  <p className="text-xs text-warmwhite-300/80 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold text-white uppercase tracking-wider">Highlights</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="text-[11px] text-warmwhite-300/70 flex items-center gap-1.5">
                          <span className="text-terracotta-400 font-bold">•</span>
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-white/10 text-warmwhite-300/70">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{exp.rating}</span>
                      <span className="text-warmwhite-300/50 text-[10px]">({exp.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-terracotta-400" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-oceanblue-400" />
                      <span>{exp.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setBookingModalItem(exp)}
                      className="flex-1 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>BOOK EXPERIENCE</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ARTISAN MARKETPLACE (Section 26) */}
        {activeTab === 'artisans' && (
          <div className="space-y-10">
            {ARTISANS.map((artisan) => (
              <div
                key={artisan.id}
                className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 sm:p-8 space-y-6 shadow-depth-md"
              >
                {/* Artisan Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={artisan.photo}
                      alt={artisan.artisanName}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-terracotta-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-xl font-bold text-white">{artisan.artisanName}</h3>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                          {artisan.badge}
                        </span>
                      </div>
                      <p className="text-xs text-sand-300 font-medium mt-0.5">{artisan.craftName} • {artisan.region}</p>
                      <p className="text-[11px] text-warmwhite-300/70 mt-1 max-w-xl">{artisan.story}</p>
                    </div>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <span className="text-amber-400 text-xs font-bold">★ {artisan.rating} Guild Rating</span>
                    <span className="text-[10px] text-warmwhite-300/50 block">Direct Producer Verification</span>
                  </div>
                </div>

                {/* Artisan Products Showcase */}
                <div className="space-y-3">
                  <p className="text-xs uppercase font-bold tracking-wider text-warmwhite-300/60">
                    Authentic Verified Masterpieces
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {artisan.products.map((prod) => (
                      <div key={prod.id} className="p-4 rounded-2xl bg-charcoal-850 border border-white/5 space-y-3 flex flex-col justify-between">
                        <div className="h-36 rounded-xl overflow-hidden relative">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-terracotta-400 text-xs font-bold">
                            ₹{prod.price.toLocaleString()}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif text-xs font-bold text-white line-clamp-1">{prod.title}</h4>
                          <p className="text-[10px] text-warmwhite-300/70 mt-0.5 line-clamp-2">{prod.description}</p>
                          <p className="text-[10px] text-sand-400 mt-1 font-mono">Materials: {prod.material}</p>
                        </div>

                        <button
                          onClick={() => handleBuyProduct(prod)}
                          className="w-full py-2 rounded-xl bg-charcoal-800 hover:bg-terracotta-500 hover:text-white text-warmwhite-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Direct Order (₹{prod.price})</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* BOOKING MODAL */}
      {bookingModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-charcoal-900 border border-white/15 p-6 shadow-depth-3d space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Reserve Experience</h3>
              <button onClick={() => setBookingModalItem(null)} className="text-warmwhite-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Booking Confirmed!</h4>
                <p className="text-xs text-warmwhite-300/80">
                  Your spot for <strong>{bookingModalItem.title}</strong> is reserved with {bookingModalItem.hostName}.
                  We have credited <strong>+150 Tourist Points</strong> to your Digital Pass!
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-charcoal-850 border border-white/5 flex items-center gap-3">
                  <img src={bookingModalItem.image} alt={bookingModalItem.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-white">{bookingModalItem.title}</p>
                    <p className="text-[11px] text-terracotta-400">₹{bookingModalItem.price} / person • {bookingModalItem.duration}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-warmwhite-300/80 font-semibold">Select Session Time:</label>
                  <select className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500">
                    {bookingModalItem.availability.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-warmwhite-300/80 font-semibold">Guests Count:</label>
                  <select className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500">
                    <option value="1">1 Tourist (₹{bookingModalItem.price})</option>
                    <option value="2">2 Tourists (₹{bookingModalItem.price * 2})</option>
                    <option value="4">4 Tourists (₹{bookingModalItem.price * 4})</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-charcoal-950 text-[11px] text-warmwhite-300/60">
                  ✓ Instant host SMS confirmation • Direct UPI payment on arrival • Free 24h cancellation
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalItem(null)}
                    className="flex-1 py-2.5 rounded-xl bg-charcoal-800 text-warmwhite-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmExecuteBooking}
                    className="flex-1 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold shadow-md"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );

  function handleConfirmExecuteBooking() {
    handleConfirmBooking();
  }
};
