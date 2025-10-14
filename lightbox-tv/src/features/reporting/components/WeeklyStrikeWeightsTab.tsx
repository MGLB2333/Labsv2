import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Mock weekly strike weights data - airtime delivery by week
const weeks = [
  { week: 'Week 1', dateRange: 'Jan 6-12, 2025' },
  { week: 'Week 2', dateRange: 'Jan 13-19, 2025' },
  { week: 'Week 3', dateRange: 'Jan 20-26, 2025' },
  { week: 'Week 4', dateRange: 'Jan 27-Feb 2, 2025' }
];

const stations = ['Carlton', 'LWT', 'Midwest', 'North', 'Scotland', 'Southeast', 'Ulster'];

// Data organized by station and week
const weeklyStrikeWeightsData = {
  'Carlton': {
    'Week 1': { plannedTvrs: 92.04, deliveredTvrs: 87.04, variance: -5.00, plannedValue: 110000, deliveredValue: 104024.50, valueVariance: -5975.50, spots: 12, avgLength: 30 },
    'Week 2': { plannedTvrs: 88.50, deliveredTvrs: 91.20, variance: 2.70, plannedValue: 110000, deliveredValue: 112500.00, valueVariance: 2500.00, spots: 14, avgLength: 30 },
    'Week 3': { plannedTvrs: 95.30, deliveredTvrs: 89.75, variance: -5.55, plannedValue: 110000, deliveredValue: 107250.00, valueVariance: -2750.00, spots: 11, avgLength: 30 },
    'Week 4': { plannedTvrs: 90.75, deliveredTvrs: 93.40, variance: 2.65, plannedValue: 110000, deliveredValue: 113750.00, valueVariance: 3750.00, spots: 13, avgLength: 30 }
  },
  'LWT': {
    'Week 1': { plannedTvrs: 77.54, deliveredTvrs: 97.04, variance: 19.50, plannedValue: 110000, deliveredValue: 115975.50, valueVariance: 5975.50, spots: 15, avgLength: 30 },
    'Week 2': { plannedTvrs: 75.20, deliveredTvrs: 78.90, variance: 3.70, plannedValue: 110000, deliveredValue: 108750.00, valueVariance: -1250.00, spots: 13, avgLength: 30 },
    'Week 3': { plannedTvrs: 79.80, deliveredTvrs: 82.15, variance: 2.35, plannedValue: 110000, deliveredValue: 111500.00, valueVariance: 1500.00, spots: 16, avgLength: 30 },
    'Week 4': { plannedTvrs: 76.90, deliveredTvrs: 74.25, variance: -2.65, plannedValue: 110000, deliveredValue: 106500.00, valueVariance: -3500.00, spots: 12, avgLength: 30 }
  },
  'Midwest': {
    'Week 1': { plannedTvrs: 72.83, deliveredTvrs: 72.54, variance: -0.29, plannedValue: 110000, deliveredValue: 102906.75, valueVariance: -7093.25, spots: 8, avgLength: 30 },
    'Week 2': { plannedTvrs: 70.15, deliveredTvrs: 68.90, variance: -1.25, plannedValue: 110000, deliveredValue: 105500.00, valueVariance: -4500.00, spots: 9, avgLength: 30 },
    'Week 3': { plannedTvrs: 73.45, deliveredTvrs: 71.20, variance: -2.25, plannedValue: 110000, deliveredValue: 103800.00, valueVariance: -6200.00, spots: 7, avgLength: 30 },
    'Week 4': { plannedTvrs: 71.60, deliveredTvrs: 69.85, variance: -1.75, plannedValue: 110000, deliveredValue: 104250.00, valueVariance: -5750.00, spots: 10, avgLength: 30 }
  },
  'North': {
    'Week 1': { plannedTvrs: 85.20, deliveredTvrs: 82.15, variance: -3.05, plannedValue: 110000, deliveredValue: 108500.00, valueVariance: -1500.00, spots: 10, avgLength: 30 },
    'Week 2': { plannedTvrs: 83.40, deliveredTvrs: 86.75, variance: 3.35, plannedValue: 110000, deliveredValue: 112250.00, valueVariance: 2250.00, spots: 12, avgLength: 30 },
    'Week 3': { plannedTvrs: 87.60, deliveredTvrs: 84.30, variance: -3.30, plannedValue: 110000, deliveredValue: 106750.00, valueVariance: -3250.00, spots: 9, avgLength: 30 },
    'Week 4': { plannedTvrs: 81.90, deliveredTvrs: 85.20, variance: 3.30, plannedValue: 110000, deliveredValue: 109500.00, valueVariance: -500.00, spots: 11, avgLength: 30 }
  },
  'Scotland': {
    'Week 1': { plannedTvrs: 78.30, deliveredTvrs: 81.45, variance: 3.15, plannedValue: 110000, deliveredValue: 111750.00, valueVariance: 1750.00, spots: 13, avgLength: 30 },
    'Week 2': { plannedTvrs: 76.80, deliveredTvrs: 74.20, variance: -2.60, plannedValue: 110000, deliveredValue: 105500.00, valueVariance: -4500.00, spots: 11, avgLength: 30 },
    'Week 3': { plannedTvrs: 80.15, deliveredTvrs: 77.90, variance: -2.25, plannedValue: 110000, deliveredValue: 107250.00, valueVariance: -2750.00, spots: 14, avgLength: 30 },
    'Week 4': { plannedTvrs: 79.40, deliveredTvrs: 82.60, variance: 3.20, plannedValue: 110000, deliveredValue: 112500.00, valueVariance: 2500.00, spots: 15, avgLength: 30 }
  },
  'Southeast': {
    'Week 1': { plannedTvrs: 82.60, deliveredTvrs: 79.35, variance: -3.25, plannedValue: 110000, deliveredValue: 106250.00, valueVariance: -3750.00, spots: 9, avgLength: 30 },
    'Week 2': { plannedTvrs: 84.20, deliveredTvrs: 87.80, variance: 3.60, plannedValue: 110000, deliveredValue: 113500.00, valueVariance: 3500.00, spots: 12, avgLength: 30 },
    'Week 3': { plannedTvrs: 86.40, deliveredTvrs: 83.15, variance: -3.25, plannedValue: 110000, deliveredValue: 107750.00, valueVariance: -2250.00, spots: 10, avgLength: 30 },
    'Week 4': { plannedTvrs: 83.75, deliveredTvrs: 86.90, variance: 3.15, plannedValue: 110000, deliveredValue: 111250.00, valueVariance: 1250.00, spots: 13, avgLength: 30 }
  },
  'Ulster': {
    'Week 1': { plannedTvrs: 75.40, deliveredTvrs: 72.80, variance: -2.60, plannedValue: 110000, deliveredValue: 104500.00, valueVariance: -5500.00, spots: 8, avgLength: 30 },
    'Week 2': { plannedTvrs: 73.90, deliveredTvrs: 76.25, variance: 2.35, plannedValue: 110000, deliveredValue: 108750.00, valueVariance: -1250.00, spots: 10, avgLength: 30 },
    'Week 3': { plannedTvrs: 77.20, deliveredTvrs: 74.60, variance: -2.60, plannedValue: 110000, deliveredValue: 105750.00, valueVariance: -4250.00, spots: 9, avgLength: 30 },
    'Week 4': { plannedTvrs: 76.50, deliveredTvrs: 79.40, variance: 2.90, plannedValue: 110000, deliveredValue: 110500.00, valueVariance: 500.00, spots: 11, avgLength: 30 }
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatNumber = (num: number, decimals = 2) => {
  return num.toFixed(decimals);
};

const WeeklyStrikeWeightsTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 3 }}>
        Weekly Strike Weights - Airtime Delivery by Week
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 1,
                minWidth: 100,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                zIndex: 1
              }}>
                Station
              </TableCell>
              {weeks.map((week, weekIndex) => (
                <TableCell 
                  key={week.week}
                  colSpan={3}
                  align="center" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 1,
                    minWidth: 200,
                    backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}
                >
                  {week.week}
                </TableCell>
              ))}
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 1,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                zIndex: 1
              }}>
              </TableCell>
              {weeks.map((week, weekIndex) => (
                <React.Fragment key={week.week}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 1,
                    textAlign: 'right',
                    minWidth: 60,
                    backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    Planned
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 1,
                    textAlign: 'right',
                    minWidth: 60,
                    backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    Delivered
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 1,
                    textAlign: 'right',
                    minWidth: 60,
                    backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    Variance
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((station) => (
              <TableRow
                key={station}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ 
                  fontSize: '12px', 
                  py: 1, 
                  fontWeight: 500,
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  borderRight: '1px solid #e0e0e0'
                }}>
                  {station}
                </TableCell>
                {weeks.map((week, weekIndex) => {
                  const data = weeklyStrikeWeightsData[station as keyof typeof weeklyStrikeWeightsData]?.[week.week as keyof typeof weeklyStrikeWeightsData['Carlton']];
                  return (
                    <React.Fragment key={week.week}>
                      <TableCell sx={{ 
                        fontSize: '12px', 
                        py: 1, 
                        textAlign: 'right',
                        backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                      }}>
                        {formatNumber(data?.plannedTvrs || 0)}
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '12px', 
                        py: 1, 
                        textAlign: 'right',
                        backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                      }}>
                        {formatNumber(data?.deliveredTvrs || 0)}
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '12px', 
                        py: 1, 
                        textAlign: 'right',
                        color: (data?.variance || 0) >= 0 ? '#4caf50' : '#f44336',
                        fontWeight: 500,
                        backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                      }}>
                        {(data?.variance || 0) >= 0 ? '+' : ''}{formatNumber(data?.variance || 0)}
                      </TableCell>
                    </React.Fragment>
                  );
                })}
              </TableRow>
            ))}
            
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f8f9fa', fontWeight: 600 }}>
              <TableCell sx={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                py: 1,
                borderTop: '2px solid #e0e0e0',
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                zIndex: 1,
                borderRight: '1px solid #e0e0e0'
              }}>
                TOTAL
              </TableCell>
              {weeks.map((week, weekIndex) => {
                // Calculate totals for this week across all stations
                const weekTotals = stations.reduce((acc, station) => {
                  const data = weeklyStrikeWeightsData[station as keyof typeof weeklyStrikeWeightsData]?.[week.week as keyof typeof weeklyStrikeWeightsData['Carlton']];
                  return {
                    plannedTvrs: acc.plannedTvrs + (data?.plannedTvrs || 0),
                    deliveredTvrs: acc.deliveredTvrs + (data?.deliveredTvrs || 0),
                    variance: acc.variance + (data?.variance || 0),
                  };
                }, { plannedTvrs: 0, deliveredTvrs: 0, variance: 0 });

                return (
                  <React.Fragment key={week.week}>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 1, 
                      fontWeight: 600,
                      borderTop: '2px solid #e0e0e0',
                      backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                    }}>
                      {formatNumber(weekTotals.plannedTvrs)}
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 1, 
                      fontWeight: 600,
                      borderTop: '2px solid #e0e0e0',
                      backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                    }}>
                      {formatNumber(weekTotals.deliveredTvrs)}
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 1, 
                      fontWeight: 600,
                      color: weekTotals.variance >= 0 ? '#4caf50' : '#f44336',
                      borderTop: '2px solid #e0e0e0',
                      backgroundColor: weekIndex % 2 === 0 ? '#fafafa' : '#f5f5f5'
                    }}>
                      {weekTotals.variance >= 0 ? '+' : ''}{formatNumber(weekTotals.variance)}
                    </TableCell>
                  </React.Fragment>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeeklyStrikeWeightsTab;
