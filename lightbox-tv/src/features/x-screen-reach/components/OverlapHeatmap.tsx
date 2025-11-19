import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { publishers } from '../mockData';
import type { PairOverlap } from '../types';

interface OverlapHeatmapProps {
  overlapMatrix: PairOverlap[];
}

const OverlapHeatmap: React.FC<OverlapHeatmapProps> = ({ overlapMatrix }) => {
  // Create a matrix for the heatmap
  const publisherIds = publishers.map(p => p.id);
  const matrixData = publisherIds.map(a => {
    const row: any = { publisher: publishers.find(p => p.id === a)?.name || a };
    publisherIds.forEach(b => {
      if (a === b) {
        row[b] = 100; // Self overlap
      } else {
        const overlap = overlapMatrix.find(
          o => (o.a === a && o.b === b) || (o.a === b && o.b === a)
        );
        row[b] = overlap ? overlap.ovr_pct * 100 : 0;
      }
    });
    return row;
  });

  // Get color scale for heatmap
  const getColor = (value: number) => {
    if (value === 100) return '#e0e0e0'; // Self
    const intensity = Math.min(value / 50, 1); // Normalize to 0-1
    const r = Math.round(255 - intensity * 155); // 255 to 100
    const g = Math.round(200 - intensity * 120); // 200 to 80
    const b = Math.round(255 - intensity * 155); // 255 to 100
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Paper sx={{ p: 2.5, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 2 }}>
        Audience Overlap Matrix
      </Typography>
      <Box sx={{ overflowX: 'auto', flex: 1 }}>
        <Box>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', fontSize: '12px', fontWeight: 600, textAlign: 'left' }}></th>
                {publisherIds.map(id => (
                  <th
                    key={id}
                    style={{
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textAlign: 'center',
                      minWidth: 80,
                    }}
                  >
                    {publishers.find(p => p.id === id)?.name || id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixData.map((row, i) => (
                <tr key={row.publisher}>
                  <td
                    style={{
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textAlign: 'left',
                    }}
                  >
                    {row.publisher}
                  </td>
                  {publisherIds.map(id => {
                    const value = row[id];
                    const isSelf = publisherIds[i] === id;
                    return (
                      <td
                        key={id}
                        style={{
                          padding: '12px',
                          textAlign: 'center',
                          backgroundColor: getColor(value),
                          fontSize: '12px',
                          fontWeight: isSelf ? 600 : 400,
                          color: isSelf ? '#999' : '#333',
                          border: '1px solid #e0e0e0',
                        }}
                      >
                        {isSelf ? '-' : `${value.toFixed(1)}%`}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
      <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', mt: 1, display: 'block' }}>
        Values represent the percentage of overlapping audience between publishers
      </Typography>
    </Paper>
  );
};

export default OverlapHeatmap;

