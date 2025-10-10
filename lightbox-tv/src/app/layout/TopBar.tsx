import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography } from '@mui/material';
import UserDropdown from './UserDropdown';
import { useAuth } from '@/app/providers/AuthProvider';

const TopBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
      }}
    >
      <Toolbar sx={{ height: 56, minHeight: 56, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Box
            component="img"
            src="/LightBox_Custom_WhiteBlue.png"
            alt="LightBoxTV"
            sx={{
              height: 28,
              width: 'auto',
              maxWidth: 120,
              objectFit: 'contain',
              display: 'flex',
              alignItems: 'center',
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
              display: 'flex',
              alignItems: 'center',
              height: '100%',
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
