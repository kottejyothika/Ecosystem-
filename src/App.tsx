import React from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatCards } from './components/StatCards';
import { FeatureNavigationCards } from './components/FeatureNavigationCards';
import { SmartCollectionSection } from './components/SmartCollectionSection';
import { ReusableAlternativesSection } from './components/ReusableAlternativesSection';
import { RewardsAwarenessSection } from './components/RewardsAwarenessSection';
import { MonitoringDashboardSection } from './components/MonitoringDashboardSection';
import { ImpactBenefitsSection } from './components/ImpactBenefitsSection';
import { TechStackSection } from './components/TechStackSection';
import { ReportModal } from './components/ReportModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import {
  Recycle,
  Workflow,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TreePine,
  Layers,
  Award,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentSection, setCurrentSection, stations, alternatives, setIsReportModalOpen } =
    useCampaign();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1">
        {currentSection === 'home' && (
          <div>
            {/* 1. Environmental Hero Section */}
            <HeroSection />

            {/* 2. Quick Statistics Bar & Goals */}
            <StatCards />

            {/* 3. The 4 Clickable Core Feature Cards */}
            <FeatureNavigationCards />

            {/* 4. Quick Highlights: Stations Snapshot & Alternatives Snapshot */}
            <section className="py-12 bg-white border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Station Snapshot row */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        Live Network
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                        Active Campus Collection Stations
                      </h3>
                      <p className="text-xs text-slate-500">
                        Check real-time capacity meters across AITS campus hubs.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentSection('collection');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="self-start sm:self-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                    >
                      <span>View All {stations.length} Stations & History</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {stations.slice(0, 3).map((station) => {
                      const fillPercent = Math.min(
                        100,
                        Math.round((station.currentKg / station.capacityKg) * 100)
                      );
                      const isNearFull = station.status === 'Near Full';

                      return (
                        <div
                          key={station.id}
                          className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase text-slate-500">
                                {station.zone} Zone
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isNearFull
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {station.status}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900">{station.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">{station.location}</p>

                            <div className="mt-4 space-y-1">
                              <div className="flex justify-between text-xs font-semibold text-slate-700">
                                <span>Fill Level</span>
                                <span>
                                  {station.currentKg} / {station.capacityKg} kg ({fillPercent}%)
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                  style={{ width: `${fillPercent}%` }}
                                  className={`h-full rounded-full ${
                                    isNearFull ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                            <span>{station.acceptedTypes[0]}</span>
                            <button
                              onClick={() => {
                                setCurrentSection('collection');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="font-bold text-emerald-700 hover:underline"
                            >
                              Log Deposit →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Impact Flow Teaser */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl p-6 sm:p-8 border border-emerald-200/80 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Project Methodology
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      Input → Process → Output → Impact
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A closed-loop institutional framework taking student plastic deposits and transforming
                      them into verified ecological diversion and rewarded campus participation.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentSection('impact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-xs flex items-center gap-2"
                      id="home-view-impact-btn"
                    >
                      <span>Explore Impact & Flow</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setCurrentSection('techstack');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs transition"
                    >
                      <span>Tech Stack</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Dedicated Section 1: Smart Plastic Collection */}
        {currentSection === 'collection' && <SmartCollectionSection />}

        {/* Dedicated Section 2: Reusable Alternatives */}
        {currentSection === 'alternatives' && <ReusableAlternativesSection />}

        {/* Dedicated Section 3: Rewards & Awareness */}
        {currentSection === 'rewards' && <RewardsAwarenessSection />}

        {/* Dedicated Section 4: Monitoring Dashboard */}
        {currentSection === 'dashboard' && <MonitoringDashboardSection />}

        {/* Dedicated Section 5: Impact & Benefits */}
        {currentSection === 'impact' && <ImpactBenefitsSection />}

        {/* Dedicated Section 6: Tech Stack */}
        {currentSection === 'techstack' && <TechStackSection />}
      </main>

      <Footer />
      <ReportModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CampaignProvider>
      <MainContent />
    </CampaignProvider>
  );
}
