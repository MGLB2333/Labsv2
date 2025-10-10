import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { CheckCircle, Palette, Close, Info } from '@mui/icons-material';

const WhitelabelPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLogo, setSelectedLogo] = useState('default');
  const [requirementsModalOpen, setRequirementsModalOpen] = useState(false);

  console.log('WhitelabelPage rendered');

  const handleLogoSelect = (logoType: string) => {
    setSelectedLogo(logoType);
  };

  const handleSaveChanges = () => {
    // Save logo selection logic here
    console.log('Selected logo:', selectedLogo);
    navigate(-1);
  };

  const handleOpenRequirements = () => {
    setRequirementsModalOpen(true);
  };

  const handleCloseRequirements = () => {
    setRequirementsModalOpen(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          Whitelabel Settings
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper sx={{ p: 4, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
            Choose Application Logo
          </Typography>
          <Button
            onClick={handleOpenRequirements}
            startIcon={<Info />}
            sx={{
              textTransform: 'none',
              fontSize: '11px',
              fontWeight: 500,
              color: '#02b5e7',
              minWidth: 'auto',
              px: 1,
              py: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(2, 181, 231, 0.08)',
              },
            }}
          >
            Logo Requirements
          </Button>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#666', mb: 4 }}>
          Select how your application logo will appear in the header and throughout the platform.
        </Typography>
        
        {/* Logo Options */}
        <Grid container spacing={3}>
          {/* Default Logo */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                border: selectedLogo === 'default' ? '2px solid #02b5e7' : '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: selectedLogo === 'default' ? 'rgba(2, 181, 231, 0.02)' : '#fff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#02b5e7',
                  backgroundColor: 'rgba(2, 181, 231, 0.02)',
                },
              }}
            >
              <CardActionArea onClick={() => handleLogoSelect('default')}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <Box
                      sx={{
                        height: 50,
                        width: '100%',
                        backgroundColor: '#000',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src="/LightBox_Custom_WhiteBlue.png"
                        alt="LightBoxTV Logo"
                        sx={{
                          height: 40,
                          width: 'auto',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    {selectedLogo === 'default' && (
                      <Chip
                        icon={<CheckCircle />}
                        label="Selected"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: '#02b5e7',
                          color: 'white',
                          fontSize: '10px',
                          height: 20,
                          '& .MuiChip-icon': {
                            fontSize: 14,
                          },
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 1 }}>
                    LightBoxTV Default
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
                    Use the standard LightBoxTV branding and logo
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Custom Logo */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                border: selectedLogo === 'custom' ? '2px solid #02b5e7' : '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: selectedLogo === 'custom' ? 'rgba(2, 181, 231, 0.02)' : '#fff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#02b5e7',
                  backgroundColor: 'rgba(2, 181, 231, 0.02)',
                },
              }}
            >
              <CardActionArea onClick={() => handleLogoSelect('custom')}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <Box
                      sx={{
                        height: 50,
                        width: '100%',
                        backgroundColor: '#000',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #666',
                        p: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#999', fontSize: '12px', fontWeight: 500 }}>
                        Your Logo Here
                      </Typography>
                    </Box>
                    {selectedLogo === 'custom' && (
                      <Chip
                        icon={<CheckCircle />}
                        label="Selected"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: '#02b5e7',
                          color: 'white',
                          fontSize: '10px',
                          height: 20,
                          '& .MuiChip-icon': {
                            fontSize: 14,
                          },
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 1 }}>
                    Custom Logo
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
                    Upload your own company logo and branding
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Upload Section */}
        {selectedLogo === 'custom' && (
          <Box sx={{ mt: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 2 }}>
              Upload Your Logo
            </Typography>
            <Box
              sx={{
                border: '2px dashed #02b5e7',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                backgroundColor: '#000',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#111',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500, color: '#02b5e7', mb: 1 }}>
                Click to upload or drag and drop
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '11px', color: '#999' }}>
                PNG, JPG, SVG up to 2MB
              </Typography>
            </Box>
          </Box>
        )}
        
        {/* UI Colors Section */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>
              UI Colors
            </Typography>
            <Chip
              label="Coming Soon"
              size="small"
              sx={{
                backgroundColor: '#ff9800',
                color: 'white',
                fontSize: '10px',
                fontWeight: 600,
                height: 20,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Box>
          
          <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0', backgroundColor: '#f8f9fa' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Palette sx={{ fontSize: 20, color: '#666' }} />
              <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500, color: '#666' }}>
                Customize your application's color scheme
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#02b5e7',
                      borderRadius: 1,
                      mx: 'auto',
                      mb: 1,
                      border: '2px solid #e0e0e0',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500, color: '#333' }}>
                    Primary
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#000',
                      borderRadius: 1,
                      mx: 'auto',
                      mb: 1,
                      border: '2px solid #e0e0e0',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500, color: '#333' }}>
                    Header
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#f5f5f5',
                      borderRadius: 1,
                      mx: 'auto',
                      mb: 1,
                      border: '2px solid #e0e0e0',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500, color: '#333' }}>
                    Background
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#e0e0e0',
                      borderRadius: 1,
                      mx: 'auto',
                      mb: 1,
                      border: '2px solid #e0e0e0',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500, color: '#333' }}>
                    Borders
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', mt: 2, textAlign: 'center' }}>
              Color customization will be available in a future update
            </Typography>
          </Paper>
        </Box>
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 500,
              px: 3,
              py: 1,
              borderColor: '#e0e0e0',
              color: '#666',
              '&:hover': {
                borderColor: '#02b5e7',
                color: '#02b5e7',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 600,
              px: 3,
              py: 1,
              backgroundColor: '#02b5e7',
              color: 'white',
              '&:hover': {
                backgroundColor: '#02b5e7',
                opacity: 0.9,
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>

      {/* Logo Requirements Modal */}
      <Dialog
        open={requirementsModalOpen}
        onClose={handleCloseRequirements}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 1,
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
          },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          pb: 1,
          fontSize: '16px',
          fontWeight: 600,
          color: '#333'
        }}>
          Logo Requirements
          <IconButton
            onClick={handleCloseRequirements}
            sx={{ 
              color: '#666',
              '&:hover': {
                backgroundColor: 'rgba(2, 181, 231, 0.08)',
                color: '#02b5e7',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                  Size
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                  200×60px
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                  Format
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                  PNG, JPG, SVG
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                  File Size
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                  Max 2MB
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                  Background
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                  Transparent
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f7ff', borderRadius: 1, border: '1px solid #e3f2fd' }}>
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500, color: '#1976d2', mb: 1 }}>
              💡 Tips for best results:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
              • Use high-resolution images for crisp display<br/>
              • Ensure your logo is readable at small sizes<br/>
              • Test how your logo looks on dark backgrounds<br/>
              • Consider creating a simplified version for small spaces
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Button
            onClick={handleCloseRequirements}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 600,
              px: 3,
              py: 0.5,
              backgroundColor: '#02b5e7',
              color: 'white',
              '&:hover': {
                backgroundColor: '#02b5e7',
                opacity: 0.9,
              },
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WhitelabelPage;
