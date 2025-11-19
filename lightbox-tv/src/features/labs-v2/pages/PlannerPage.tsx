import React from 'react';
import { Box, Typography, Button, Grid, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, CalendarToday, AttachMoney, AutoAwesome } from '@mui/icons-material';
import { Card } from '../components/common/Card';
import { PageHeader } from '../components/layout/PageHeader';
import { EmptyState } from '../components/common/EmptyState';
import { useCampaignStore } from '../store/campaignStore';
import { formatCurrency } from '../lib/utils/currency';

const PlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCampaign } = useCampaignStore();

  if (!currentCampaign) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', py: 8 }}>
        <EmptyState
          title="No Campaign Selected"
          description="Create a new campaign to start planning your video budget allocation"
          icon={<AutoAwesome sx={{ fontSize: 64, color: '#02b5e7', mb: 2 }} />}
        />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            onClick={() => navigate('/labs-v2/create')}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#02b5e7',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { backgroundColor: '#0288d1' },
            }}
          >
            Create New Campaign
          </Button>
        </Box>
      </Box>
    );
  }

  const allocatedBudget = currentCampaign.channels.reduce((sum, c) => sum + c.budget, 0);
  const remainingBudget = currentCampaign.totalBudget - allocatedBudget;

  return (
    <Box sx={{ py: 3 }}>
      <PageHeader
        title={currentCampaign.name}
        subtitle={`${currentCampaign.advertiser} • ${formatCurrency(currentCampaign.totalBudget, currentCampaign.currency)}`}
        breadcrumbs={[
          { label: 'Home', path: '/labs-v2' },
          { label: 'Planner' },
        ]}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/labs-v2/optimiser')}
          size="large"
          sx={{
            backgroundColor: '#02b5e7',
            px: 4,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { backgroundColor: '#0288d1' },
          }}
        >
          <TrendingUp sx={{ mr: 1, fontSize: 20 }} />
          Optimise Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card title="Campaign Overview">
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase', fontSize: '11px', letterSpacing: 0.5 }}>
                    Total Budget
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mt: 0.5 }}>
                    {formatCurrency(currentCampaign.totalBudget, currentCampaign.currency)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase', fontSize: '11px', letterSpacing: 0.5 }}>
                    Allocated
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#02b5e7', mt: 0.5 }}>
                    {formatCurrency(allocatedBudget, currentCampaign.currency)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase', fontSize: '11px', letterSpacing: 0.5 }}>
                    Remaining
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: remainingBudget > 0 ? '#4caf50' : '#f44336', mt: 0.5 }}>
                    {formatCurrency(remainingBudget, currentCampaign.currency)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase', fontSize: '11px', letterSpacing: 0.5 }}>
                    Channels
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mt: 0.5 }}>
                    {currentCampaign.channels.length}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1.5, fontWeight: 500 }}>
                Campaign Period
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CalendarToday sx={{ fontSize: 18, color: '#666' }} />
                <Typography variant="body2" sx={{ color: '#333' }}>
                  {new Date(currentCampaign.startDate).toLocaleDateString()} - {new Date(currentCampaign.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: '#666', mb: 1.5, fontWeight: 500 }}>
                Planning Mode
              </Typography>
              <Chip
                label={currentCampaign.planningMode === 'strategic' ? 'Strategic (AI-Optimised)' : 'Fixed-CPM'}
                color={currentCampaign.planningMode === 'strategic' ? 'primary' : 'default'}
                size="small"
              />
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card title="Quick Actions">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/labs-v2/optimiser')}
                sx={{ justifyContent: 'flex-start', py: 1.5 }}
              >
                <TrendingUp sx={{ mr: 1 }} />
                Optimise Budget
              </Button>
              <Button
                variant="outlined"
                fullWidth
                disabled
                sx={{ justifyContent: 'flex-start', py: 1.5 }}
              >
                Configure KPIs
              </Button>
              <Button
                variant="outlined"
                fullWidth
                disabled
                sx={{ justifyContent: 'flex-start', py: 1.5 }}
              >
                Select Audience
              </Button>
            </Box>
          </Card>
          
          <Card title="Status" sx={{ mt: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                KPIs: {currentCampaign.kpis.length > 0 ? 'Configured' : 'Not set'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                Audience: {currentCampaign.audience.id ? 'Selected' : 'Not selected'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Channels: {currentCampaign.channels.length > 0 ? 'Allocated' : 'Not allocated'}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlannerPage;

