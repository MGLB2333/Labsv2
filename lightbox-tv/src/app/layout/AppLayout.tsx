import React from 'react';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { useAuth } from '@/app/providers/AuthProvider';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  // Don't render layout for unauthenticated users
  if (!user) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      <TopBar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          position: 'absolute',
          left: '225px',
          top: '56px',
          right: 0,
          bottom: 0,
          p: 3,
          backgroundColor: '#f5f5f5',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
