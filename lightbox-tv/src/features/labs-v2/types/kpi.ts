export interface KPI {
  id: string;
  name: string;
  description: string;
  category: 'reach' | 'engagement' | 'conversion' | 'brand';
  unit: string;
  direction: 'maximize' | 'minimize';
  defaultWeight?: number;
}


