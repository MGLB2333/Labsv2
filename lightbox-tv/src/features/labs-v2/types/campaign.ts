export interface Campaign {
  id: string;
  name: string;
  advertiser: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  currency: string;
  market: string;
  planningMode: 'strategic' | 'fixed-cpm';
  kpis: KPISelection[];
  audience: AudienceSelection;
  formats: FormatSelection[];
  channels: ChannelAllocation[];
  calibration: CalibrationSettings;
  createdAt: string;
  updatedAt: string;
}

export interface KPISelection {
  id: string;
  name: string;
  weight: number; // 0-1
  target?: number;
  direction: 'maximize' | 'minimize';
}

export interface AudienceSelection {
  id: string;
  name: string;
  demographics: DemographicProfile;
  fitScores?: Record<string, number>; // channelId -> fit score
}

export interface DemographicProfile {
  ageMin?: number;
  ageMax?: number;
  gender?: 'male' | 'female' | 'all';
  income?: string;
  location?: string[];
  interests?: string[];
}

export interface FormatSelection {
  id: string;
  name: string;
  duration?: number; // seconds
  aspectRatio?: string;
  required: boolean;
}

export interface ChannelAllocation {
  channelId: string;
  budget: number;
  impressions?: number;
  reach?: number;
  score?: number;
  rationale?: ChannelRationale;
}

export interface ChannelRationale {
  compatibilityScore: number;
  benchmarkScore: number;
  audienceFit: number;
  mmmAdjustment: number;
  haloAdjustment: number;
  accreditationBonus: number;
  finalScore: number;
}

export interface CalibrationSettings {
  clientId: string;
  market: string;
  adjustments: Record<string, number>; // channelId -> adjustment multiplier
  lastUpdated?: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  kpiWeights: Record<string, number>;
  reachWeight: number;
  efficiencyWeight: number;
}


