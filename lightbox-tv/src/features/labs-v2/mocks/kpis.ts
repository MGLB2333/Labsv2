import type { KPI } from '../types';

export const kpis: KPI[] = [
  {
    id: 'reach1p',
    name: 'Reach 1+',
    description: 'Percentage of target audience reached at least once',
    category: 'reach',
    unit: '%',
    direction: 'maximize',
    defaultWeight: 0.3,
  },
  {
    id: 'reach3p',
    name: 'Reach 3+',
    description: 'Percentage of target audience reached at least 3 times',
    category: 'reach',
    unit: '%',
    direction: 'maximize',
    defaultWeight: 0.25,
  },
  {
    id: 'vtr',
    name: 'Video Completion Rate',
    description: 'Percentage of videos watched to completion',
    category: 'engagement',
    unit: '%',
    direction: 'maximize',
    defaultWeight: 0.15,
  },
  {
    id: 'ctr',
    name: 'Click-Through Rate',
    description: 'Percentage of viewers who clicked on the ad',
    category: 'engagement',
    unit: '%',
    direction: 'maximize',
    defaultWeight: 0.1,
  },
  {
    id: 'cpa',
    name: 'Cost Per Acquisition',
    description: 'Average cost to acquire one customer',
    category: 'conversion',
    unit: '£',
    direction: 'minimize',
    defaultWeight: 0.15,
  },
  {
    id: 'roas',
    name: 'Return on Ad Spend',
    description: 'Revenue generated per pound spent',
    category: 'conversion',
    unit: 'x',
    direction: 'maximize',
    defaultWeight: 0.2,
  },
  {
    id: 'brandLift',
    name: 'Brand Lift',
    description: 'Increase in brand awareness/consideration',
    category: 'brand',
    unit: '%',
    direction: 'maximize',
    defaultWeight: 0.1,
  },
];

export const getKPIById = (id: string): KPI | undefined => {
  return kpis.find(k => k.id === id);
};

export const getKPIsByCategory = (category: KPI['category']): KPI[] => {
  return kpis.filter(k => k.category === category);
};


