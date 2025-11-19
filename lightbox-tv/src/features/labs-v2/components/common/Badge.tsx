import React from 'react';
import { Chip } from '@mui/material';

interface BadgeProps {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'filled' | 'outlined';
}

export const Badge: React.FC<BadgeProps> = ({ label, color = 'default', variant = 'filled' }) => {
  return <Chip label={label} color={color} variant={variant} size="small" />;
};


