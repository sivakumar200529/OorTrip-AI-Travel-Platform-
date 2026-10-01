import React, { useState } from 'react';
import { 
  Building2, Plus, Calendar, DollarSign, Users, Star, 
  TrendingUp, Clock, CheckCircle2, ChevronRight, X 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const BusinessDashboardPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Business experiences
  const [experiences, setExperiences] = useState([
    {
      id: 'biz-exp-1',
      title: 'Chettinad Heritage Culinary Masterclass',
      category: 'Traditional Cooking',
      price: 850,
      activeBookings: 18,
      rating: 4.95,
      revenue: 15300,
      status: 'Active'
    },
    {
      id: 'biz-exp-2',
      title: 'Athangudi Heritage Tile Making Workshop',
      category: 'Handicrafts',
      price: 650,
      activeBookings: 12,
      rating: 4.88,
      revenue: 7800,
      status: 'Active'
    }
  ]);

  // Form for new experience
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Farm Experiences');
  const [newDuration, setNewDuration] = useState('3 Hours');

  const monthlyRevenue = [
    { month: 'Jun', revenue: 14200 },
    { month: 'Jul', revenue: 18500 },
    { month: 'Aug', revenue: 21300 },
    { month: 'Sep', revenue: 24800 },
    { month: 'Oct', revenue: 29500 },
  ];

  const handleCreateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const item = {
      id: `biz-exp-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      price: parseFloat(newPrice),
      activeBookings: 0,
      rating: 5.0,
      revenue: 0,
      status: 'Active'
    };
    setExperiences([...experiences, item]);
    setNewTitle('');
    setNewPrice('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oceanblue-500/20 text-oceanblue-400 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>LOCAL BUSINESS PARTNER PORTAL</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meenakshi Chettinad Stays & Crafts
            </h1>
            <p className="text-xs sm:text-sm text-warmwhite-300/80">
              Kanadukathan, Sivaganga District • Verified TTDC Partner #TN-BIZ-4912
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>LIST NEW EXPERIENCE</span>
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-1 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Monthly Revenue</p>
            <p className="font-serif text-2xl font-bold text-emerald-400">₹29,500</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.9% vs last month
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-1 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Total Bookings</p>
            <p className="font-serif text-2xl font-bold text-white">42 Guests</p>
            <span className="text-[10px] text-warmwhite-300/60">Across 2 experiences</span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-1 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Average Rating</p>
            <p className="font-serif text-2xl font-bold text-amber-400">★ 4.92</p>
            <span className="text-[10px] text-warmwhite-300/60">Based on 142 reviews</span>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-1 shadow-depth-sm">
            <p className="text-[11px] text-warmwhite-300/60 uppercase font-semibold">Platform Fee</p>
            <p className="font-serif text-2xl font-bold text-terracotta-400">0% Comm.</p>
            <span className="text-[10px] text-sand-300">Govt Direct Artisan Subsidy</span>
          </div>
        </div>

        {/* REVENUE CHART & RECENT BOOKINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
            <h3 className="font-serif text-lg font-bold text-white">Revenue Growth Trend</h3>
            <p className="text-xs text-warmwhite-300/70">Direct tourist earnings credited to your registered bank account</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#5A667A" fontSize={11} />
                  <YAxis stroke="#5A667A" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171B21', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Earnings']}
                  />
                  <Bar dataKey="revenue" fill="#1E65C9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
            <h3 className="font-serif text-lg font-bold text-white">Recent Guest Reservations</h3>
            <div className="space-y-3">
              {[
                { name: 'Siva & Friends', exp: 'Chettinad Masterclass', time: 'Tomorrow 10:00 AM', guests: 2, amount: 1700 },
                { name: 'Priya Narayanan', exp: 'Tile Making Workshop', time: 'Saturday 02:00 PM', guests: 1, amount: 650 },
                { name: 'Dr. Michael Chen', exp: 'Chettinad Masterclass', time: 'Sunday 10:00 AM', guests: 3, amount: 2550 },
              ].map((b, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-charcoal-850 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{b.name}</p>
                    <p className="text-[10px] text-sand-300">{b.exp}</p>
                    <span className="text-[9px] text-warmwhite-300/60 font-mono">{b.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">₹{b.amount}</span>
                    <span className="text-[10px] text-warmwhite-300/60 block">{b.guests} guests</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* LISTED EXPERIENCES TABLE */}
        <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-serif text-lg font-bold text-white">Manage Listed Experiences</h3>
            <span className="text-xs text-warmwhite-300/60 font-mono">{experiences.length} Active Listings</span>
          </div>

          <div className="space-y-3">
            {experiences.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-charcoal-850 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-white text-sm">{item.title}</h4>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-warmwhite-300/60 mt-0.5">{item.category} • ₹{item.price} per seat</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-warmwhite-300/60 uppercase">Bookings</p>
                    <p className="font-bold text-white">{item.activeBookings} Seats</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-warmwhite-300/60 uppercase">Total Revenue</p>
                    <p className="font-bold text-emerald-400">₹{item.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-warmwhite-300/60 uppercase">Rating</p>
                    <p className="font-bold text-amber-400">★ {item.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CREATE EXPERIENCE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-charcoal-900 border border-white/15 p-6 shadow-depth-3d space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">List New Experience</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-warmwhite-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExperience} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-warmwhite-300/80 font-semibold">Experience Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Village Bullock Cart & Mango Grove Walk"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-warmwhite-300/80 font-semibold">Price (₹ per person)</label>
                  <input
                    type="number"
                    required
                    placeholder="750"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-warmwhite-300/80 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                  >
                    <option value="Farm Experiences">Farm Experiences</option>
                    <option value="Traditional Cooking">Traditional Cooking</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Village Tours">Village Tours</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-charcoal-800 text-warmwhite-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold shadow-md"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
