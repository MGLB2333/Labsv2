import React from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, CheckCircle, ArrowBack } from '@mui/icons-material';
import { Card } from '../components/common/Card';
import { PageHeader } from '../components/layout/PageHeader';
import { EmptyState } from '../components/common/EmptyState';
import { useCampaignStore } from '../store/campaignStore';

const OptimiserPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCampaign, scenarios, selectedScenario, setSelectedScenario } = useCampaignStore();

  if (!currentCampaign) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', py: 8 }}>
        <EmptyState
          title="No Campaign Selected"
          description="Create a campaign first to optimise budget allocation"
        />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button onClick={() => navigate('/labs-v2/create')} variant="contained" size="large">
            Create Campaign
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <PageHeader
        title="Budget Optimisation"
        subtitle={`Optimise budget allocation for ${currentCampaign.name}`}
        breadcrumbs={[
          { label: 'Home', path: '/labs-v2' },
          { label: 'Planner', path: '/labs-v2/planner' },
          { label: 'Optimiser' },
        ]}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card title="Optimisation Scenarios">
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Choose a scenario to see how budget allocation changes based on your goals
            </Typography>
            {scenarios.map((scenario) => (
              <Paper
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                sx={{
                  p: 2.5,
                  mb: 2,
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: selectedScenario?.id === scenario.id ? '2px solid #02b5e7' : '1px solid #e0e0e0',
                  backgroundColor: selectedScenario?.id === scenario.id ? '#f0f7ff' : '#fff',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#02b5e7',
                    boxShadow: '0 2px 8px rgba(2, 181, 231, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    {scenario.name}
                  </Typography>
                  {selectedScenario?.id === scenario.id && (
                    <CheckCircle sx={{ fontSize: 20, color: '#02b5e7' }} />
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: '#666', mb: 1.5 }}>
                  {scenario.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={`Reach: ${Math.round(scenario.reachWeight * 100)}%`}
                    size="small"
                    sx={{ fontSize: '11px', height: 24 }}
                  />
                  <Chip
                    label={`Efficiency: ${Math.round(scenario.efficiencyWeight * 100)}%`}
                    size="small"
                    sx={{ fontSize: '11px', height: 24 }}
                  />
                </Box>
              </Paper>
            ))}
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 8 }}>
          <Card title="Optimisation Results">
            {selectedScenario ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {selectedScenario.name} Scenario
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {selectedScenario.description}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<TrendingUp />}
                    sx={{
                      backgroundColor: '#02b5e7',
                      '&:hover': { backgroundColor: '#0288d1' },
                    }}
                  >
                    Run Optimisation
                  </Button>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <TrendingUp sx={{ fontSize: 64, color: '#e0e0e0', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#666' }}>
                    Ready to Optimise
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999', mb: 3 }}>
                    Click "Run Optimisation" to generate budget allocation recommendations
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <TrendingUp sx={{ fontSize: 64, color: '#e0e0e0', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#666' }}>
                  Select a Scenario
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  Choose an optimisation scenario from the left to see budget allocation recommendations
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/labs-v2/planner')}
        >
          Back to Planner
        </Button>
      </Box>
    </Box>
  );
};

export default OptimiserPage;

