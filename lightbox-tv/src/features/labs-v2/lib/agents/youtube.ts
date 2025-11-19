import type { Channel } from '../../types';
import { getBenchmarksByChannel } from '../../mocks/performanceBenchmarks';

export const fetchBenchmarks = async (channel: Channel) => {
  console.log(`[YouTube Agent] Fetching benchmarks for ${channel.name}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return getBenchmarksByChannel(channel.id);
};

export const applyConstraints = (channel: Channel, budget: number) => {
  console.log(`[YouTube Agent] Applying constraints for budget: £${budget}`);
  const minBudget = channel.constraints?.minBudget || 0;
  const maxBudget = channel.constraints?.maxBudget || Infinity;
  return Math.max(minBudget, Math.min(budget, maxBudget));
};

export const generateInsights = (channel: Channel) => {
  console.log(`[YouTube Agent] Generating insights for ${channel.name}`);
  return {
    recommendation: 'YouTube performs best for audiences 18-45 with video-first creative',
    opportunities: ['YouTube Shorts', 'YouTube Premium'],
    warnings: ['Avoid over-saturation in Q4'],
  };
};


