import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CollectionStation,
  CollectionRecord,
  ReusableAlternative,
  RewardItem,
  StudentLeader,
  DepartmentStanding,
  SustainabilityTip,
  CampaignStats,
  NavSection,
} from '../types';
import {
  initialStations,
  initialRecords,
  initialAlternatives,
  initialRewards,
  initialLeaders,
  initialDepartments,
  initialTips,
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface CampaignContextType {
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  stations: CollectionStation[];
  records: CollectionRecord[];
  alternatives: ReusableAlternative[];
  rewards: RewardItem[];
  leaders: StudentLeader[];
  departments: DepartmentStanding[];
  tips: SustainabilityTip[];
  stats: CampaignStats;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  addToast: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  recordWasteCollection: (data: {
    studentName: string;
    studentRoll: string;
    department: string;
    stationId: string;
    wasteType: CollectionRecord['wasteType'];
    weightKg: number;
  }) => boolean;
  toggleAlternativeAdoption: (id: string) => void;
  claimReward: (id: string) => boolean;
  resetDemoData: () => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  selectedStationForReport?: string;
  setSelectedStationForReport: (stationId: string | undefined) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedStationForReport, setSelectedStationForReport] = useState<string | undefined>(undefined);

  // Persistent state with localStorage
  const [stations, setStations] = useState<CollectionStation[]>(() => {
    const saved = localStorage.getItem('pfc_stations');
    return saved ? JSON.parse(saved) : initialStations;
  });

  const [records, setRecords] = useState<CollectionRecord[]>(() => {
    const saved = localStorage.getItem('pfc_records');
    return saved ? JSON.parse(saved) : initialRecords;
  });

  const [alternatives, setAlternatives] = useState<ReusableAlternative[]>(() => {
    const saved = localStorage.getItem('pfc_alternatives');
    return saved ? JSON.parse(saved) : initialAlternatives;
  });

  const [rewards, setRewards] = useState<RewardItem[]>(() => {
    const saved = localStorage.getItem('pfc_rewards');
    return saved ? JSON.parse(saved) : initialRewards;
  });

  const [leaders, setLeaders] = useState<StudentLeader[]>(() => {
    const saved = localStorage.getItem('pfc_leaders');
    return saved ? JSON.parse(saved) : initialLeaders;
  });

  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem('pfc_user_points');
    return saved ? JSON.parse(saved) : 380;
  });

  // Calculate dynamic stats
  const totalPlasticCollectedKg = parseFloat(
    (1420 + records.reduce((acc, r) => acc + r.weightKg, 0)).toFixed(1)
  );
  const totalPlasticRecycledKg = parseFloat((totalPlasticCollectedKg * 0.88).toFixed(1));
  const singleUseReducedItems = 12450 + alternatives.filter((a) => a.isAdopted).length * 320;
  const studentParticipationCount = 1180 + records.length;
  const co2SavedKg = parseFloat((totalPlasticCollectedKg * 2.3).toFixed(1));
  const collectionGoalKg = 2500;

  const stats: CampaignStats = {
    totalPlasticCollectedKg,
    totalPlasticRecycledKg,
    singleUseReducedItems,
    studentParticipationCount,
    co2SavedKg,
    collectionGoalKg,
    userPoints,
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pfc_stations', JSON.stringify(stations));
  }, [stations]);

  useEffect(() => {
    localStorage.setItem('pfc_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('pfc_alternatives', JSON.stringify(alternatives));
  }, [alternatives]);

  useEffect(() => {
    localStorage.setItem('pfc_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('pfc_leaders', JSON.stringify(leaders));
  }, [leaders]);

  useEffect(() => {
    localStorage.setItem('pfc_user_points', JSON.stringify(userPoints));
  }, [userPoints]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const recordWasteCollection = (data: {
    studentName: string;
    studentRoll: string;
    department: string;
    stationId: string;
    wasteType: CollectionRecord['wasteType'];
    weightKg: number;
  }): boolean => {
    const station = stations.find((s) => s.id === data.stationId);
    if (!station) {
      addToast('warning', 'Station Not Found', 'Please choose a valid collection station.');
      return false;
    }

    const calculatedPoints = Math.round(data.weightKg * 20);

    const newRecord: CollectionRecord = {
      id: 'rec-' + Date.now(),
      studentName: data.studentName.trim(),
      studentRoll: data.studentRoll.trim().toUpperCase(),
      department: data.department,
      stationName: station.name,
      wasteType: data.wasteType,
      weightKg: Number(data.weightKg.toFixed(2)),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pointsAwarded: calculatedPoints,
      status: 'Verified',
    };

    setRecords((prev) => [newRecord, ...prev]);

    // Update station capacity
    setStations((prev) =>
      prev.map((s) => {
        if (s.id === data.stationId) {
          const updatedKg = Number((s.currentKg + data.weightKg).toFixed(1));
          const status =
            updatedKg >= s.capacityKg * 0.9
              ? 'Full'
              : updatedKg >= s.capacityKg * 0.7
              ? 'Near Full'
              : 'Normal';
          return {
            ...s,
            currentKg: updatedKg,
            status,
            lastEmptied: 'Just now (Updated)',
          };
        }
        return s;
      })
    );

    // Award user points
    setUserPoints((prev) => prev + calculatedPoints);

    // Update leaderboard if student exists or create
    setLeaders((prev) => {
      const idx = prev.findIndex((l) => l.rollNumber === newRecord.studentRoll);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          points: updated[idx].points + calculatedPoints,
          plasticKg: Number((updated[idx].plasticKg + data.weightKg).toFixed(1)),
        };
        return updated.sort((a, b) => b.points - a.points).map((l, i) => ({ ...l, rank: i + 1 }));
      } else {
        const newLeader: StudentLeader = {
          rank: prev.length + 1,
          name: newRecord.studentName,
          rollNumber: newRecord.studentRoll,
          department: newRecord.department,
          points: calculatedPoints,
          plasticKg: data.weightKg,
          badgesCount: 1,
          avatarColor: 'bg-emerald-600',
        };
        return [...prev, newLeader]
          .sort((a, b) => b.points - a.points)
          .map((l, i) => ({ ...l, rank: i + 1 }));
      }
    });

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#3b82f6', '#84cc16'],
      });
    } catch {
      // ignore in headless test
    }

    addToast(
      'success',
      'Collection Logged Successfully!',
      `Logged ${data.weightKg} kg of ${data.wasteType} at ${station.name}. You earned +${calculatedPoints} EcoPoints!`
    );

    return true;
  };

  const toggleAlternativeAdoption = (id: string) => {
    setAlternatives((prev) =>
      prev.map((alt) => {
        if (alt.id === id) {
          const nextState = !alt.isAdopted;
          if (nextState) {
            setUserPoints((pts) => pts + alt.pointsReward);
            try {
              confetti({
                particleCount: 35,
                spread: 45,
                origin: { y: 0.8 },
                colors: ['#059669', '#38bdf8'],
              });
            } catch {}
            addToast(
              'success',
              'Alternative Adopted!',
              `Marked "${alt.name}" as adopted! +${alt.pointsReward} EcoPoints added to your balance.`
            );
          } else {
            setUserPoints((pts) => Math.max(0, pts - alt.pointsReward));
            addToast('info', 'Alternative Removed', `Removed "${alt.name}" from your active pledge.`);
          }
          return { ...alt, isAdopted: nextState };
        }
        return alt;
      })
    );
  };

  const claimReward = (id: string): boolean => {
    const reward = rewards.find((r) => r.id === id);
    if (!reward) return false;

    if (userPoints < reward.pointsCost) {
      addToast(
        'warning',
        'Insufficient Points',
        `You need ${reward.pointsCost} EcoPoints. Current balance: ${userPoints} pts.`
      );
      return false;
    }

    if (reward.stock <= 0) {
      addToast('warning', 'Out of Stock', 'This reward item is currently out of stock.');
      return false;
    }

    const voucherCode = 'AITS-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    setUserPoints((prev) => prev - reward.pointsCost);
    setRewards((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              stock: r.stock - 1,
              claimed: true,
              code: voucherCode,
            }
          : r
      )
    );

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#0ea5e9'],
      });
    } catch {}

    addToast(
      'success',
      'Reward Claimed!',
      `Redeemed "${reward.title}". Voucher Code: ${voucherCode}. Present this at the desk!`
    );

    return true;
  };

  const resetDemoData = () => {
    setStations(initialStations);
    setRecords(initialRecords);
    setAlternatives(initialAlternatives);
    setRewards(initialRewards);
    setLeaders(initialLeaders);
    setUserPoints(380);
    localStorage.clear();
    addToast('info', 'Demo Data Reset', 'Restored sample records, stations and initial EcoPoints balance.');
  };

  return (
    <CampaignContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        stations,
        records,
        alternatives,
        rewards,
        leaders,
        departments: initialDepartments,
        tips: initialTips,
        stats,
        toasts,
        removeToast,
        addToast,
        recordWasteCollection,
        toggleAlternativeAdoption,
        claimReward,
        resetDemoData,
        isReportModalOpen,
        setIsReportModalOpen,
        selectedStationForReport,
        setSelectedStationForReport,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
