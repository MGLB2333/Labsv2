export interface MMMCoefficient {
  channelId: string;
  kpiId: string;
  coefficient: number; // Multiplier adjustment (-0.2 to +0.2 typically)
  confidence: number; // 0-1
}

export const mmmCoefficients: MMMCoefficient[] = [
  // Linear TV typically has positive brand lift
  { channelId: 'itv', kpiId: 'brandLift', coefficient: 0.15, confidence: 0.85 },
  { channelId: 'channel4', kpiId: 'brandLift', coefficient: 0.12, confidence: 0.82 },
  
  // BVOD has moderate brand lift
  { channelId: 'all4', kpiId: 'brandLift', coefficient: 0.08, confidence: 0.75 },
  { channelId: 'itvx', kpiId: 'brandLift', coefficient: 0.09, confidence: 0.77 },
  
  // Social has higher engagement but lower brand lift
  { channelId: 'meta', kpiId: 'ctr', coefficient: 0.10, confidence: 0.80 },
  { channelId: 'tiktok', kpiId: 'ctr', coefficient: 0.12, confidence: 0.78 },
  
  // OLV/CTV have good conversion metrics
  { channelId: 'youtube', kpiId: 'roas', coefficient: 0.08, confidence: 0.75 },
  { channelId: 'samsung-ads', kpiId: 'vtr', coefficient: 0.05, confidence: 0.70 },
];

export const getMMMCoefficient = (channelId: string, kpiId: string): MMMCoefficient | undefined => {
  return mmmCoefficients.find(c => c.channelId === channelId && c.kpiId === kpiId);
};

export const getMMMCoefficientsByChannel = (channelId: string): MMMCoefficient[] => {
  return mmmCoefficients.filter(c => c.channelId === channelId);
};


