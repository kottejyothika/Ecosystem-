import React from 'react';
import { motion } from 'motion/react';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Droplets,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const HeroSection: React.FC = () => {
  const { setCurrentSection, setIsReportModalOpen, stats } = useCampaign();

  const goalPercent = Math.min(
    100,
    Math.round((stats.totalPlasticCollectedKg / stats.collectionGoalKg) * 100)
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-teal-50/40 to-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-emerald-100">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-5 text-left"
          >
            {/* Hackathon Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>WEBSPRINT 2026</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-800">Innov8 | CSD, AITS Hackathon 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Plastic-Free College Campaign
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 mt-1">
                Zero Waste. Cleaner Campus.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              An intelligent, community-driven framework designed to systematically{' '}
              <strong className="text-emerald-800 font-semibold">reduce, collect, segregate</strong>, and{' '}
              <strong className="text-teal-800 font-semibold">recycle plastic waste</strong> across AITS
              classrooms, laboratories, canteens, and residential hostels.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition flex items-center gap-2 group"
                id="hero-report-button"
              >
                <PlusCircle className="w-4 h-4 text-emerald-100" />
                <span>Report Plastic Waste</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>

              <button
                onClick={() => setCurrentSection('collection')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs hover:border-emerald-300 transition flex items-center gap-2"
                id="hero-collection-button"
              >
                <Recycle className="w-4 h-4 text-emerald-600" />
                <span>Collection Points</span>
              </button>

              <button
                onClick={() => setCurrentSection('alternatives')}
                className="px-4 py-3 rounded-xl text-emerald-800 hover:bg-emerald-100/50 font-semibold text-sm transition flex items-center gap-1.5"
              >
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Reusable Alternatives</span>
              </button>
            </div>

            {/* Environmental Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-3 max-w-lg border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Traceable</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Cleaner Waterways</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>EcoPoints Rewards</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Interactive Goal Tracker Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/60 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Campus Annual Goal
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Academic Year 2025-26
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {stats.totalPlasticCollectedKg.toLocaleString()} <span className="text-sm font-medium text-slate-500">kg</span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {goalPercent}% Achieved
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Target: {stats.collectionGoalKg.toLocaleString()} kg total plastic diversion across campus
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goalPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-full"
                  />
                </div>
              </div>

              {/* Quick Environmental Offsets Row */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <span className="text-[11px] font-medium text-emerald-800 block">CO₂ Saved</span>
                  <span className="text-base font-bold text-emerald-950">{stats.co2SavedKg} kg</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Equivalent to ~16 trees planted</span>
                </div>

                <div className="p-2.5 bg-sky-50/70 rounded-xl border border-sky-100">
                  <span className="text-[11px] font-medium text-sky-800 block">Single-Use Prevented</span>
                  <span className="text-base font-bold text-sky-950">
                    {stats.singleUseReducedItems.toLocaleString()} <span className="text-xs font-normal">items</span>
                  </span>
                  <span className="text-[10px] text-sky-600 block mt-0.5">Via reusable alternatives</span>
                </div>
              </div>

              {/* Call to action card footer */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-600">
                <span>Want to register your department?</span>
                <button
                  onClick={() => setCurrentSection('dashboard')}
                  className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                >
                  View Live Analytics →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
