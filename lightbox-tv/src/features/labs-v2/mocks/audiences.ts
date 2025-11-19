import type { Audience } from '../types';

export const audiences: Audience[] = [
  {
    id: 'a25-54',
    name: 'Adults 25-54',
    description: 'Primary target demographic for most campaigns',
    demographics: {
      ageMin: 25,
      ageMax: 54,
      gender: 'all',
    },
    size: 35000000,
    source: 'third-party',
    provider: 'BARB',
  },
  {
    id: 'a18-34',
    name: 'Adults 18-34',
    description: 'Young adult demographic',
    demographics: {
      ageMin: 18,
      ageMax: 34,
      gender: 'all',
    },
    size: 18000000,
    source: 'third-party',
    provider: 'BARB',
  },
  {
    id: 'a35-64',
    name: 'Adults 35-64',
    description: 'Middle-aged demographic',
    demographics: {
      ageMin: 35,
      ageMax: 64,
      gender: 'all',
    },
    size: 28000000,
    source: 'third-party',
    provider: 'BARB',
  },
  {
    id: 'families',
    name: 'Families with Children',
    description: 'Households with children under 18',
    demographics: {
      ageMin: 25,
      ageMax: 54,
      interests: ['family', 'parenting'],
    },
    size: 12000000,
    source: 'third-party',
    provider: 'Experian',
  },
  {
    id: 'affluent',
    name: 'Affluent Consumers',
    description: 'High-income households',
    demographics: {
      income: 'high',
      location: ['London', 'South East'],
    },
    size: 8000000,
    source: 'third-party',
    provider: 'Experian',
  },
  {
    id: 'tech-enthusiasts',
    name: 'Tech Enthusiasts',
    description: 'Early adopters of technology',
    demographics: {
      ageMin: 25,
      ageMax: 45,
      interests: ['technology', 'gadgets', 'innovation'],
    },
    size: 5000000,
    source: 'lookalike',
    provider: 'Meta',
  },
];

export const getAudienceById = (id: string): Audience | undefined => {
  return audiences.find(a => a.id === id);
};


