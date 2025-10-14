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
  Chip,
  TextField,
} from '@mui/material';

// Mock data based on the Excel spreadsheet
const stationData = [
  // ABC1Ads Audience
  { station: 'Carlton', audience: 'ABC1Ads', total: '12.5%', centres: '8.2%', earlyPeak: '15.3%', latePeak: '18.7%', totalPeak: '34.0%', pibs: '6.1%' },
  { station: 'LWT', audience: 'ABC1Ads', total: '11.8%', centres: '7.9%', earlyPeak: '14.6%', latePeak: '17.2%', totalPeak: '31.8%', pibs: '5.8%' },
  { station: 'Midwest', audience: 'ABC1Ads', total: '10.3%', centres: '6.7%', earlyPeak: '12.9%', latePeak: '15.4%', totalPeak: '28.3%', pibs: '5.2%' },
  { station: 'North', audience: 'ABC1Ads', total: '9.7%', centres: '6.1%', earlyPeak: '11.8%', latePeak: '14.2%', totalPeak: '26.0%', pibs: '4.9%' },
  { station: 'Scot', audience: 'ABC1Ads', total: '8.9%', centres: '5.6%', earlyPeak: '10.8%', latePeak: '13.1%', totalPeak: '23.9%', pibs: '4.5%' },
  { station: 'Seast', audience: 'ABC1Ads', total: '11.2%', centres: '7.4%', earlyPeak: '13.7%', latePeak: '16.5%', totalPeak: '30.2%', pibs: '5.6%' },
  { station: 'Ulster', audience: 'ABC1Ads', total: '7.8%', centres: '4.9%', earlyPeak: '9.4%', latePeak: '11.3%', totalPeak: '20.7%', pibs: '3.9%' },
  
  // HW+CH Audience
  { station: 'Carlton', audience: 'HW+CH', total: '15.2%', centres: '10.1%', earlyPeak: '18.6%', latePeak: '22.8%', totalPeak: '41.4%', pibs: '7.4%' },
  { station: 'LWT', audience: 'HW+CH', total: '14.6%', centres: '9.7%', earlyPeak: '17.9%', latePeak: '21.5%', totalPeak: '39.4%', pibs: '7.1%' },
  { station: 'Midwest', audience: 'HW+CH', total: '12.8%', centres: '8.5%', earlyPeak: '15.7%', latePeak: '18.9%', totalPeak: '34.6%', pibs: '6.2%' },
  { station: 'North', audience: 'HW+CH', total: '11.9%', centres: '7.9%', earlyPeak: '14.6%', latePeak: '17.5%', totalPeak: '32.1%', pibs: '5.8%' },
  { station: 'Scot', audience: 'HW+CH', total: '10.8%', centres: '7.2%', earlyPeak: '13.2%', latePeak: '15.9%', totalPeak: '29.1%', pibs: '5.2%' },
  { station: 'Seast', audience: 'HW+CH', total: '13.7%', centres: '9.1%', earlyPeak: '16.8%', latePeak: '20.2%', totalPeak: '37.0%', pibs: '6.6%' },
  { station: 'Ulster', audience: 'HW+CH', total: '9.4%', centres: '6.2%', earlyPeak: '11.5%', latePeak: '13.8%', totalPeak: '25.3%', pibs: '4.5%' },
  
  // Separator
  { station: 'N/A', audience: '', total: 'N/A', centres: 'N/A', earlyPeak: 'N/A', latePeak: 'N/A', totalPeak: 'N/A', pibs: 'N/A' },
  
  // Mixed Audiences
  { station: 'ITV Breakfast', audience: 'HW+CH', total: '8.3%', centres: '5.5%', earlyPeak: '10.2%', latePeak: '12.3%', totalPeak: '22.5%', pibs: '4.0%' },
  { station: 'C4', audience: 'ABC1Ads', total: '6.7%', centres: '4.4%', earlyPeak: '8.2%', latePeak: '9.9%', totalPeak: '18.1%', pibs: '3.2%' },
  { station: 'C4 Owned', audience: '1634 Ads', total: '5.9%', centres: '3.9%', earlyPeak: '7.2%', latePeak: '8.7%', totalPeak: '15.9%', pibs: '2.8%' },
  { station: 'C4Owned', audience: 'ABC1Ads', total: '7.1%', centres: '4.7%', earlyPeak: '8.7%', latePeak: '10.5%', totalPeak: '19.2%', pibs: '3.4%' },
  { station: 'C4 Sales', audience: 'ABC1Ads', total: '6.2%', centres: '4.1%', earlyPeak: '7.6%', latePeak: '9.2%', totalPeak: '16.8%', pibs: '3.0%' },
  { station: 'Sky', audience: 'ABC1Ads', total: '4.8%', centres: '3.2%', earlyPeak: '5.9%', latePeak: '7.1%', totalPeak: '13.0%', pibs: '2.3%' },
  { station: 'C5 (COA)', audience: 'ABC1Ads', total: '5.4%', centres: '3.6%', earlyPeak: '6.6%', latePeak: '8.0%', totalPeak: '14.6%', pibs: '2.6%' },
  { station: 'Sky Sports TC', audience: 'ABC1Ads', total: '3.7%', centres: '2.5%', earlyPeak: '4.5%', latePeak: '5.4%', totalPeak: '9.9%', pibs: '1.8%' },
  { station: 'Sky Sports TB', audience: '1634M', total: '3.2%', centres: '2.1%', earlyPeak: '3.9%', latePeak: '4.7%', totalPeak: '8.6%', pibs: '1.5%' },
  { station: 'Sky Sports TA', audience: '1634M', total: '2.9%', centres: '1.9%', earlyPeak: '3.5%', latePeak: '4.2%', totalPeak: '7.7%', pibs: '1.4%' },
  { station: 'ITV2', audience: 'HW+CH', total: '4.1%', centres: '2.7%', earlyPeak: '5.0%', latePeak: '6.0%', totalPeak: '11.0%', pibs: '2.0%' },
  { station: 'ITV3', audience: 'ABC1Ads', total: '3.8%', centres: '2.5%', earlyPeak: '4.6%', latePeak: '5.6%', totalPeak: '10.2%', pibs: '1.8%' },
  { station: 'ITV4', audience: 'ABC1M', total: '2.6%', centres: '1.7%', earlyPeak: '3.2%', latePeak: '3.8%', totalPeak: '7.0%', pibs: '1.2%' },
  { station: 'ITVBe', audience: 'HW+CH', total: '3.5%', centres: '2.3%', earlyPeak: '4.3%', latePeak: '5.2%', totalPeak: '9.5%', pibs: '1.7%' },
];

const QualityTab: React.FC = () => {
  // State for manual deal targets
  const [manualTargets, setManualTargets] = useState<{ [key: string]: { [key: string]: number } }>({});

  const getAudienceColor = (audience: string) => {
    switch (audience) {
      case 'ABC1Ads':
        return '#e3f2fd';
      case 'HW+CH':
        return '#e8f4fd';
      case '1634 Ads':
      case '1634M':
        return '#f0f8ff';
      case 'ABC1M':
        return '#e6f3ff';
      default:
        return '#f5f5f5';
    }
  };


  const isSeparator = (station: string) => {
    return station === 'N/A';
  };

  // Parse percentage string to number
  const parsePercentage = (value: string): number => {
    if (value === 'N/A' || value === '') return 0;
    return parseFloat(value.replace('%', '')) || 0;
  };

  // Calculate difference between manual target and BARB natural
  const calculateDifference = (barbValue: string, manualValue: number): string => {
    const barb = parsePercentage(barbValue);
    const diff = manualValue - barb;
    return diff >= 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
  };

  // Handle manual target input change
  const handleManualTargetChange = (station: string, audience: string, field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setManualTargets(prev => ({
      ...prev,
      [`${station}-${audience}`]: {
        ...prev[`${station}-${audience}`],
        [field]: numValue
      }
    }));
  };

  // Get manual target value
  const getManualTarget = (station: string, audience: string, field: string): number => {
    return manualTargets[`${station}-${audience}`]?.[field] || 0;
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
                backgroundColor: '#02b5e7', 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '11px', 
                textAlign: 'center',
                border: '1px solid #e0e0e0'
              }}>
                BARB Natural %
              </TableCell>
              <TableCell colSpan={5} sx={{ 
                backgroundColor: '#1a5f7a', 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '11px', 
                textAlign: 'center',
                border: '1px solid #e0e0e0'
              }}>
                Deal vs Natural (+/- %)
              </TableCell>
              <TableCell colSpan={5} sx={{ 
                backgroundColor: '#6c757d', 
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
                {/* Deal vs Natural columns - calculated differences */}
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : '#f8f9fa',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right',
                  color: isSeparator(row.station) ? 'inherit' : 
                    (parsePercentage(calculateDifference(row.centres, getManualTarget(row.station, row.audience, 'centres'))) >= 0 ? '#4caf50' : '#f44336')
                }}>
                  {isSeparator(row.station) ? row.centres : calculateDifference(row.centres, getManualTarget(row.station, row.audience, 'centres'))}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : '#f8f9fa',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right',
                  color: isSeparator(row.station) ? 'inherit' : 
                    (parsePercentage(calculateDifference(row.earlyPeak, getManualTarget(row.station, row.audience, 'earlyPeak'))) >= 0 ? '#4caf50' : '#f44336')
                }}>
                  {isSeparator(row.station) ? row.earlyPeak : calculateDifference(row.earlyPeak, getManualTarget(row.station, row.audience, 'earlyPeak'))}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : '#f8f9fa',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right',
                  color: isSeparator(row.station) ? 'inherit' : 
                    (parsePercentage(calculateDifference(row.latePeak, getManualTarget(row.station, row.audience, 'latePeak'))) >= 0 ? '#4caf50' : '#f44336')
                }}>
                  {isSeparator(row.station) ? row.latePeak : calculateDifference(row.latePeak, getManualTarget(row.station, row.audience, 'latePeak'))}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : '#f8f9fa',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right',
                  color: isSeparator(row.station) ? 'inherit' : 
                    (parsePercentage(calculateDifference(row.totalPeak, getManualTarget(row.station, row.audience, 'totalPeak'))) >= 0 ? '#4caf50' : '#f44336')
                }}>
                  {isSeparator(row.station) ? row.totalPeak : calculateDifference(row.totalPeak, getManualTarget(row.station, row.audience, 'totalPeak'))}
                </TableCell>
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : '#f8f9fa',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right',
                  color: isSeparator(row.station) ? 'inherit' : 
                    (parsePercentage(calculateDifference(row.pibs, getManualTarget(row.station, row.audience, 'pibs'))) >= 0 ? '#4caf50' : '#f44336')
                }}>
                  {isSeparator(row.station) ? row.pibs : calculateDifference(row.pibs, getManualTarget(row.station, row.audience, 'pibs'))}
                </TableCell>
                {/* Manual Deal Targets columns - input fields */}
                <TableCell sx={{ 
                  border: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px',
                  backgroundColor: isSeparator(row.station) ? '#f0f0f0' : 'white',
                  fontWeight: isSeparator(row.station) ? 600 : 400,
                  textAlign: 'right'
                }}>
                  {isSeparator(row.station) ? row.centres : (
                    <TextField
                      type="text"
                      size="small"
                      variant="standard"
                      value={getManualTarget(row.station, row.audience, 'centres')}
                      onChange={(e) => handleManualTargetChange(row.station, row.audience, 'centres', e.target.value)}
                      sx={{
                        width: '100%',
                        '& .MuiInput-root': {
                          fontSize: '10px',
                          '&:before': {
                            borderBottom: '1px solid #e0e0e0',
                          },
                          '&:hover:not(.Mui-disabled):before': {
                            borderBottom: '1px solid #6c757d',
                          },
                          '&:after': {
                            borderBottom: '1px solid #6c757d',
                          },
                        },
                      }}
                    />
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
                  {isSeparator(row.station) ? row.earlyPeak : (
                    <TextField
                      type="text"
                      size="small"
                      variant="standard"
                      value={getManualTarget(row.station, row.audience, 'earlyPeak')}
                      onChange={(e) => handleManualTargetChange(row.station, row.audience, 'earlyPeak', e.target.value)}
                      sx={{
                        width: '100%',
                        '& .MuiInput-root': {
                          fontSize: '10px',
                          '&:before': {
                            borderBottom: '1px solid #e0e0e0',
                          },
                          '&:hover:not(.Mui-disabled):before': {
                            borderBottom: '1px solid #6c757d',
                          },
                          '&:after': {
                            borderBottom: '1px solid #6c757d',
                          },
                        },
                      }}
                    />
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
                  {isSeparator(row.station) ? row.latePeak : (
                    <TextField
                      type="text"
                      size="small"
                      variant="standard"
                      value={getManualTarget(row.station, row.audience, 'latePeak')}
                      onChange={(e) => handleManualTargetChange(row.station, row.audience, 'latePeak', e.target.value)}
                      sx={{
                        width: '100%',
                        '& .MuiInput-root': {
                          fontSize: '10px',
                          '&:before': {
                            borderBottom: '1px solid #e0e0e0',
                          },
                          '&:hover:not(.Mui-disabled):before': {
                            borderBottom: '1px solid #6c757d',
                          },
                          '&:after': {
                            borderBottom: '1px solid #6c757d',
                          },
                        },
                      }}
                    />
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
                  {isSeparator(row.station) ? row.totalPeak : (
                    <TextField
                      type="text"
                      size="small"
                      variant="standard"
                      value={getManualTarget(row.station, row.audience, 'totalPeak')}
                      onChange={(e) => handleManualTargetChange(row.station, row.audience, 'totalPeak', e.target.value)}
                      sx={{
                        width: '100%',
                        '& .MuiInput-root': {
                          fontSize: '10px',
                          '&:before': {
                            borderBottom: '1px solid #e0e0e0',
                          },
                          '&:hover:not(.Mui-disabled):before': {
                            borderBottom: '1px solid #6c757d',
                          },
                          '&:after': {
                            borderBottom: '1px solid #6c757d',
                          },
                        },
                      }}
                    />
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
                  {isSeparator(row.station) ? row.pibs : (
                    <TextField
                      type="text"
                      size="small"
                      variant="standard"
                      value={getManualTarget(row.station, row.audience, 'pibs')}
                      onChange={(e) => handleManualTargetChange(row.station, row.audience, 'pibs', e.target.value)}
                      sx={{
                        width: '100%',
                        '& .MuiInput-root': {
                          fontSize: '10px',
                          '&:before': {
                            borderBottom: '1px solid #e0e0e0',
                          },
                          '&:hover:not(.Mui-disabled):before': {
                            borderBottom: '1px solid #6c757d',
                          },
                          '&:after': {
                            borderBottom: '1px solid #6c757d',
                          },
                        },
                      }}
                    />
                  )}
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
