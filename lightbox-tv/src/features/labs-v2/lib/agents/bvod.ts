import type { Channel } from '../../types';
import { getBenchmarksByChannel } from '../../mocks/performanceBenchmarks';

export const fetchBenchmarks = async (channel: Channel) => {
  console.log(`[BVOD Agent] Fetching benchmarks for ${channel.name}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return getBenchmarksByChannel(channel.id);
};

export const applyConstraints = (channel: Channel, budget: number) => {
  console.log(`[BVOD Agent] Applying constraints for budget: £${budget}`);
  const minBudget = channel.constraints?.minBudget || 0;
  const maxBudget = channel.constraints?.maxBudget || Infinity;
  return Math.max(minBudget, Math.min(budget, maxBudget));
};

export const generateInsights = (channel: Channel) => {
  console.log(`[BVOD Agent] Generating insights for ${channel.name}`);
  return {
    recommendation: 'BVOD offers premium reach with better targeting than linear',
    opportunities: ['Programmatic buying', 'Addressable audiences'],
    warnings: ['Inventory can be limited for premium content'],
  };
};


