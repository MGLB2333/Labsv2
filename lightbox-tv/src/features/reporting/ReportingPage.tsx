import React from 'react';
import { Box, Typography } from '@mui/material';
import LabsEmptySlate from '@/shared/components/LabsEmptySlate';

interface ReportingPageProps {
  title: string;
  description?: string;
}

const ReportingPage: React.FC<ReportingPageProps> = ({ title, description }) => {
  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          {title}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        <LabsEmptySlate
          title={title}
          description={description || `${title} functionality is not available in the Labs environment.`}
        />
      </Box>
    </Box>
  );
};

export default ReportingPage;
