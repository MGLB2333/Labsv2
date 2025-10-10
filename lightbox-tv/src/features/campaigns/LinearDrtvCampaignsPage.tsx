import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import CampaignTable from './components/CampaignTable';

// Empty mock data to show "No campaigns found" state
const mockLinearDrtvCampaigns: any[] = [];

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
