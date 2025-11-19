import React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  sx?: object;
}

export const Card: React.FC<CardProps> = ({ children, title, subtitle, sx }) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        border: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        ...sx,
      }}
    >
      {title && (
        <Box sx={{ mb: subtitle ? 1 : 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: '#333' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: '#666', mt: 0.5, fontSize: '13px' }}>
              {subtitle}
            </Typography>
          )}
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}
      {children}
    </Paper>
  );
};

