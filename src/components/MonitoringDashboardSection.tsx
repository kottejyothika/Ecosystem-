import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  ArrowLeft,
  Calendar,
  PieChart,
  Activity,
  Layers,
  Sparkles,
  TreePine,
  Droplets,
  CloudRain,
  PlusCircle,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const MonitoringDashboardSection: React.FC = () => {
  const { stats, setCurrentSection, setIsReportModalOpen } = useCampaign();
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly'>('monthly');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Monthly data over academic year
  const monthlyData = [
    { label: 'Oct 25', collected: 140, recycled: 120, reducedItems: 980 },
    { label: 'Nov 25', collected: 185, recycled: 160, reducedItems: 1240 },
    { label: 'Dec 25', collected: 210, recycled: 190, reducedItems: 1480 },
    { label: 'Jan 26', collected: 260, recycled: 235, reducedItems: 1890 },
    { label: 'Feb 26', collected: 320, recycled: 285, reducedItems: 2400 },
    { label: 'Mar 26', collected: 385, recycled: 340, reducedItems: 2950 },
    { label: 'Sep 26', collected: Math.round(stats.totalPlasticCollectedKg * 0.32), recycled: Math.round(stats.totalPlasticRecycledKg * 0.32), reducedItems: 3450 },
  ];

  // Daily data for the current week
  const dailyData = [
    { label: 'Mon', collected: 18.5, recycled: 16.0, reducedItems: 140 },
    { label: 'Tue', collected: 24.2, recycled: 21.5, reducedItems: 190 },
    { label: 'Wed', collected: 31.0, recycled: 27.8, reducedItems: 230 },
    { label: 'Thu', collected: 28.4, recycled: 25.0, reducedItems: 210 },
    { label: 'Fri', collected: 35.8, recycled: 32.0, reducedItems: 290 },
    { label: 'Sat', collected: 14.2, recycled: 12.5, reducedItems: 110 },
    { label: 'Sun', collected: 9.6, recycled: 8.4, reducedItems: 75 },
  ];

  const currentData = timeframe === 'monthly' ? monthlyData : dailyData;
  const maxVal = Math.max(...currentData.map((d) => d.collected), 1);

  // Polymer Category Breakdown
  const polymers = [
    { name: 'PET (Beverage Bottles & Flasks)', percent: 44, color: 'bg-emerald-500', barColor: '#10b981' },
    { name: 'LDPE (Snack Wrappers & Poly Film)', percent: 24, color: 'bg-teal-500', barColor: '#14b8a6' },
    { name: 'PP (Food Containers & Cups)', percent: 18, color: 'bg-sky-500', barColor: '#0ea5e9' },
    { name: 'HDPE (Toiletries & Lab Jugs)', percent: 9, color: 'bg-blue-500', barColor: '#3b82f6' },
    { name: 'PS (Styrofoam & Disposables)', percent: 5, color: 'bg-amber-500', barColor: '#f59e0b' },
  ];

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header and Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentSection('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mb-2"
              id="back-to-home-from-dashboard"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-100 text-teal-700">
                <BarChart3 className="w-6 h-6" />
              </span>
              Campaign Monitoring & Analytics Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time telemetry, polymer breakdown, and environmental impact assessments for the
              Plastic-Free College Campaign at AITS Hackathon 2026.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Waste Data</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500">Gross Plastic Collected</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
              {stats.totalPlasticCollectedKg.toLocaleString()} kg
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block mt-2">
              ▲ 18.2% vs previous month
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500">Plastic Recycled Ratio</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
              {stats.totalPlasticRecycledKg.toLocaleString()} kg
            </span>
            <span className="text-[11px] text-teal-700 font-medium block mt-2">
              88.4% diversion efficiency
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500">Single-Use Units Prevented</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
              {stats.singleUseReducedItems.toLocaleString()}
            </span>
            <span className="text-[11px] text-sky-700 font-medium block mt-2">
              Across water coolers & canteen
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500">Student Contributors</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-1">
              {stats.studentParticipationCount.toLocaleString()}
            </span>
            <span className="text-[11px] text-indigo-700 font-medium block mt-2">
              Across all engineering depts
            </span>
          </div>
        </div>

        {/* Primary Chart: Plastic Collected vs Recycled */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Plastic Waste Trajectory: Collected vs. Recycled</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparing campus intake vs volume processed by circular recycling partners.
              </p>
            </div>

            {/* Daily / Monthly Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
              <button
                onClick={() => setTimeframe('daily')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  timeframe === 'daily'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daily (Current Week)
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  timeframe === 'monthly'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly (2025-2026)
              </button>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-4 text-xs font-medium mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-500" />
              <span className="text-slate-700">Plastic Collected (kg)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-teal-400" />
              <span className="text-slate-700">Plastic Recycled (kg)</span>
            </div>
          </div>

          {/* Interactive Bar Chart */}
          <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 border-b border-slate-200 relative">
            {currentData.map((item, idx) => {
              const collectedHeight = Math.max(12, Math.round((item.collected / maxVal) * 200));
              const recycledHeight = Math.max(10, Math.round((item.recycled / maxVal) * 200));
              const isHovered = hoveredBar === idx;

              return (
                <div
                  key={item.label}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-16 bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-20 whitespace-nowrap pointer-events-none"
                    >
                      <span className="font-bold block text-emerald-300">{item.label}</span>
                      <span>Collected: {item.collected} kg</span>
                      <span className="block text-teal-300">Recycled: {item.recycled} kg</span>
                    </motion.div>
                  )}

                  {/* Dual Bars Container */}
                  <div className="flex items-end justify-center gap-1 sm:gap-2 w-full max-w-[48px]">
                    {/* Collected Bar */}
                    <div
                      style={{ height: `${collectedHeight}px` }}
                      className="w-1/2 bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-all duration-300 relative"
                    />

                    {/* Recycled Bar */}
                    <div
                      style={{ height: `${recycledHeight}px` }}
                      className="w-1/2 bg-teal-400 rounded-t-md hover:bg-teal-500 transition-all duration-300 relative"
                    />
                  </div>

                  {/* X Axis Label */}
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium mt-2 block">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2">
            <span>Aggregated via campus IoT scales and CSD logging app</span>
            <span>Scale: Kilograms (kg)</span>
          </div>
        </div>

        {/* Secondary Analytics: Polymer Distribution & Environmental Offsets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Polymer Share */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Polymer Composition Breakdown</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Distribution of plastic grades collected across AITS departments for segregated recycling.
            </p>

            <div className="space-y-4">
              {polymers.map((poly) => (
                <div key={poly.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>{poly.name}</span>
                    <span>{poly.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${poly.percent}%`, backgroundColor: poly.barColor }}
                      className="h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                PET bottles and PP food containers are channeled to local road paving and upcycled fabric mills.
              </span>
            </div>
          </div>

          {/* Environmental Net Offsets */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-teal-600" />
                <span>Validated Ecological Offsets</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Direct ecological benefits computed using Central Pollution Control Board (CPCB) conversion metrics.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-medium block">Net Greenhouse CO₂ Avoided</span>
                  <span className="text-2xl font-black text-emerald-950 mt-1 block">
                    {stats.co2SavedKg} kg
                  </span>
                  <span className="text-[10px] text-emerald-700 mt-1 block">
                    Equal to 1,840 km car emission avoided
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                  <span className="text-xs text-teal-800 font-medium block">Landfill Volume Saved</span>
                  <span className="text-2xl font-black text-teal-950 mt-1 block">
                    {Math.round(stats.totalPlasticCollectedKg * 2.8)} L
                  </span>
                  <span className="text-[10px] text-teal-700 mt-1 block">
                    Preventing open dump mound growth
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
                  <span className="text-xs text-sky-800 font-medium block">Crude Petroleum Conserved</span>
                  <span className="text-2xl font-black text-sky-950 mt-1 block">
                    {Math.round(stats.totalPlasticCollectedKg * 1.6)} L
                  </span>
                  <span className="text-[10px] text-sky-700 mt-1 block">
                    Fossil virgin plastic raw material
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <span className="text-xs text-indigo-800 font-medium block">Campus Tree Equivalent</span>
                  <span className="text-2xl font-black text-indigo-950 mt-1 block">
                    {Math.round(stats.co2SavedKg / 21)} Mature Trees
                  </span>
                  <span className="text-[10px] text-indigo-700 mt-1 block">
                    Annual carbon sequestration capacity
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Audited by: Innov8 | CSD, AITS Hackathon 2026</span>
              <span className="font-semibold text-emerald-700">WEBSPRINT 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
