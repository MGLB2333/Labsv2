import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '@/app/providers/AuthProvider';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    
    setLoading(false);
  };

  if (success) {
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

        {/* Right Section - Success Message */}
        <Box
          sx={{
            width: '66.667%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontSize: '28px', fontWeight: 600, color: '#333', mb: 1 }}>
                Check Your Email
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '16px', mb: 3 }}>
                We've sent you a confirmation link at <strong>{email}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#999', fontSize: '14px' }}>
                Click the link in your email to activate your account, then you can sign in.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                borderColor: '#02b5e7',
                color: '#02b5e7',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                py: 1.5,
                px: 4,
                '&:hover': {
                  borderColor: '#02b5e7',
                  backgroundColor: 'rgba(2, 181, 231, 0.08)',
                },
              }}
            >
              Back to Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

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

      {/* Right Section - Sign Up Form */}
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
              Create Account
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '16px' }}>
              Sign up for your LightBoxTV account
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
              sx={{ mb: 2 }}
              disabled={loading}
              helperText="Must be at least 6 characters"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                mb: 2,
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
                'Create Account'
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#02b5e7',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
