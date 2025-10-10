import React from 'react';
import { Card, Box, Typography, Button } from '@mui/material';
import { Science, Email } from '@mui/icons-material';

interface LabsEmptySlateProps {
  title: string;
  description?: string;
}

const LabsEmptySlate: React.FC<LabsEmptySlateProps> = ({ title, description }) => {
  return (
    <Card
      sx={{
        p: 6,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        textAlign: 'center',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ mb: 3, color: '#02b5e7' }}>
        <Science sx={{ fontSize: 64 }} />
      </Box>
      
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 600, 
          color: '#333', 
          mb: 2,
          fontSize: '24px'
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#666', 
          mb: 3,
          maxWidth: 500,
          lineHeight: 1.6,
          fontSize: '16px'
        }}
      >
        {description || 'This feature is not available in the Labs environment.'}
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#999', 
          mb: 4,
          maxWidth: 400,
          lineHeight: 1.5,
          fontSize: '14px'
        }}
      >
        Contact LightBoxTV to access this functionality in the production environment.
      </Typography>
      
      <Button
        variant="contained"
        startIcon={<Email />}
        sx={{
          backgroundColor: '#02b5e7',
          color: 'white',
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '14px',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: '#0288d1',
          },
        }}
        onClick={() => window.open('mailto:contact@lightboxtv.com', '_blank')}
      >
        Contact LightBoxTV
      </Button>
    </Card>
  );
};

export default LabsEmptySlate;
