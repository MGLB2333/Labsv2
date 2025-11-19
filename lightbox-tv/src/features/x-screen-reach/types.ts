export type Market = { id: string; name: string; households: number };

export type Target = { id: string; name: string; hh_index: number }; // fraction 0..1

export type Channel = { id: string; name: string; kind: 'Linear'|'BVOD'|'CTV'|'YouTube' };

export type Publisher = { id: string; channelId: string; name: string; cpm: number };

export type CurveParams = { publisherId: string; r: number; p: number };

export type PairOverlap = { a: string; b: string; ovr_pct: number };

export type Allocation = { publisherId: string; geoId: string; spend: number };

export type Constraints = { 
  minPerPub?: number; 
  maxPerPub?: number; 
  targetFreq?: number; 
  caps?: {publisherId: string; maxImps: number}[] 
};

export type ForecastInput = { 
  marketId: string; 
  targetId: string; 
  allocations: Allocation[]; 
  constraints?: Constraints 
};

export type ForecastOutput = {
  reach1p: number; // proportion of HH
  reach3p: number; // mock as function of avg freq
  avgFreq: number;
  cpm: number;
  cpir: number;
  byPublisher: Array<{
    publisherId: string; 
    reach1p: number; 
    marginalCpir: number; 
    spend: number;
    impressions: number;
  }>;
  overlapMatrix: Array<{a: string; b: string; ovr_pct: number}>;
};

export type OptimiseInput = ForecastInput & { quantum: number };

export type OptimiseMove = {
  from: string;
  to: string;
  amount: number;
  reason: string;
};

export type OptimiseOutput = {
  moves: OptimiseMove[];
  newAllocations: Allocation[];
  projectedGain: {
    reach1p: number;
    cpir: number;
  };
};



