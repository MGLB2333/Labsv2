import React, { useState } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  TableChart,
  ShowChart,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data based on the Excel spreadsheet
const reachBuildData = [
  { date: '17/04/2023', day: 'Mon', tvr: 3.6, accTvr: 3.6, reach1: 2.7, reach2: 0.5, reach3: 0.2, reach4: 0.1, reach5: 0, reach6: 0, reach7: 0, reach8: 0, reach9: 0, reach10: 0 },
  { date: '18/04/2023', day: 'Tue', tvr: 3.9, accTvr: 7.5, reach1: 5.4, reach2: 1.3, reach3: 0.5, reach4: 0.2, reach5: 0.1, reach6: 0, reach7: 0, reach8: 0, reach9: 0, reach10: 0 },
  { date: '19/04/2023', day: 'Wed', tvr: 3.8, accTvr: 11.3, reach1: 8.1, reach2: 2.1, reach3: 0.8, reach4: 0.3, reach5: 0.1, reach6: 0, reach7: 0, reach8: 0, reach9: 0, reach10: 0 },
  { date: '20/04/2023', day: 'Thu', tvr: 3.7, accTvr: 15.0, reach1: 10.8, reach2: 3.0, reach3: 1.2, reach4: 0.5, reach5: 0.2, reach6: 0.1, reach7: 0, reach8: 0, reach9: 0, reach10: 0 },
  { date: '21/04/2023', day: 'Fri', tvr: 3.5, accTvr: 18.5, reach1: 13.5, reach2: 3.8, reach3: 1.6, reach4: 0.7, reach5: 0.3, reach6: 0.1, reach7: 0, reach8: 0, reach9: 0, reach10: 0 },
  { date: '22/04/2023', day: 'Sat', tvr: 3.2, accTvr: 21.7, reach1: 16.2, reach2: 4.5, reach3: 2.0, reach4: 0.9, reach5: 0.4, reach6: 0.2, reach7: 0.1, reach8: 0, reach9: 0, reach10: 0 },
  { date: '23/04/2023', day: 'Sun', tvr: 3.4, accTvr: 25.1, reach1: 18.9, reach2: 5.2, reach3: 2.4, reach4: 1.1, reach5: 0.5, reach6: 0.2, reach7: 0.1, reach8: 0, reach9: 0, reach10: 0 },
  { date: '24/04/2023', day: 'Mon', tvr: 3.8, accTvr: 28.9, reach1: 21.6, reach2: 6.0, reach3: 2.8, reach4: 1.3, reach5: 0.6, reach6: 0.3, reach7: 0.1, reach8: 0, reach9: 0, reach10: 0 },
  { date: '25/04/2023', day: 'Tue', tvr: 3.9, accTvr: 32.8, reach1: 24.3, reach2: 6.8, reach3: 3.2, reach4: 1.5, reach5: 0.7, reach6: 0.3, reach7: 0.2, reach8: 0.1, reach9: 0, reach10: 0 },
  { date: '26/04/2023', day: 'Wed', tvr: 3.6, accTvr: 36.4, reach1: 27.0, reach2: 7.6, reach3: 3.6, reach4: 1.7, reach5: 0.8, reach6: 0.4, reach7: 0.2, reach8: 0.1, reach9: 0, reach10: 0 },
  { date: '27/04/2023', day: 'Thu', tvr: 3.7, accTvr: 40.1, reach1: 29.7, reach2: 8.4, reach3: 4.0, reach4: 1.9, reach5: 0.9, reach6: 0.4, reach7: 0.2, reach8: 0.1, reach9: 0, reach10: 0 },
  { date: '28/04/2023', day: 'Fri', tvr: 3.5, accTvr: 43.6, reach1: 32.4, reach2: 9.2, reach3: 4.4, reach4: 2.1, reach5: 1.0, reach6: 0.5, reach7: 0.3, reach8: 0.1, reach9: 0, reach10: 0 },
  { date: '29/04/2023', day: 'Sat', tvr: 3.3, accTvr: 46.9, reach1: 35.1, reach2: 9.9, reach3: 4.8, reach4: 2.3, reach5: 1.1, reach6: 0.5, reach7: 0.3, reach8: 0.1, reach9: 0, reach10: 0 },
  { date: '30/04/2023', day: 'Sun', tvr: 3.4, accTvr: 50.3, reach1: 37.8, reach2: 10.6, reach3: 5.2, reach4: 2.5, reach5: 1.2, reach6: 0.6, reach7: 0.3, reach8: 0.2, reach9: 0.1, reach10: 0 },
  { date: '01/05/2023', day: 'Mon', tvr: 3.8, accTvr: 54.1, reach1: 40.5, reach2: 11.4, reach3: 5.6, reach4: 2.7, reach5: 1.3, reach6: 0.6, reach7: 0.4, reach8: 0.2, reach9: 0.1, reach10: 0 },
  { date: '02/05/2023', day: 'Tue', tvr: 3.9, accTvr: 58.0, reach1: 43.2, reach2: 12.2, reach3: 6.0, reach4: 2.9, reach5: 1.4, reach6: 0.7, reach7: 0.4, reach8: 0.2, reach9: 0.1, reach10: 0 },
  { date: '03/05/2023', day: 'Wed', tvr: 3.6, accTvr: 61.6, reach1: 45.9, reach2: 13.0, reach3: 6.4, reach4: 3.1, reach5: 1.5, reach6: 0.7, reach7: 0.4, reach8: 0.2, reach9: 0.1, reach10: 0 },
  { date: '04/05/2023', day: 'Thu', tvr: 3.7, accTvr: 65.3, reach1: 48.6, reach2: 13.8, reach3: 6.8, reach4: 3.3, reach5: 1.6, reach6: 0.8, reach7: 0.5, reach8: 0.2, reach9: 0.1, reach10: 0 },
  { date: '05/05/2023', day: 'Fri', tvr: 3.5, accTvr: 68.8, reach1: 51.3, reach2: 14.6, reach3: 7.2, reach4: 3.5, reach5: 1.7, reach6: 0.8, reach7: 0.5, reach8: 0.2, reach9: 0.1, reach10: 0 },
  { date: '06/05/2023', day: 'Sat', tvr: 3.3, accTvr: 72.1, reach1: 54.0, reach2: 15.4, reach3: 7.6, reach4: 3.7, reach5: 1.8, reach6: 0.9, reach7: 0.5, reach8: 0.3, reach9: 0.1, reach10: 0 },
  { date: '07/05/2023', day: 'Sun', tvr: 3.4, accTvr: 75.5, reach1: 56.7, reach2: 16.2, reach3: 8.0, reach4: 3.9, reach5: 1.9, reach6: 0.9, reach7: 0.6, reach8: 0.3, reach9: 0.1, reach10: 0 },
  { date: '08/05/2023', day: 'Mon', tvr: 3.8, accTvr: 79.3, reach1: 59.4, reach2: 17.0, reach3: 8.4, reach4: 4.1, reach5: 2.0, reach6: 1.0, reach7: 0.6, reach8: 0.3, reach9: 0.2, reach10: 0.1 },
  { date: '09/05/2023', day: 'Tue', tvr: 3.9, accTvr: 83.2, reach1: 62.1, reach2: 17.8, reach3: 8.8, reach4: 4.3, reach5: 2.1, reach6: 1.0, reach7: 0.6, reach8: 0.3, reach9: 0.2, reach10: 0.1 },
  { date: '10/05/2023', day: 'Wed', tvr: 3.6, accTvr: 86.8, reach1: 64.8, reach2: 18.6, reach3: 9.2, reach4: 4.5, reach5: 2.2, reach6: 1.1, reach7: 0.7, reach8: 0.4, reach9: 0.2, reach10: 0.1 },
  { date: '11/05/2023', day: 'Thu', tvr: 3.7, accTvr: 90.5, reach1: 67.5, reach2: 19.4, reach3: 9.6, reach4: 4.7, reach5: 2.3, reach6: 1.1, reach7: 0.7, reach8: 0.4, reach9: 0.2, reach10: 0.1 },
  { date: '12/05/2023', day: 'Fri', tvr: 3.5, accTvr: 94.0, reach1: 70.2, reach2: 20.2, reach3: 10.0, reach4: 4.9, reach5: 2.4, reach6: 1.2, reach7: 0.8, reach8: 0.4, reach9: 0.2, reach10: 0.1 },
  { date: '13/05/2023', day: 'Sat', tvr: 3.3, accTvr: 97.3, reach1: 72.9, reach2: 21.0, reach3: 10.4, reach4: 5.1, reach5: 2.5, reach6: 1.2, reach7: 0.8, reach8: 0.4, reach9: 0.2, reach10: 0.1 },
  { date: '14/05/2023', day: 'Sun', tvr: 3.4, accTvr: 100.7, reach1: 75.6, reach2: 21.8, reach3: 10.8, reach4: 5.3, reach5: 2.6, reach6: 1.3, reach7: 0.8, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '15/05/2023', day: 'Mon', tvr: 3.8, accTvr: 104.5, reach1: 78.3, reach2: 22.6, reach3: 11.2, reach4: 5.5, reach5: 2.7, reach6: 1.3, reach7: 0.9, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '16/05/2023', day: 'Tue', tvr: 3.9, accTvr: 108.4, reach1: 81.0, reach2: 23.4, reach3: 11.6, reach4: 5.7, reach5: 2.8, reach6: 1.4, reach7: 0.9, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '17/05/2023', day: 'Wed', tvr: 3.6, accTvr: 112.0, reach1: 83.7, reach2: 24.2, reach3: 12.0, reach4: 5.9, reach5: 2.9, reach6: 1.4, reach7: 0.9, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '18/05/2023', day: 'Thu', tvr: 3.7, accTvr: 115.7, reach1: 86.4, reach2: 25.0, reach3: 12.4, reach4: 6.1, reach5: 3.0, reach6: 1.5, reach7: 1.0, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '19/05/2023', day: 'Fri', tvr: 3.5, accTvr: 119.2, reach1: 89.1, reach2: 25.8, reach3: 12.8, reach4: 6.3, reach5: 3.1, reach6: 1.5, reach7: 1.0, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '20/05/2023', day: 'Sat', tvr: 3.3, accTvr: 122.5, reach1: 91.8, reach2: 26.6, reach3: 13.2, reach4: 6.5, reach5: 3.2, reach6: 1.6, reach7: 1.0, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '21/05/2023', day: 'Sun', tvr: 3.4, accTvr: 125.9, reach1: 94.5, reach2: 27.4, reach3: 13.6, reach4: 6.7, reach5: 3.3, reach6: 1.6, reach7: 1.1, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '22/05/2023', day: 'Mon', tvr: 3.8, accTvr: 129.7, reach1: 97.2, reach2: 28.2, reach3: 14.0, reach4: 6.9, reach5: 3.4, reach6: 1.7, reach7: 1.1, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
  { date: '23/05/2023', day: 'Tue', tvr: 3.0, accTvr: 132.7, reach1: 99.9, reach2: 29.0, reach3: 14.4, reach4: 7.1, reach5: 3.5, reach6: 1.7, reach7: 1.1, reach8: 0.5, reach9: 0.2, reach10: 0.1 },
];

const ReachBuildTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newViewMode: 'table' | 'chart' | null,
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <Box>
      {/* Header with Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
          Reach Build Analysis
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 500,
              px: 2,
              py: 0.5,
              '&.Mui-selected': {
                backgroundColor: '#02b5e7',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#02b5e7',
                },
              },
            },
          }}
        >
          <ToggleButton value="table">
            <TableChart sx={{ fontSize: 16, mr: 1 }} />
            Data Grid
          </ToggleButton>
          <ToggleButton value="chart">
            <ShowChart sx={{ fontSize: 16, mr: 1 }} />
            Line Graph
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content based on view mode */}
      {viewMode === 'table' ? (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                  Day
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  TVR (%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  Acc.TVR
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  1+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  2+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  3+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  4+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  5+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  6+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  7+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  8+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  9+(%)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                  10+(%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reachBuildData.map((row, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}>
                    {formatDate(row.date)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}>
                    {row.day}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.tvr)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.accTvr)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach1)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach2)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach3)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach4)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach5)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach6)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach7)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach8)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach9)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                    {formatPercentage(row.reach10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ height: 500, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reachBuildData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [formatPercentage(value), name]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="accTvr" 
                stroke="#02b5e7" 
                strokeWidth={2}
                name="Acc.TVR"
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach1" 
                stroke="#e91e63" 
                strokeWidth={2}
                name="1+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach2" 
                stroke="#4caf50" 
                strokeWidth={2}
                name="2+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach3" 
                stroke="#ff9800" 
                strokeWidth={2}
                name="3+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach4" 
                stroke="#9c27b0" 
                strokeWidth={2}
                name="4+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach5" 
                stroke="#f44336" 
                strokeWidth={2}
                name="5+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach6" 
                stroke="#795548" 
                strokeWidth={2}
                name="6+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach7" 
                stroke="#607d8b" 
                strokeWidth={2}
                name="7+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach8" 
                stroke="#ff5722" 
                strokeWidth={2}
                name="8+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach9" 
                stroke="#3f51b5" 
                strokeWidth={2}
                name="9+ (%)"
                dot={{ r: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="reach10" 
                stroke="#8bc34a" 
                strokeWidth={2}
                name="10+ (%)"
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default ReachBuildTab;
