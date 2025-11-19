import { create } from 'zustand';
import { produce } from 'immer';
import type { Campaign, ChannelAllocation, KPISelection, Scenario } from '../types';

interface CampaignState {
  currentCampaign: Campaign | null;
  scenarios: Scenario[];
  selectedScenario: Scenario | null;
  setCurrentCampaign: (campaign: Campaign | null) => void;
  updateCampaign: (updates: Partial<Campaign>) => void;
  updateKPIs: (kpis: KPISelection[]) => void;
  updateAllocations: (allocations: ChannelAllocation[]) => void;
  setSelectedScenario: (scenario: Scenario | null) => void;
  resetCampaign: () => void;
}

const defaultScenarios: Scenario[] = [
  {
    id: 'brand',
    name: 'Brand',
    description: 'Maximize reach and brand awareness',
    kpiWeights: {
      reach1p: 0.4,
      reach3p: 0.3,
      brandLift: 0.2,
      vtr: 0.1,
    },
    reachWeight: 0.8,
    efficiencyWeight: 0.2,
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Maximize conversions and efficiency',
    kpiWeights: {
      roas: 0.4,
      cpa: 0.3,
      ctr: 0.2,
      vtr: 0.1,
    },
    reachWeight: 0.3,
    efficiencyWeight: 0.7,
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Balance reach and performance',
    kpiWeights: {
      reach1p: 0.25,
      reach3p: 0.2,
      roas: 0.25,
      vtr: 0.15,
      ctr: 0.15,
    },
    reachWeight: 0.5,
    efficiencyWeight: 0.5,
  },
];

export const useCampaignStore = create<CampaignState>()((set) => ({
  currentCampaign: null,
  scenarios: defaultScenarios,
  selectedScenario: null,
  
  setCurrentCampaign: (campaign) => set({ currentCampaign: campaign }),
  
  updateCampaign: (updates) =>
    set(
      produce((state: CampaignState) => {
        if (state.currentCampaign) {
          Object.assign(state.currentCampaign, updates);
          state.currentCampaign.updatedAt = new Date().toISOString();
        }
      })
    ),
  
  updateKPIs: (kpis) =>
    set(
      produce((state: CampaignState) => {
        if (state.currentCampaign) {
          state.currentCampaign.kpis = kpis;
          state.currentCampaign.updatedAt = new Date().toISOString();
        }
      })
    ),
  
  updateAllocations: (allocations) =>
    set(
      produce((state: CampaignState) => {
        if (state.currentCampaign) {
          state.currentCampaign.channels = allocations;
          state.currentCampaign.updatedAt = new Date().toISOString();
        }
      })
    ),
  
  setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
  
  resetCampaign: () => set({ currentCampaign: null, selectedScenario: null }),
}));


