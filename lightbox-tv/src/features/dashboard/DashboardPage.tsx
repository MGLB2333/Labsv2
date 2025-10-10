import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SectionTabs from './components/SectionTabs';
import LabsEmptySlate from '@/shared/components/LabsEmptySlate';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <LabsEmptySlate
            title="Suppliers"
            description="Supplier management and analytics are not available in the Labs environment."
          />
        );
      case 1:
        return (
          <LabsEmptySlate
            title="Clients"
            description="Client management and analytics are not available in the Labs environment."
          />
        );
      case 2:
        return (
          <LabsEmptySlate
            title="Delivery Goals"
            description="Delivery goal tracking and analytics are not available in the Labs environment."
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Tabs */}
      <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default DashboardPage;
