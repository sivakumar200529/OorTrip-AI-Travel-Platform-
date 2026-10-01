import React, { useState } from 'react';
import { 
  BarChart3, Users, Compass, Building2, Star, TrendingUp, 
  MapPin, ShieldAlert, Award, FileText, CheckCircle2, 
  Download, Filter, AlertTriangle, Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, LineChart, Line, 
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, AreaChart, Area 
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'crowd' | 'sentiment' | 'businesses'>('overview');

  // KPIs (Section 36)
  const kpis = [
    { title: 'Total Tourists', value: '428,950', change: '+14.2% YoY', icon: Users, color: 'text-oceanblue-400' },
    { title: 'Active Trips Planned', value: '3,842', change: '+24% this week', icon: Compass, color: 'text-terracotta-400' },
    { title: 'Popular Hub', value: 'Mahabalipuram', sub: 'Shore Temple Circuit', icon: MapPin, color: 'text-sand-400' },
    { title: 'Verified Businesses', value: '1,280', change: '+68 onboarding', icon: Building2, color: 'text-emerald-400' },
    { title: 'State Avg Satisfaction', value: '4.86 ★', sub: '94% Positive Sentiment', icon: Star, color: 'text-amber-400' },
    { title: 'Artisan Revenue Dispersal', value: '₹1.84 Cr', change: '100% direct to guilds', icon: Award, color: 'text-templegreen-400' },
  ];

  // Monthly visits (Jan - Dec)
  const monthlyVisits = [
    { month: 'Jan', domestic: 38000, international: 12000 },
    { month: 'Feb', domestic: 42000, international: 14000 },
    { month: 'Mar', domestic: 35000, international: 9000 },
    { month: 'Apr', domestic: 28000, international: 6000 },
    { month: 'May', domestic: 31000, international: 5000 },
    { month: 'Jun', domestic: 34000, international: 7000 },
    { month: 'Jul', domestic: 39000, international: 8500 },
    { month: 'Aug', domestic: 44000, international: 11000 },
    { month: 'Sep', domestic: 48000, international: 13500 },
    { month: 'Oct', domestic: 58000, international: 18000 },
  ];

  // Destination popularity
  const destinationPopularity = [
    { name: 'Mahabalipuram', visits: 88400 },
    { name: 'Madurai', visits: 76200 },
    { name: 'Thanjavur', visits: 64100 },
    { name: 'Kanchipuram', visits: 58300 },
    { name: 'Ooty', visits: 52900 },
    { name: 'Pondicherry', visits: 49800 },
    { name: 'Rameswaram', visits: 44200 },
  ];

  // Tourist interests
  const touristInterests = [
    { name: 'Temples & Shrines', value: 42, color: '#D35B2D' },
    { name: 'Heritage Architecture', value: 28, color: '#D4AF37' },
    { name: 'Gastronomy & Messes', value: 16, color: '#10B981' },
    { name: 'Hill Stations & Lakes', value: 10, color: '#2F80ED' },
    { name: 'Artisan Workshops', value: 4, color: '#8B5CF6' },
  ];

  // Sentiment Breakdown
  const sentimentData = [
    { category: 'Cleanliness & Upkeep', positive: 91, issues: 9 },
    { category: 'Crowd Flow & Signage', positive: 76, issues: 24 },
    { category: 'Food Quality & Hygiene', positive: 94, issues: 6 },
    { category: 'Accessibility & Ramps', positive: 82, issues: 18 },
    { category: 'Audio Guide Helpfulness', positive: 96, issues: 4 },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-templegreen-500/20 text-templegreen-400 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>GOVERNMENT OF TAMIL NADU • TOURISM ADMINISTRATION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              State Tourism Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-warmwhite-300/80">
              Department of Tourism & TTDC Executive Analytics • Multi-district Monitoring Network
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert('Generating TTDC Monthly Tourism Policy Report (PDF)...')}
              className="px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-850 text-warmwhite-200 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-templegreen-400" />
              <span>Export Monthly Report</span>
            </button>
          </div>
        </div>

        {/* 6 KPIS TILES (Section 36) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-charcoal-900 border border-white/10 space-y-2 shadow-depth-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-warmwhite-300/60 uppercase font-semibold">{kpi.title}</span>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-white truncate">{kpi.value}</p>
                <p className="text-[10px] text-emerald-400 font-medium truncate">{kpi.change || kpi.sub}</p>
              </div>
            );
          })}
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-1 text-xs">
          {[
            { id: 'overview', label: 'Statewide Overview & Trends' },
            { id: 'crowd', label: 'Congestion & Predictive Balancing' },
            { id: 'sentiment', label: 'Tourist Sentiment & Review NLP' },
            { id: 'businesses', label: 'Local Business & Artisan Dispersal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-charcoal-800 text-white border border-white/15'
                  : 'text-warmwhite-300/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW CHARTS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Monthly Inflow Chart */}
              <div className="lg:col-span-8 rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Monthly Tourist Inflow (2026)</h3>
                    <p className="text-xs text-warmwhite-300/70">Domestic vs International visitors across Tamil Nadu</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-terracotta-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-terracotta-500" /> Domestic
                    </span>
                    <span className="flex items-center gap-1.5 text-oceanblue-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-oceanblue-400" /> International
                    </span>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyVisits}>
                      <XAxis dataKey="month" stroke="#5A667A" fontSize={11} />
                      <YAxis stroke="#5A667A" fontSize={11} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#171B21', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Area type="monotone" dataKey="domestic" stackId="1" stroke="#D35B2D" fill="#D35B2D" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="international" stackId="1" stroke="#2F80ED" fill="#2F80ED" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tourist Interests Pie */}
              <div className="lg:col-span-4 rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
                <h3 className="font-serif text-lg font-bold text-white">Tourist Interest Segmentation</h3>
                <p className="text-xs text-warmwhite-300/70">Primary traveler preferences</p>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={touristInterests}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {touristInterests.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#171B21', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(val: number) => [`${val}%`, 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 text-xs pt-1 border-t border-white/5">
                  {touristInterests.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-warmwhite-300">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </span>
                      <span className="font-semibold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Destination Popularity Bar Chart */}
            <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
              <h3 className="font-serif text-lg font-bold text-white">Top Visited Hubs (Footfall Volume)</h3>
              <p className="text-xs text-warmwhite-300/70">Recorded footfalls across UNESCO monuments and state pilgrimage centers</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={destinationPopularity}>
                    <XAxis dataKey="name" stroke="#5A667A" fontSize={11} />
                    <YAxis stroke="#5A667A" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#171B21', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                      formatter={(val: number) => [`${val.toLocaleString()} visitors`, 'Footfall']}
                    />
                    <Bar dataKey="visits" fill="#2E7D5B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CROWD BALANCING */}
        {activeTab === 'crowd' && (
          <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Live Capacity & Predictive Congestion Radar</h3>
                <p className="text-xs text-warmwhite-300/70">Automatic AI rerouting prevents dangerous choke-points at heritage temples</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono">
                REAL-TIME DISPERSAL ENGINE ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-charcoal-850 border border-rose-500/30 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Shore Temple, Mahabalipuram</span>
                  <span className="text-rose-400 font-bold">92% Capacity (HIGH)</span>
                </div>
                <p className="text-warmwhite-300/70 text-[11px]">
                  Active AI Intervention: Rerouting 35% of incoming Chennai ECR traffic toward Sadras Fort & Covelong Beach.
                </p>
                <div className="w-full h-2 rounded-full bg-charcoal-950 overflow-hidden">
                  <div className="h-full bg-rose-500 w-[92%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-charcoal-850 border border-amber-500/30 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Meenakshi Temple, Madurai</span>
                  <span className="text-amber-400 font-bold">78% Capacity (MED)</span>
                </div>
                <p className="text-warmwhite-300/70 text-[11px]">
                  Darshan queues moving smoothly; East tower battery cart accessibility shuttle operating at 100%.
                </p>
                <div className="w-full h-2 rounded-full bg-charcoal-950 overflow-hidden">
                  <div className="h-full bg-amber-500 w-[78%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-charcoal-850 border border-emerald-500/30 space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Brihadeeswara, Thanjavur</span>
                  <span className="text-emerald-400 font-bold">48% Capacity (LOW)</span>
                </div>
                <p className="text-warmwhite-300/70 text-[11px]">
                  Ideal conditions. Evening lighting system primed for Raja Raja Chola Vimana laser mapping.
                </p>
                <div className="w-full h-2 rounded-full bg-charcoal-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[48%]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SENTIMENT NLP */}
        {activeTab === 'sentiment' && (
          <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-6">
            <h3 className="font-serif text-lg font-bold text-white">Tourist Review Sentiment Diagnostics</h3>
            <p className="text-xs text-warmwhite-300/70">Aggregated NLP scoring across 14 tourist districts</p>

            <div className="space-y-4">
              {sentimentData.map((item) => (
                <div key={item.category} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">{item.category}</span>
                    <span className="text-emerald-400 font-mono">{item.positive}% Positive Approval</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-charcoal-800 overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: `${item.positive}%` }} />
                    <div className="bg-rose-500 h-full" style={{ width: `${item.issues}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOCAL BUSINESS & ARTISANS */}
        {activeTab === 'businesses' && (
          <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Direct Rural Economic Impact</h3>
            <p className="text-xs text-warmwhite-300/70">Tracking direct tourism spending across Chettinad, Kanchipuram, and Swamimalai guilds</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-charcoal-850 border border-white/5 space-y-1">
                <p className="text-warmwhite-300/60 uppercase font-semibold text-[10px]">Registered Guild Artisans</p>
                <p className="font-serif text-2xl font-bold text-white">412 Master Weavers & Sculptors</p>
              </div>
              <div className="p-4 rounded-2xl bg-charcoal-850 border border-white/5 space-y-1">
                <p className="text-warmwhite-300/60 uppercase font-semibold text-[10px]">Total Direct Revenue Dispersed</p>
                <p className="font-serif text-2xl font-bold text-emerald-400">₹1,84,20,000</p>
              </div>
              <div className="p-4 rounded-2xl bg-charcoal-850 border border-white/5 space-y-1">
                <p className="text-warmwhite-300/60 uppercase font-semibold text-[10px]">Average Tourist Rating for Artisans</p>
                <p className="font-serif text-2xl font-bold text-amber-400">★ 4.94 / 5.0</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
