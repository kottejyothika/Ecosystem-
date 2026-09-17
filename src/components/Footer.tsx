import React from 'react';
import { Recycle, Heart, ExternalLink, ShieldCheck, MapPin, Mail, Award } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { NavSection } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentSection } = useCampaign();

  const handleNav = (sec: NavSection) => {
    setCurrentSection(sec);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Project Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base block">Plastic-Free College</span>
                <span className="text-[11px] text-emerald-400 font-mono">WEBSPRINT 2026</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Presented in WEBSPRINT 2026 by Team <strong className="text-white">Innov8 | CSD</strong>, AITS
              Hackathon 2026. Empowering students and staff to eliminate single-use plastics from campus.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <Award className="w-4 h-4" />
              <span>AITS Hackathon 2026 – Innovate. Build. Impact.</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Campaign Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-400 transition"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('collection')}
                  className="hover:text-emerald-400 transition"
                >
                  Smart Plastic Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('alternatives')}
                  className="hover:text-emerald-400 transition"
                >
                  Reusable Alternatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('rewards')}
                  className="hover:text-emerald-400 transition"
                >
                  Rewards & Awareness
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-emerald-400 transition"
                >
                  Monitoring Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Project Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('impact')}
                  className="hover:text-emerald-400 transition"
                >
                  Impact & Benefits (Input-Output Flow)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('techstack')}
                  className="hover:text-emerald-400 transition"
                >
                  Technology Stack & Tools
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-slate-500 block">Department:</span>
                <span className="text-xs text-slate-300 font-medium">Computer Science & Design (CSD)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Commitment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Campus Commitment
            </h4>
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Single-Use Protocol</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                100% verified campus collection hubs. Say NO to disposable bottles, thermocol food trays and
                plastic polybags.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Hackathon Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 Plastic-Free College Campaign • Team <span className="text-slate-300">Innov8 | CSD</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for</span>
            <span className="text-emerald-400 font-semibold">AITS Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
