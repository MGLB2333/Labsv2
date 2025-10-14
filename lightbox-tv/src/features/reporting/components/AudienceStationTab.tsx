import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';

// BARB data for stations and audiences
const stations = [
  'Channel 5',
  'ITV HD',
  'ITV',
  'Drama',
  'Sky News',
  '5USA',
  'E4',
  'Kerrang',
  'Sky History',
  'Quest'
];

const audiences = [
  'Adults 16-34',
  'Adults 18-20',
  'Adults 35-44',
  'Adults 45-49',
  'Adults 45-54',
  'Adults 55-64',
  'Adults AB',
  'Adults ABC1',
  'Adults ABC1 35-54',
  'Adults C2',
  'Adults working full-time',
  'All Adults',
  'All Homes',
  'All Houseperson',
  'All Men',
  'Boys 04-15',
  'Boys 10-12',
  'Children 10-12',
  'Houseperson 16-34',
  'Houseperson 16-44',
  'Houseperson 35-54',
  'Houseperson ABC1',
  'Houseperson ABC1 16-34',
  'Houseperson with children 0-15',
  'Houseperson with children 0-3',
  'Houseperson working full-time',
  'Individuals AB',
  'Individuals C1',
  'Individuals C2',
  'Men 16-34',
  'Men 35-44',
  'Men 45-49',
  'Men 45-54',
  'Men 55-64',
  'Men AB',
  'Men AB working full-time',
  'Men ABC1',
  'Men ABC1 16-34',
  'Men ABC1 16-44',
  'Men ABC1 35-54'
];

// Real BARB data from the provided image
const data: { [key: string]: { [key: string]: number } } = {
  'Adults 16-34': {
    'Channel 5': 0.003166, 'ITV HD': 0.000000, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults 18-20': {
    'Channel 5': 0.000000, 'ITV HD': 0.004600, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults 35-44': {
    'Channel 5': 0.005883, 'ITV HD': 0.003930, 'ITV': 0.003286, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults 45-49': {
    'Channel 5': 0.009966, 'ITV HD': 0.003662, 'ITV': 0.007181, 'Drama': 0.003299, 'Sky News': 0.003857, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults 45-54': {
    'Channel 5': 0.011160, 'ITV HD': 0.010770, 'ITV': 0.009088, 'Drama': 0.000000, 'Sky News': 0.006363, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults 55-64': {
    'Channel 5': 0.014960, 'ITV HD': 0.009471, 'ITV': 0.013648, 'Drama': 0.000000, 'Sky News': 0.003243, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults AB': {
    'Channel 5': 0.006954, 'ITV HD': 0.000000, 'ITV': 0.004149, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults ABC1': {
    'Channel 5': 0.008225, 'ITV HD': 0.004323, 'ITV': 0.004813, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults ABC1 35-54': {
    'Channel 5': 0.007075, 'ITV HD': 0.004964, 'ITV': 0.003876, 'Drama': 0.000000, 'Sky News': 0.003920, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults C2': {
    'Channel 5': 0.012418, 'ITV HD': 0.006908, 'ITV': 0.009512, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Adults working full-time': {
    'Channel 5': 0.007776, 'ITV HD': 0.004999, 'ITV': 0.005539, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'All Adults': {
    'Channel 5': 0.010311, 'ITV HD': 0.005966, 'ITV': 0.007384, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'All Homes': {
    'Channel 5': 0.013877, 'ITV HD': 0.009326, 'ITV': 0.011406, 'Drama': 0.000000, 'Sky News': 0.004099, '5USA': 0.003065, 'E4': 0.003255, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'All Houseperson': {
    'Channel 5': 0.012107, 'ITV HD': 0.007464, 'ITV': 0.009635, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'All Men': {
    'Channel 5': 0.009286, 'ITV HD': 0.004066, 'ITV': 0.005163, 'Drama': 0.000000, 'Sky News': 0.003032, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Boys 04-15': {
    'Channel 5': 0.000000, 'ITV HD': 0.003047, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Boys 10-12': {
    'Channel 5': 0.000000, 'ITV HD': 0.012210, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Children 10-12': {
    'Channel 5': 0.003480, 'ITV HD': 0.006656, 'ITV': 0.005187, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson 16-34': {
    'Channel 5': 0.004104, 'ITV HD': 0.000000, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson 16-44': {
    'Channel 5': 0.005428, 'ITV HD': 0.003597, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson 35-54': {
    'Channel 5': 0.009015, 'ITV HD': 0.009700, 'ITV': 0.006624, 'Drama': 0.000000, 'Sky News': 0.004766, '5USA': 0.000000, 'E4': 0.003030, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson ABC1': {
    'Channel 5': 0.009775, 'ITV HD': 0.005413, 'ITV': 0.006295, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson ABC1 16-34': {
    'Channel 5': 0.000000, 'ITV HD': 0.000000, 'ITV': 0.003581, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson with children 0-15': {
    'Channel 5': 0.006861, 'ITV HD': 0.004311, 'ITV': 0.006708, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson with children 0-3': {
    'Channel 5': 0.004072, 'ITV HD': 0.000000, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Houseperson working full-time': {
    'Channel 5': 0.008730, 'ITV HD': 0.006427, 'ITV': 0.007125, 'Drama': 0.000000, 'Sky News': 0.003210, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Individuals AB': {
    'Channel 5': 0.005971, 'ITV HD': 0.000000, 'ITV': 0.003707, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Individuals C1': {
    'Channel 5': 0.008251, 'ITV HD': 0.005172, 'ITV': 0.004616, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Individuals C2': {
    'Channel 5': 0.010638, 'ITV HD': 0.005839, 'ITV': 0.008394, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men 16-34': {
    'Channel 5': 0.003254, 'ITV HD': 0.000000, 'ITV': 0.000000, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men 35-44': {
    'Channel 5': 0.004232, 'ITV HD': 0.000000, 'ITV': 0.003132, 'Drama': 0.000000, 'Sky News': 0.004573, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.003767, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men 45-49': {
    'Channel 5': 0.010858, 'ITV HD': 0.003935, 'ITV': 0.005859, 'Drama': 0.003692, 'Sky News': 0.005083, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.003120, 'Quest': 0.000000
  },
  'Men 45-54': {
    'Channel 5': 0.010568, 'ITV HD': 0.007111, 'ITV': 0.004800, 'Drama': 0.000000, 'Sky News': 0.006815, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men 55-64': {
    'Channel 5': 0.013575, 'ITV HD': 0.005752, 'ITV': 0.009120, 'Drama': 0.000000, 'Sky News': 0.003661, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.003571
  },
  'Men AB': {
    'Channel 5': 0.005933, 'ITV HD': 0.000000, 'ITV': 0.003312, 'Drama': 0.000000, 'Sky News': 0.003531, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men AB working full-time': {
    'Channel 5': 0.004622, 'ITV HD': 0.000000, 'ITV': 0.003045, 'Drama': 0.000000, 'Sky News': 0.003896, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men ABC1': {
    'Channel 5': 0.007108, 'ITV HD': 0.003788, 'ITV': 0.003851, 'Drama': 0.000000, 'Sky News': 0.003609, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men ABC1 16-34': {
    'Channel 5': 0.000000, 'ITV HD': 0.000000, 'ITV': 0.003398, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men ABC1 16-44': {
    'Channel 5': 0.000000, 'ITV HD': 0.000000, 'ITV': 0.003267, 'Drama': 0.000000, 'Sky News': 0.000000, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  },
  'Men ABC1 35-54': {
    'Channel 5': 0.006140, 'ITV HD': 0.003605, 'ITV': 0.003306, 'Drama': 0.000000, 'Sky News': 0.005638, '5USA': 0.000000, 'E4': 0.000000, 'Kerrang': 0.000000, 'Sky History': 0.000000, 'Quest': 0.000000
  }
};

// Function to get color intensity based on value
const getHeatmapColor = (value: number) => {
  // Find the actual maximum value in the data for better color scaling
  let maxValue = 0;
  Object.values(data).forEach(audienceData => {
    Object.values(audienceData).forEach(val => {
      if (val > maxValue) {
        maxValue = val;
      }
    });
  });
  
  if (maxValue === 0) return '#f8f9fa'; // Light grey for zero values
  
  const intensity = Math.min(value / maxValue, 1);
  
  // Create shades of blue from light to dark
  const baseColor = '#02b5e7'; // Our primary blue
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);
  
  // Interpolate between white and our blue
  const newR = Math.round(255 - (255 - r) * intensity);
  const newG = Math.round(255 - (255 - g) * intensity);
  const newB = Math.round(255 - (255 - b) * intensity);
  
  return `rgb(${newR}, ${newG}, ${newB})`;
};

const AudienceStationTab: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 3 }}>
        Audience/Station Heatmap
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 1,
                minWidth: 150,
                width: 150,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                zIndex: 1
              }}>
                Audience
              </TableCell>
              {stations.map((station) => (
                <TableCell 
                  key={station}
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 1,
                    textAlign: 'center',
                    minWidth: 80,
                    width: 80
                  }}
                >
                  {station}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {audiences.map((audience) => (
              <TableRow
                key={audience}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  py: 1,
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  borderRight: '1px solid #e0e0e0',
                  minWidth: 150,
                  width: 150
                }}>
                  {audience}
                </TableCell>
                {stations.map((station) => {
                  const value = data[audience][station];
                  const backgroundColor = getHeatmapColor(value);
                  
                  return (
                    <Tooltip
                      key={station}
                      title={`${value.toFixed(6)}`}
                      placement="top"
                      arrow
                    >
                      <TableCell 
                        sx={{ 
                          fontSize: '11px', 
                          textAlign: 'center', 
                          py: 1,
                          backgroundColor,
                          minWidth: 80,
                          width: 80,
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.8,
                          }
                        }}
                      >
                        {/* Empty cell - value shows on hover */}
                      </TableCell>
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AudienceStationTab;
