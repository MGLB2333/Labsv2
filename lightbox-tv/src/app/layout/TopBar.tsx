import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import UserDropdown from './UserDropdown';
import { useAuth } from '@/app/providers/AuthProvider';
import { useLogo } from '@/contexts/LogoContext';
import { useVersion } from '@/contexts/VersionContext';

const TopBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { selectedLogo } = useLogo();
  const { version, setVersion } = useVersion();

  const getLogoSource = () => {
    switch (selectedLogo) {
      case '7stars':
        return '/512px-The7stars_Logo.png';
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
            {version === 'v1' ? 'Labs V1' : 'Labs V2'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ToggleButtonGroup
            value={version}
            exclusive
            onChange={(_, newVersion) => {
              if (newVersion !== null) {
                setVersion(newVersion);
              }
            }}
            size="small"
            sx={{
              backgroundColor: '#1a1a1a',
              '& .MuiToggleButton-root': {
                color: '#999',
                borderColor: '#333',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'none',
                px: 1.5,
                py: 0.5,
                '&.Mui-selected': {
                  backgroundColor: '#02b5e7',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0288d1',
                  },
                },
                '&:hover': {
                  backgroundColor: '#2a2a2a',
                },
              },
            }}
          >
            <ToggleButton value="v1">Labs V1</ToggleButton>
            <ToggleButton value="v2">Labs V2</ToggleButton>
          </ToggleButtonGroup>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
