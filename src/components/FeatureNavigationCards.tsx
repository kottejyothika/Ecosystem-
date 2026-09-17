import React from 'react';
import { motion } from 'motion/react';
import {
  Recycle,
  Coffee,
  Award,
  BarChart3,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { NavSection } from '../types';

export const FeatureNavigationCards: React.FC = () => {
  const { setCurrentSection, stations, alternatives, stats } = useCampaign();

  const adoptedCount = alternatives.filter((a) => a.isAdopted).length;
  const nearFullStations = stations.filter((s) => s.status !== 'Normal').length;

  const features: {
    id: NavSection;
    emoji: string;
    title: string;
    description: string;
    highlights: string[];
    actionText: string;
    accentColor: string;
    badge: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'collection',
      emoji: '♻️',
      title: 'Smart Plastic Collection',
      description:
        'Locate real-time campus drop-off stations, check bin fill levels, and report your segregated plastic deposits to earn EcoPoints.',
      highlights: [
        `${stations.length} active campus stations mapped`,
        'Instant weight verification & points logging',
        `${nearFullStations} hubs currently near capacity`,
      ],
      actionText: 'Open Collection Hubs',
      accentColor: 'from-emerald-500/10 to-teal-500/5 hover:border-emerald-400',
      badge: 'Interactive Hub',
      icon: <Recycle className="w-6 h-6 text-emerald-600" />,
    },
    {
      id: 'alternatives',
      emoji: '🥤',
      title: 'Reusable Alternatives',
      description:
        'Discover durable eco-friendly alternatives for disposable bottles, coffee cups, cutlery, and bags. Pledge your switch and track plastic diverted.',
      highlights: [
        `${alternatives.length} campus-approved zero-waste items`,
        `${adoptedCount} items currently in your active pledge`,
        'Up to 50 EcoPoints per verified adoption',
      ],
      actionText: 'Browse Alternatives',
      accentColor: 'from-sky-500/10 to-teal-500/5 hover:border-sky-400',
      badge: 'Zero Waste Catalog',
      icon: <Coffee className="w-6 h-6 text-sky-600" />,
    },
    {
      id: 'rewards',
      emoji: '🏆',
      title: 'Rewards & Awareness',
      description:
        'Redeem your earned EcoPoints for canteen vouchers and sustainable merch. View the student & department leaderboards and learn eco-tips.',
      highlights: [
        `Your balance: ${stats.userPoints} EcoPoints ready to spend`,
        'Student & branch leaderboard rankings',
        'Campus awareness tips & segregation guide',
      ],
      actionText: 'Claim Rewards & Rank',
      accentColor: 'from-amber-500/10 to-emerald-500/5 hover:border-amber-400',
      badge: 'Gamified Incentives',
      icon: <Award className="w-6 h-6 text-amber-500" />,
    },
    {
      id: 'dashboard',
      emoji: '📊',
      title: 'Monitoring Dashboard',
      description:
        'Explore live analytical visualizations of plastic collected, recycled ratios, departmental participation, and carbon offsets with daily/monthly views.',
      highlights: [
        'Interactive collected vs recycled charts',
        'Plastic polymer categorization breakdown',
        'CO₂ offset and tree-equivalent calculators',
      ],
      actionText: 'Explore Dashboard',
      accentColor: 'from-teal-500/10 to-blue-500/5 hover:border-teal-400',
      badge: 'Live Analytics',
      icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
    },
  ];

  return (
    <section className="py-10 bg-slate-50/60 border-y border-emerald-100/60" id="main-feature-cards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
            Core Campaign Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Explore Project Features
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Click any feature card below to navigate directly to its dedicated interactive workspace.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              onClick={() => {
                setCurrentSection(feature.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between group ${feature.accentColor}`}
              id={`feature-card-${feature.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition shadow-2xs">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-base">{feature.emoji}</span>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {feature.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>{feature.actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
