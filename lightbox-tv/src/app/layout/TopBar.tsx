import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography } from '@mui/material';
import UserDropdown from './UserDropdown';
import { useAuth } from '@/app/providers/AuthProvider';
import { useLogo } from '@/contexts/LogoContext';

const TopBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedLogo } = useLogo();

  const getLogoSource = () => {
    switch (selectedLogo) {
      case '7stars':
        return '/512px-The7stars_Logo.png';
      case 'dentsu':
        return '/DentsuTotalTVlogo (1).png';
      case 'custom':
        return '/LightBox_Custom_WhiteBlue.png'; // Fallback to default for now
      default:
        return '/LightBox_Custom_WhiteBlue.png';
    }
  };

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#000',
        height: 56,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
        '& .MuiToolbar-root': {
          height: '56px !important',
          minHeight: '56px !important',
          maxHeight: '56px !important',
          padding: '0 !important',
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
        }
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={getLogoSource()}
            alt={selectedLogo === '7stars' ? '7stars' : 'LightBoxTV'}
            sx={{
              height: 28,
              width: 'auto',
              maxWidth: 120,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: '#999',
              fontSize: '12px',
              fontWeight: 400,
              marginLeft: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Labs environment
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }} ref={avatarRef}>
          <Avatar
            onClick={handleAvatarClick}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#666',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#777',
              },
            }}
          >
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <UserDropdown
            open={dropdownOpen}
            anchorEl={avatarRef.current}
            onClose={handleCloseDropdown}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
