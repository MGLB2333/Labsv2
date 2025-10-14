import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import CompetitorTrackingTab from './components/CompetitorTrackingTab';
import TopProgrammingTab from './components/TopProgrammingTab';

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
      id={`tv-intelligence-tabpanel-${index}`}
      aria-labelledby={`tv-intelligence-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const TvIntelligencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 600, color: '#333', mb: 1 }}>
          TV Intelligence
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#666' }}>
          Advanced analytics and competitive intelligence for TV advertising
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="TV Intelligence tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#02b5e7',
              height: 2,
            },
          }}
        >
          <Tab
            label="Competitor Tracking"
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
            label="Top Programming"
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
        <CompetitorTrackingTab />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <TopProgrammingTab />
      </TabPanel>
    </Box>
  );
};

export default TvIntelligencePage;
