export interface HaloEffect {
  fromChannel: string;
  toChannel: string;
  kpiId: string;
  multiplier: number; // e.g., 1.1 = +10% boost
}

// Halo effects: when channel A is present, channel B gets a boost
export const haloMatrix: HaloEffect[] = [
  // TV → Social boost (TV drives social engagement)
  { fromChannel: 'itv', toChannel: 'meta', kpiId: 'ctr', multiplier: 1.10 },
  { fromChannel: 'itv', toChannel: 'tiktok', kpiId: 'ctr', multiplier: 1.08 },
  { fromChannel: 'channel4', toChannel: 'meta', kpiId: 'ctr', multiplier: 1.10 },
  
  // Linear → BVOD boost (awareness drives streaming)
  { fromChannel: 'itv', toChannel: 'itvx', kpiId: 'vtr', multiplier: 1.05 },
  { fromChannel: 'channel4', toChannel: 'all4', kpiId: 'vtr', multiplier: 1.05 },
  
  // Social → OLV boost (social drives YouTube views)
  { fromChannel: 'meta', toChannel: 'youtube', kpiId: 'vtr', multiplier: 1.08 },
  { fromChannel: 'tiktok', toChannel: 'youtube', kpiId: 'vtr', multiplier: 1.06 },
  
  // CTV → Social boost (CTV viewers engage on social)
  { fromChannel: 'samsung-ads', toChannel: 'meta', kpiId: 'ctr', multiplier: 1.05 },
  { fromChannel: 'roku', toChannel: 'meta', kpiId: 'ctr', multiplier: 1.05 },
];

export const getHaloEffect = (fromChannel: string, toChannel: string, kpiId: string): HaloEffect | undefined => {
  return haloMatrix.find(h => 
    h.fromChannel === fromChannel && 
    h.toChannel === toChannel && 
    h.kpiId === kpiId
  );
};

export const getHaloEffectsForChannel = (channelId: string): HaloEffect[] => {
  return haloMatrix.filter(h => h.toChannel === channelId);
};


