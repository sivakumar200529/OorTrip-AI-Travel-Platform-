import React, { useState } from 'react';
import { Utensils, Star, MapPin, IndianRupee, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface FoodItem {
  id: string;
  name: string;
  tamilName: string;
  category: 'Vegetarian' | 'Non-Vegetarian' | 'South Indian' | 'Street Food' | 'Traditional' | 'Jain';
  location: string;
  district: string;
  priceRange: string;
  rating: number;
  highlight: string;
  description: string;
  image: string;
}

const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Chettinad Banana Leaf Feast & Pepper Gravy',
    tamilName: 'செட்டிநாட்டு வாழை இலை விருந்து',
    category: 'Traditional',
    location: 'The Bangala, Karaikudi',
    district: 'Sivaganga',
    priceRange: '₹350 – ₹600',
    rating: 4.95,
    highlight: 'Heritage Palace Kitchen Recipe',
    description: 'Slow-simmered in clay pots with hand-ground black pepper, star anise, kalpasi stone flower, served with steaming ponni rice.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'food-2',
    name: 'Famous Madurai Jigarthanda',
    tamilName: 'மதுரை பிரபல ஜிகர்தண்டா',
    category: 'Street Food',
    location: 'East Marret Street, Madurai',
    district: 'Madurai',
    priceRange: '₹60 – ₹120',
    rating: 4.9,
    highlight: 'Royal Pandyan Summer Nectar',
    description: 'Velvety chilled glass layered with almond gum (badam pisin), nannari root syrup, condensed basundi milk, and rich ice cream scoop.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'food-3',
    name: 'Mylapore Ghee Podi Idli & Filter Coffee',
    tamilName: 'மயிலாப்பூர் நெய் பொடி இட்லி',
    category: 'Vegetarian',
    location: 'Rayar Mess, Mylapore',
    district: 'Chennai',
    priceRange: '₹110 – ₹200',
    rating: 4.88,
    highlight: '100% Pure Ghee & Brass Tumbler',
    description: 'Melt-in-mouth steamed rice cakes coated in coarse roasted dal gunpowder and pure melted ghee, washed down with frothy chicory filter coffee.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'food-4',
    name: 'Tanjore Kaveri Delta Vatha Kuzhambu',
    tamilName: 'தஞ்சாவூர் வத்தக்குழம்பு சாப்பாடு',
    category: 'South Indian',
    location: 'Old Bus Stand Mess, Thanjavur',
    district: 'Thanjavur',
    priceRange: '₹140 – ₹220',
    rating: 4.85,
    highlight: 'Sundakkai & Manathakkali Berries',
    description: 'Tangy tamarind and roasted sesame stew infused with sun-dried turkey berry nightshades, balanced with sweet jaggery and crunchy appalam.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'food-5',
    name: 'Dindigul Thalappakatti Seeraga Samba Biryani',
    tamilName: 'திண்டுக்கல் சீரக சம்பா பிரியாணி',
    category: 'Non-Vegetarian',
    location: 'Round Road, Dindigul',
    district: 'Dindigul',
    priceRange: '₹280 – ₹450',
    rating: 4.89,
    highlight: 'Short-Grain Fragrant Samba Rice',
    description: 'Cooked over wood fire with small fragrant seeraga samba grains, tender meat, and curd raitha with no artificial essences.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'food-6',
    name: 'Jain Saatvik Plantain Thali',
    tamilName: 'ஜைன சாத்விக உணவு',
    category: 'Jain',
    location: 'Sowcarpet, Chennai',
    district: 'Chennai',
    priceRange: '₹180 – ₹320',
    rating: 4.8,
    highlight: 'No Root Veg, Raw Banana Delights',
    description: 'Pure satvik meal prepared without onion, garlic, or root vegetables, featuring raw banana subzi, fresh curd, and warm rotis.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
  }
];

export const SmartFoodDiscovery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Vegetarian', 'Traditional', 'Street Food', 'Non-Vegetarian', 'South Indian', 'Jain'];

  const filteredItems = selectedFilter === 'All'
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((f) => f.category === selectedFilter);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <Utensils className="w-3.5 h-3.5" />
            <span>AUTHENTIC REGIONAL GASTRONOMY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Smart Food Discovery
          </h2>
          <p className="text-sm text-warmwhite-300/80 max-w-2xl leading-relaxed">
            From centuries-old Chettinad spice estates to fragrant Madurai midnight food stalls and Kumbakonam degree filter coffee. Filter by your dietary style.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {filters.map((fil) => (
            <button
              key={fil}
              onClick={() => setSelectedFilter(fil)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === fil
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-charcoal-900 text-warmwhite-300/80 hover:text-white hover:bg-charcoal-800 border border-white/10'
              }`}
            >
              {fil}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-charcoal-900 border border-white/15 overflow-hidden shadow-depth-md flex flex-col justify-between hover:border-white/25 transition-all group"
          >
            <div className="relative h-48 overflow-hidden bg-charcoal-800">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                category="Food"
                label={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent pointer-events-none" />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-400" />
                <span>{item.district}</span>
              </span>

              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/40">
                {item.category}
              </span>

              <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                <p className="text-[10px] font-mono text-sand-300">{item.tamilName}</p>
                <h4 className="font-serif text-lg font-bold text-white truncate">{item.name}</h4>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs text-terracotta-400 font-semibold">{item.highlight}</p>
                <p className="text-xs text-warmwhite-300/80 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
                <div className="text-white font-semibold">
                  {item.priceRange}
                </div>
                <span className="text-[11px] text-warmwhite-300/60 truncate">
                  {item.location.split(',')[0]}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
