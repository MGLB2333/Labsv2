import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import CampaignTable from './components/CampaignTable';

// Inline mock data to avoid import issues
const mockCampaigns = [
  {
    id: '1',
    status: 'completed' as const,
    campaignName: 'Dentsu Audience - IKEA - Experian - May',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'LightBoxTV',
    brand: '',
    budget: 12000.00,
    startDate: 'May 01, 2025',
    endDate: 'May 31, 2025',
    clientLead: 'Mark Giblin',
  },
  {
    id: '2',
    status: 'completed' as const,
    campaignName: 'Dentsu Audience Polestar',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'LightBoxTV',
    brand: '',
    budget: 121550.49,
    startDate: 'Apr 12, 2025',
    endDate: 'Apr 30, 2025',
    clientLead: 'Mark Giblin',
  },
  {
    id: '3',
    status: 'pending' as const,
    campaignName: 'Dentsu Audience - IKEA - Experian - Apri',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'LightBoxTV',
    brand: '',
    budget: 12000.00,
    startDate: 'Apr 01, 2025',
    endDate: 'Apr 30, 2025',
    clientLead: 'Mark Giblin',
  },
  {
    id: '4',
    status: 'completed' as const,
    campaignName: 'Dentsu Audience - Step Change - Experia',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'Airline Client',
    brand: '',
    budget: 10000.00,
    startDate: 'Mar 01, 2025',
    endDate: 'May 31, 2025',
    clientLead: 'Mark Giblin',
  },
  {
    id: '5',
    status: 'pending' as const,
    campaignName: 'Copy of Testing Summary',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'Sports Brand',
    brand: '',
    budget: 300000.00,
    startDate: 'Nov 01, 2024',
    endDate: 'Nov 30, 2024',
    clientLead: 'Mark Giblin',
  },
  {
    id: '6',
    status: 'completed' as const,
    campaignName: 'Test LightboxTV',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'LightBoxTV',
    brand: 'Linear TV Plan...',
    budget: 10000.00,
    startDate: 'Oct 01, 2024',
    endDate: 'Oct 31, 2024',
    clientLead: 'Mark Giblin',
  },
  {
    id: '7',
    status: 'pending' as const,
    campaignName: 'Testing Summary',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'Tesla',
    brand: '',
    budget: 300000.00,
    startDate: 'Nov 01, 2024',
    endDate: 'Nov 30, 2024',
    clientLead: '',
  },
  {
    id: '8',
    status: 'completed' as const,
    campaignName: 'Mira Showers - September 2024 - REPOI',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'LBM - Mira Showers',
    brand: '',
    budget: 5870.00,
    startDate: 'Sep 06, 2024',
    endDate: 'Sep 30, 2024',
    clientLead: '',
  },
  {
    id: '9',
    status: 'pending' as const,
    campaignName: 'SM Delete Tactics',
    mediaType: 'CTV',
    agency: 'LightBoxTV',
    client: 'Airline Client',
    brand: '',
    budget: 10000.00,
    startDate: '',
    endDate: '',
    clientLead: 'Mark Giblin',
  },
];

const CtvCinemaCampaignsPage: React.FC = () => {
  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          CTV & Cinema Campaigns
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: '#02b5e7',
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '12px',
            px: 2,
            py: 0.5,
            height: 28,
            '&:hover': {
              backgroundColor: '#02b5e7',
              opacity: 0.9,
            },
          }}
        >
          CREATE CTV CAMPAIGN
        </Button>
      </Box>

      {/* Campaign Table */}
      <CampaignTable campaigns={mockCampaigns} />
    </Box>
  );
};

export default CtvCinemaCampaignsPage;
