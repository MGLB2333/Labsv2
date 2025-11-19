import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { AutoAwesome, TrendingUp, Assessment } from '@mui/icons-material';
import { CreateCampaignPage, PlannerPage, OptimiserPage } from './pages';
import { useCampaignStore } from './store/campaignStore';
import { Card } from './components/common/Card';

const HomePage: React.FC = () => {
  const { currentCampaign } = useCampaignStore();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
          Next Gen Video Optimiser
        </Typography>
        <Typography variant="h6" sx={{ color: '#666', fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
          Intelligently allocate video budgets across Linear TV, BVOD, CTV, OLV and Social Video
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <AutoAwesome sx={{ fontSize: 40, color: '#02b5e7', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Create Campaign
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Set up your campaign with budget, dates, and planning mode
            </Typography>
            <Button
              variant="contained"
              fullWidth
              href="/labs-v2/create"
              sx={{
                backgroundColor: '#02b5e7',
                '&:hover': { backgroundColor: '#0288d1' },
              }}
            >
              Get Started
            </Button>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <Assessment sx={{ fontSize: 40, color: '#02b5e7', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Plan & Configure
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Configure KPIs, select audiences, and review channel options
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              href="/labs-v2/planner"
              disabled={!currentCampaign}
            >
              {currentCampaign ? 'View Planner' : 'Create Campaign First'}
            </Button>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <TrendingUp sx={{ fontSize: 40, color: '#02b5e7', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Optimise Budget
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              AI-powered budget allocation across channels based on your goals
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              href="/labs-v2/optimiser"
              disabled={!currentCampaign}
            >
              {currentCampaign ? 'Optimise Now' : 'Create Campaign First'}
            </Button>
          </Card>
        </Grid>
      </Grid>

      {currentCampaign && (
        <Paper
          sx={{
            mt: 6,
            p: 3,
            backgroundColor: '#f0f7ff',
            border: '1px solid #02b5e7',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Active Campaign: {currentCampaign.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            Continue working on your campaign
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" href="/labs-v2/planner" size="small">
              Go to Planner
            </Button>
            <Button variant="outlined" href="/labs-v2/optimiser" size="small">
              Optimise Budget
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const LabsV2Page: React.FC = () => {
  const location = useLocation();
  
  // If at root, show home page
  if (location.pathname === '/labs-v2' || location.pathname === '/labs-v2/') {
    return <HomePage />;
  }

  return (
    <Routes>
      <Route path="create" element={<CreateCampaignPage />} />
      <Route path="planner" element={<PlannerPage />} />
      <Route path="optimiser" element={<OptimiserPage />} />
      <Route path="*" element={<Navigate to="/labs-v2" replace />} />
    </Routes>
  );
};

export default LabsV2Page;

