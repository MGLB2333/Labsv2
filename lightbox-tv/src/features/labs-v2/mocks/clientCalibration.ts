export interface ClientCalibration {
  clientId: string;
  market: string;
  channelAdjustments: Record<string, number>; // channelId -> multiplier
  lastUpdated: string;
  source: 'post-flight' | 'manual' | 'default';
}

export const clientCalibrations: ClientCalibration[] = [
  {
    clientId: 'default',
    market: 'UK',
    channelAdjustments: {
      'itv': 1.0,
      'channel4': 1.0,
      'all4': 1.0,
      'itvx': 1.0,
      'samsung-ads': 1.0,
      'roku': 1.0,
      'youtube': 1.0,
      'meta': 1.0,
      'tiktok': 1.0,
    },
    lastUpdated: new Date().toISOString(),
    source: 'default',
  },
];

export const getCalibration = (clientId: string, market: string): ClientCalibration | undefined => {
  return clientCalibrations.find(c => c.clientId === clientId && c.market === market) 
    || clientCalibrations.find(c => c.clientId === 'default' && c.market === market);
};

export const updateCalibration = (
  clientId: string,
  market: string,
  channelAdjustments: Record<string, number>
): ClientCalibration => {
  const existing = clientCalibrations.find(c => c.clientId === clientId && c.market === market);
  
  if (existing) {
    existing.channelAdjustments = channelAdjustments;
    existing.lastUpdated = new Date().toISOString();
    existing.source = 'post-flight';
    return existing;
  }
  
  const newCalibration: ClientCalibration = {
    clientId,
    market,
    channelAdjustments,
    lastUpdated: new Date().toISOString(),
    source: 'post-flight',
  };
  
  clientCalibrations.push(newCalibration);
  return newCalibration;
};


