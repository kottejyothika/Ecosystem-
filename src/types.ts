export type NavSection =
  | 'home'
  | 'collection'
  | 'alternatives'
  | 'rewards'
  | 'dashboard'
  | 'impact'
  | 'techstack';

export interface CollectionStation {
  id: string;
  name: string;
  location: string;
  zone: 'Academic' | 'Hostel' | 'Amenities' | 'Sports';
  capacityKg: number;
  currentKg: number;
  acceptedTypes: string[];
  status: 'Normal' | 'Near Full' | 'Full';
  lastEmptied: string;
}

export interface CollectionRecord {
  id: string;
  studentName: string;
  studentRoll: string;
  department: string;
  stationName: string;
  wasteType: 'PET Bottles' | 'Food Containers' | 'Poly Bags' | 'Cutlery/Straws' | 'Mixed Plastics';
  weightKg: number;
  date: string;
  pointsAwarded: number;
  status: 'Verified' | 'Pending Verification' | 'Processed';
}

export interface ReusableAlternative {
  id: string;
  name: string;
  disposableItem: string;
  category: 'Drinkware' | 'Dining' | 'Bags & Carry' | 'Stationery & Living';
  annualPlasticSavedKg: number;
  itemsPreventedPerYear: number;
  pointsReward: number;
  description: string;
  materials: string;
  isAdopted: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'Canteen' | 'Stationery' | 'Merchandise' | 'Academic';
  pointsCost: number;
  stock: number;
  claimed: boolean;
  code?: string;
  description: string;
}

export interface StudentLeader {
  rank: number;
  name: string;
  rollNumber: string;
  department: string;
  points: number;
  plasticKg: number;
  badgesCount: number;
  avatarColor: string;
}

export interface DepartmentStanding {
  department: string;
  participants: number;
  totalKg: number;
  ecoScore: number;
}

export interface SustainabilityTip {
  id: string;
  category: 'Segregation' | 'Lifestyle' | 'Campus Policy' | 'Fact';
  title: string;
  content: string;
  actionableStep: string;
}

export interface CampaignStats {
  totalPlasticCollectedKg: number;
  totalPlasticRecycledKg: number;
  singleUseReducedItems: number;
  studentParticipationCount: number;
  co2SavedKg: number;
  collectionGoalKg: number;
  userPoints: number;
}
