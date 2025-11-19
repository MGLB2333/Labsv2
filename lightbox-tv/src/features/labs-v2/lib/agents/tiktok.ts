import type { Channel } from '../../types';
import { getBenchmarksByChannel } from '../../mocks/performanceBenchmarks';

export const fetchBenchmarks = async (channel: Channel) => {
  console.log(`[TikTok Agent] Fetching benchmarks for ${channel.name}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return getBenchmarksByChannel(channel.id);
};

export const applyConstraints = (channel: Channel, budget: number) => {
  console.log(`[TikTok Agent] Applying constraints for budget: £${budget}`);
  const minBudget = channel.constraints?.minBudget || 0;
  const maxBudget = channel.constraints?.maxBudget || Infinity;
  return Math.max(minBudget, Math.min(budget, maxBudget));
};

export const generateInsights = (channel: Channel) => {
  console.log(`[TikTok Agent] Generating insights for ${channel.name}`);
  return {
    recommendation: 'TikTok requires authentic, native-feeling creative',
    opportunities: ['TikTok Shop', 'Brand Takeovers'],
    warnings: ['High competition in Gen Z segments'],
  };
};


