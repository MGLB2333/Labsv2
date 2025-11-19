export interface Channel {
  id: string;
  name: string;
  category: 'linear' | 'bvod' | 'ctv' | 'olv' | 'social';
  market: string;
  cpm: number;
  benchmarks: ChannelBenchmarks;
  constraints: ChannelConstraints;
  accreditation?: string[];
  creativeRequirements?: CreativeRequirement[];
}

export interface ChannelBenchmarks {
  reach1p?: number;
  reach3p?: number;
  vtr?: number; // Video completion rate
  ctr?: number;
  cpa?: number;
  roas?: number;
  brandLift?: number;
}

export interface ChannelConstraints {
  minBudget?: number;
  maxBudget?: number;
  minDuration?: number;
  maxDuration?: number;
  supportedAspectRatios?: string[];
  blackoutDates?: string[];
}

export interface CreativeRequirement {
  duration: number;
  aspectRatio: string;
  required: boolean;
}

export interface Ratecard {
  channelId: string;
  market: string;
  cpm: number;
  currency: string;
  validFrom: string;
  validTo?: string;
}


