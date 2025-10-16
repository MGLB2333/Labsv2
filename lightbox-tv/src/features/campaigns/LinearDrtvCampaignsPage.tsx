import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import CampaignTable from './components/CampaignTable';

// Mock data for Linear TV campaigns (converted from TV Spot Reporting data)
const mockLinearDrtvCampaigns = [
  {
    id: '1',
    status: 'active' as const,
    campaignName: 'AA ItsOK DRTV Vampires',
    mediaType: 'Linear TV',
    agency: 'the7stars',
    client: 'A A AUTOMOBILE ASS',
    brand: '',
    budget: 500000.00,
    startDate: 'Oct 01, 2025',
    endDate: 'Oct 31, 2025',
    clientLead: 'Demo account',
  },
  {
    id: '2',
    status: 'completed' as const,
    campaignName: 'Autumn 20 HFSS',
    mediaType: 'Linear TV',
    agency: 'the7stars',
    client: 'ICELAND FROZEN FOODS',
    brand: '',
    budget: 750000.00,
    startDate: 'Oct 01, 2025',
    endDate: 'Oct 31, 2025',
    clientLead: 'Demo account',
  },
  {
    id: '3',
    status: 'completed' as const,
    campaignName: 'Coral New Season Football Reward Shaker',
    mediaType: 'Linear TV',
    agency: 'the7stars',
    client: 'CORAL INTERACTIVE',
    brand: '',
    budget: 300000.00,
    startDate: 'Oct 01, 2025',
    endDate: 'Oct 31, 2025',
    clientLead: 'Demo account',
  },
  {
    id: '4',
    status: 'pending' as const,
    campaignName: 'Gousto Brand 30 Brand Film',
    mediaType: 'Linear TV',
    agency: 'the7stars',
    client: 'GOUSTO',
    brand: '',
    budget: 150000.00,
    startDate: 'Oct 01, 2025',
    endDate: 'Oct 31, 2025',
    clientLead: 'Demo account',
  },
];

const LinearDrtvCampaignsPage: React.FC = () => {
  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          Linear & DRTV Campaigns
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
          CREATE LINEAR CAMPAIGN
        </Button>
      </Box>

      {/* Campaign Table */}
      <CampaignTable campaigns={mockLinearDrtvCampaigns} />
    </Box>
  );
};

export default LinearDrtvCampaignsPage;
