export interface ParetoPoint {
  reach: number;
  efficiency: number; // Inverse of cost per reach
  allocations: Array<{ channelId: string; budget: number }>;
}

export const generateParetoFrontier = (
  _reachWeight: number,
  _efficiencyWeight: number,
  maxPoints: number = 10
): ParetoPoint[] => {
  // Mock Pareto frontier generation
  // In practice, this would run multiple optimisations with different weights
  const points: ParetoPoint[] = [];
  
  for (let i = 0; i < maxPoints; i++) {
    const ratio = i / (maxPoints - 1);
    points.push({
      reach: 0.5 + ratio * 0.4, // 0.5 to 0.9
      efficiency: 0.9 - ratio * 0.4, // 0.9 to 0.5 (inverse relationship)
      allocations: [], // Would contain actual allocations
    });
  }
  
  return points;
};


