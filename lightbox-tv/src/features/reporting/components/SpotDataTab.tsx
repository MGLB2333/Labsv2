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
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
} from '@mui/material';
import {
  FilterList,
  Search,
  Refresh,
} from '@mui/icons-material';

const SpotDataTab: React.FC = () => {
  const [filters, setFilters] = useState({
    campaign: '',
    station: '',
    dateRange: '',
    spotType: '',
    search: '',
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    // In a real app, this would trigger data fetching
    console.log('Applying filters:', filters);
  };

  const handleClearFilters = () => {
    setFilters({
      campaign: '',
      station: '',
      dateRange: '',
      spotType: '',
      search: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 1 }}>
          Spot Data Analysis
        </Typography>
      </Box>

      {/* Filters Row */}
      <Paper sx={{ p: 2, mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ fontSize: '12px' }}>Campaign</InputLabel>
              <Select
                value={filters.campaign}
                onChange={(e) => handleFilterChange('campaign', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="">All Campaigns</MenuItem>
                <MenuItem value="ikea-may">IKEA - May 2025</MenuItem>
                <MenuItem value="polestar-apr">Polestar - April 2025</MenuItem>
                <MenuItem value="step-change">Step Change - March 2025</MenuItem>
                <MenuItem value="testing-summary">Testing Summary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ fontSize: '12px' }}>Station</InputLabel>
              <Select
                value={filters.station}
                onChange={(e) => handleFilterChange('station', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="">All Stations</MenuItem>
                <MenuItem value="carlton">Carlton</MenuItem>
                <MenuItem value="lwt">LWT</MenuItem>
                <MenuItem value="midwest">Midwest</MenuItem>
                <MenuItem value="north">North</MenuItem>
                <MenuItem value="scotland">Scotland</MenuItem>
                <MenuItem value="southeast">Southeast</MenuItem>
                <MenuItem value="ulster">Ulster</MenuItem>
                <MenuItem value="itv-breakfast">ITV Breakfast</MenuItem>
                <MenuItem value="c4">C4</MenuItem>
                <MenuItem value="sky">Sky</MenuItem>
                <MenuItem value="c5">C5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ fontSize: '12px' }}>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="">All Dates</MenuItem>
                <MenuItem value="last-7-days">Last 7 Days</MenuItem>
                <MenuItem value="last-30-days">Last 30 Days</MenuItem>
                <MenuItem value="last-90-days">Last 90 Days</MenuItem>
                <MenuItem value="april-2025">April 2025</MenuItem>
                <MenuItem value="may-2025">May 2025</MenuItem>
                <MenuItem value="march-2025">March 2025</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ fontSize: '12px' }}>Spot Type</InputLabel>
              <Select
                value={filters.spotType}
                onChange={(e) => handleFilterChange('spotType', e.target.value)}
                sx={{ fontSize: '12px' }}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="30s">30 Second</MenuItem>
                <MenuItem value="15s">15 Second</MenuItem>
                <MenuItem value="60s">60 Second</MenuItem>
                <MenuItem value="90s">90 Second</MenuItem>
                <MenuItem value="break-bumper">Break Bumper</MenuItem>
                <MenuItem value="sponsorship">Sponsorship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search spots..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              sx={{
                minWidth: 140,
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#02b5e7',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#02b5e7',
                  },
                },
              }}
              InputProps={{
                startAdornment: <Search sx={{ color: '#666', fontSize: 16, mr: 1 }} />,
              }}
            />
          </Grid>
          
          <Grid xs={12} sm={6} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={handleApplyFilters}
                startIcon={<FilterList />}
                sx={{
                  backgroundColor: '#02b5e7',
                  textTransform: 'none',
                  fontSize: '11px',
                  fontWeight: 500,
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    backgroundColor: '#02b5e7',
                    opacity: 0.9,
                  },
                }}
              >
                Apply
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClearFilters}
                  sx={{
                    textTransform: 'none',
                    fontSize: '11px',
                    fontWeight: 500,
                    px: 2,
                    py: 0.5,
                    borderColor: '#e0e0e0',
                    color: '#666',
                    '&:hover': {
                      borderColor: '#02b5e7',
                      color: '#02b5e7',
                    },
                  }}
                >
                  Clear
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', mr: 1 }}>
              Active filters:
            </Typography>
            {filters.campaign && (
              <Chip
                label={`Campaign: ${filters.campaign}`}
                size="small"
                onDelete={() => handleFilterChange('campaign', '')}
                sx={{ fontSize: '10px', height: 20 }}
              />
            )}
            {filters.station && (
              <Chip
                label={`Station: ${filters.station}`}
                size="small"
                onDelete={() => handleFilterChange('station', '')}
                sx={{ fontSize: '10px', height: 20 }}
              />
            )}
            {filters.dateRange && (
              <Chip
                label={`Date: ${filters.dateRange}`}
                size="small"
                onDelete={() => handleFilterChange('dateRange', '')}
                sx={{ fontSize: '10px', height: 20 }}
              />
            )}
            {filters.spotType && (
              <Chip
                label={`Type: ${filters.spotType}`}
                size="small"
                onDelete={() => handleFilterChange('spotType', '')}
                sx={{ fontSize: '10px', height: 20 }}
              />
            )}
            {filters.search && (
              <Chip
                label={`Search: ${filters.search}`}
                size="small"
                onDelete={() => handleFilterChange('search', '')}
                sx={{ fontSize: '10px', height: 20 }}
              />
            )}
          </Box>
        )}
      </Paper>

      {/* Data Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Spot ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Campaign
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Station
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Time
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Duration
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Program
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                TVR
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                Reach
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                Frequency
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                Cost
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={12} sx={{ textAlign: 'center', py: 8, borderBottom: 'none' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <FilterList sx={{ fontSize: 48, color: '#e0e0e0' }} />
                  <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500, color: '#666' }}>
                    Apply filters to view spot data
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px', color: '#999', maxWidth: 400, textAlign: 'center' }}>
                    Select your campaign, station, date range, and other criteria above to load the corresponding TV spot data.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleApplyFilters}
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      borderColor: '#02b5e7',
                      color: '#02b5e7',
                      '&:hover': {
                        borderColor: '#02b5e7',
                        backgroundColor: 'rgba(2, 181, 231, 0.08)',
                      },
                    }}
                  >
                    Load Data
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SpotDataTab;
