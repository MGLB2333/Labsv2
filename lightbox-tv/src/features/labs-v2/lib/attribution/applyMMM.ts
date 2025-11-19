import type { Channel, KPISelection } from '../../types';
import { getMMMCoefficient } from '../../mocks/mmmCoefficients';

export const applyMMMAdjustment = (
  channel: Channel,
  kpis: KPISelection[],
  baseScore: number
): number => {
  let adjustment = 0;
  
  for (const kpi of kpis) {
    const mmmCoeff = getMMMCoefficient(channel.id, kpi.id);
    if (mmmCoeff) {
      // Apply coefficient weighted by KPI weight
      adjustment += mmmCoeff.coefficient * kpi.weight * mmmCoeff.confidence;
    }
  }
  
  return baseScore * (1 + adjustment);
};


