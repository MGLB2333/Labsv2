import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Monitor, Business, MoreHoriz } from '@mui/icons-material';

interface SectionTabsProps {
  activeTab: number;
  onTabChange: (value: number) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({ activeTab, onTabChange }) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
      <Tabs 
        value={activeTab} 
        onChange={handleChange}
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#02b5e7',
            height: 2,
          },
        }}
      >
        <Tab
          icon={<Monitor />}
          iconPosition="start"
          label="SUPPLIERS"
          sx={{ 
            textTransform: 'uppercase', 
            fontWeight: 400,
            fontSize: '12px',
            minHeight: 48,
            '&.Mui-selected': {
              color: '#02b5e7',
            },
            '&:not(.Mui-selected)': {
              color: '#666',
            },
            '& .MuiTab-iconWrapper': {
              marginRight: 1,
            },
          }}
        />
        <Tab
          icon={<Business />}
          iconPosition="start"
          label="CLIENTS"
          sx={{ 
            textTransform: 'uppercase', 
            fontWeight: 400,
            fontSize: '12px',
            minHeight: 48,
            '&.Mui-selected': {
              color: '#02b5e7',
            },
            '&:not(.Mui-selected)': {
              color: '#666',
            },
            '& .MuiTab-iconWrapper': {
              marginRight: 1,
            },
          }}
        />
        <Tab
          icon={<MoreHoriz />}
          iconPosition="start"
          label="DELIVERY GOALS"
          sx={{ 
            textTransform: 'uppercase', 
            fontWeight: 400,
            fontSize: '12px',
            minHeight: 48,
            '&.Mui-selected': {
              color: '#02b5e7',
            },
            '&:not(.Mui-selected)': {
              color: '#666',
            },
            '& .MuiTab-iconWrapper': {
              marginRight: 1,
            },
          }}
        />
      </Tabs>
    </Box>
  );
};

export default SectionTabs;
