import type { Format } from '../types';

export const formats: Format[] = [
  {
    id: 'tv-30',
    name: 'TV 30s',
    duration: 30,
    aspectRatio: '16:9',
    description: 'Standard TV commercial',
    supportedChannels: ['itv', 'channel4', 'all4', 'itvx', 'samsung-ads', 'roku', 'youtube'],
  },
  {
    id: 'tv-60',
    name: 'TV 60s',
    duration: 60,
    aspectRatio: '16:9',
    description: 'Extended TV commercial',
    supportedChannels: ['itv', 'channel4', 'all4', 'itvx', 'samsung-ads', 'roku', 'youtube'],
  },
  {
    id: 'social-6',
    name: 'Social 6s',
    duration: 6,
    aspectRatio: '9:16',
    description: 'Short-form vertical video',
    supportedChannels: ['meta', 'tiktok', 'youtube'],
  },
  {
    id: 'social-15',
    name: 'Social 15s',
    duration: 15,
    aspectRatio: '9:16',
    description: 'Standard social video',
    supportedChannels: ['meta', 'tiktok', 'youtube', 'all4', 'itvx'],
  },
  {
    id: 'social-square',
    name: 'Square Video',
    duration: 15,
    aspectRatio: '1:1',
    description: 'Square format for social feeds',
    supportedChannels: ['meta', 'youtube'],
  },
];

export const getFormatById = (id: string): Format | undefined => {
  return formats.find(f => f.id === id);
};


