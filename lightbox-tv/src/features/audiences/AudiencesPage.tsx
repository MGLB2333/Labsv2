import React from 'react';
import { Box, Typography } from '@mui/material';
import LabsEmptySlate from '@/shared/components/LabsEmptySlate';

const AudiencesPage: React.FC = () => {
  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          Audiences
        </Typography>
      </Box>

          {/* Content */}
          <Box sx={{ mt: 2 }}>
            <LabsEmptySlate
              title="Audiences"
              description="Audience management and analytics are not available in the Labs environment."
            />
          </Box>
    </Box>
  );
};

export default AudiencesPage;
