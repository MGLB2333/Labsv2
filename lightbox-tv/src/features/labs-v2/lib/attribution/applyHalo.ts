import type { Channel } from '../../types';
import { getHaloEffectsForChannel } from '../../mocks/haloMatrix';

export const applyHaloAdjustment = (
  channel: Channel,
  activeChannels: string[],
  kpiId: string,
  baseScore: number
): number => {
  const haloEffects = getHaloEffectsForChannel(channel.id);
  
  let totalHaloBoost = 0;
  
  for (const effect of haloEffects) {
    if (activeChannels.includes(effect.fromChannel) && effect.kpiId === kpiId) {
      // Accumulate halo effects
      totalHaloBoost += (effect.multiplier - 1) * 0.5; // Diminish multiple halos
    }
  }
  
  return baseScore * (1 + Math.min(totalHaloBoost, 0.2)); // Cap at 20% boost
};


