import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; path?: string }>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = () => {
    if (breadcrumbs) return breadcrumbs;
    
    // Auto-generate from path
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.includes('labs-v2')) {
      return [
        { label: 'Home', path: '/labs-v2' },
        ...paths.slice(paths.indexOf('labs-v2') + 1).map((p, i, arr) => ({
          label: p.charAt(0).toUpperCase() + p.slice(1),
          path: i === arr.length - 1 ? undefined : `/labs-v2/${p}`,
        })),
      ];
    }
    return [];
  };

  return (
    <Box sx={{ mb: 4 }}>
      {getBreadcrumbs().length > 0 && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {getBreadcrumbs().map((crumb, index) => {
            if (crumb.path && index < getBreadcrumbs().length - 1) {
              return (
                <Link
                  key={index}
                  component="button"
                  variant="body2"
                  onClick={() => navigate(crumb.path!)}
                  sx={{
                    color: '#666',
                    textDecoration: 'none',
                    '&:hover': { color: '#02b5e7' },
                    cursor: 'pointer',
                  }}
                >
                  {crumb.label}
                </Link>
              );
            }
            return (
              <Typography key={index} variant="body2" sx={{ color: '#999' }}>
                {crumb.label}
              </Typography>
            );
          })}
        </Breadcrumbs>
      )}
      <Typography variant="h4" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: '#666', fontSize: '15px' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};


