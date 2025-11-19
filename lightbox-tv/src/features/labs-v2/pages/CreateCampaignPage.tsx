import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
} from '@mui/material';
import { AutoAwesome, AttachMoney } from '@mui/icons-material';
import { Card } from '../components/common/Card';
import { PageHeader } from '../components/layout/PageHeader';
import { useCampaignStore } from '../store/campaignStore';
import { getDefaultMarket } from '../lib/utils/market';
import { formatCurrency } from '../lib/utils/currency';

const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentCampaign } = useCampaignStore();
  const market = getDefaultMarket();
  
  const [name, setName] = useState('');
  const [advertiser, setAdvertiser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState<number>(0);
  const [planningMode, setPlanningMode] = useState<'strategic' | 'fixed-cpm'>('strategic');

  const handleCreate = () => {
    const campaign = {
      id: `camp-${Date.now()}`,
      name,
      advertiser,
      startDate,
      endDate,
      totalBudget: budget,
      currency: market.currency,
      market: market.id,
      planningMode,
      kpis: [],
      audience: { id: '', name: '', demographics: {} },
      formats: [],
      channels: [],
      calibration: {
        clientId: advertiser.toLowerCase().replace(/\s+/g, '-'),
        market: market.id,
        adjustments: {},
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCurrentCampaign(campaign);
    navigate('/labs-v2/planner');
  };

  const isFormValid = name && advertiser && startDate && endDate && budget > 0;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
      <PageHeader
        title="Create New Campaign"
        subtitle="Set up your campaign basics to get started"
      />

      <Card>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
              Campaign Details
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Campaign Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Summer 2024 Campaign"
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Advertiser"
              value={advertiser}
              onChange={(e) => setAdvertiser(e.target.value)}
              placeholder="e.g., Brand Name"
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Budget & Planning
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={`Total Budget`}
              type="number"
              value={budget || ''}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="0"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: '#666' }}>{market.currencySymbol}</Box>
                ),
              }}
              required
              helperText={budget > 0 ? `Total: ${formatCurrency(budget, market.currency)}` : ''}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, color: '#333' }}>
              Planning Mode
            </Typography>
            <ToggleButtonGroup
              value={planningMode}
              exclusive
              onChange={(_, value) => value && setPlanningMode(value)}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  py: 1.5,
                  borderColor: '#e0e0e0',
                  '&.Mui-selected': {
                    backgroundColor: '#02b5e7',
                    color: '#fff',
                    borderColor: '#02b5e7',
                    '&:hover': {
                      backgroundColor: '#0288d1',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="strategic">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesome sx={{ fontSize: 18 }} />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Strategic
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', fontSize: '10px' }}>
                      AI-optimised
                    </Typography>
                  </Box>
                </Box>
              </ToggleButton>
              <ToggleButton value="fixed-cpm">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney sx={{ fontSize: 18 }} />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Fixed-CPM
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', fontSize: '10px' }}>
                      Manual rates
                    </Typography>
                  </Box>
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
              {planningMode === 'strategic' 
                ? 'AI will optimise budget allocation based on your KPIs and channel performance'
                : 'Use fixed CPM rates for precise budget control and ratecard planning'}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/labs-v2')}
                sx={{ px: 3 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleCreate}
                disabled={!isFormValid}
                sx={{
                  backgroundColor: '#02b5e7',
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#0288d1' },
                  '&:disabled': { backgroundColor: '#ccc' },
                }}
              >
                Create & Continue
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default CreateCampaignPage;

