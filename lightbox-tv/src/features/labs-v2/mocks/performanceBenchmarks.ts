export interface PerformanceBenchmark {
  channelId: string;
  kpiId: string;
  value: number;
  percentile: number; // 0-100, where 50 = median
}

export const performanceBenchmarks: PerformanceBenchmark[] = [
  // ITV
  { channelId: 'itv', kpiId: 'reach1p', value: 0.85, percentile: 75 },
  { channelId: 'itv', kpiId: 'reach3p', value: 0.65, percentile: 70 },
  { channelId: 'itv', kpiId: 'vtr', value: 0.92, percentile: 80 },
  { channelId: 'itv', kpiId: 'brandLift', value: 0.15, percentile: 65 },
  
  // Channel 4
  { channelId: 'channel4', kpiId: 'reach1p', value: 0.82, percentile: 72 },
  { channelId: 'channel4', kpiId: 'reach3p', value: 0.62, percentile: 68 },
  { channelId: 'channel4', kpiId: 'vtr', value: 0.90, percentile: 78 },
  { channelId: 'channel4', kpiId: 'brandLift', value: 0.12, percentile: 62 },
  
  // All 4
  { channelId: 'all4', kpiId: 'reach1p', value: 0.45, percentile: 60 },
  { channelId: 'all4', kpiId: 'reach3p', value: 0.28, percentile: 58 },
  { channelId: 'all4', kpiId: 'vtr', value: 0.75, percentile: 65 },
  { channelId: 'all4', kpiId: 'ctr', value: 0.08, percentile: 55 },
  
  // ITVX
  { channelId: 'itvx', kpiId: 'reach1p', value: 0.48, percentile: 62 },
  { channelId: 'itvx', kpiId: 'reach3p', value: 0.30, percentile: 60 },
  { channelId: 'itvx', kpiId: 'vtr', value: 0.78, percentile: 67 },
  { channelId: 'itvx', kpiId: 'ctr', value: 0.09, percentile: 57 },
  
  // Samsung Ads
  { channelId: 'samsung-ads', kpiId: 'reach1p', value: 0.35, percentile: 55 },
  { channelId: 'samsung-ads', kpiId: 'reach3p', value: 0.22, percentile: 53 },
  { channelId: 'samsung-ads', kpiId: 'vtr', value: 0.85, percentile: 75 },
  { channelId: 'samsung-ads', kpiId: 'ctr', value: 0.12, percentile: 60 },
  
  // Roku
  { channelId: 'roku', kpiId: 'reach1p', value: 0.32, percentile: 53 },
  { channelId: 'roku', kpiId: 'reach3p', value: 0.20, percentile: 51 },
  { channelId: 'roku', kpiId: 'vtr', value: 0.82, percentile: 73 },
  { channelId: 'roku', kpiId: 'ctr', value: 0.11, percentile: 58 },
  
  // YouTube
  { channelId: 'youtube', kpiId: 'reach1p', value: 0.68, percentile: 70 },
  { channelId: 'youtube', kpiId: 'reach3p', value: 0.45, percentile: 68 },
  { channelId: 'youtube', kpiId: 'vtr', value: 0.65, percentile: 60 },
  { channelId: 'youtube', kpiId: 'ctr', value: 0.15, percentile: 65 },
  { channelId: 'youtube', kpiId: 'cpa', value: 25.0, percentile: 45 },
  { channelId: 'youtube', kpiId: 'roas', value: 3.2, percentile: 70 },
  
  // Meta
  { channelId: 'meta', kpiId: 'reach1p', value: 0.72, percentile: 72 },
  { channelId: 'meta', kpiId: 'reach3p', value: 0.50, percentile: 70 },
  { channelId: 'meta', kpiId: 'vtr', value: 0.58, percentile: 55 },
  { channelId: 'meta', kpiId: 'ctr', value: 0.18, percentile: 68 },
  { channelId: 'meta', kpiId: 'cpa', value: 22.0, percentile: 40 },
  { channelId: 'meta', kpiId: 'roas', value: 3.8, percentile: 75 },
  
  // TikTok
  { channelId: 'tiktok', kpiId: 'reach1p', value: 0.65, percentile: 68 },
  { channelId: 'tiktok', kpiId: 'reach3p', value: 0.42, percentile: 65 },
  { channelId: 'tiktok', kpiId: 'vtr', value: 0.70, percentile: 62 },
  { channelId: 'tiktok', kpiId: 'ctr', value: 0.20, percentile: 70 },
  { channelId: 'tiktok', kpiId: 'cpa', value: 28.0, percentile: 50 },
  { channelId: 'tiktok', kpiId: 'roas', value: 2.9, percentile: 65 },
];

export const getBenchmark = (channelId: string, kpiId: string): PerformanceBenchmark | undefined => {
  return performanceBenchmarks.find(b => b.channelId === channelId && b.kpiId === kpiId);
};

export const getBenchmarksByChannel = (channelId: string): PerformanceBenchmark[] => {
  return performanceBenchmarks.filter(b => b.channelId === channelId);
};


