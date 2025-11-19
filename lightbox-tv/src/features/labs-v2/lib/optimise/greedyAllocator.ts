import type { Channel, ChannelAllocation, Campaign } from '../../types';
import { channels } from '../../mocks/channels';
import { calculateCompatibilityScore } from '../scoring/compatibility';
import { calculateAudienceFit } from '../scoring/audienceFit';
import { applyMMMAdjustment } from '../attribution/applyMMM';
import { applyHaloAdjustment } from '../attribution/applyHalo';
import { getAudienceById } from '../../mocks/audiences';

export interface AllocationResult {
  allocations: ChannelAllocation[];
  totalScore: number;
  totalReach: number;
}

const calculateChannelScore = (channel: Channel, campaign: Campaign, activeChannels: string[]): number => {
  // Base compatibility score
  let score = calculateCompatibilityScore(channel, campaign.kpis);
  
  // Apply audience fit
  const audience = getAudienceById(campaign.audience.id);
  if (audience) {
    const fitScore = calculateAudienceFit(audience, channel);
    score *= (0.7 + 0.3 * fitScore); // Weighted by fit
  }
  
  // Apply MMM adjustment
  score = applyMMMAdjustment(channel, campaign.kpis, score);
  
  // Apply halo effects
  for (const kpi of campaign.kpis) {
    score = applyHaloAdjustment(channel, activeChannels, kpi.id, score);
  }
  
  // Accreditation bonus
  if (channel.accreditation && channel.accreditation.length > 0) {
    score *= 1.05; // 5% bonus for accredited channels
  }
  
  return score;
};

export const greedyAllocate = (
  campaign: Campaign,
  availableChannels: Channel[]
): AllocationResult => {
  const allocations: ChannelAllocation[] = [];
  let remainingBudget = campaign.totalBudget;
  const activeChannels: string[] = [];
  
  // Calculate scores for all channels
  const channelScores = availableChannels.map(channel => ({
    channel,
    score: calculateChannelScore(channel, campaign, activeChannels),
  })).sort((a, b) => b.score - a.score);
  
  // Allocate budget greedily to highest scoring channels
  for (const { channel } of channelScores) {
    if (remainingBudget <= 0) break;
    
    const minBudget = channel.constraints?.minBudget || 0;
    if (remainingBudget < minBudget) continue;
    
    const maxBudget = channel.constraints?.maxBudget || remainingBudget;
    const allocation = Math.min(remainingBudget, maxBudget);
    
    allocations.push({
      channelId: channel.id,
      budget: allocation,
    });
    
    activeChannels.push(channel.id);
    remainingBudget -= allocation;
  }
  
  // Calculate total metrics
  const totalScore = allocations.reduce((sum, a) => {
    const channel = channels.find(c => c.id === a.channelId);
    return sum + (channel ? calculateChannelScore(channel, campaign, activeChannels) * (a.budget / campaign.totalBudget) : 0);
  }, 0);
  
  return {
    allocations,
    totalScore,
    totalReach: 0, // Would calculate from reach curves
  };
};

