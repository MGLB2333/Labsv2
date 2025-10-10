import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import { ArrowBack, Edit, Save, Cancel } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@lightboxtv.com',
    phone: '+44 20 7123 4567',
    company: 'LightBoxTV',
    jobTitle: 'Campaign Manager',
    department: 'Marketing',
    location: 'London, UK',
    bio: 'Experienced campaign manager with expertise in TV advertising and digital marketing strategies.',
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: '#666',
            '&:hover': {
              backgroundColor: 'rgba(2, 181, 231, 0.08)',
              color: '#02b5e7',
            },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          My Profile
        </Typography>
      </Box>

      {/* Profile Content */}
      <Grid container spacing={3}>
        {/* Left Column - Avatar and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#02b5e7',
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: 600,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333', mb: 1 }}>
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '14px', color: '#666', mb: 2 }}>
                {profileData.jobTitle}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#999' }}>
                {profileData.company} • {profileData.department}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, color: '#666', mb: 1 }}>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#333', mb: 0.5 }}>
                📧 {profileData.email}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#333', mb: 0.5 }}>
                📱 {profileData.phone}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#333' }}>
                📍 {profileData.location}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Detailed Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
                Profile Information
              </Typography>
              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  startIcon={<Edit />}
                  sx={{
                    textTransform: 'none',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#02b5e7',
                    '&:hover': {
                      backgroundColor: 'rgba(2, 181, 231, 0.08)',
                    },
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    onClick={handleCancel}
                    startIcon={<Cancel />}
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      borderColor: '#e0e0e0',
                      color: '#666',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    startIcon={<Save />}
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#02b5e7',
                      color: 'white',
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={isEditing ? editData.firstName : profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={isEditing ? editData.lastName : profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={isEditing ? editData.email : profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={isEditing ? editData.phone : profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={isEditing ? editData.company : profileData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={isEditing ? editData.jobTitle : profileData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={isEditing ? editData.department : profileData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={isEditing ? editData.location : profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={3}
                  value={isEditing ? editData.bio : profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '12px',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
