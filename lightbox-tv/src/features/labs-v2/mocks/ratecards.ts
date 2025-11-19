import type { Ratecard } from '../types';

export const ratecards: Ratecard[] = [
  { channelId: 'itv', market: 'UK', cpm: 12.5, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'channel4', market: 'UK', cpm: 11.8, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'all4', market: 'UK', cpm: 8.5, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'itvx', market: 'UK', cpm: 9.2, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'samsung-ads', market: 'UK', cpm: 6.8, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'roku', market: 'UK', cpm: 7.2, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'youtube', market: 'UK', cpm: 4.5, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'meta', market: 'UK', cpm: 5.2, currency: 'GBP', validFrom: '2024-01-01' },
  { channelId: 'tiktok', market: 'UK', cpm: 4.8, currency: 'GBP', validFrom: '2024-01-01' },
];

export const getRatecard = (channelId: string, market: string): Ratecard | undefined => {
  return ratecards.find(r => r.channelId === channelId && r.market === market);
};

export const getRatecardsByMarket = (market: string): Ratecard[] => {
  return ratecards.filter(r => r.market === market);
};


