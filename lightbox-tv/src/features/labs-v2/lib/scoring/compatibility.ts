import type { Channel, KPISelection } from '../../types';
import { getBenchmark } from '../../mocks/performanceBenchmarks';

export const calculateCompatibilityScore = (
  channel: Channel,
  kpis: KPISelection[]
): number => {
  if (kpis.length === 0) return 0;
  
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const kpi of kpis) {
    const benchmark = getBenchmark(channel.id, kpi.id);
    if (benchmark) {
      // Normalize percentile (0-100) to 0-1
      const normalizedScore = benchmark.percentile / 100;
      totalScore += normalizedScore * kpi.weight;
      totalWeight += kpi.weight;
    }
  }
  
  return totalWeight > 0 ? totalScore / totalWeight : 0;
};


