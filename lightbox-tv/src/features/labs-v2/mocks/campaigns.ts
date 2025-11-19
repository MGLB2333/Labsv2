import type { Campaign } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Summer Campaign 2024',
    advertiser: 'Brand X',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    totalBudget: 500000,
    currency: 'GBP',
    market: 'UK',
    planningMode: 'strategic',
    kpis: [
      { id: 'reach1p', name: 'Reach 1+', weight: 0.3, direction: 'maximize' },
      { id: 'reach3p', name: 'Reach 3+', weight: 0.25, direction: 'maximize' },
      { id: 'vtr', name: 'Video Completion Rate', weight: 0.15, direction: 'maximize' },
      { id: 'roas', name: 'Return on Ad Spend', weight: 0.3, direction: 'maximize' },
    ],
    audience: {
      id: 'a25-54',
      name: 'Adults 25-54',
      demographics: { ageMin: 25, ageMax: 54, gender: 'all' },
    },
    formats: [
      { id: 'tv-30', name: 'TV 30s', duration: 30, aspectRatio: '16:9', required: true },
      { id: 'social-15', name: 'Social 15s', duration: 15, aspectRatio: '9:16', required: false },
    ],
    channels: [
      { channelId: 'itv', budget: 200000 },
      { channelId: 'youtube', budget: 150000 },
      { channelId: 'meta', budget: 100000 },
      { channelId: 'all4', budget: 50000 },
    ],
    calibration: {
      clientId: 'brand-x',
      market: 'UK',
      adjustments: {},
    },
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-05-15T00:00:00Z',
  },
];

export const getCampaignById = (id: string): Campaign | undefined => {
  return mockCampaigns.find(c => c.id === id);
};


