export interface Format {
  id: string;
  name: string;
  duration: number; // seconds
  aspectRatio: string;
  description?: string;
  supportedChannels: string[]; // channelIds
}


