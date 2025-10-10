import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import { ExitToApp, Palette, Person } from '@mui/icons-material';
import { useAuth } from '@/app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface UserDropdownProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ open, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleMyProfile = () => {
    console.log('Navigate to My Profile');
    navigate('/profile');
    onClose();
  };

  const handleWhitelabel = () => {
    console.log('Navigate to Whitelabel');
    navigate('/whitelabel');
    onClose();
  };

  if (!open) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        mt: 1,
        minWidth: 280,
        borderRadius: 1,
        overflow: 'hidden',
        zIndex: 1300,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -8,
          right: 16,
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '8px solid white',
        },
      }}
    >
      {/* User Info Section */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#666',
              color: 'white',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#333',
                fontSize: '16px',
                lineHeight: 1.2,
              }}
            >
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: '14px',
                lineHeight: 1.2,
                mt: 0.5,
              }}
            >
              {user?.email || 'No email'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Menu Items */}
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth
          onClick={handleMyProfile}
          startIcon={<Person />}
          sx={{
            justifyContent: 'flex-start',
            textAlign: 'left',
            color: '#666',
            textTransform: 'none',
            fontWeight: 500,
            py: 1.5,
            px: 2,
            mb: 1,
            '&:hover': {
              backgroundColor: 'rgba(2, 181, 231, 0.08)',
              color: '#02b5e7',
            },
          }}
        >
          My Profile
        </Button>

        <Button
          fullWidth
          onClick={handleWhitelabel}
          startIcon={<Palette />}
          sx={{
            justifyContent: 'flex-start',
            textAlign: 'left',
            color: '#666',
            textTransform: 'none',
            fontWeight: 500,
            py: 1.5,
            px: 2,
            mb: 1,
            '&:hover': {
              backgroundColor: 'rgba(2, 181, 231, 0.08)',
              color: '#02b5e7',
            },
          }}
        >
          Whitelabel
        </Button>
      </Box>

      <Divider />

      {/* Sign Out Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ExitToApp />}
          onClick={handleSignOut}
          sx={{
            justifyContent: 'flex-start',
            textAlign: 'left',
            color: '#02b5e7',
            borderColor: '#02b5e7',
            textTransform: 'none',
            fontWeight: 500,
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(2, 181, 231, 0.08)',
              borderColor: '#02b5e7',
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Paper>
  );
};

export default UserDropdown;