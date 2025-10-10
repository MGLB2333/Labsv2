import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Visibility,
  MoreVert,
} from '@mui/icons-material';

const TvSpotReportingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock campaign data for TV Spot Reporting
  const campaigns = [
    {
      id: 1,
      name: 'IKEA - May 2025',
      client: 'IKEA',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      budget: 500000,
      status: 'Active',
      spots: 1250,
      tvr: 45.2,
    },
    {
      id: 2,
      name: 'Polestar - April 2025',
      client: 'Polestar',
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      budget: 750000,
      status: 'Completed',
      spots: 2100,
      tvr: 67.8,
    },
    {
      id: 3,
      name: 'Step Change - March 2025',
      client: 'Step Change',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      budget: 300000,
      status: 'Completed',
      spots: 890,
      tvr: 32.1,
    },
    {
      id: 4,
      name: 'Testing Summary',
      client: 'Internal',
      startDate: '2025-02-15',
      endDate: '2025-02-28',
      budget: 150000,
      status: 'Draft',
      spots: 0,
      tvr: 0,
    },
  ];

  const handleCampaignClick = (campaignId: number) => {
    navigate(`/reporting/tv-spot/${campaignId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#4caf50';
      case 'Completed':
        return '#2196f3';
      case 'Draft':
        return '#ff9800';
      default:
        return '#666';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          TV Spot Reporting
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: '#02b5e7',
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: 500,
            px: 2,
            py: 0.5,
            color: 'white',
            '&:hover': {
              backgroundColor: '#02b5e7',
              opacity: 0.9,
            },
          }}
        >
          Create Campaign
        </Button>
      </Box>

      {/* Campaigns Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        {/* Filters Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', backgroundColor: 'white' }}>
          <Grid container spacing={2} alignItems="center">
                <Grid xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '12px',
                    backgroundColor: 'white',
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
            
                <Grid xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ fontSize: '12px' }}>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ fontSize: '12px', backgroundColor: 'white' }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
                <Grid xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                sx={{
                  textTransform: 'none',
                  fontSize: '11px',
                  fontWeight: 500,
                  px: 2,
                  py: 0.5,
                  borderColor: '#02b5e7',
                  color: '#02b5e7',
                  backgroundColor: 'white',
                  '&:hover': {
                    borderColor: '#02b5e7',
                    backgroundColor: 'rgba(2, 181, 231, 0.08)',
                  },
                }}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Campaign Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Client
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Duration
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                Budget
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                Spots
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, textAlign: 'right' }}>
                TVR
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
                onClick={() => handleCampaignClick(campaign.id)}
              >
                <TableCell sx={{ fontSize: '12px', fontWeight: 500, py: 0.5 }}>
                  {campaign.name}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 0.5 }}>
                  {campaign.client}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 0.5 }}>
                  {new Date(campaign.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - {new Date(campaign.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'right', py: 0.5 }}>
                  {formatCurrency(campaign.budget)}
                </TableCell>
                <TableCell sx={{ py: 0.5 }}>
                  <Chip
                    label={campaign.status}
                    size="small"
                    sx={{
                      fontSize: '10px',
                      height: 20,
                      backgroundColor: getStatusColor(campaign.status),
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'right', py: 0.5 }}>
                  {campaign.spots.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'right', py: 0.5 }}>
                  {campaign.tvr.toFixed(1)}
                </TableCell>
                <TableCell sx={{ py: 0.5 }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCampaignClick(campaign.id);
                      }}
                      sx={{
                        color: '#02b5e7',
                        '&:hover': {
                          backgroundColor: 'rgba(2, 181, 231, 0.08)',
                        },
                      }}
                    >
                      <Visibility sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        color: '#666',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <MoreVert sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredCampaigns.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500, color: '#666', mb: 1 }}>
            No campaigns found
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#999' }}>
            Try adjusting your search criteria or create a new campaign
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TvSpotReportingPage;
