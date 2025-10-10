import React from 'react';
import { Box } from '@mui/material';

interface LabsRibbonProps {
  children: React.ReactNode;
}

const LabsRibbon: React.FC<LabsRibbonProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <span>{children}</span>
      <Box
        sx={{
          backgroundColor: '#e53e3e',
          color: 'white',
          fontSize: '8px',
          fontWeight: 600,
          padding: '1px 4px',
          borderRadius: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          flexShrink: 0,
        }}
      >
        LABS
      </Box>
    </Box>
  );
};

export default LabsRibbon;
