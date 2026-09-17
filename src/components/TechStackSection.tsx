import React from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  ArrowLeft,
  Code,
  Terminal,
  Database,
  Flame,
  GitBranch,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const TechStackSection: React.FC = () => {
  const { setCurrentSection } = useCampaign();

  const technologies = [
    {
      id: 'html',
      name: 'HTML5 & Modern DOM',
      category: 'Frontend Foundation',
      role: 'Semantic structure, accessibility standards (WCAG AA), responsive viewport scaling, and progressive web tags.',
      features: ['Semantic Markup', 'ARIA Accessibility', 'Responsive Meta Tags', 'Clean DOM Hierarchy'],
      badge: 'Frontend',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: <Code className="w-6 h-6 text-orange-600" />,
    },
    {
      id: 'js',
      name: 'JavaScript / TypeScript',
      category: 'Core Logic & UI Engine',
      role: 'Type-safe interactive state management, real-time client calculations, responsive handlers, and asynchronous event triggers.',
      features: ['React 19 Hooks', 'TypeScript Strict Mode', 'Interactive State Machine', 'Client-side Persistence'],
      badge: 'Core Runtime',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <Terminal className="w-6 h-6 text-amber-600" />,
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Data Analytics & Processing',
      role: 'Backend scripts for aggregating campus waste volume, calculating carbon equivalencies, and cleaning historical ledger tables.',
      features: ['Pandas / NumPy Data Analytics', 'CPCB Carbon Algorithms', 'Automated Export Scripts', 'RESTful Endpoints'],
      badge: 'Analytics',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: <Terminal className="w-6 h-6 text-sky-600" />,
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'NoSQL Document Store',
      role: 'High-throughput document storage for dynamic campus collection stations, polymer batch records, and student profiles.',
      features: ['BSON Document Schema', 'GeoSpatial Queries for Bins', 'Flexible Waste Logs', 'Aggregation Pipelines'],
      badge: 'Database',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: <Database className="w-6 h-6 text-emerald-600" />,
    },
    {
      id: 'firebase',
      name: 'Firebase',
      category: 'Cloud Infrastructure & Auth',
      role: 'Real-time database synchronization across student mobile devices, secure student authentication, and cloud edge hosting.',
      features: ['Real-Time Document Listeners', 'OAuth & Student Auth', 'Cloud Security Rules', 'Serverless Functions'],
      badge: 'Cloud Sync',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <Flame className="w-6 h-6 text-amber-500" />,
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      category: 'Version Control & DevOps',
      role: 'Distributed version control, collaborative branch management for Innov8 team sprints, CI/CD automated build pipelines.',
      features: ['Feature Branching Workflow', 'Pull Request Audits', 'Automated Vite CI/CD', 'Open-Source Ready'],
      badge: 'DevOps',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      icon: <GitBranch className="w-6 h-6 text-slate-800" />,
    },
    {
      id: 'ai',
      name: 'AI & Smart Tools',
      category: 'Intelligence & Optimization',
      role: 'Gemini AI Vision waste classification, intelligent contamination detection, eco-tip generation, and automated audit summaries.',
      features: ['Gemini 2.5 API Models', 'Polymer Image Recognition', 'Automated Eco-Tips', 'Predictive Fill Alarms'],
      badge: 'AI Engine',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <button
            onClick={() => setCurrentSection('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mb-2"
            id="back-to-home-from-techstack"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Cpu className="w-6 h-6" />
            </span>
            Technology Stack & Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Engineered for high performance, accessibility, and zero downtime during the AITS Hackathon 2026.
            Presented by Innov8 | CSD.
          </p>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-2xs">
                    {tech.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${tech.badgeColor}`}>
                    {tech.badge}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  {tech.category}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mb-2">{tech.name}</h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{tech.role}</p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Key Implementations:
                  </span>
                  {tech.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Integrated in WEBSPRINT 2026</span>
                <span className="font-semibold text-emerald-700">Production Ready</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hackathon Architecture Summary Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-2 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Engineering Stack Summary
              </span>
              <h3 className="text-xl font-bold text-slate-900">Built for Reliability & Speed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                By combining reactive client-side rendering with cloud-backed schemas and Python statistical
                models, the Plastic-Free College Campaign ensures frictionless operation even with intermittent
                campus WiFi.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Single-Page Architecture</span>
                <span className="text-slate-500 text-[11px]">Instant tab switching with zero reload lag</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Offline LocalStorage Cache</span>
                <span className="text-slate-500 text-[11px]">Guaranteed persistence during demos</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block">Mobile Responsive First</span>
                <span className="text-slate-500 text-[11px]">Adaptive touch targets on all screen widths</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
