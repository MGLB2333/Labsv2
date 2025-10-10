import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '@/app/providers/AuthProvider';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Left Section - Black with Logo */}
      <Box
        sx={{
          width: '33.333%',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          src="/LightBox_Custom_WhiteBlue.png"
          alt="LightBoxTV"
          sx={{
            height: 80,
            width: 'auto',
            maxWidth: 250,
            objectFit: 'contain',
            mb: 3,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: '#999',
            fontSize: '16px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Labs Environment
        </Typography>
      </Box>

      {/* Right Section - Login Form */}
      <Box
        sx={{
          width: '66.667%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontSize: '28px', fontWeight: 600, color: '#333', mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '16px' }}>
              Sign in to your LightBoxTV account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
              disabled={loading}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2, fontSize: '14px' }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#02b5e7',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#02b5e7',
                  opacity: 0.9,
                },
                '&:disabled': {
                  backgroundColor: '#02b5e7',
                  opacity: 0.6,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{
                    color: '#02b5e7',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
