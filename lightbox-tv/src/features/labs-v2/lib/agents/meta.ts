import type { Channel } from '../../types';
import { getBenchmarksByChannel } from '../../mocks/performanceBenchmarks';

export const fetchBenchmarks = async (channel: Channel) => {
  console.log(`[Meta Agent] Fetching benchmarks for ${channel.name}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return getBenchmarksByChannel(channel.id);
};

export const applyConstraints = (channel: Channel, budget: number) => {
  console.log(`[Meta Agent] Applying constraints for budget: £${budget}`);
  const minBudget = channel.constraints?.minBudget || 0;
  const maxBudget = channel.constraints?.maxBudget || Infinity;
  return Math.max(minBudget, Math.min(budget, maxBudget));
};

export const generateInsights = (channel: Channel) => {
  console.log(`[Meta Agent] Generating insights for ${channel.name}`);
  return {
    recommendation: 'Meta excels with short-form vertical video and lookalike audiences',
    opportunities: ['Instagram Reels', 'Facebook Watch'],
    warnings: ['CPM increases during holiday periods'],
  };
};


