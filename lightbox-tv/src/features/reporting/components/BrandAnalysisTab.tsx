import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  PlayArrow,
  Visibility,
  ViewList,
  Apps,
  ChevronLeft,
  ChevronRight,
  FilterList,
  Download,
  Add,
} from '@mui/icons-material';

const BrandAnalysisTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState({
    region: 'US',
    brand: 'LightboxTV Demo Ad',
    scope: 'National',
    period: 'Last 30 days',
    tvType: 'All tv types',
  });


  const topAds = [
    {
      id: 1,
      title: 'LightboxTV - Demo Campaign 1',
      thumbnail: '/api/placeholder/300/200',
      views: '44M',
      reach: '11,610,403',
      frequency: '3.8',
    },
    {
      id: 2,
      title: 'LightboxTV - Demo Campaign 2',
      thumbnail: '/api/placeholder/300/200',
      views: '23M',
      reach: '7,783,801',
      frequency: '2.9',
    },
    {
      id: 3,
      title: 'LightboxTV - Demo Campaign 3',
      thumbnail: '/api/placeholder/300/200',
      views: '4M',
      reach: '1,750,837',
      frequency: '2.4',
      unavailable: true,
    },
    {
      id: 4,
      title: 'LightboxTV - Demo Campaign 4',
      thumbnail: '/api/placeholder/300/200',
      views: '4M',
      reach: '1,021,727',
      frequency: '3.7',
    },
    {
      id: 5,
      title: 'LightboxTV - Demo Campaign 5',
      thumbnail: '/api/placeholder/300/200',
      views: '3M',
      reach: '2,543,081',
      frequency: '1.3',
    },
  ];

  const frequencyData = [
    { category: 'Top 20%', value: 16.0 },
    { category: 'Second 20%', value: 4.0 },
    { category: 'Third 20%', value: 2.1 },
    { category: 'Fourth 20%', value: 1.2 },
    { category: 'Bottom 20%', value: 1.0 },
  ];

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      {/* Filter Bar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 3,
        p: 2,
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList sx={{ fontSize: 16, color: '#666' }} />
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#666' }}>
            Filter
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
              Region
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="US">US</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="EU">EU</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
              Brand
            </Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="LightboxTV Demo Ad">LightboxTV Demo Ad</MenuItem>
                <MenuItem value="Demo Brand 2">Demo Brand 2</MenuItem>
                <MenuItem value="Demo Brand 3">Demo Brand 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
              Scope
            </Typography>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={filters.scope}
                onChange={(e) => handleFilterChange('scope', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="National">National</MenuItem>
                <MenuItem value="Regional">Regional</MenuItem>
                <MenuItem value="Local">Local</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
              Period
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                <MenuItem value="Last 90 days">Last 90 days</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', fontWeight: 500 }}>
              TV Type
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filters.tvType}
                onChange={(e) => handleFilterChange('tvType', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="All tv types">All tv types</MenuItem>
                <MenuItem value="Linear TV">Linear TV</MenuItem>
                <MenuItem value="OTT">OTT</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<Download sx={{ fontSize: 14, color: 'white' }} />}
          sx={{ 
            fontSize: '11px', 
            backgroundColor: '#02b5e7',
            color: 'white',
            '&:hover': { 
              backgroundColor: '#0288d1',
              color: 'white'
            }
          }}
        >
          Download
        </Button>
      </Box>

      {/* Top Ads Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
            Top Ads
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => setViewMode('list')}
              sx={{ 
                backgroundColor: viewMode === 'list' ? '#e3f2fd' : 'transparent',
                color: viewMode === 'list' ? '#02b5e7' : '#666'
              }}
            >
              <ViewList sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setViewMode('grid')}
              sx={{ 
                backgroundColor: viewMode === 'grid' ? '#e3f2fd' : 'transparent',
                color: viewMode === 'grid' ? '#02b5e7' : '#666'
              }}
            >
              <Apps sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Ads Carousel */}
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
            {topAds.map((ad) => (
              <Card key={ad.id} sx={{ 
                minWidth: 250, 
                backgroundColor: '#f8f9fa',
                border: '1px solid #e0e0e0',
                borderRadius: 1
              }}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 140,
                      backgroundColor: ad.unavailable ? '#424242' : '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {ad.unavailable ? (
                      <Typography variant="body2" sx={{ color: 'white', fontSize: '12px' }}>
                        Ad link is unavailable
                      </Typography>
                    ) : (
                      <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
                    )}
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500, mb: 1, color: '#333' }}>
                    {ad.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Visibility sx={{ fontSize: 14, color: '#666' }} />
                    <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                      {ad.views} Views
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: '10px', color: '#666' }}>
                    Reach: {ad.reach}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '10px', color: '#666' }}>
                    Frequency: {ad.frequency}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          
          {/* Carousel Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
            <IconButton size="small">
              <ChevronLeft sx={{ fontSize: 20 }} />
            </IconButton>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {topAds.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === 1 ? '#02b5e7' : '#e0e0e0',
                  }}
                />
              ))}
            </Box>
            <IconButton size="small">
              <ChevronRight sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Frequency Distribution Section */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
            Frequency distribution
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              size="small" 
              sx={{ 
                fontSize: '11px',
                backgroundColor: '#02b5e7',
                '&:hover': { backgroundColor: '#0288d1' }
              }}
            >
              Explorer
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<Add sx={{ fontSize: 14 }} />}
              sx={{ fontSize: '11px' }}
            >
              Add strategy
            </Button>
          </Box>
        </Box>

        {/* Frequency Chart */}
        <Card sx={{ 
          backgroundColor: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: 1
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, height: 200, mb: 2 }}>
              {frequencyData.map((item, index) => (
                <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, mb: 1, color: '#333' }}>
                    {item.value}
                  </Typography>
                  <Box
                    sx={{
                      width: '60%',
                      height: `${(item.value / 16) * 150}px`,
                      backgroundColor: '#02b5e7',
                      borderRadius: '2px 2px 0 0',
                      minHeight: 20,
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', mt: 1, textAlign: 'center' }}>
                    {item.category}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
              Avg. Frequency
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BrandAnalysisTab;
