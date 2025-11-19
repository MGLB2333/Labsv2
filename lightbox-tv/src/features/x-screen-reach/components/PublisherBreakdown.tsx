import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Info } from '@mui/icons-material';
import type { ForecastOutput } from '../types';
import { publishers } from '../mockData';

interface PublisherBreakdownProps {
  forecast: ForecastOutput;
}

const PublisherBreakdown: React.FC<PublisherBreakdownProps> = ({ forecast }) => {
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatCurrency = (value: number) => {
    if (value === Infinity) return 'N/A';
    return `£${value.toFixed(2)}`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-GB').format(Math.round(value));
  };

  return (
    <Paper sx={{ p: 2.5, height: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px' }}>
          Publisher Performance
        </Typography>
        <Tooltip title="Marginal CPiR: Cost per incremental reach when spending an additional £10k on this publisher">
          <IconButton size="small" sx={{ color: '#666' }}>
            <Info sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>Publisher</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }} align="right">
                Spend
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }} align="right">
                Impressions
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }} align="right">
                Reach 1+
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }} align="right">
                Marginal CPiR
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecast.byPublisher.map((pub) => {
              const publisher = publishers.find(p => p.id === pub.publisherId);
              return (
                <TableRow key={pub.publisherId} hover>
                  <TableCell sx={{ fontSize: '13px', fontWeight: 500 }}>
                    {publisher?.name || pub.publisherId}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '13px' }}>
                    £{formatNumber(pub.spend)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '13px', color: '#666' }}>
                    {formatNumber(pub.impressions)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '13px' }}>
                    {formatPercentage(pub.reach1p)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '13px' }}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor:
                          pub.marginalCpir < 2
                            ? '#e8f5e9'
                            : pub.marginalCpir < 3
                            ? '#fff3e0'
                            : '#ffebee',
                        color:
                          pub.marginalCpir < 2
                            ? '#2e7d32'
                            : pub.marginalCpir < 3
                            ? '#e65100'
                            : '#c62828',
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(pub.marginalCpir)}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PublisherBreakdown;

