import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
  Divider,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data for competitor tracking
const competitorData = [
  {
    id: 1,
    brand: 'Nike',
    domain: 'nike.com',
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
    domain: 'mcdonalds.com',
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
    domain: 'coca-cola.com',
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
    domain: 'apple.com',
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
  {
    id: 5,
    brand: 'BMW',
    domain: 'bmw.com',
    category: 'Automotive',
    weeklyDelivery: 98.4,
    ourDelivery: 89.2,
    deliveryVariance: 9.2,
    shareOfVoice: 5.8,
    ourShareOfVoice: 5.2,
    shareVariance: 0.6,
    estimatedSpend: 650000,
    ourSpend: 590000,
    spendVariance: 60000,
    qualityScore: 8.7,
    ourQualityScore: 8.3,
    qualityVariance: 0.4,
    topProgrammes: ['Top Gear', 'Formula 1', 'The Grand Tour'],
    channels: ['BBC Two', 'Sky Sports', 'Channel 4'],
    reachBuild: [28, 42, 58, 71, 82, 89, 95],
  },
  {
    id: 6,
    brand: 'Adidas',
    domain: 'adidas.com',
    category: 'Sportswear',
    weeklyDelivery: 178.3,
    ourDelivery: 145.6,
    deliveryVariance: 32.7,
    shareOfVoice: 10.2,
    ourShareOfVoice: 8.1,
    shareVariance: 2.1,
    estimatedSpend: 920000,
    ourSpend: 750000,
    spendVariance: 170000,
    qualityScore: 7.9,
    ourQualityScore: 7.6,
    qualityVariance: 0.3,
    topProgrammes: ['Match of the Day', 'Champions League', 'Premier League'],
    channels: ['Sky Sports', 'BT Sport', 'BBC One'],
    reachBuild: [35, 48, 62, 74, 83, 90, 96],
  },
  {
    id: 7,
    brand: 'Starbucks',
    domain: 'starbucks.com',
    category: 'Food & Beverage',
    weeklyDelivery: 134.7,
    ourDelivery: 112.3,
    deliveryVariance: 22.4,
    shareOfVoice: 8.1,
    ourShareOfVoice: 6.7,
    shareVariance: 1.4,
    estimatedSpend: 680000,
    ourSpend: 560000,
    spendVariance: 120000,
    qualityScore: 8.4,
    ourQualityScore: 8.0,
    qualityVariance: 0.4,
    topProgrammes: ['Good Morning Britain', 'This Morning', 'Loose Women'],
    channels: ['ITV', 'Channel 4', 'BBC One'],
    reachBuild: [32, 45, 58, 69, 78, 85, 92],
  },
  {
    id: 8,
    brand: 'Samsung',
    domain: 'samsung.com',
    category: 'Technology',
    weeklyDelivery: 167.2,
    ourDelivery: 134.8,
    deliveryVariance: 32.4,
    shareOfVoice: 9.4,
    ourShareOfVoice: 7.6,
    shareVariance: 1.8,
    estimatedSpend: 850000,
    ourSpend: 680000,
    spendVariance: 170000,
    qualityScore: 8.2,
    ourQualityScore: 7.9,
    qualityVariance: 0.3,
    topProgrammes: ['The Gadget Show', 'Click', 'Tomorrow\'s World'],
    channels: ['Channel 5', 'BBC Two', 'Sky One'],
    reachBuild: [38, 52, 67, 79, 87, 93, 98],
  },
  {
    id: 9,
    brand: 'Tesla',
    domain: 'tesla.com',
    category: 'Automotive',
    weeklyDelivery: 76.3,
    ourDelivery: 68.9,
    deliveryVariance: 7.4,
    shareOfVoice: 4.6,
    ourShareOfVoice: 4.1,
    shareVariance: 0.5,
    estimatedSpend: 480000,
    ourSpend: 430000,
    spendVariance: 50000,
    qualityScore: 9.3,
    ourQualityScore: 8.9,
    qualityVariance: 0.4,
    topProgrammes: ['Fully Charged', 'Top Gear', 'The Grand Tour'],
    channels: ['YouTube', 'Sky Atlantic', 'BBC Two'],
    reachBuild: [22, 35, 48, 59, 68, 75, 82],
  },
  {
    id: 10,
    brand: 'Netflix',
    domain: 'netflix.com',
    category: 'Entertainment',
    weeklyDelivery: 203.5,
    ourDelivery: 167.8,
    deliveryVariance: 35.7,
    shareOfVoice: 12.1,
    ourShareOfVoice: 9.8,
    shareVariance: 2.3,
    estimatedSpend: 1100000,
    ourSpend: 890000,
    spendVariance: 210000,
    qualityScore: 8.8,
    ourQualityScore: 8.5,
    qualityVariance: 0.3,
    topProgrammes: ['Stranger Things', 'The Crown', 'Bridgerton'],
    channels: ['Netflix', 'YouTube', 'Social Media'],
    reachBuild: [45, 62, 78, 89, 95, 98, 100],
  },
];

const CompetitorTrackingTab: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [competitorDetailsOpen, setCompetitorDetailsOpen] = useState(false);
  const [selectedCompetitorDetails, setSelectedCompetitorDetails] = useState<any>(null);
  const [brandLogos, setBrandLogos] = useState<Record<string, string>>({});

  const availableBrands = ['Nike', 'McDonald\'s', 'Coca-Cola', 'Apple', 'BMW', 'Adidas', 'Starbucks', 'Samsung', 'Tesla', 'Netflix'];

  const handleAddCompetitor = (brand: string) => {
    if (brand && !selectedCompetitors.includes(brand) && brand !== selectedBrand) {
      setSelectedCompetitors([...selectedCompetitors, brand]);
    }
  };

  const handleRemoveCompetitor = (brand: string) => {
    setSelectedCompetitors(selectedCompetitors.filter(comp => comp !== brand));
  };

  const handleCompetitorClick = (competitorName: string) => {
    const competitor = competitorData.find(c => c.brand === competitorName);
    if (competitor) {
      setSelectedCompetitorDetails(competitor);
      setCompetitorDetailsOpen(true);
    }
  };

  const fetchBrandLogo = async (brandName: string): Promise<string> => {
    // Find the competitor data to get the domain
    const competitor = competitorData.find(c => c.brand === brandName);
    if (!competitor || !competitor.domain) return '';

    // Use Google's favicon service
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${competitor.domain}&sz=32`;
    console.log(`Using favicon URL for ${brandName}:`, faviconUrl);
    return faviconUrl;
  };

  useEffect(() => {
    const loadBrandLogos = async () => {
      console.log('Loading brand logos...');
      const logos: Record<string, string> = {};
      // Only load logos for brands that exist in competitorData
      const brandsInData = competitorData.map(c => c.brand);
      for (const brand of brandsInData) {
        const logoUrl = await fetchBrandLogo(brand);
        if (logoUrl) {
          logos[brand] = logoUrl;
          console.log(`Added logo for ${brand}:`, logoUrl);
        } else {
          console.log(`No logo found for ${brand}`);
        }
      }
      console.log('Final logos object:', logos);
      setBrandLogos(logos);
    };

    loadBrandLogos();
  }, []);

  const filteredData = competitorData
    .filter(competitor => {
      const isSelected = selectedBrand === competitor.brand || selectedCompetitors.includes(competitor.brand);
      return isSelected;
    })
    .sort((a, b) => {
      // Your brand always goes first
      if (a.brand === selectedBrand) return -1;
      if (b.brand === selectedBrand) return 1;
      // Then sort competitors alphabetically
      return a.brand.localeCompare(b.brand);
    });

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return '£0';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number | undefined, decimals = 1) => {
    if (num === undefined || num === null) return '0';
    return num.toFixed(decimals);
  };

  // Mock data for competitor details
  const getCompetitorDetails = (_brand: string) => {
    const monthlyData = [
      { month: 'Jan', spend: 120000, reach: 45, impressions: 2300000 },
      { month: 'Feb', spend: 135000, reach: 52, impressions: 2600000 },
      { month: 'Mar', spend: 148000, reach: 58, impressions: 2900000 },
      { month: 'Apr', spend: 142000, reach: 55, impressions: 2750000 },
      { month: 'May', spend: 165000, reach: 62, impressions: 3100000 },
      { month: 'Jun', spend: 158000, reach: 59, impressions: 2950000 },
    ];

    const channelBreakdown = [
      { channel: 'ITV', spend: 45000, share: 28.5, spots: 156 },
      { channel: 'Channel 4', spend: 38000, share: 24.1, spots: 134 },
      { channel: 'Sky', spend: 32000, share: 20.3, spots: 98 },
      { channel: 'BBC', spend: 28000, share: 17.7, spots: 87 },
      { channel: 'Other', spend: 15000, share: 9.4, spots: 45 },
    ];

    return { monthlyData, channelBreakdown };
  };

  return (
    <Box>
      {/* Brand Selection Bar */}
      <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>
              Select Your Brand & Competitors
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => setHelpDialogOpen(true)}
              sx={{
                color: '#02b5e7',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                '&:hover': {
                  color: '#0295c7',
                },
              }}
            >
              How to use competitor analysis
            </Link>
          </Box>
          
          {/* Brand Selection Row */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            {/* Your Brand Selection - 1/5 width */}
            <Box sx={{ width: '20%' }}>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', mb: 1, fontWeight: 500 }}>
                Your Brand
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedBrand && (
                  <Chip
                    label={selectedBrand}
                    onDelete={() => setSelectedBrand('')}
                    sx={{
                      backgroundColor: '#02b5e7',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '4px',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                      },
                    }}
                  />
                )}
                {!selectedBrand && (
                  <TextField
                    select
                    placeholder="Select your brand"
                    value=""
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    size="small"
                    fullWidth
                  >
                    {availableBrands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Box>
            </Box>

            {/* Vertical Divider */}
            <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 2 }} />

            {/* Competitors Selection - 4/5 width */}
            <Box sx={{ width: '80%' }}>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', mb: 1, fontWeight: 500 }}>
                Competitors
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                {selectedCompetitors.map((competitor) => (
                  <Chip
                    key={competitor}
                    label={competitor}
                    onDelete={() => handleRemoveCompetitor(competitor)}
                    sx={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '4px',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                      },
                    }}
                  />
                ))}
                {selectedCompetitors.length < 5 && (
                  <TextField
                    select
                    placeholder="Add competitor"
                    value=""
                    onChange={(e) => handleAddCompetitor(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                  >
                    {availableBrands
                      .filter(brand => brand !== selectedBrand && !selectedCompetitors.includes(brand))
                      .map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              </Box>
              <Typography variant="caption" sx={{ fontSize: '11px', color: '#999' }}>
                Select up to 5 competitors to track
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>


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
            {filteredData.map((competitor) => {
              const isYourBrand = competitor.brand === selectedBrand;
              const isCompetitor = selectedCompetitors.includes(competitor.brand);
              
              return (
                <TableRow
                  key={competitor.id}
                  onClick={() => handleCompetitorClick(competitor.brand)}
                  sx={{
                    backgroundColor: isYourBrand ? 'rgba(2, 181, 231, 0.08)' : isCompetitor ? 'rgba(244, 67, 54, 0.04)' : 'transparent',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: isYourBrand ? 'rgba(2, 181, 231, 0.12)' : isCompetitor ? 'rgba(244, 67, 54, 0.08)' : 'rgba(2, 181, 231, 0.04)',
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: '12px', py: 1, fontWeight: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {brandLogos[competitor.brand] && (
                        <Box
                          component="img"
                          src={brandLogos[competitor.brand]}
                          alt={`${competitor.brand} logo`}
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '2px',
                            objectFit: 'contain',
                          }}
                          onLoad={() => console.log(`Logo loaded for ${competitor.brand}`)}
                          onError={(e) => {
                            console.log(`Logo failed to load for ${competitor.brand}:`, brandLogos[competitor.brand]);
                            // Hide the image if it fails to load
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#333',
                          fontWeight: 500,
                        }}
                      >
                        {competitor.brand}
                      </Typography>
                      {isYourBrand && (
                        <Chip
                          label="Your Brand"
                          size="small"
                          sx={{
                            fontSize: '9px',
                            height: 18,
                            backgroundColor: '#02b5e7',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {isCompetitor && (
                        <Chip
                          label="Competitor"
                          size="small"
                          sx={{
                            fontSize: '9px',
                            height: 18,
                            backgroundColor: '#f44336',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Competitor Details Dialog */}
      <Dialog
        open={competitorDetailsOpen}
        onClose={() => setCompetitorDetailsOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#333',
          pb: 1,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {selectedCompetitorDetails?.brand && brandLogos[selectedCompetitorDetails.brand] && (
              <Box
                component="img"
                src={brandLogos[selectedCompetitorDetails.brand]}
                alt={`${selectedCompetitorDetails.brand} logo`}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '2px',
                  objectFit: 'contain',
                }}
                onLoad={() => console.log(`Modal logo loaded for ${selectedCompetitorDetails.brand}`)}
                onError={(e) => {
                  console.log(`Modal logo failed to load for ${selectedCompetitorDetails.brand}:`, brandLogos[selectedCompetitorDetails.brand]);
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            {selectedCompetitorDetails?.brand} - Detailed Analysis
          </Box>
          <IconButton
            onClick={() => setCompetitorDetailsOpen(false)}
            size="small"
            sx={{ color: '#666' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4 }}>
          {selectedCompetitorDetails && (
            <Box>
              {/* Summary Cards */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2, 
                mt: 2, 
                mb: 4 
              }}>
                <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 600, color: '#333', mb: 1 }}>
                      {formatCurrency(selectedCompetitorDetails.estimatedSpend)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>
                      Total Spend
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 600, color: '#333', mb: 1 }}>
                      {formatNumber(selectedCompetitorDetails.delivery)} TVRs
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>
                      Delivery
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 600, color: '#333', mb: 1 }}>
                      {formatNumber(selectedCompetitorDetails.shareOfVoice)}%
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>
                      Share of Voice
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 600, color: '#333', mb: 1 }}>
                      {formatNumber(selectedCompetitorDetails.qualityScore)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>
                      Quality Score
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Charts Row - Full Width */}
              <Box sx={{ mb: 4, width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                  <Box sx={{ flex: 1, width: '50%' }}>
                    <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontSize: '15px', fontWeight: 600, color: '#333', mb: 3 }}>
                          Monthly Spend Trend
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={getCompetitorDetails(selectedCompetitorDetails.brand).monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="month" 
                              tick={{ fontSize: 12, fill: '#666' }}
                              axisLine={{ stroke: '#e0e0e0' }}
                            />
                            <YAxis 
                              tick={{ fontSize: 12, fill: '#666' }}
                              axisLine={{ stroke: '#e0e0e0' }}
                              tickFormatter={(value) => `£${(value / 1000)}k`}
                            />
                            <Tooltip 
                              formatter={(value: any) => [formatCurrency(value), 'Spend']}
                              labelStyle={{ fontSize: '13px', fontWeight: 500 }}
                              contentStyle={{ fontSize: '13px', borderRadius: '8px' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="spend" 
                              stroke="#02b5e7" 
                              strokeWidth={3}
                              dot={{ fill: '#02b5e7', strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, stroke: '#02b5e7', strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{ flex: 1, width: '50%' }}>
                    <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', height: '100%' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontSize: '15px', fontWeight: 600, color: '#333', mb: 3 }}>
                          Channel Breakdown
                        </Typography>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={getCompetitorDetails(selectedCompetitorDetails.brand).channelBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="channel" 
                              tick={{ fontSize: 12, fill: '#666' }}
                              axisLine={{ stroke: '#e0e0e0' }}
                            />
                            <YAxis 
                              tick={{ fontSize: 12, fill: '#666' }}
                              axisLine={{ stroke: '#e0e0e0' }}
                              tickFormatter={(value) => `£${(value / 1000)}k`}
                            />
                            <Tooltip 
                              formatter={(value: any) => [formatCurrency(value), 'Spend']}
                              labelStyle={{ fontSize: '13px', fontWeight: 500 }}
                              contentStyle={{ fontSize: '13px', borderRadius: '8px' }}
                            />
                            <Bar dataKey="spend" fill="#02b5e7" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>

              {/* Channel Performance Table */}
              <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontSize: '15px', fontWeight: 600, color: '#333', mb: 3 }}>
                    Channel Performance Breakdown
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                          <TableCell sx={{ fontSize: '13px', fontWeight: 600, py: 2, px: 3 }}>Channel</TableCell>
                          <TableCell sx={{ fontSize: '13px', fontWeight: 600, py: 2, px: 3, textAlign: 'right' }}>Spend</TableCell>
                          <TableCell sx={{ fontSize: '13px', fontWeight: 600, py: 2, px: 3, textAlign: 'right' }}>Share</TableCell>
                          <TableCell sx={{ fontSize: '13px', fontWeight: 600, py: 2, px: 3, textAlign: 'right' }}>Spots</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getCompetitorDetails(selectedCompetitorDetails.brand).channelBreakdown.map((channel, index) => (
                          <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafafa' } }}>
                            <TableCell sx={{ fontSize: '13px', py: 2, px: 3, fontWeight: 500 }}>{channel.channel}</TableCell>
                            <TableCell sx={{ fontSize: '13px', py: 2, px: 3, textAlign: 'right', fontWeight: 500 }}>
                              {formatCurrency(channel.spend)}
                            </TableCell>
                            <TableCell sx={{ fontSize: '13px', py: 2, px: 3, textAlign: 'right', fontWeight: 500 }}>
                              {formatNumber(channel.share)}%
                            </TableCell>
                            <TableCell sx={{ fontSize: '13px', py: 2, px: 3, textAlign: 'right', fontWeight: 500 }}>
                              {channel.spots}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#333',
          pb: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          How to Use Competitor Analysis
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography variant="body1" sx={{ fontSize: '14px', color: '#333', mb: 2, fontWeight: 500 }}>
            What is Competitor Analysis?
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 3 }}>
            Competitor analysis helps you understand how your brand performs against competitors in the TV advertising space. 
            By comparing key metrics like delivery, share of voice, spend, and quality scores, you can identify opportunities 
            and gaps in your advertising strategy.
          </Typography>

          <Typography variant="body1" sx={{ fontSize: '14px', color: '#333', mb: 2, fontWeight: 500 }}>
            How to Use This Tool:
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 1, fontWeight: 500 }}>
              1. Select Your Brand
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 2, ml: 2 }}>
              Choose your brand from the dropdown to establish your baseline performance metrics.
            </Typography>

            <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 1, fontWeight: 500 }}>
              2. Add Competitors
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 2, ml: 2 }}>
              Select up to 5 competitors to track and compare against your brand's performance.
            </Typography>

            <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 1, fontWeight: 500 }}>
              3. Analyze the Data
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#666', lineHeight: 1.6, mb: 2, ml: 2 }}>
              Review the comparison table to identify gaps in delivery, share of voice, spend, and quality scores. 
              Use this data to optimize your TV advertising strategy.
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
            💡 Tip: Focus on competitors with similar target audiences and market positioning for the most relevant insights.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setHelpDialogOpen(false)}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 500,
              px: 3,
              py: 1,
              backgroundColor: '#02b5e7',
              '&:hover': {
                backgroundColor: '#0295c7',
              },
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompetitorTrackingTab;
