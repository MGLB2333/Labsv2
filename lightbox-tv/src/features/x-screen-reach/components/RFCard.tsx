import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';

interface RFCardProps {
  reach1p: number;
  reach3p: number;
  avgFreq: number;
  cpir: number;
}

const RFCard: React.FC<RFCardProps> = ({ reach1p, reach3p, avgFreq, cpir }) => {
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatCurrency = (value: number) => {
    if (value === Infinity) return 'N/A';
    return `£${value.toFixed(2)}`;
  };

  return (
    <Paper sx={{ p: 2.5, height: '100%', boxSizing: 'border-box' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 2 }}>
        Key Metrics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Reach 1+
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', color: '#02b5e7', mt: 0.5 }}>
              {formatPercentage(reach1p)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Reach 3+
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', color: '#02b5e7', mt: 0.5 }}>
              {formatPercentage(reach3p)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Avg Frequency
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', color: '#333', mt: 0.5 }}>
              {avgFreq.toFixed(1)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              CPiR
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', color: '#333', mt: 0.5 }}>
              {formatCurrency(cpir)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RFCard;

