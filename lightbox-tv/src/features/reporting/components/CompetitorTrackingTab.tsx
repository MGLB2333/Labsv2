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
  Chip,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, Add, TrendingUp, TrendingDown, Visibility, Schedule } from '@mui/icons-material';

// Mock data for competitor tracking
const competitorData = [
  {
    id: 1,
    brand: 'Nike',
    category: 'Sportswear',
    weeklyDelivery: 245.6,
    ourDelivery: 189.3,
    deliveryVariance: 56.3,
    shareOfVoice: 12.4,
    ourShareOfVoice: 8.7,
    shareVariance: 3.7,
    estimatedSpend: 1250000,
    ourSpend: 980000,
    spendVariance: 270000,
    qualityScore: 8.2,
    ourQualityScore: 7.8,
    qualityVariance: 0.4,
    topProgrammes: ['Coronation Street', 'Emmerdale', 'Love Island'],
    channels: ['ITV', 'Channel 4', 'Sky One'],
    reachBuild: [45, 67, 89, 92, 95, 98, 100],
  },
  {
    id: 2,
    brand: 'McDonald\'s',
    category: 'Fast Food',
    weeklyDelivery: 189.2,
    ourDelivery: 156.7,
    deliveryVariance: 32.5,
    shareOfVoice: 9.8,
    ourShareOfVoice: 7.2,
    shareVariance: 2.6,
    estimatedSpend: 980000,
    ourSpend: 820000,
    spendVariance: 160000,
    qualityScore: 7.6,
    ourQualityScore: 8.1,
    qualityVariance: -0.5,
    topProgrammes: ['EastEnders', 'The Great British Bake Off', 'Gogglebox'],
    channels: ['BBC One', 'Channel 4', 'ITV2'],
    reachBuild: [38, 52, 71, 85, 91, 96, 100],
  },
  {
    id: 3,
    brand: 'Coca-Cola',
    category: 'Beverages',
    weeklyDelivery: 312.4,
    ourDelivery: 234.1,
    deliveryVariance: 78.3,
    shareOfVoice: 15.2,
    ourShareOfVoice: 11.4,
    shareVariance: 3.8,
    estimatedSpend: 1580000,
    ourSpend: 1180000,
    spendVariance: 400000,
    qualityScore: 8.7,
    ourQualityScore: 8.3,
    qualityVariance: 0.4,
    topProgrammes: ['Strictly Come Dancing', 'I\'m a Celebrity', 'Britain\'s Got Talent'],
    channels: ['BBC One', 'ITV', 'Channel 5'],
    reachBuild: [52, 68, 82, 89, 94, 97, 100],
  },
  {
    id: 4,
    brand: 'Apple',
    category: 'Technology',
    weeklyDelivery: 156.8,
    ourDelivery: 142.3,
    deliveryVariance: 14.5,
    shareOfVoice: 7.6,
    ourShareOfVoice: 6.9,
    shareVariance: 0.7,
    estimatedSpend: 780000,
    ourSpend: 710000,
    spendVariance: 70000,
    qualityScore: 9.1,
    ourQualityScore: 8.8,
    qualityVariance: 0.3,
    topProgrammes: ['The Crown', 'Line of Duty', 'Peaky Blinders'],
    channels: ['Netflix', 'BBC Two', 'Sky Atlantic'],
    reachBuild: [41, 58, 73, 86, 92, 95, 100],
  },
];

const CompetitorTrackingTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Sportswear', 'Fast Food', 'Beverages', 'Technology', 'Automotive', 'Fashion'];

  const filteredData = competitorData.filter(competitor => {
    const matchesSearch = competitor.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competitor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || competitor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals = 1) => {
    return num.toFixed(decimals);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 1 }}>
          Competitor Tracking
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', color: '#666', mb: 3 }}>
          Monitor competitor performance, share of voice, and strategic insights
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search competitors..."
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: 500,
            px: 2,
            py: 1,
            backgroundColor: '#02b5e7',
            '&:hover': {
              backgroundColor: '#0295c7',
            },
          }}
        >
          Add Competitor
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ fontSize: '20px', color: '#4caf50', mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                  Avg Delivery Gap
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
                +45.4 TVRs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Visibility sx={{ fontSize: '20px', color: '#02b5e7', mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                  Share of Voice Gap
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
                +2.7%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Schedule sx={{ fontSize: '20px', color: '#ff9800', mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                  Avg Spend Gap
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
                +£225K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingDown sx={{ fontSize: '20px', color: '#f44336', mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                  Quality Gap
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
                +0.35
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Competitor Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Competitor
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Weekly Delivery
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Share of Voice
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Est. Spend
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1, textAlign: 'right' }}>
                Quality Score
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Top Programmes
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', py: 1 }}>
                Channels
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((competitor) => (
              <TableRow
                key={competitor.id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ fontSize: '12px', py: 1, fontWeight: 500 }}>
                  {competitor.brand}
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1 }}>
                  <Chip
                    label={competitor.category}
                    size="small"
                    sx={{
                      fontSize: '10px',
                      height: 20,
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {formatNumber(competitor.weeklyDelivery)} TVRs
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '10px', color: '#666' }}>
                      vs {formatNumber(competitor.ourDelivery)} ours
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '10px',
                        color: competitor.deliveryVariance >= 0 ? '#4caf50' : '#f44336',
                        fontWeight: 500,
                      }}
                    >
                      {competitor.deliveryVariance >= 0 ? '+' : ''}{formatNumber(competitor.deliveryVariance)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {formatNumber(competitor.shareOfVoice)}%
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '10px', color: '#666' }}>
                      vs {formatNumber(competitor.ourShareOfVoice)}% ours
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '10px',
                        color: competitor.shareVariance >= 0 ? '#4caf50' : '#f44336',
                        fontWeight: 500,
                      }}
                    >
                      {competitor.shareVariance >= 0 ? '+' : ''}{formatNumber(competitor.shareVariance)}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {formatCurrency(competitor.estimatedSpend)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '10px', color: '#666' }}>
                      vs {formatCurrency(competitor.ourSpend)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '10px',
                        color: competitor.spendVariance >= 0 ? '#4caf50' : '#f44336',
                        fontWeight: 500,
                      }}
                    >
                      {competitor.spendVariance >= 0 ? '+' : ''}{formatCurrency(competitor.spendVariance)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1, textAlign: 'right' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                      {formatNumber(competitor.qualityScore, 1)}/10
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '10px', color: '#666' }}>
                      vs {formatNumber(competitor.ourQualityScore, 1)} ours
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '10px',
                        color: competitor.qualityVariance >= 0 ? '#4caf50' : '#f44336',
                        fontWeight: 500,
                      }}
                    >
                      {competitor.qualityVariance >= 0 ? '+' : ''}{formatNumber(competitor.qualityVariance, 1)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {competitor.topProgrammes.slice(0, 2).map((programme, index) => (
                      <Chip
                        key={index}
                        label={programme}
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#f0f8ff',
                          color: '#1976d2',
                        }}
                      />
                    ))}
                    {competitor.topProgrammes.length > 2 && (
                      <Chip
                        label={`+${competitor.topProgrammes.length - 2}`}
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#f5f5f5',
                          color: '#666',
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '12px', py: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {competitor.channels.slice(0, 2).map((channel, index) => (
                      <Chip
                        key={index}
                        label={channel}
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#e8f5e8',
                          color: '#2e7d32',
                        }}
                      />
                    ))}
                    {competitor.channels.length > 2 && (
                      <Chip
                        label={`+${competitor.channels.length - 2}`}
                        size="small"
                        sx={{
                          fontSize: '9px',
                          height: 18,
                          backgroundColor: '#f5f5f5',
                          color: '#666',
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

export default CompetitorTrackingTab;
