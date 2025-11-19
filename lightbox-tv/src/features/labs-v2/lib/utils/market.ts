import type { Market } from '../../types';
import { channels } from '../../mocks/channels';

export const markets: Market[] = [
  {
    id: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    timezone: 'Europe/London',
    availableChannels: channels.filter(c => c.market === 'UK').map(c => c.id),
  },
];

export const getMarketById = (id: string): Market | undefined => {
  return markets.find(m => m.id === id);
};

export const getDefaultMarket = (): Market => {
  return markets[0];
};


