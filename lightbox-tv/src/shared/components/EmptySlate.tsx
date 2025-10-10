import React from 'react';
import { Card, Box, Typography } from '@mui/material';

interface EmptySlateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const EmptySlate: React.FC<EmptySlateProps> = ({ title, description, icon }) => {
  return (
    <Card
      sx={{
        p: 4,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        textAlign: 'center',
        boxShadow: 'none',
      }}
    >
      {icon && (
        <Box sx={{ mb: 2, color: 'text.secondary' }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Card>
  );
};

export default EmptySlate;
