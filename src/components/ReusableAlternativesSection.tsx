import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Coffee,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ShieldCheck,
  TrendingDown,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const ReusableAlternativesSection: React.FC = () => {
  const { alternatives, toggleAlternativeAdoption, setCurrentSection, stats } = useCampaign();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Drinkware', 'Dining', 'Bags & Carry', 'Stationery & Living'];

  const filteredAlternatives = alternatives.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.disposableItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const adoptedItems = alternatives.filter((a) => a.isAdopted);
  const totalAnnualKgSaved = adoptedItems.reduce((acc, a) => acc + a.annualPlasticSavedKg, 0);
  const totalDisposableUnitsPrevented = adoptedItems.reduce(
    (acc, a) => acc + a.itemsPreventedPerYear,
    0
  );

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentSection('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mb-2"
              id="back-to-home-from-alternatives"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-100 text-sky-700">
                <Coffee className="w-6 h-6" />
              </span>
              Campus Reusable Alternatives Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Replace single-use petroleum plastics across the AITS cafeteria and classrooms. Mark the items
              you currently use to earn immediate EcoPoints and track your personal footprint reduction.
            </p>
          </div>

          {/* User Pledge Impact Card */}
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                Your Active Pledge
              </span>
              <div className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>{adoptedItems.length} / {alternatives.length} Adopted</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                  ~{totalAnnualKgSaved.toFixed(1)} kg saved/yr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact summary banner */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-sky-800 text-white rounded-2xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1 md:col-span-1">
              <span className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">
                Pledge Calculator
              </span>
              <h3 className="text-xl font-bold">Your Personal Impact</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                By switching to reusables, you actively stop throwaway single-use plastics from entering local
                stormwater drains and open landfills.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <span className="text-xs text-emerald-200 block">Adopted Items</span>
                <span className="text-2xl font-black">{adoptedItems.length} items</span>
                <span className="text-[10px] text-emerald-100 mt-1 block">Active pledges</span>
              </div>

              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <span className="text-xs text-emerald-200 block">Single-Use Diverted</span>
                <span className="text-2xl font-black">{totalDisposableUnitsPrevented} / yr</span>
                <span className="text-[10px] text-emerald-100 mt-1 block">Disposable units stopped</span>
              </div>

              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-xs text-emerald-200 block">Plastic Weight Prevented</span>
                <span className="text-2xl font-black">{totalAnnualKgSaved.toFixed(1)} kg</span>
                <span className="text-[10px] text-emerald-100 mt-1 block">Petroleum plastics avoided</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reusable alternative or disposable item (e.g. bottle, straw, tote bag)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alternatives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlternatives.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl p-5 border transition flex flex-col justify-between shadow-xs hover:shadow-md ${
                item.isAdopted
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Category & Points Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    +{item.pointsReward} Pts
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-slate-900 leading-snug">{item.name}</h3>

                {/* Replaces Tag */}
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
                  <TrendingDown className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">
                      Replaces Disposable
                    </span>
                    <span className="font-medium text-slate-700 line-through decoration-rose-400">
                      {item.disposableItem}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{item.description}</p>

                {/* Materials info */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.materials}</span>
                </div>

                {/* Impact metrics */}
                <div className="mt-3 grid grid-cols-2 gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-700 block">Annual Prevention</span>
                    <span className="font-bold text-slate-900">{item.itemsPreventedPerYear} items/yr</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 block">Weight Offset</span>
                    <span className="font-bold text-slate-900">{item.annualPlasticSavedKg} kg/yr</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => toggleAlternativeAdoption(item.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 ${
                    item.isAdopted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200'
                  }`}
                  id={`adopt-btn-${item.id}`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${item.isAdopted ? 'text-white' : 'text-slate-400'}`}
                  />
                  <span>{item.isAdopted ? 'Adopted in My Daily Carry' : 'Mark as Adopted (+ Points)'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
