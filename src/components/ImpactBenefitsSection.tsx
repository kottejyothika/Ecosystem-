import React from 'react';
import { motion } from 'motion/react';
import {
  Workflow,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TreePine,
  TrendingDown,
  BrainCircuit,
  Award,
  Layers,
  Building2,
  DollarSign,
  Maximize2,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const ImpactBenefitsSection: React.FC = () => {
  const { setCurrentSection } = useCampaign();

  const flowSteps = [
    {
      step: '01',
      title: 'Input',
      badge: 'Data & Participation',
      desc: 'Plastic waste data and student participation',
      details: [
        'Campus collection point deposits',
        'Student roll & weight records',
        'Reusable alternative adoption pledges',
        'Classroom & hostel audit data',
      ],
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      step: '02',
      title: 'Process',
      badge: 'Operations & Segregation',
      desc: 'Collection, segregation and recycling',
      details: [
        'Real-time bin level tracking',
        'Polymer classification (PET, HDPE, LDPE)',
        'Campus housekeeping routing',
        'Partner circular recycling sorting',
      ],
      color: 'border-teal-200 bg-teal-50/50 text-teal-900',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      step: '03',
      title: 'Output',
      badge: 'Deliverables & Rewards',
      desc: 'Reduced plastic waste and rewards',
      details: [
        'Over 88% diverted from open dumps',
        'EcoPoints credited to student wallets',
        'Redeemable canteen coupons',
        'Verified semester green credentials',
      ],
      color: 'border-sky-200 bg-sky-50/50 text-sky-900',
      badgeColor: 'bg-sky-100 text-sky-800',
    },
    {
      step: '04',
      title: 'Impact',
      badge: 'Long-term Transformation',
      desc: 'Cleaner, greener and plastic-free campus',
      details: [
        'Zero single-use plastic culture',
        'Litter-free corridors and lawns',
        'Carbon emissions mitigation',
        'Scalable blueprint for institutions',
      ],
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
  ];

  const benefits = [
    {
      icon: <TreePine className="w-5 h-5 text-emerald-600" />,
      title: 'Cleaner and Greener Campus',
      desc: 'Eliminates discarded wrappers and plastic bottles from quad gardens, canteen corridors, and hostel breezeways.',
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-teal-600" />,
      title: 'Reduced Plastic Waste',
      desc: 'Cuts campus single-use throwaway plastic volume by up to 60% within one academic semester through reusable pledges.',
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-sky-600" />,
      title: 'Increased Student Awareness',
      desc: 'Builds lasting environmental consciousness and responsible consumer habits through peer competition and quizzes.',
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: 'Better Collection and Segregation',
      desc: 'Categorizes waste at the source so polymers (PET, PP, HDPE) remain pure and unsoiled for maximum recycling value.',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: 'Rewards for Participation',
      desc: 'Gamifies student engagement with EcoPoints, canteen discounts, green ambassador certificates, and leaderboards.',
    },
    {
      icon: <Maximize2 className="w-5 h-5 text-violet-600" />,
      title: 'Scalability to Schools & Communities',
      desc: 'Modular architecture can easily be cloned and deployed across neighbouring schools, polytechnics, and township wards.',
    },
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      title: 'Low-Cost and Easy Implementation',
      desc: 'Operates with existing college bins, QR labels, and zero recurring subscription fees using open-source web technologies.',
    },
  ];

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div>
          <button
            onClick={() => setCurrentSection('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mb-2"
            id="back-to-home-from-impact"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <Workflow className="w-6 h-6" />
            </span>
            Impact, Benefits & Project Flow
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Presented in WEBSPRINT 2026 by Team Innov8 | CSD, AITS Hackathon 2026. A structured methodology
            transforming campus waste management into an institutional standard.
          </p>
        </div>

        {/* Project Flow: Input -> Process -> Output -> Impact */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              System Architecture & Methodology
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              The 4-Stage Campus Transformation Flow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Input → Process → Output → Impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {flowSteps.map((item, idx) => (
              <div key={item.step} className="relative flex flex-col justify-between">
                <div className={`p-5 rounded-2xl border ${item.color} shadow-xs h-full flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-black text-2xl text-slate-300">{item.step}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs font-semibold text-emerald-800 mb-3">{item.desc}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      {item.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow indicator between cards on desktop */}
                {idx < flowSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-xs items-center justify-center text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 7 Core Benefits Grid */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Key Institutional Benefits</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Why the Plastic-Free College Campaign delivers lasting value for AITS and educational ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    {benefit.icon}
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mb-1.5">{benefit.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <Sparkles className="w-3 h-3" />
                  <span>AITS Hackathon 2026 Outcome</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scalability Blueprint Callout */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
              Scalability & Community Rollout
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              From College Campus to Municipality & Beyond
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              The Innov8 | CSD platform is designed as an open, low-latency containerized solution. It can be
              onboarded by affiliated schools, engineering colleges, and urban residential gated communities with
              zero hardware modifications. QR codes on existing trash bins allow students to log deposits in 10
              seconds flat.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-200">
              <span>✓ Zero High-Cost Sensor Mandates</span>
              <span>✓ Mobile & Web Accessible</span>
              <span>✓ Exportable Institutional Green Audits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
