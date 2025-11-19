import type { Channel } from '../types';

export const channels: Channel[] = [
  {
    id: 'itv',
    name: 'ITV',
    category: 'linear',
    market: 'UK',
    cpm: 12.5,
    benchmarks: {
      reach1p: 0.85,
      reach3p: 0.65,
      vtr: 0.92,
      brandLift: 0.15,
    },
    constraints: {
      minBudget: 50000,
      minDuration: 30,
      maxDuration: 60,
    },
    accreditation: ['BARB', 'TAM'],
  },
  {
    id: 'channel4',
    name: 'Channel 4',
    category: 'linear',
    market: 'UK',
    cpm: 11.8,
    benchmarks: {
      reach1p: 0.82,
      reach3p: 0.62,
      vtr: 0.90,
      brandLift: 0.12,
    },
    constraints: {
      minBudget: 40000,
      minDuration: 30,
      maxDuration: 60,
    },
    accreditation: ['BARB'],
  },
  {
    id: 'all4',
    name: 'All 4',
    category: 'bvod',
    market: 'UK',
    cpm: 8.5,
    benchmarks: {
      reach1p: 0.45,
      reach3p: 0.28,
      vtr: 0.75,
      ctr: 0.08,
      brandLift: 0.10,
    },
    constraints: {
      minBudget: 20000,
      minDuration: 15,
      maxDuration: 60,
    },
  },
  {
    id: 'itvx',
    name: 'ITVX',
    category: 'bvod',
    market: 'UK',
    cpm: 9.2,
    benchmarks: {
      reach1p: 0.48,
      reach3p: 0.30,
      vtr: 0.78,
      ctr: 0.09,
      brandLift: 0.11,
    },
    constraints: {
      minBudget: 25000,
      minDuration: 15,
      maxDuration: 60,
    },
  },
  {
    id: 'samsung-ads',
    name: 'Samsung Ads',
    category: 'ctv',
    market: 'UK',
    cpm: 6.8,
    benchmarks: {
      reach1p: 0.35,
      reach3p: 0.22,
      vtr: 0.85,
      ctr: 0.12,
    },
    constraints: {
      minBudget: 15000,
      minDuration: 15,
      maxDuration: 30,
    },
  },
  {
    id: 'roku',
    name: 'Roku',
    category: 'ctv',
    market: 'UK',
    cpm: 7.2,
    benchmarks: {
      reach1p: 0.32,
      reach3p: 0.20,
      vtr: 0.82,
      ctr: 0.11,
    },
    constraints: {
      minBudget: 15000,
      minDuration: 15,
      maxDuration: 30,
    },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'olv',
    market: 'UK',
    cpm: 4.5,
    benchmarks: {
      reach1p: 0.68,
      reach3p: 0.45,
      vtr: 0.65,
      ctr: 0.15,
      cpa: 25.0,
      roas: 3.2,
    },
    constraints: {
      minBudget: 10000,
      minDuration: 6,
      maxDuration: 60,
      supportedAspectRatios: ['16:9', '1:1', '9:16'],
    },
  },
  {
    id: 'meta',
    name: 'Meta (Facebook/Instagram)',
    category: 'social',
    market: 'UK',
    cpm: 5.2,
    benchmarks: {
      reach1p: 0.72,
      reach3p: 0.50,
      vtr: 0.58,
      ctr: 0.18,
      cpa: 22.0,
      roas: 3.8,
    },
    constraints: {
      minBudget: 10000,
      minDuration: 6,
      maxDuration: 60,
      supportedAspectRatios: ['1:1', '4:5', '9:16'],
    },
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social',
    market: 'UK',
    cpm: 4.8,
    benchmarks: {
      reach1p: 0.65,
      reach3p: 0.42,
      vtr: 0.70,
      ctr: 0.20,
      cpa: 28.0,
      roas: 2.9,
    },
    constraints: {
      minBudget: 10000,
      minDuration: 6,
      maxDuration: 60,
      supportedAspectRatios: ['9:16'],
    },
  },
];

export const getChannelById = (id: string): Channel | undefined => {
  return channels.find(c => c.id === id);
};

export const getChannelsByMarket = (market: string): Channel[] => {
  return channels.filter(c => c.market === market);
};

export const getChannelsByCategory = (category: Channel['category']): Channel[] => {
  return channels.filter(c => c.category === category);
};


