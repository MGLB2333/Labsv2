import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Calculate, AutoAwesome } from '@mui/icons-material';
import PlanCanvas from './components/PlanCanvas';
import RFCard from './components/RFCard';
import OverlapHeatmap from './components/OverlapHeatmap';
import RecommendationsPanel from './components/RecommendationsPanel';
import PublisherBreakdown from './components/PublisherBreakdown';
import { forecastReach } from './logic/reach';
import { optimiseAllocation } from './logic/optimiser';
import type { Allocation, ForecastOutput, OptimiseOutput, ForecastInput } from './types';
import { initialAllocations, constraints } from './mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const XScreenReachPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [allocations, setAllocations] = useState<Allocation[]>(initialAllocations);
  const [forecast, setForecast] = useState<ForecastOutput | null>(null);
  const [recommendations, setRecommendations] = useState<OptimiseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial forecast on mount
  useEffect(() => {
    calculateForecast();
  }, []);

  const calculateForecast = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const input: ForecastInput = {
        marketId: 'UK',
        targetId: 'A25-54',
        allocations,
        constraints,
      };
      
      const result = forecastReach(input);
      setForecast(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate forecast');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimise = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const input: ForecastInput & { quantum: number } = {
        marketId: 'UK',
        targetId: 'A25-54',
        allocations,
        constraints,
        quantum: 5000,
      };
      
      const result = optimiseAllocation(input);
      setRecommendations(result);
      setActiveTab(2); // Switch to Optimise tab
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimise');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyMoves = () => {
    if (!recommendations) return;
    
    setAllocations(recommendations.newAllocations);
    setRecommendations(null);
    // Recalculate forecast with new allocations
    setTimeout(() => {
      calculateForecast();
      setActiveTab(0); // Switch back to Plan tab
    }, 100);
  };

  const handleAllocationChange = (publisherId: string, spend: number) => {
    setAllocations(prev =>
      prev.map(a => (a.publisherId === publisherId ? { ...a, spend } : a))
    );
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const totalSpend = allocations.reduce((sum, a) => sum + a.spend, 0);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333', mb: 0.5 }}>
            Cross-Screen Reach Optimiser
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', fontSize: '13px' }}>
            Analyse and optimise deduplicated reach across Linear TV, BVOD, CTV, and YouTube
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Calculate />}
            onClick={calculateForecast}
            disabled={isLoading}
            sx={{
              backgroundColor: '#02b5e7',
              color: '#fff',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 600,
              px: 2,
              py: 0.75,
              '&:hover': {
                backgroundColor: '#0288d1',
              },
            }}
          >
            Recalculate
          </Button>
          <Button
            variant="outlined"
            startIcon={<AutoAwesome />}
            onClick={handleOptimise}
            disabled={isLoading || !forecast}
            sx={{
              borderColor: '#02b5e7',
              color: '#02b5e7',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 600,
              px: 2,
              py: 0.75,
              '&:hover': {
                borderColor: '#0288d1',
                backgroundColor: '#f0f7ff',
              },
            }}
          >
            Optimise
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#02b5e7',
              height: 2,
            },
          }}
        >
          <Tab
            label="Plan"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
          <Tab
            label="Overview"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
          <Tab
            label="Optimise"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#02b5e7',
              },
              '&:not(.Mui-selected)': {
                color: '#666',
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={activeTab} index={0}>
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <PlanCanvas
            allocations={allocations}
            onAllocationChange={handleAllocationChange}
            totalSpend={totalSpend}
          />
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={2} sx={{ maxWidth: 1400, mx: 'auto' }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              {forecast && (
                <Box sx={{ flex: '0 0 auto' }}>
                  <RFCard
                    reach1p={forecast.reach1p}
                    reach3p={forecast.reach3p}
                    avgFreq={forecast.avgFreq}
                    cpir={forecast.cpir}
                  />
                </Box>
              )}
              {forecast && (
                <Box sx={{ flex: '1 1 auto' }}>
                  <OverlapHeatmap overlapMatrix={forecast.overlapMatrix} />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            {forecast && (
              <Box sx={{ height: '100%' }}>
                <PublisherBreakdown forecast={forecast} />
              </Box>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <RecommendationsPanel
            recommendations={recommendations}
            onApplyMoves={handleApplyMoves}
          />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default XScreenReachPage;
