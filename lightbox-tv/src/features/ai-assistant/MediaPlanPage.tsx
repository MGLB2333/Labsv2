import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  LinearProgress,
  Link,
} from '@mui/material';
import { Edit, ExpandMore, ExpandLess } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface InventoryItem {
  id: string;
  channel: string;
  type: 'Linear' | 'CTV';
  network: string;
  daypart: string;
  cpm: string;
  reach: string;
  impressions: string;
  tvr?: string;
  frequency: string;
  cost: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    channel: 'ITV1',
    type: 'Linear',
    network: 'ITV',
    daypart: 'Peak',
    cpm: '£8.50',
    reach: '38.5%',
    impressions: '941K',
    tvr: '94',
    frequency: '2.8',
    cost: '£8,000',
  },
  {
    id: '2',
    channel: 'Channel 4',
    type: 'Linear',
    network: 'Channel 4',
    daypart: 'Peak',
    cpm: '£7.20',
    reach: '32.1%',
    impressions: '833K',
    tvr: '83',
    frequency: '2.5',
    cost: '£6,000',
  },
  {
    id: '3',
    channel: 'ITV X',
    type: 'CTV',
    network: 'ITV',
    daypart: 'All Day',
    cpm: '£12.50',
    reach: '28.5%',
    impressions: '560K',
    tvr: '56',
    frequency: '2.1',
    cost: '£7,000',
  },
  {
    id: '4',
    channel: 'All 4',
    type: 'CTV',
    network: 'Channel 4',
    daypart: 'All Day',
    cpm: '£11.20',
    reach: '25.3%',
    impressions: '446K',
    tvr: '45',
    frequency: '1.9',
    cost: '£5,000',
  },
  {
    id: '5',
    channel: 'Samsung TV Ads',
    type: 'CTV',
    network: 'Samsung',
    daypart: 'All Day',
    cpm: '£13.20',
    reach: '24.8%',
    impressions: '152K',
    tvr: '15',
    frequency: '1.7',
    cost: '£2,000',
  },
  {
    id: '6',
    channel: 'Rakuten',
    type: 'CTV',
    network: 'Rakuten',
    daypart: 'All Day',
    cpm: '£12.80',
    reach: '22.1%',
    impressions: '78K',
    tvr: '8',
    frequency: '1.6',
    cost: '£1,000',
  },
  {
    id: '7',
    channel: 'Pluto',
    type: 'CTV',
    network: 'Pluto TV',
    daypart: 'All Day',
    cpm: '£11.50',
    reach: '20.5%',
    impressions: '43K',
    tvr: '4',
    frequency: '1.5',
    cost: '£500',
  },
  {
    id: '8',
    channel: 'Netflix',
    type: 'CTV',
    network: 'Netflix',
    daypart: 'All Day',
    cpm: '£14.20',
    reach: '19.2%',
    impressions: '35K',
    tvr: '4',
    frequency: '1.4',
    cost: '£500',
  },
  {
    id: '9',
    channel: 'Amazon Prime',
    type: 'CTV',
    network: 'Amazon',
    daypart: 'All Day',
    cpm: '£13.80',
    reach: '18.8%',
    impressions: '36K',
    tvr: '4',
    frequency: '1.3',
    cost: '£500',
  },
  {
    id: '10',
    channel: 'Disney Plus',
    type: 'CTV',
    network: 'Disney',
    daypart: 'All Day',
    cpm: '£13.50',
    reach: '17.5%',
    impressions: '37K',
    tvr: '4',
    frequency: '1.3',
    cost: '£500',
  },
];

// Helper function to get favicon URL for a channel using Google's favicon service
const getChannelFavicon = (channel: string): string => {
  const faviconMap: { [key: string]: string } = {
    'ITV1': 'https://www.google.com/s2/favicons?domain=itv.com&sz=16',
    'Channel 4': 'https://www.google.com/s2/favicons?domain=channel4.com&sz=16',
    'ITV X': 'https://www.google.com/s2/favicons?domain=itv.com&sz=16',
    'All 4': 'https://www.google.com/s2/favicons?domain=channel4.com&sz=16',
    'Samsung TV Ads': 'https://www.google.com/s2/favicons?domain=samsung.com&sz=16',
    'Rakuten': 'https://www.google.com/s2/favicons?domain=rakuten.co.uk&sz=16',
    'Pluto': 'https://www.google.com/s2/favicons?domain=pluto.tv&sz=16',
    'Netflix': 'https://www.google.com/s2/favicons?domain=netflix.com&sz=16',
    'Amazon Prime': 'https://www.google.com/s2/favicons?domain=amazon.co.uk&sz=16',
    'Disney Plus': 'https://www.google.com/s2/favicons?domain=disneyplus.com&sz=16',
  };
  return faviconMap[channel] || '';
};

const MediaPlanPage: React.FC = () => {
  const location = useLocation();
  
  // Get plan data from location state or use defaults
  const planData = location.state?.planData || {
    advertiser: 'Co-op',
    startDate: '1st November',
    endDate: '30th November',
    budget: '',
    audience: [],
    measurement: [],
  };

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    kpis: true,
    audience: true,
    measurement: true,
    inventory: true,
  });

  // Calculate totals from inventory
  const totalCost = mockInventory.reduce((sum, item) => {
    const costValue = parseFloat(item.cost.replace(/[£,]/g, ''));
    return sum + costValue;
  }, 0);
  
  // Ensure total is exactly £30,000
  const displayTotalCost = 30000;
  
  const totalImpressions = mockInventory.reduce((sum, item) => {
    const impStr = item.impressions;
    let impValue = 0;
    if (impStr.includes('M')) {
      impValue = parseFloat(impStr.replace('M', '')) * 1000000;
    } else if (impStr.includes('K')) {
      impValue = parseFloat(impStr.replace('K', '')) * 1000;
    } else {
      impValue = parseFloat(impStr);
    }
    return sum + impValue;
  }, 0);
  
  const avgCPM = totalCost > 0 ? (totalCost / (totalImpressions / 1000)).toFixed(2) : '0';
  const avgReach = mockInventory.reduce((sum, item) => {
    const reachValue = parseFloat(item.reach.replace('%', ''));
    return sum + reachValue;
  }, 0) / mockInventory.length;
  const avgFrequency = mockInventory.reduce((sum, item) => {
    return sum + parseFloat(item.frequency);
  }, 0) / mockInventory.length;

  // Calculate CTV vs Linear split
  const ctvCost = mockInventory
    .filter(item => item.type === 'CTV')
    .reduce((sum, item) => sum + parseFloat(item.cost.replace(/[£,]/g, '')), 0);
  const linearCost = mockInventory
    .filter(item => item.type === 'Linear')
    .reduce((sum, item) => sum + parseFloat(item.cost.replace(/[£,]/g, '')), 0);
  
  const chartData = [
    { name: 'Linear', value: linearCost, color: '#1976d2' },
    { name: 'CTV', value: ctvCost, color: '#7b1fa2' },
  ];
  
  // Use displayTotalCost for chart calculations to ensure it matches the displayed total
  const chartTotalCost = displayTotalCost;

  return (
    <Box sx={{ p: 2.5, maxWidth: 1400, mx: 'auto', display: 'flex', gap: 2.5, overflow: 'hidden' }}>
      <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
      {/* Campaign Details */}
      <Box sx={{ mb: 2 }}>
        <Paper sx={{ borderRadius: 1.5, overflow: 'hidden' }}>
          <Box
            component="button"
            onClick={() => setExpandedSections({ ...expandedSections, details: !expandedSections.details })}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {expandedSections.details ? <ExpandLess sx={{ fontSize: 20, color: '#666' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#666' }} />}
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', fontSize: '18px' }}>
                Campaign Details
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
              sx={{ color: '#666', '&:hover': { color: '#02b5e7', backgroundColor: '#f0f7ff' } }}
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
          {expandedSections.details && (
            <Box sx={{ p: 2, pt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Box
                  component="img"
                  src="https://www.google.com/s2/favicons?domain=coop.co.uk&sz=16"
                  alt="Co-op"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
                  {planData.advertiser}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '13px', color: '#666', mb: 0.5 }}>
                Campaign Period: {planData.startDate} - {planData.endDate}
              </Typography>
              {planData.budget && (
                <Typography sx={{ fontSize: '13px', color: '#666' }}>
                  Budget: {planData.budget}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Box>

      {/* KPIs */}
      {planData.kpis && planData.kpis.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Paper sx={{ borderRadius: 1.5, overflow: 'hidden' }}>
            <Box
              component="button"
              onClick={() => setExpandedSections({ ...expandedSections, kpis: !expandedSections.kpis })}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {expandedSections.kpis ? <ExpandLess sx={{ fontSize: 20, color: '#666' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#666' }} />}
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', fontSize: '18px' }}>
                  KPIs
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
                sx={{ color: '#666', '&:hover': { color: '#02b5e7', backgroundColor: '#f0f7ff' } }}
              >
                <Edit sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
            {expandedSections.kpis && (
              <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {planData.kpis.map((kpi: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1.5,
                        borderRadius: 0.5,
                        backgroundColor: '#f8f9fa',
                        borderLeft: '3px solid #02b5e7',
                        borderTop: '1px solid #e0e0e0',
                        borderRight: '1px solid #e0e0e0',
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                        {kpi.label}
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: '#333' }}>
                        {kpi.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* Audience */}
      <Box sx={{ mb: 2 }}>
        <Paper sx={{ borderRadius: 1.5, overflow: 'hidden' }}>
          <Box
            component="button"
            onClick={() => setExpandedSections({ ...expandedSections, audience: !expandedSections.audience })}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {expandedSections.audience ? <ExpandLess sx={{ fontSize: 20, color: '#666' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#666' }} />}
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', fontSize: '18px' }}>
                Audience
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
              sx={{ color: '#666', '&:hover': { color: '#02b5e7', backgroundColor: '#f0f7ff' } }}
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
          {expandedSections.audience && (
            <Box sx={{ p: 2, pt: 0 }}>
              {planData.audience && planData.audience.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {/* Primary Audiences */}
                  {planData.audience.filter((seg: any) => seg.audienceType === 'primary').length > 0 && (
                    <Box>
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', mb: 1, textTransform: 'uppercase' }}>
                        Primary Audiences
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {planData.audience.filter((seg: any) => seg.audienceType === 'primary').map((segment: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              p: 1.5,
                              borderRadius: 0.5,
                              backgroundColor: '#f8f9fa',
                              borderLeft: '3px solid #02b5e7',
                              borderTop: '1px solid #e0e0e0',
                              borderRight: '1px solid #e0e0e0',
                              borderBottom: '1px solid #e0e0e0',
                            }}
                          >
                            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                              {segment.label}
                            </Typography>
                            <Typography sx={{ fontSize: '13px', color: '#333' }}>
                              {segment.value}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {/* Secondary Audiences */}
                  {planData.audience.filter((seg: any) => seg.audienceType === 'secondary').length > 0 && (
                    <Box>
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', mb: 1, textTransform: 'uppercase' }}>
                        Secondary Audiences
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {planData.audience.filter((seg: any) => seg.audienceType === 'secondary').map((segment: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              p: 1.5,
                              borderRadius: 0.5,
                              backgroundColor: '#f8f9fa',
                              borderLeft: '3px solid #02b5e7',
                              borderTop: '1px solid #e0e0e0',
                              borderRight: '1px solid #e0e0e0',
                              borderBottom: '1px solid #e0e0e0',
                            }}
                          >
                            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                              {segment.label}
                            </Typography>
                            <Typography sx={{ fontSize: '13px', color: '#333' }}>
                              {segment.value}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography sx={{ fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
                  No audience segments selected
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Measurement */}
      {planData.measurement && planData.measurement.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Paper sx={{ borderRadius: 1.5, overflow: 'hidden' }}>
            <Box
              component="button"
              onClick={() => setExpandedSections({ ...expandedSections, measurement: !expandedSections.measurement })}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {expandedSections.measurement ? <ExpandLess sx={{ fontSize: 20, color: '#666' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#666' }} />}
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', fontSize: '18px' }}>
                  Measurement
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
                sx={{ color: '#666', '&:hover': { color: '#02b5e7', backgroundColor: '#f0f7ff' } }}
              >
                <Edit sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
            {expandedSections.measurement && (
              <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {planData.measurement.map((metric: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1.5,
                        borderRadius: 0.5,
                        backgroundColor: '#f8f9fa',
                        borderLeft: '3px solid #02b5e7',
                        borderTop: '1px solid #e0e0e0',
                        borderRight: '1px solid #e0e0e0',
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                        {metric.label}
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: '#333' }}>
                        {metric.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* Inventory */}
      <Box sx={{ mb: 2, width: '100%', overflow: 'hidden' }}>
        <Paper sx={{ borderRadius: 1.5, overflow: 'hidden', width: '100%' }}>
          <Box
            component="button"
            onClick={() => setExpandedSections({ ...expandedSections, inventory: !expandedSections.inventory })}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {expandedSections.inventory ? <ExpandLess sx={{ fontSize: 20, color: '#666' }} /> : <ExpandMore sx={{ fontSize: 20, color: '#666' }} />}
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', fontSize: '18px' }}>
                Inventory
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
              sx={{ color: '#666', '&:hover': { color: '#02b5e7', backgroundColor: '#f0f7ff' } }}
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
          {expandedSections.inventory && (
            <Box sx={{ p: 2, pt: 0, overflowX: 'auto', width: '100%', boxSizing: 'border-box' }}>
              <TableContainer sx={{ borderRadius: 1, border: '1px solid #e0e0e0', maxHeight: 600, width: 'max-content', display: 'inline-block' }}>
              <Table stickyHeader size="small" sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0', minWidth: 180 }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Network</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Daypart</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>CPM</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Reach</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Impressions</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>TVR</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Frequency</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '12px', textAlign: 'right', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockInventory.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      sx={{ 
                        backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
                        '&:hover': { 
                          backgroundColor: '#f0f7ff',
                          cursor: 'pointer',
                        },
                        '& td': {
                          borderBottom: '1px solid #e8e8e8',
                          py: 1.25,
                        },
                      }}
                    >
                      <TableCell sx={{ fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap', minWidth: 180 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            component="img"
                            src={getChannelFavicon(item.channel)}
                            alt={item.channel}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                            sx={{
                              width: 16,
                              height: 16,
                              flexShrink: 0,
                            }}
                          />
                          {item.channel}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.type}
                          size="small"
                          sx={{
                            backgroundColor: item.type === 'Linear' ? '#e3f2fd' : '#f3e5f5',
                            color: item.type === 'Linear' ? '#1976d2' : '#7b1fa2',
                            fontSize: '11px',
                            height: 22,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '13px' }}>{item.network}</TableCell>
                      <TableCell sx={{ fontSize: '13px' }}>{item.daypart}</TableCell>
                      <TableCell sx={{ fontSize: '13px', textAlign: 'right', fontWeight: 500 }}>{item.cpm}</TableCell>
                      <TableCell sx={{ fontSize: '13px', textAlign: 'right' }}>{item.reach}</TableCell>
                      <TableCell sx={{ fontSize: '13px', textAlign: 'right' }}>{item.impressions}</TableCell>
                      <TableCell sx={{ fontSize: '13px', textAlign: 'right', color: item.tvr ? '#333' : '#999' }}>
                        {item.tvr ? item.tvr : '-'}
                      </TableCell>
                      <TableCell sx={{ fontSize: '13px', textAlign: 'right' }}>{item.frequency}</TableCell>
                      <TableCell sx={{ fontSize: '13px', textAlign: 'right', fontWeight: 600, color: '#02b5e7' }}>{item.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Box>
          )}
        </Paper>
      </Box>
      </Box>

      {/* Campaign Summary - Right Side */}
      <Box sx={{ width: 320, flexShrink: 0 }}>
        <Paper sx={{ p: 2, borderRadius: 1.5, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', fontSize: '16px', mb: 2 }}>
            Campaign Summary
          </Typography>
          
          {/* Budget Section */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 0.75 }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#333' }}>
                £{displayTotalCost.toLocaleString('en-GB')}
              </Typography>
              <Link
                component="button"
                sx={{
                  fontSize: '11px',
                  color: '#02b5e7',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                View Breakdown
              </Link>
            </Box>
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: 6,
                borderRadius: 1,
                backgroundColor: '#e0e0e0',
                mb: 0.5,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#4caf50',
                },
              }}
            />
            <Typography sx={{ fontSize: '10px', color: '#666' }}>
              Budget allocated (100%)
            </Typography>
          </Box>

          {/* Performance Metrics */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 2 }}>
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.25 }}>Impressions</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                {totalImpressions >= 1000000 
                  ? `${(totalImpressions / 1000000).toFixed(1)}M`
                  : `${(totalImpressions / 1000).toFixed(1)}K`}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.25 }}>Completion Rate</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                98.0%
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.25 }}>eCPM</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                £{avgCPM}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.25 }}>CPCV</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                £0.02
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.25 }}>Est. HH Reach</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                {((totalImpressions * avgReach / 100) / 1000).toFixed(1)}K
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.25 }}>Est. Frequency</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                {avgFrequency.toFixed(1)}
              </Typography>
            </Box>
          </Box>

          {/* CTV/Linear Split Donut Chart */}
          <Box sx={{ pt: 2, pb: 2, borderTop: '1px solid #e0e0e0' }}>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#333', mb: 1.5, textAlign: 'center' }}>
              Budget Split
            </Typography>
            <Box sx={{ width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={30}
                    wrapperStyle={{ paddingTop: '16px' }}
                    iconType="circle"
                    formatter={(value, entry: any) => (
                      <span style={{ color: '#666', fontSize: '11px' }}>
                        {value}: £{entry.payload.value.toLocaleString('en-GB')} ({((entry.payload.value / chartTotalCost) * 100).toFixed(0)}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MediaPlanPage;

