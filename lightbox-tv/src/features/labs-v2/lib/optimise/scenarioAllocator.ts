import type { Campaign, Scenario } from '../../types';
import { greedyAllocate } from './greedyAllocator';
import { getChannelsByMarket } from '../../mocks/channels';

export const scenarioAllocate = (
  campaign: Campaign,
  scenario: Scenario
): ReturnType<typeof greedyAllocate> => {
  // Adjust KPI weights based on scenario
  const adjustedCampaign: Campaign = {
    ...campaign,
    kpis: campaign.kpis.map(kpi => ({
      ...kpi,
      weight: scenario.kpiWeights[kpi.id] || kpi.weight,
    })),
  };
  
  const availableChannels = getChannelsByMarket(campaign.market);
  return greedyAllocate(adjustedCampaign, availableChannels);
};


