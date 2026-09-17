import React from 'react';
import { motion } from 'motion/react';
import {
  Recycle,
  Leaf,
  Users,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const StatCards: React.FC = () => {
  const { stats, setIsReportModalOpen } = useCampaign();

  const cards = [
    {
      id: 'stat-collected',
      title: 'Plastic Collected',
      value: `${stats.totalPlasticCollectedKg.toLocaleString()} kg`,
      subtext: '+38.4 kg logged this week',
      icon: <Recycle className="w-5 h-5 text-emerald-600" />,
      bgGradient: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-200',
      badge: 'Verified Weight',
    },
    {
      id: 'stat-recycled',
      title: 'Plastic Recycled',
      value: `${stats.totalPlasticRecycledKg.toLocaleString()} kg`,
      subtext: '88.4% diverted from municipal landfills',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />,
      bgGradient: 'from-teal-500/10 to-cyan-500/5',
      borderColor: 'border-teal-200',
      badge: 'Circular Loop',
    },
    {
      id: 'stat-reduced',
      title: 'Single-Use Reduced',
      value: `${stats.singleUseReducedItems.toLocaleString()} items`,
      subtext: 'Bottles, cups, polybags & plastic cutlery',
      icon: <Leaf className="w-5 h-5 text-sky-600" />,
      bgGradient: 'from-sky-500/10 to-blue-500/5',
      borderColor: 'border-sky-200',
      badge: 'Pledge Impact',
    },
    {
      id: 'stat-participation',
      title: 'Student Participation',
      value: `${stats.studentParticipationCount.toLocaleString()} Students`,
      subtext: 'Across 6 engineering & diploma streams',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      bgGradient: 'from-indigo-500/10 to-violet-500/5',
      borderColor: 'border-indigo-200',
      badge: 'Active Leaders',
    },
  ];

  return (
    <section className="py-8 bg-white" id="quick-statistics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Campus Impact At A Glance</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live automated counters aggregated from campus collection points and student adoption logs.
            </p>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="self-start sm:self-auto px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center gap-1.5"
            id="quick-stat-add-collection"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Collection Entry</span>
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={`p-5 rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.bgGradient} bg-white shadow-xs hover:shadow-md transition relative flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/90 text-slate-700 border border-slate-200/80">
                    {card.badge}
                  </span>
                </div>

                <span className="text-xs font-medium text-slate-500 block">{card.title}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block mt-1">
                  {card.value}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center gap-1.5 text-xs text-slate-600">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{card.subtext}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
