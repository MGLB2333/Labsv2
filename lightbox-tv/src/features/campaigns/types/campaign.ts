export interface Campaign {
  id: string;
  status: 'active' | 'pending' | 'completed';
  campaignName: string;
  mediaType: string;
  agency: string;
  client: string;
  brand: string;
  budget: number;
  startDate?: string;
  endDate?: string;
  clientLead?: string;
}

export interface CampaignFilters {
  status?: string;
  mediaType?: string;
  agency?: string;
  client?: string;
  search?: string;
}
