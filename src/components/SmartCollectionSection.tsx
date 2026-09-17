import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Recycle,
  MapPin,
  Clock,
  PlusCircle,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { CollectionStation } from '../types';

export const SmartCollectionSection: React.FC = () => {
  const {
    stations,
    records,
    setCurrentSection,
    setIsReportModalOpen,
    setSelectedStationForReport,
  } = useCampaign();

  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  const zones = ['All', 'Academic', 'Amenities', 'Hostel', 'Sports'];

  const filteredStations = stations.filter((station) => {
    const matchesZone = selectedZone === 'All' || station.zone === selectedZone;
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.acceptedTypes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesZone && matchesSearch;
  });

  const filteredRecords = records.filter((r) => {
    const q = logSearchQuery.toLowerCase();
    return (
      r.studentName.toLowerCase().includes(q) ||
      r.studentRoll.toLowerCase().includes(q) ||
      r.stationName.toLowerCase().includes(q) ||
      r.wasteType.toLowerCase().includes(q)
    );
  });

  const handleDepositAtStation = (station: CollectionStation) => {
    setSelectedStationForReport(station.id);
    setIsReportModalOpen(true);
  };

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentSection('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mb-2"
              id="back-to-home-from-collection"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Recycle className="w-6 h-6" />
              </span>
              Smart Plastic Collection Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Monitor active campus collection stations, check realtime fill levels, and report segregated
              plastic deposits to earn EcoPoints.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setSelectedStationForReport(undefined);
                setIsReportModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-2"
              id="report-waste-from-collection-page"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Plastic Deposit</span>
            </button>
          </div>
        </div>

        {/* Stations Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection station by name, location, or accepted plastics..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            {/* Zone Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Zone:
              </span>
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedZone === zone
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collection Stations Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Campus Collection Stations</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {filteredStations.length} Stations Available
              </span>
            </h2>
            <span className="text-xs text-slate-500 hidden sm:block">
              Updates in real-time on every deposit
            </span>
          </div>

          {filteredStations.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">No collection stations match your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedZone('All');
                }}
                className="mt-3 text-xs text-emerald-600 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStations.map((station) => {
                const fillPercent = Math.min(100, Math.round((station.currentKg / station.capacityKg) * 100));
                const isFull = station.status === 'Full' || fillPercent >= 90;
                const isNearFull = station.status === 'Near Full' || (fillPercent >= 70 && !isFull);

                return (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {station.zone} Zone
                          </span>
                          <h3 className="font-bold text-base text-slate-900 mt-1">{station.name}</h3>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                            isFull
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : isNearFull
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {isFull && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                          {isNearFull && <Clock className="w-3 h-3 text-amber-600" />}
                          {!isFull && !isNearFull && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {station.status}
                        </span>
                      </div>

                      {/* Location description */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{station.location}</span>
                      </div>

                      {/* Fill level meter */}
                      <div className="space-y-1.5 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex justify-between text-xs font-medium text-slate-700">
                          <span>Current Fill</span>
                          <span className="font-bold text-slate-900">
                            {station.currentKg} / {station.capacityKg} kg ({fillPercent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${fillPercent}%` }}
                            className={`h-full rounded-full transition-all duration-500 ${
                              isFull ? 'bg-rose-500' : isNearFull ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                          <span>Last emptied: {station.lastEmptied}</span>
                          <span>{isFull ? 'Scheduled for clearance' : 'Drop-offs open'}</span>
                        </div>
                      </div>

                      {/* Accepted types badges */}
                      <div className="mb-4">
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1.5 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-emerald-600" /> Accepted Polymers:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {station.acceptedTypes.map((type, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => handleDepositAtStation(station)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                      <span>Log Plastic Deposit Here</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Collection History & Reports Table */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                Verified Campus Deposit Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Live chronological ledger of student plastic contributions with EcoPoints verified.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={logSearchQuery}
                onChange={(e) => setLogSearchQuery(e.target.value)}
                placeholder="Filter logs by student or type..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-2.5 px-3">Student & Roll No</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Waste Category</th>
                  <th className="py-2.5 px-3">Weight (Kg)</th>
                  <th className="py-2.5 px-3">Points Earned</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-slate-400">
                      No deposit records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3 font-medium text-slate-900">
                        {rec.studentName}
                        <span className="block text-[10px] text-slate-500 font-mono">
                          {rec.studentRoll}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{rec.department}</td>
                      <td className="py-3 px-3 text-slate-600">{rec.stationName}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium">
                          {rec.wasteType}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">{rec.weightKg} kg</td>
                      <td className="py-3 px-3 font-semibold text-emerald-700">
                        +{rec.pointsAwarded} pts
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{rec.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
