export interface ReachCurvePoint {
  impressions: number;
  reach: number;
}

export interface ReachCurve {
  channelId: string;
  audienceId: string;
  points: ReachCurvePoint[];
}

// Simplified reach curves (in practice, these would be calculated using negative binomial)
export const reachCurves: ReachCurve[] = [
  {
    channelId: 'itv',
    audienceId: 'a25-54',
    points: [
      { impressions: 1000000, reach: 0.15 },
      { impressions: 5000000, reach: 0.45 },
      { impressions: 10000000, reach: 0.65 },
      { impressions: 20000000, reach: 0.80 },
      { impressions: 50000000, reach: 0.92 },
    ],
  },
  {
    channelId: 'youtube',
    audienceId: 'a25-54',
    points: [
      { impressions: 500000, reach: 0.20 },
      { impressions: 2000000, reach: 0.50 },
      { impressions: 5000000, reach: 0.68 },
      { impressions: 10000000, reach: 0.80 },
      { impressions: 20000000, reach: 0.88 },
    ],
  },
  {
    channelId: 'meta',
    audienceId: 'a25-54',
    points: [
      { impressions: 500000, reach: 0.22 },
      { impressions: 2000000, reach: 0.55 },
      { impressions: 5000000, reach: 0.72 },
      { impressions: 10000000, reach: 0.82 },
      { impressions: 20000000, reach: 0.90 },
    ],
  },
];

export const getReachCurve = (channelId: string, audienceId: string): ReachCurve | undefined => {
  return reachCurves.find(c => c.channelId === channelId && c.audienceId === audienceId);
};

// Interpolate reach from curve
export const interpolateReach = (channelId: string, audienceId: string, impressions: number): number => {
  const curve = getReachCurve(channelId, audienceId);
  if (!curve || curve.points.length === 0) return 0;
  
  if (impressions <= curve.points[0].impressions) {
    return curve.points[0].reach;
  }
  
  if (impressions >= curve.points[curve.points.length - 1].impressions) {
    return curve.points[curve.points.length - 1].reach;
  }
  
  // Linear interpolation
  for (let i = 0; i < curve.points.length - 1; i++) {
    const p1 = curve.points[i];
    const p2 = curve.points[i + 1];
    
    if (impressions >= p1.impressions && impressions <= p2.impressions) {
      const ratio = (impressions - p1.impressions) / (p2.impressions - p1.impressions);
      return p1.reach + (p2.reach - p1.reach) * ratio;
    }
  }
  
  return 0;
};


