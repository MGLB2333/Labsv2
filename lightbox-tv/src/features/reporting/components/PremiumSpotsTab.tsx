import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Schedule } from '@mui/icons-material';

const PremiumSpotsTab: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Schedule
        sx={{
          fontSize: 80,
          color: '#02b5e7',
          mb: 3,
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#333',
          mb: 2,
        }}
      >
        Premium Spots Analysis
      </Typography>
      <Chip
        label="Coming Soon"
        sx={{
          backgroundColor: '#ff9800',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600,
          height: 32,
          px: 2,
        }}
      />
    </Box>
  );
};

export default PremiumSpotsTab;
