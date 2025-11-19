import type { ForecastInput, ForecastOutput, Allocation, PairOverlap, CurveParams, Publisher, Market, Target } from '../types';
import { markets, targets, publishers, curveParams, pairOverlaps } from '../mockData';

/**
 * Calculate reach using Negative Binomial distribution
 * P0_c(s) ≈ (p / (p + λ(s)))^r
 * Reach_c_1+(s) = HH_c * (1 - P0_c(s))
 */
export function calculateSingleChannelReach(
  spend: number,
  publisher: Publisher,
  curve: CurveParams,
  targetableHH: number
): { reach: number; impressions: number } {
  // Calculate impressions: spend / (CPM/1000)
  const impressions = spend / (publisher.cpm / 1000);
  
  // Calculate λ (exposure rate per household)
  const lambda = impressions / targetableHH;
  
  // Calculate P0 (zero-exposure probability) using NegBin
  const p0 = Math.pow(curve.p / (curve.p + lambda), curve.r);
  
  // Calculate reach (1+)
  const reach = targetableHH * (1 - p0);
  
  return { reach, impressions };
}

/**
 * Calculate deduplicated reach using pairwise inclusion-exclusion
 */
function calculateDeduplicatedReach(
  channelReaches: Map<string, number>,
  overlaps: PairOverlap[]
): number {
  let totalReach = 0;
  
  // Sum all channel reaches
  for (const reach of channelReaches.values()) {
    totalReach += reach;
  }
  
  // Subtract pairwise overlaps
  for (const overlap of overlaps) {
    const reachA = channelReaches.get(overlap.a) || 0;
    const reachB = channelReaches.get(overlap.b) || 0;
    const overlapAmount = overlap.ovr_pct * Math.min(reachA, reachB);
    totalReach -= overlapAmount;
  }
  
  return Math.max(0, totalReach);
}

/**
 * Calculate marginal CPiR for a publisher by adding a small increment
 * This is a simplified calculation that doesn't require full forecast recalculation
 */
function calculateMarginalCpir(
  publisherId: string,
  spend: number,
  publisher: Publisher,
  curve: CurveParams,
  targetableHH: number,
  increment: number = 10000
): number {
  // Calculate baseline reach
  const baseline = calculateSingleChannelReach(spend, publisher, curve, targetableHH);
  
  // Calculate test reach with increment
  const test = calculateSingleChannelReach(spend + increment, publisher, curve, targetableHH);
  
  // Calculate marginal CPiR
  const deltaCost = increment;
  const deltaReach = test.reach - baseline.reach;
  
  if (deltaReach <= 0) return Infinity;
  
  return deltaCost / deltaReach;
}

/**
 * Main forecast function
 */
export function forecastReach(input: ForecastInput): ForecastOutput {
  const market = markets.find(m => m.id === input.marketId);
  const target = targets.find(t => t.id === input.targetId);
  
  if (!market || !target) {
    throw new Error('Invalid market or target');
  }
  
  const targetableHH = market.households * target.hh_index;
  const channelReaches = new Map<string, number>();
  const impressionsMap = new Map<string, number>();
  const byPublisher: ForecastOutput['byPublisher'] = [];
  
  // Calculate reach for each publisher
  for (const allocation of input.allocations) {
    const publisher = publishers.find(p => p.id === allocation.publisherId);
    const curve = curveParams.find(c => c.publisherId === allocation.publisherId);
    
    if (!publisher || !curve) continue;
    
    const { reach, impressions } = calculateSingleChannelReach(
      allocation.spend,
      publisher,
      curve,
      targetableHH
    );
    
    channelReaches.set(allocation.publisherId, reach);
    impressionsMap.set(allocation.publisherId, impressions);
    
    // Calculate marginal CPiR
    const marginalCpir = calculateMarginalCpir(
      allocation.publisherId,
      allocation.spend,
      publisher,
      curve,
      targetableHH
    );
    
    byPublisher.push({
      publisherId: allocation.publisherId,
      reach1p: reach / targetableHH,
      marginalCpir,
      spend: allocation.spend,
      impressions
    });
  }
  
  // Calculate deduplicated reach
  const dedupReach = calculateDeduplicatedReach(channelReaches, pairOverlaps);
  const reach1p = dedupReach / targetableHH;
  
  // Calculate total impressions
  let totalImpressions = 0;
  for (const imps of impressionsMap.values()) {
    totalImpressions += imps;
  }
  
  // Calculate average frequency
  const avgFreq = dedupReach > 0 ? totalImpressions / dedupReach : 0;
  
  // Calculate Reach 3+ (mock: function of avg freq)
  const reach3p = Math.max(0, reach1p - Math.exp(-0.6 * (avgFreq - 2)));
  
  // Calculate total spend
  const totalSpend = input.allocations.reduce((sum, a) => sum + a.spend, 0);
  
  // Calculate weighted CPM
  const weightedCPM = totalImpressions > 0 
    ? (totalSpend / totalImpressions) * 1000 
    : 0;
  
  // Calculate CPiR (cost per incremental reach)
  const cpir = dedupReach > 0 ? totalSpend / dedupReach : Infinity;
  
  return {
    reach1p,
    reach3p,
    avgFreq,
    cpm: weightedCPM,
    cpir,
    byPublisher,
    overlapMatrix: pairOverlaps
  };
}

