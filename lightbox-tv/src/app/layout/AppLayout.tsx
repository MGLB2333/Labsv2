import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { useAuth } from '@/app/providers/AuthProvider';
import { useVersion } from '@/contexts/VersionContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { version } = useVersion();

  // Don't render layout for unauthenticated users
  if (!user) {
    return <>{children}</>;
  }

  // Skip layout for AI Assistant (full-page overlay)
  if (location.pathname === '/ai-assistant') {
    return <>{children}</>;
  }

  const isV2 = version === 'v2';

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      <TopBar />
      {!isV2 && <Sidebar />}
      <Box
        component="main"
        sx={{
          position: 'absolute',
          left: isV2 ? 0 : '225px',
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
