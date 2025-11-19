export interface Market {
  id: string;
  name: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  timezone: string;
  availableChannels: string[]; // channelIds
}


