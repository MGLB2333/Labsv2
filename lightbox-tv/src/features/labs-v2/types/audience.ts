export interface Audience {
  id: string;
  name: string;
  description: string;
  demographics: DemographicProfile;
  size?: number; // universe size
  source: 'first-party' | 'third-party' | 'lookalike';
  provider?: string;
}

export interface DemographicProfile {
  ageMin?: number;
  ageMax?: number;
  gender?: 'male' | 'female' | 'all';
  income?: string;
  location?: string[];
  interests?: string[];
  behaviors?: string[];
}

export interface AudienceFit {
  audienceId: string;
  channelId: string;
  fitScore: number; // 0-1
  reasoning?: string;
}


