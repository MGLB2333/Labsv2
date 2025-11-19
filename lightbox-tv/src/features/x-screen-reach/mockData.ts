import type { Market, Target, Channel, Publisher, CurveParams, PairOverlap, Allocation, Constraints } from './types';

export const markets: Market[] = [
  { id: 'UK', name: 'United Kingdom', households: 13500000 }
];

export const targets: Target[] = [
  { id: 'A25-54', name: 'Adults 25-54', hh_index: 0.62 }
];

export const channels: Channel[] = [
  { id: 'Linear', name: 'Linear TV', kind: 'Linear' },
  { id: 'BVOD', name: 'BVOD', kind: 'BVOD' },
  { id: 'YouTube', name: 'YouTube', kind: 'YouTube' },
  { id: 'CTV', name: 'CTV', kind: 'CTV' }
];

export const publishers: Publisher[] = [
  { id: 'ITV', channelId: 'Linear', name: 'ITV', cpm: 11.50 },
  { id: 'All4', channelId: 'BVOD', name: 'All 4', cpm: 14.00 },
  { id: 'YTB', channelId: 'YouTube', name: 'YouTube', cpm: 9.80 },
  { id: 'SAMSUNG', channelId: 'CTV', name: 'Samsung Ads', cpm: 12.80 }
];

export const curveParams: CurveParams[] = [
  { publisherId: 'ITV', r: 1.8, p: 0.35 },
  { publisherId: 'All4', r: 2.1, p: 0.42 },
  { publisherId: 'YTB', r: 1.6, p: 0.30 },
  { publisherId: 'SAMSUNG', r: 1.9, p: 0.38 }
];

export const pairOverlaps: PairOverlap[] = [
  { a: 'ITV', b: 'All4', ovr_pct: 0.32 },
  { a: 'ITV', b: 'YTB', ovr_pct: 0.28 },
  { a: 'ITV', b: 'SAMSUNG', ovr_pct: 0.26 },
  { a: 'All4', b: 'YTB', ovr_pct: 0.26 },
  { a: 'All4', b: 'SAMSUNG', ovr_pct: 0.24 },
  { a: 'YTB', b: 'SAMSUNG', ovr_pct: 0.22 }
];

export const initialAllocations: Allocation[] = [
  { publisherId: 'ITV', geoId: 'LON', spend: 250000 },
  { publisherId: 'All4', geoId: 'LON', spend: 120000 },
  { publisherId: 'YTB', geoId: 'LON', spend: 90000 },
  { publisherId: 'SAMSUNG', geoId: 'LON', spend: 60000 }
];

export const constraints: Constraints = {
  minPerPub: 20000,
  maxPerPub: 400000,
  targetFreq: 3,
  caps: [
    { publisherId: 'ITV', maxImps: 35000000 },
    { publisherId: 'All4', maxImps: 18000000 },
    { publisherId: 'YTB', maxImps: 30000000 },
    { publisherId: 'SAMSUNG', maxImps: 16000000 }
  ]
};



