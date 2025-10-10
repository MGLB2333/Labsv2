import React from 'react';
import { Card, Box, Typography } from '@mui/material';

const ChartPlaceholder: React.FC = () => {
  return (
    <Card
      sx={{
        mt: 2,
        p: 4,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dashboard analytics will be available here
        </Typography>
      </Box>
    </Card>
  );
};

export default ChartPlaceholder;
