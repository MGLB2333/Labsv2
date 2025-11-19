import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import type { OptimiseOutput } from '../types';
import { publishers } from '../mockData';

interface RecommendationsPanelProps {
  recommendations: OptimiseOutput | null;
  onApplyMoves: () => void;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  recommendations,
  onApplyMoves,
}) => {
  if (!recommendations || recommendations.moves.length === 0) {
    return (
      <Paper sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 1 }}>
          Optimisation Recommendations
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '13px' }}>
          Click "Optimise" to generate budget reallocation suggestions
        </Typography>
      </Paper>
    );
  }

  const formatCurrency = (value: number) => {
    return `£${(value / 1000).toFixed(0)}k`;
  };

  return (
    <Paper sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px' }}>
          Optimisation Recommendations
        </Typography>
        <Chip
          label={`${recommendations.moves.length} moves`}
          size="small"
          sx={{ backgroundColor: '#f0f7ff', color: '#02b5e7', fontSize: '11px' }}
        />
      </Box>

      <List dense>
        {recommendations.moves.map((move, index) => {
          const fromPub = publishers.find(p => p.id === move.from);
          const toPub = publishers.find(p => p.id === move.to);
          
          return (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 1,
                  px: 0,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <TrendingUp sx={{ fontSize: 16, color: '#02b5e7' }} />
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>
                        {formatCurrency(move.amount)} from {fromPub?.name || move.from} → {toPub?.name || move.to}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: '11px', color: '#666', mt: 0.5 }}>
                        {move.reason}
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              {index < recommendations.moves.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>

      {recommendations.projectedGain.reach1p > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: '#f0f7ff',
            borderRadius: 1,
            border: '1px solid #02b5e7',
          }}
        >
          <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', display: 'block' }}>
            Projected Gain
          </Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#02b5e7', mt: 0.5 }}>
            +{(recommendations.projectedGain.reach1p * 100).toFixed(2)}% Reach 1+
            {recommendations.projectedGain.cpir < 0 && (
              <span style={{ marginLeft: 8, color: '#4caf50' }}>
                (CPiR: £{Math.abs(recommendations.projectedGain.cpir).toFixed(2)} better)
              </span>
            )}
          </Typography>
        </Box>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={onApplyMoves}
        sx={{
          mt: 2,
          backgroundColor: '#02b5e7',
          color: '#fff',
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 600,
          py: 1.2,
          '&:hover': {
            backgroundColor: '#0288d1',
          },
        }}
      >
        Apply Moves
      </Button>
    </Paper>
  );
};

export default RecommendationsPanel;



