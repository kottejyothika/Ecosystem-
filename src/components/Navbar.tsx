import React, { useState } from 'react';
import {
  Recycle,
  Sparkles,
  Award,
  Menu,
  X,
  BarChart3,
  Coffee,
  CheckSquare,
  Workflow,
  Cpu,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { NavSection } from '../types';

export const Navbar: React.FC = () => {
  const { currentSection, setCurrentSection, stats, setIsReportModalOpen, resetDemoData } = useCampaign();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Recycle className="w-4 h-4" /> },
    { id: 'collection', label: 'Smart Collection', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'alternatives', label: 'Reusable Alternatives', icon: <Coffee className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards & Awareness', icon: <Award className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'impact', label: 'Impact & Benefits', icon: <Workflow className="w-4 h-4" /> },
    { id: 'techstack', label: 'Tech Stack', icon: <Cpu className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: NavSection) => {
    setCurrentSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top micro-banner for Hackathon branding */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
              WEBSPRINT 2026
            </span>
            <span>AITS Hackathon 2026 • Team Innov8 | CSD</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-100 text-[11px]">
            <span>Theme: Green Campus & Cleanliness</span>
            <button
              onClick={resetDemoData}
              title="Reset sample records"
              className="flex items-center gap-1 hover:text-white transition underline underline-offset-2 opacity-80 hover:opacity-100"
            >
              <RotateCcw className="w-3 h-3" /> Reset Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                Plastic-Free College
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  CSD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">AITS Hackathon Sustainability Initiative</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Points & Actions */}
          <div className="flex items-center gap-2.5">
            {/* EcoPoints Balance pill */}
            <div
              onClick={() => handleNavClick('rewards')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs cursor-pointer hover:bg-emerald-100 transition"
              title="Your current EcoPoints"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>{stats.userPoints}</span>
              <span className="text-[10px] text-emerald-600 font-normal uppercase">Pts</span>
            </div>

            {/* Quick Report Waste Button */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition active:scale-95"
              id="header-report-waste-btn"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Waste</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white/98 px-4 pt-3 pb-5 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReportModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Plastic Waste</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
