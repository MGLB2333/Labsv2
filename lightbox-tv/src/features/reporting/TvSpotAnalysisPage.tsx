import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import FrontsheetTab from './components/FrontsheetTab';
import QualityTab from './components/QualityTab';
import PremiumSpotsTab from './components/PremiumSpotsTab';
import ReachBuildTab from './components/ReachBuildTab';
import SpotDataTab from './components/SpotDataTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tv-spot-tabpanel-${index}`}
      aria-labelledby={`tv-spot-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const TvSpotAnalysisPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Mock campaign data - in a real app, this would be fetched based on campaignId
  const campaignData = {
    1: { name: 'IKEA - May 2025', client: 'IKEA' },
    2: { name: 'Polestar - April 2025', client: 'Polestar' },
    3: { name: 'Step Change - March 2025', client: 'Step Change' },
    4: { name: 'Testing Summary', client: 'Internal' },
  };

  const campaign = campaignData[parseInt(campaignId || '0') as keyof typeof campaignData] || { name: 'Unknown Campaign', client: 'Unknown' };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBackClick = () => {
    navigate('/reporting/tv-spot');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBack />}
          onClick={handleBackClick}
          sx={{
            textTransform: 'none',
            fontSize: '11px',
            fontWeight: 500,
            px: 2,
            py: 0.5,
            borderColor: '#e0e0e0',
            color: '#666',
            '&:hover': {
              borderColor: '#02b5e7',
              color: '#02b5e7',
            },
          }}
        >
          Back
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
            {campaign.name}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
            • {campaign.client}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#02b5e7',
              height: 2,
            },
          }}
        >
          <Tab
            label="Frontsheet"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
          <Tab
            label="Quality"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
          <Tab
            label="Premium Spots"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
          <Tab
            label="Reach Build"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
          <Tab
            label="Spot Data"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={activeTab} index={0}>
        <FrontsheetTab />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <QualityTab />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <PremiumSpotsTab />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <ReachBuildTab />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <SpotDataTab />
      </TabPanel>
    </Box>
  );
};

export default TvSpotAnalysisPage;
