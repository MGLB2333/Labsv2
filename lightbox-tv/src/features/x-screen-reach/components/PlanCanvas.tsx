import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import type { Allocation } from '../types';
import { publishers } from '../mockData';

interface PlanCanvasProps {
  allocations: Allocation[];
  onAllocationChange: (publisherId: string, spend: number) => void;
  totalSpend: number;
}

const PlanCanvas: React.FC<PlanCanvasProps> = ({ allocations, onAllocationChange, totalSpend }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px' }}>
          Budget Allocation
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
          Total: {formatCurrency(totalSpend)}
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>Publisher</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }}>Channel</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }} align="right">
                CPM (£)
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '12px' }} align="right">
                Spend (£)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocations.map((allocation) => {
              const publisher = publishers.find(p => p.id === allocation.publisherId);
              if (!publisher) return null;
              
              return (
                <TableRow key={allocation.publisherId} hover>
                  <TableCell sx={{ fontSize: '13px' }}>{publisher.name}</TableCell>
                  <TableCell sx={{ fontSize: '13px', color: '#666' }}>
                    {publisher.channelId}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '13px', color: '#666' }}>
                    {publisher.cpm.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={allocation.spend}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        onAllocationChange(allocation.publisherId, value);
                      }}
                      size="small"
                      sx={{
                        width: 120,
                        '& .MuiOutlinedInput-root': {
                          fontSize: '13px',
                        },
                      }}
                      inputProps={{
                        min: 0,
                        step: 1000,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PlanCanvas;



