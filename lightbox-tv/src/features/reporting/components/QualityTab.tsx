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
  Chip,
  TextField,
  Grid,
} from '@mui/material';

// Mock data based on the Excel spreadsheet
const stationData = [
  // ABC1Ads Audience
  { station: 'Carlton', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'LWT', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Midwest', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'North', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Scot', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Seast', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Ulster', audience: 'ABC1Ads', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  
  // HW+CH Audience
  { station: 'Carlton', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'LWT', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Midwest', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'North', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Scot', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Seast', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Ulster', audience: 'HW+CH', total: '', centres: '', earlyPeak: '', latePeak: '', totalPeak: '0.00%', pibs: '0.00%' },
  
  // Separator
  { station: 'N/A', audience: '', total: 'N/A', centres: 'N/A', earlyPeak: 'N/A', latePeak: 'N/A', totalPeak: 'N/A', pibs: 'N/A' },
  
  // Mixed Audiences
  { station: 'ITV Breakfast', audience: 'HW+CH', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'C4', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'C4 Owned', audience: '1634 Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'C4Owned', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'C4 Sales', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Sky', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'C5 (COA)', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Sky Sports TC', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Sky Sports TB', audience: '1634M', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'Sky Sports TA', audience: '1634M', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'ITV2', audience: 'HW+CH', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'ITV3', audience: 'ABC1Ads', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'ITV4', audience: 'ABC1M', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
  { station: 'ITVBe', audience: 'HW+CH', total: '', centres: '0.00%', earlyPeak: '0.00%', latePeak: '0.00%', totalPeak: '0.00%', pibs: '0.00%' },
];

const QualityTab: React.FC = () => {
  const getAudienceColor = (audience: string) => {
    switch (audience) {
      case 'ABC1Ads':
        return '#e3f2fd';
      case 'HW+CH':
        return '#f3e5f5';
      case '1634 Ads':
      case '1634M':
        return '#e8f5e8';
      case 'ABC1M':
        return '#fff3e0';
      default:
        return '#f5f5f5';
    }
  };

  const isInputField = (station: string, audience: string) => {
    return (station === 'Carlton' || station === 'LWT') && (audience === 'ABC1Ads' || audience === 'HW+CH');
  };

  const isSeparator = (station: string) => {
    return station === 'N/A';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 1 }}>
          Natural delivery for last 12 months?
        </Typography>
      </Box>

      {/* Single Table with Three Data Sections */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} sx={{ 
                backgroundColor: '#f5f5f5', 
                fontWeight: 600, 
                fontSize: '10px', 
                border: '1px solid #e0e0e0', 
                py: 0.5,
                textAlign: 'center',
                verticalAlign: 'middle'
              }}>
                Station
              </TableCell>
              <TableCell rowSpan={2} sx={{ 
                backgroundColor: '#f5f5f5', 
                fontWeight: 600, 
                fontSize: '10px', 
                border: '1px solid #e0e0e0', 
                py: 0.5,
                textAlign: 'center',
                verticalAlign: 'middle'
              }}>
                Audience
              </TableCell>
              <TableCell colSpan={6} sx={{ 
                backgroundColor: '#e91e63', 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '11px', 
                textAlign: 'center',
                border: '1px solid #e0e0e0'
              }}>
                BARB Natural %
              </TableCell>
              <TableCell colSpan={5} sx={{ 
                backgroundColor: '#2196f3', 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '11px', 
                textAlign: 'center',
                border: '1px solid #e0e0e0'
              }}>
                Deal vs Natural (+/- %)
              </TableCell>
              <TableCell colSpan={5} sx={{ 
                backgroundColor: '#4caf50', 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '11px', 
                textAlign: 'center',
                border: '1px solid #e0e0e0'
              }}>
                Manual Deal Targets
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Centres
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Early Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Late Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Total Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                PIBS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Centres
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Early Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Late Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Total Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                PIBS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Centres
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Early Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Late Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                Total Peak
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', border: '1px solid #e0e0e0', py: 0.5 }}>
                PIBS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stationData.map((row, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400
                }}>
                  {isSeparator(row.station) ? (
                    row.station
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: '10px' }}>
                        {row.station}
                      </Typography>
                      {row.audience && (
                        <Chip 
                          label={row.audience} 
                          size="small" 
                          sx={{ 
                            fontSize: '8px', 
                            height: 16,
                            backgroundColor: getAudienceColor(row.audience)
                          }} 
                        />
                      )}
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400
                }}>
                  {isSeparator(row.station) ? row.audience : row.audience}
                </TableCell>
                {/* BARB Natural % columns */}
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.total : row.total}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.centres : (
                    isInputField(row.station, row.audience) ? (
                      <TextField
                        size="small"
                        variant="outlined"
                        value=""
                        sx={{
                          width: '100%',
                          '& .MuiOutlinedInput-root': {
                            fontSize: '10px',
                            height: 24,
                            border: '2px solid #4caf50',
                            '& fieldset': {
                              border: 'none',
                            },
                          },
                        }}
                      />
                    ) : row.centres
                  )}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.earlyPeak : row.earlyPeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.latePeak : row.latePeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.totalPeak : row.totalPeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.pibs : row.pibs}
                </TableCell>
                {/* Deal vs Natural columns */}
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.centres : row.centres}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.earlyPeak : row.earlyPeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.latePeak : row.latePeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.totalPeak : row.totalPeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.pibs : row.pibs}
                </TableCell>
                {/* Manual Deal Targets columns */}
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.centres : row.centres}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.earlyPeak : row.earlyPeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.latePeak : row.latePeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.totalPeak : row.totalPeak}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.pibs : row.pibs}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QualityTab;
