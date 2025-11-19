import { interpolateReach } from '../../mocks/reachCurves';

export interface ReachResult {
  reach1p: number;
  reach3p: number;
  impressions: number;
}

// Simplified deduplication using pairwise inclusion-exclusion
export const calculateDeduplicatedReach = (
  channelImpressions: Array<{ channelId: string; impressions: number }>,
  audienceId: string
): ReachResult => {
  if (channelImpressions.length === 0) {
    return { reach1p: 0, reach3p: 0, impressions: 0 };
  }
  
  // Calculate individual channel reach
  const channelReaches = channelImpressions.map(({ channelId, impressions }) => ({
    channelId,
    impressions,
    reach: interpolateReach(channelId, audienceId, impressions),
  }));
  
  // Simple pairwise deduplication (simplified version)
  let deduplicatedReach = 0;
  let totalImpressions = channelImpressions.reduce((sum, c) => sum + c.impressions, 0);
  
  if (channelReaches.length === 1) {
    deduplicatedReach = channelReaches[0].reach;
  } else {
    // Pairwise inclusion-exclusion (simplified)
    const sumReaches = channelReaches.reduce((sum, c) => sum + c.reach, 0);
    const avgOverlap = 0.25; // Assume 25% average overlap
    deduplicatedReach = Math.min(1, sumReaches * (1 - avgOverlap));
  }
  
  // Estimate reach 3+ as 60% of reach 1+
  const reach3p = deduplicatedReach * 0.6;
  
  return {
    reach1p: deduplicatedReach,
    reach3p,
    impressions: totalImpressions,
  };
};


