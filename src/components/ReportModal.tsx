import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Recycle, Scale, Award, MapPin, User, Building2, Sparkles } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { CollectionRecord } from '../types';

export const ReportModal: React.FC = () => {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    stations,
    recordWasteCollection,
    selectedStationForReport,
  } = useCampaign();

  const [studentName, setStudentName] = useState('Pooja Reddy');
  const [studentRoll, setStudentRoll] = useState('23AITSECE118');
  const [department, setDepartment] = useState('Computer Science & Design (CSD)');
  const [stationId, setStationId] = useState(stations[0]?.id || '');
  const [wasteType, setWasteType] = useState<CollectionRecord['wasteType']>('PET Bottles');
  const [weightKg, setWeightKg] = useState<string>('1.5');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedStationForReport) {
      setStationId(selectedStationForReport);
    } else if (stations.length > 0 && !stationId) {
      setStationId(stations[0].id);
    }
  }, [selectedStationForReport, stations]);

  if (!isReportModalOpen) return null;

  const numWeight = parseFloat(weightKg) || 0;
  const estimatedPoints = Math.round(numWeight * 20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName.trim()) {
      setErrorMsg('Please enter student name.');
      return;
    }
    if (!studentRoll.trim()) {
      setErrorMsg('Please enter student roll number or ID.');
      return;
    }
    if (!stationId) {
      setErrorMsg('Please select a collection station.');
      return;
    }
    if (numWeight <= 0) {
      setErrorMsg('Weight must be greater than 0 kg.');
      return;
    }
    if (numWeight > 50) {
      setErrorMsg('For loads over 50 kg, please consult AITS campus maintenance depot.');
      return;
    }

    const success = recordWasteCollection({
      studentName,
      studentRoll,
      department,
      stationId,
      wasteType,
      weightKg: numWeight,
    });

    if (success) {
      setIsReportModalOpen(false);
      setWeightKg('1.5');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden"
          id="report-plastic-modal"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/15 rounded-xl backdrop-blur-xs">
                <Recycle className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Record Plastic Waste Deposit</h3>
                <p className="text-emerald-100 text-xs">AITS Campus Smart Collection Logging</p>
              </div>
            </div>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg flex items-center gap-2">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" /> Student Name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Pooja Reddy"
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">#</span> Roll Number / ID
                </label>
                <input
                  type="text"
                  required
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  placeholder="e.g. 23AITSECE118"
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Department / Branch
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
                >
                  <option value="Computer Science & Design (CSD)">CSD (Computer Science & Design)</option>
                  <option value="Information Technology (IT)">IT (Information Technology)</option>
                  <option value="Electronics & Comm (ECE)">ECE (Electronics & Comm)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Computer Science (CSE)">CSE (Computer Science & Eng)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Collection Station
                </label>
                <select
                  value={stationId}
                  onChange={(e) => setStationId(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
                >
                  {stations.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.zone})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Recycle className="w-3.5 h-3.5 text-emerald-600" /> Waste Category
                </label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value as CollectionRecord['wasteType'])}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
                >
                  <option value="PET Bottles">PET Water/Juice Bottles</option>
                  <option value="Food Containers">Canteen Food Trays & Bowls</option>
                  <option value="Poly Bags">Polythene / Carry Bags</option>
                  <option value="Cutlery/Straws">Disposable Straws & Cutlery</option>
                  <option value="Mixed Plastics">Mixed / Rigid Plastics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" /> Measured Weight (Kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    required
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full text-sm pl-3 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                  <span className="absolute right-3 top-2 text-xs font-semibold text-slate-400">kg</span>
                </div>
              </div>
            </div>

            {/* EcoPoints Preview Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-900">
                  Rate: 20 EcoPoints / kg deposited
                </span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-bold text-sm">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>+{estimatedPoints} EcoPoints</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
                id="submit-record-button"
              >
                <Recycle className="w-3.5 h-3.5" /> Submit & Earn Points
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
