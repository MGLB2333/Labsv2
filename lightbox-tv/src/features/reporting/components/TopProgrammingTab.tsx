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
  TextField,
  Chip,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
} from '@mui/material';
import { Search, TrendingUp, Visibility, Schedule, Star, TrendingDown } from '@mui/icons-material';

// Mock data for top programming
const programmingData = [
  {
    id: 1,
    programme: 'Coronation Street',
    station: 'ITV',
    audience: 'Adults 16-34',
    rating: 8.4,
    share: 35.2,
    reach: 12.8,
    frequency: 2.7,
    trend: 'up',
    trendValue: 0.8,
    category: 'Soap',
    peakTime: true,
    rising: false,
    underRadar: false,
  },
  {
    id: 2,
    programme: 'Love Island',
    station: 'ITV2',
    audience: 'Adults 16-34',
    rating: 7.9,
    share: 28.6,
    reach: 15.2,
    frequency: 2.1,
    trend: 'up',
    trendValue: 1.2,
    category: 'Reality',
    peakTime: true,
    rising: true,
    underRadar: false,
  },
  {
    id: 3,
    programme: 'The Great British Bake Off',
    station: 'Channel 4',
    audience: 'Adults 35-54',
    rating: 9.1,
    share: 42.3,
    reach: 18.7,
    frequency: 2.3,
    trend: 'up',
    trendValue: 0.5,
    category: 'Reality',
    peakTime: true,
    rising: false,
    underRadar: false,
  },
  {
    id: 4,
    programme: 'Line of Duty',
    station: 'BBC One',
    audience: 'Adults 35-54',
    rating: 8.7,
    share: 38.9,
    reach: 16.4,
    frequency: 2.5,
    trend: 'down',
    trendValue: -0.3,
    category: 'Drama',
    peakTime: true,
    rising: false,
    underRadar: false,
  },
  {
    id: 5,
    programme: 'Gogglebox',
    station: 'Channel 4',
    audience: 'Adults 25-44',
    rating: 7.2,
    share: 24.1,
    reach: 11.3,
    frequency: 2.0,
    trend: 'up',
    trendValue: 0.9,
    category: 'Entertainment',
    peakTime: true,
    rising: true,
    underRadar: false,
  },
  {
    id: 6,
    programme: 'The Crown',
    station: 'Netflix',
    audience: 'Adults 25-54',
    rating: 8.9,
    share: 31.7,
    reach: 14.6,
    frequency: 2.8,
    trend: 'up',
    trendValue: 0.4,
    category: 'Drama',
    peakTime: false,
    rising: false,
    underRadar: false,
  },
  {
    id: 7,
    programme: 'Taskmaster',
    station: 'Channel 4',
    audience: 'Adults 16-34',
    rating: 6.8,
    share: 19.4,
    reach: 8.9,
    frequency: 2.1,
    trend: 'up',
    trendValue: 1.5,
    category: 'Comedy',
    peakTime: false,
    rising: true,
    underRadar: true,
  },
  {
    id: 8,
    programme: 'Strictly Come Dancing',
    station: 'BBC One',
    audience: 'Adults 35-64',
    rating: 9.3,
    share: 45.6,
    reach: 21.2,
    frequency: 2.1,
    trend: 'up',
    trendValue: 0.2,
    category: 'Entertainment',
    peakTime: true,
    rising: false,
    underRadar: false,
  },
  {
    id: 9,
    programme: 'I\'m a Celebrity...',
    station: 'ITV',
    audience: 'Adults 16-54',
    rating: 8.6,
    share: 39.8,
    reach: 17.3,
    frequency: 2.2,
    trend: 'down',
    trendValue: -0.7,
    category: 'Reality',
    peakTime: true,
    rising: false,
    underRadar: false,
  },
  {
    id: 10,
    programme: 'The Repair Shop',
    station: 'BBC Two',
    audience: 'Adults 45-64',
    rating: 7.4,
    share: 26.3,
    reach: 9.7,
    frequency: 2.7,
    trend: 'up',
    trendValue: 0.6,
    category: 'Lifestyle',
    peakTime: false,
    rising: true,
    underRadar: true,
  },
];

const TopProgrammingTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState('All');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [viewMode, setViewMode] = useState('all');
  const [sortBy] = useState('rating');

  const stations = ['All', 'ITV', 'BBC One', 'BBC Two', 'Channel 4', 'Channel 5', 'ITV2', 'Sky One', 'Netflix'];
  const audiences = ['All', 'Adults 16-34', 'Adults 25-44', 'Adults 35-54', 'Adults 45-64', 'Adults 16-54', 'Adults 25-54'];

  const filteredData = programmingData.filter(programme => {
    const matchesSearch = programme.programme.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         programme.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStation = selectedStation === 'All' || programme.station === selectedStation;
    const matchesAudience = selectedAudience === 'All' || programme.audience === selectedAudience;
    
    let matchesView = true;
    if (viewMode === 'rising') matchesView = programme.rising;
    if (viewMode === 'underRadar') matchesView = programme.underRadar;
    if (viewMode === 'peakTime') matchesView = programme.peakTime;
    
    return matchesSearch && matchesStation && matchesAudience && matchesView;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'share':
        return b.share - a.share;
      case 'reach':
        return b.reach - a.reach;
      case 'trend':
        return b.trendValue - a.trendValue;
      default:
        return 0;
    }
  });

  const formatNumber = (num: number, decimals = 1) => {
    return num.toFixed(decimals);
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp sx={{ fontSize: '14px' }} /> : <TrendingDown sx={{ fontSize: '14px' }} />;
  };

  const getTrendColor = (trend: string, _value: number) => {
    if (trend === 'up') return '#4caf50';
    return '#f44336';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 1 }}>
          Top Programming
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#666', mb: 3 }}>
          Discover top performing shows, rising programmes, and under-the-radar opportunities
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search programmes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: '18px', color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          {stations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </TextField>
        <TextField
          select
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {audiences.map((audience) => (
            <option key={audience} value={audience}>
              {audience}
            </option>
          ))}
        </TextField>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_e, newValue) => newValue && setViewMode(newValue)}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="rising">Rising</ToggleButton>
          <ToggleButton value="underRadar">Under Radar</ToggleButton>
          <ToggleButton value="peakTime">Peak Time</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2, 
        mb: 3 
      }}>
        <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Star sx={{ fontSize: '20px', color: '#ff9800', mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                Top Rated Show
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 0.5 }}>
              Strictly Come Dancing
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
              9.3/10 rating
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ fontSize: '20px', color: '#4caf50', mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                Rising Shows
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
              4
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
              programmes trending up
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Visibility sx={{ fontSize: '20px', color: '#02b5e7', mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                Highest Share
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 0.5 }}>
              Strictly Come Dancing
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
              45.6% share
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Schedule sx={{ fontSize: '20px', color: '#9c27b0', mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                Under Radar
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
              2
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
              hidden opportunities
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Programming Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Programme
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Station
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Audience
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Rating
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Share %
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Reach %
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Frequency
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Trend
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((programme) => (
              <TableRow
                key={programme.id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '12px', py: 1, fontWeight: 500 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {programme.programme}
                    </Typography>
                    <Chip
                      label={programme.category}
                      size="small"
                      sx={{
                        fontSize: '9px',
                        height: 18,
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        mt: 0.5,
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1 }}>
                  {programme.station}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1 }}>
                  {programme.audience}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                    {formatNumber(programme.rating)}/10
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                    {formatNumber(programme.share)}%
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                    {formatNumber(programme.reach)}%
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                    {formatNumber(programme.frequency)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    {getTrendIcon(programme.trend)}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '12px',
                        color: getTrendColor(programme.trend, programme.trendValue),
                        fontWeight: 500,
                      }}
                    >
                      {programme.trendValue >= 0 ? '+' : ''}{formatNumber(programme.trendValue)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {programme.rising && (
                      <Chip
                        label="Rising"
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#e8f5e8',
                          color: '#2e7d32',
                        }}
                      />
                    )}
                    {programme.underRadar && (
                      <Chip
                        label="Under Radar"
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#fff3e0',
                          color: '#f57c00',
                        }}
                      />
                    )}
                    {programme.peakTime && (
                      <Chip
                        label="Peak Time"
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#f3e5f5',
                          color: '#7b1fa2',
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopProgrammingTab;
