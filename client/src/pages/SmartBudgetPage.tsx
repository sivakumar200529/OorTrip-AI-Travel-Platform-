import React, { useState } from 'react';
import { 
  Wallet, Plus, AlertTriangle, TrendingUp, Sparkles, 
  ArrowUpRight, ArrowDownRight, Tag, Calendar, Check, X 
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { INITIAL_EXPENSES } from '../data/tamilNaduData';
import { Expense } from '../types';

export const SmartBudgetPage: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState(5000);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form fields for new expense
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Food');
  const [notes, setNotes] = useState('');

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentageUsed = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Category breakdown calculation
  const categoryData = [
    { name: 'Transport', value: expenses.filter(e => e.category === 'Transport').reduce((s, e) => s + e.amount, 0), color: '#2F80ED' },
    { name: 'Food', value: expenses.filter(e => e.category === 'Food').reduce((s, e) => s + e.amount, 0), color: '#D35B2D' },
    { name: 'Tickets', value: expenses.filter(e => e.category === 'Tickets').reduce((s, e) => s + e.amount, 0), color: '#10B981' },
    { name: 'Shopping', value: expenses.filter(e => e.category === 'Shopping').reduce((s, e) => s + e.amount, 0), color: '#E7784D' },
    { name: 'Activities', value: expenses.filter(e => e.category === 'Activities').reduce((s, e) => s + e.amount, 0), color: '#B09467' },
  ].filter(c => c.value > 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      title,
      category,
      amount: parseFloat(amount),
      date: 'Just now',
      notes
    };
    setExpenses([newExp, ...expenses]);
    setTitle('');
    setAmount('');
    setNotes('');
    setIsAddOpen(false);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-400 text-xs font-semibold border border-terracotta-500/30">
              <Wallet className="w-3.5 h-3.5" />
              <span>FINANCIAL COMPANION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Smart Trip Budget
            </h1>
            <p className="text-xs sm:text-sm text-warmwhite-300/80">
              Live expense auditing, predictive toll estimations, and AI spending warnings.
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>ADD EXPENSE</span>
          </button>
        </div>

        {/* TOP FLOATING BUDGET CARD (Section 24) */}
        <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-white/15 p-6 sm:p-8 shadow-depth-3d space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-warmwhite-300/60 font-mono">
                TRIP BUDGET
              </p>
              <p className="font-serif text-4xl sm:text-5xl font-extrabold text-white mt-1">
                ₹{totalBudget.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Spent</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-terracotta-400">
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-charcoal-950 border border-white/5">
                <p className="text-[10px] text-warmwhite-300/60 uppercase">Remaining</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-emerald-400">
                  ₹{remaining.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-warmwhite-300/80 font-medium">
              <span>{percentageUsed}% of planned budget used</span>
              <span className="text-sand-300">₹{remaining} available for Day 2</span>
            </div>
            <div className="w-full h-3.5 rounded-full bg-charcoal-950 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-terracotta-500 rounded-full transition-all duration-500"
                style={{ width: `${percentageUsed}%` }}
              />
            </div>
          </div>

          {/* AI Warning Advisory */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">AI Budget Advisory:</p>
              <p className="text-warmwhite-200 mt-0.5 text-[11px] leading-relaxed">
                You have used <strong>{percentageUsed}%</strong> of your planned budget. Your remaining ₹{remaining.toLocaleString()} is well balanced for temple entry passes and tomorrow's banana leaf lunch enroute to Thanjavur.
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS ROW (Recharts Pie & Bar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Category Breakdown Pie Chart */}
          <div className="lg:col-span-5 rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
            <h3 className="font-serif text-lg font-bold text-white">Expense Distribution</h3>
            <p className="text-xs text-warmwhite-300/70">Breakdown across your Tamil Nadu journey stops</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171B21', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#ffffff' }}
                    formatter={(val: number) => [`₹${val}`, 'Spent']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-warmwhite-300/80">{cat.name}:</span>
                  <span className="font-semibold text-white">₹{cat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart by Category */}
          <div className="lg:col-span-7 rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4 shadow-depth-sm">
            <h3 className="font-serif text-lg font-bold text-white">Category Comparison</h3>
            <p className="text-xs text-warmwhite-300/70">Expenditure volume in Indian Rupees (₹)</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#5A667A" fontSize={11} />
                  <YAxis stroke="#5A667A" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171B21', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(val: number) => [`₹${val}`, 'Spent']}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] text-warmwhite-300/60 font-mono text-center pt-2">
              Largest expense: AC Cab Transport (₹1,450) • Lowest expense: Heritage Audio Passes (₹200)
            </p>
          </div>

        </div>

        {/* RECENT EXPENSES TABLE */}
        <div className="rounded-3xl bg-charcoal-900 border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-serif text-lg font-bold text-white">Recent Transactions</h3>
            <span className="text-xs text-warmwhite-300/60 font-mono">{expenses.length} Records Logged</span>
          </div>

          <div className="space-y-2.5">
            {expenses.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-charcoal-850 border border-white/5 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-charcoal-900 border border-white/10 flex items-center justify-center text-terracotta-400 shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-[10px] text-warmwhite-300/60">{item.date} • {item.notes}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-white text-sm">₹{item.amount.toLocaleString()}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal-900 text-sand-300 block mt-0.5">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ADD EXPENSE MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-charcoal-900 border border-white/15 p-6 shadow-depth-3d space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">Log Travel Expense</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-warmwhite-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-warmwhite-300/80 font-semibold">Expense Title / Item</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shore Temple Entry Ticket"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-warmwhite-300/80 font-semibold">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="250"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-warmwhite-300/80 font-semibold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Stay">Stay</option>
                    <option value="Tickets">Tickets</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Activities">Activities</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-warmwhite-300/80 font-semibold">Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Traditional banana leaf meal for two"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-white/10 text-white focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-charcoal-800 text-warmwhite-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold shadow-md"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
