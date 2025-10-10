import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import { Close, BarChart, Download, Update, History, MoreVert } from '@mui/icons-material';

// Mock data based on the Excel spreadsheet
const campaignData = {
  client: 'Client & Product',
  spend: 'NET',
  approvalDate: 'Date approved/sent final on caria',
  month: 'Campaign Month',
  ddsCode: 'Campaign code',
  budget: 2000000,
  valuePot: 70000,
  total: 2070000,
  valueDelivered: 763688.75,
  difference: -1306311.25,
};

const stationData = [
  // HP+CH Audience
  { station: 'Carlton', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 14.06, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 92.04, deliveredTa1: 87.04, diffTvrs: -5, deliveredTa2: 87.04, ta2Universe: 14.06, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 104024.50, difference: -5975.50 },
  { station: 'LWT', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 16.69, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 77.54, deliveredTa1: 97.04, diffTvrs: 5, deliveredTa2: 97.04, ta2Universe: 16.69, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 115975.50, difference: 5975.50 },
  { station: 'Midwest', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 17.77, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 72.83, deliveredTa1: 72.54, diffTvrs: -5, deliveredTa2: 72.54, ta2Universe: 17.77, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 102906.75, difference: -7093.25 },
  { station: 'North', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 4.85, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 266.83, deliveredTa1: 77.83, diffTvrs: 5, deliveredTa2: 77.83, ta2Universe: 4.85, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 93862.25, difference: -2061.25 },
  { station: 'Scotland', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 13.03, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 99.32, deliveredTa1: 261.83, diffTvrs: 5, deliveredTa2: 261.83, ta2Universe: 13.03, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 107552.25, difference: 7552.25 },
  { station: 'Southeast', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 1.95, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 663.65, deliveredTa1: 94.32, diffTvrs: 5, deliveredTa2: 94.32, ta2Universe: 1.95, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 110828.75, difference: 828.75 },
  { station: 'Ulster', audience: 'HP+CH', budget: 100000, valuePot: 10000, total: 110000, universe: 0, cpt: 100, discount: 0.85, discountedCpt: 85, secondLength: 1, premium: 1, affordedTvrs: 0, deliveredTa1: 668.65, diffTvrs: 5, deliveredTa2: 668.65, ta2Universe: 0, convToTa2: 1, plannedConv: 1, convDiff: 0, valueDelivered: 0, difference: -5537.75 },
  
  // COA Audience
  { station: 'Carlton', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
  { station: 'LWT', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
  { station: 'Midwest', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
  { station: 'North', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
  { station: 'Scotland', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
  { station: 'Southeast', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
  { station: 'Ulster', audience: 'COA', budget: 0, valuePot: 0, total: 0, universe: 0, cpt: 0, discount: 0, discountedCpt: 0, secondLength: 0, premium: 0, affordedTvrs: 0, deliveredTa1: 0, diffTvrs: 0, deliveredTa2: 0, ta2Universe: 0, convToTa2: 0, plannedConv: 0, convDiff: 0, valueDelivered: 0, difference: 0 },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatNumber = (num: number, decimals = 2) => {
  return num.toFixed(decimals);
};

const FrontsheetTab: React.FC = () => {
  const [audienceModalOpen, setAudienceModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);

  // Calculate totals
  const hpChData = stationData.filter(item => item.audience === 'HP+CH');
  const hpChTotals = {
    budget: hpChData.reduce((sum, item) => sum + item.budget, 0),
    valuePot: hpChData.reduce((sum, item) => sum + item.valuePot, 0),
    total: hpChData.reduce((sum, item) => sum + item.total, 0),
    universe: hpChData.reduce((sum, item) => sum + item.universe, 0),
    affordedTvrs: hpChData.reduce((sum, item) => sum + item.affordedTvrs, 0),
    deliveredTa1: hpChData.reduce((sum, item) => sum + item.deliveredTa1, 0),
    diffTvrs: hpChData.reduce((sum, item) => sum + item.diffTvrs, 0),
    deliveredTa2: hpChData.reduce((sum, item) => sum + item.deliveredTa2, 0),
    ta2Universe: hpChData.reduce((sum, item) => sum + item.ta2Universe, 0),
    valueDelivered: hpChData.reduce((sum, item) => sum + item.valueDelivered, 0),
    difference: hpChData.reduce((sum, item) => sum + item.difference, 0),
  };

  const handleOpenAudienceModal = () => {
    setAudienceModalOpen(true);
  };

  const handleCloseAudienceModal = () => {
    setAudienceModalOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDownload = () => {
    handleMenuClose();
    // Download functionality here
  };

  const handleChangeLog = () => {
    handleMenuClose();
    // Change log functionality here
  };


  return (
    <Box>
      {/* Campaign Details with Action Buttons */}
      <Paper sx={{ p: 2, mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>
            Campaign Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<BarChart />}
              onClick={handleOpenAudienceModal}
              sx={{
                textTransform: 'none',
                fontSize: '11px',
                fontWeight: 500,
                px: 2,
                py: 0.25,
                borderColor: '#02b5e7',
                color: '#02b5e7',
                '&:hover': {
                  borderColor: '#02b5e7',
                  backgroundColor: 'rgba(2, 181, 231, 0.08)',
                },
              }}
            >
              Audience Summary
            </Button>
            <Button
              variant="contained"
              startIcon={<Update />}
              sx={{
                textTransform: 'none',
                fontSize: '11px',
                fontWeight: 600,
                px: 2,
                py: 0.25,
                backgroundColor: '#02b5e7',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#02b5e7',
                  opacity: 0.9,
                },
              }}
            >
              Update Data
            </Button>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(2, 181, 231, 0.08)',
                  color: '#02b5e7',
                  borderColor: '#02b5e7',
                },
              }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
              Client/Product
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '11px', fontWeight: 600 }}>
              {campaignData.client}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
              Spend CTC
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '11px', fontWeight: 600 }}>
              {campaignData.spend}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
              Approval Date
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '11px', fontWeight: 600 }}>
              {campaignData.approvalDate}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
              Campaign Month
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '11px', fontWeight: 600 }}>
              {campaignData.month}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* More Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
            minWidth: 160,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDownload} sx={{ py: 1 }}>
          <ListItemIcon>
            <Download sx={{ fontSize: 18, color: '#666' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Download" 
            primaryTypographyProps={{ fontSize: '12px', fontWeight: 500 }}
          />
        </MenuItem>
        <MenuItem onClick={handleChangeLog} sx={{ py: 1 }}>
          <ListItemIcon>
            <History sx={{ fontSize: 18, color: '#666' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Change Log" 
            primaryTypographyProps={{ fontSize: '12px', fontWeight: 500 }}
          />
        </MenuItem>
      </Menu>

      {/* Audience Summary Modal */}
      <Dialog
        open={audienceModalOpen}
        onClose={handleCloseAudienceModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 1,
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          pb: 1,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          fontSize: '16px',
          fontWeight: 600,
          color: '#333'
        }}>
          Weekly Audience Summary
          <IconButton
            onClick={handleCloseAudienceModal}
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
        
        <DialogContent sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <Paper sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      Audience
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      W/C
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      ?
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      ?
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      ?
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      ?
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      ?
                    </TableCell>
                    <TableCell sx={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#666', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0' }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Primary Audience */}
                  <TableRow>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }} rowSpan={3}>
                      Primary
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      Planned
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      0
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      Delivered
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      0
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, backgroundColor: '#fff' }}>
                      Difference
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, backgroundColor: '#fff' }}>
                      0
                    </TableCell>
                  </TableRow>
                  
                  {/* Secondary Audience */}
                  <TableRow>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }} rowSpan={3}>
                      Secondary
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      Planned
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      0
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      Delivered
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}></TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
                      0
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, backgroundColor: '#fff' }}>
                      Difference
                    </TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', py: 0.5, px: 1, backgroundColor: '#fff' }}>0</TableCell>
                    <TableCell sx={{ fontSize: '11px', fontWeight: 500, py: 0.5, px: 1, backgroundColor: '#fff' }}>
                      0
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, backgroundColor: '#fff', borderTop: '1px solid #e0e0e0' }}>
          <Button
            onClick={handleCloseAudienceModal}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 500,
              px: 3,
              py: 0.5,
              borderColor: '#e0e0e0',
              color: '#666',
              '&:hover': {
                borderColor: '#02b5e7',
                color: '#02b5e7',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Data Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Station
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Audience
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Budget
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Value Pot
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Universe
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                CPT
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Discount
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Disc. CPT
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Sec Length
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Premium
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Afforded TVRs
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Del. TA1 TVRs
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Diff TVRs
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80 }}>
                Del. TA2 TVRs
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                TA2 Univ
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Conv TA2
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Plan Conv
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60 }}>
                Conv Diff
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 100 }}>
                Value Delivered
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 100 }}>
                Difference (Inc VP)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* HP+CH Section */}
            {stationData.filter(item => item.audience === 'HP+CH').map((station, index) => (
              <TableRow key={`hpch-${index}`} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}>
                  {station.station}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}>
                  <Chip label={station.audience} size="small" sx={{ fontSize: '9px', height: 20 }} />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.budget)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.valuePot)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.total)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.universe)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.cpt)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.discount)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.discountedCpt)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.secondLength)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {station.premium}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.affordedTvrs)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.deliveredTa1)}
                </TableCell>
                <TableCell sx={{ 
                  borderBottom: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px', 
                  textAlign: 'right',
                  color: station.diffTvrs < 0 ? '#d32f2f' : station.diffTvrs > 0 ? '#2e7d32' : '#666',
                  fontWeight: station.diffTvrs !== 0 ? 600 : 400
                }}>
                  {station.diffTvrs > 0 ? '+' : ''}{formatNumber(station.diffTvrs)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.deliveredTa2)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.ta2Universe)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.convToTa2)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.plannedConv)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.convDiff)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.valueDelivered)}
                </TableCell>
                <TableCell sx={{ 
                  borderBottom: '1px solid #e0e0e0', 
                  py: 0.5, 
                  fontSize: '10px', 
                  textAlign: 'right',
                  color: station.difference < 0 ? '#d32f2f' : station.difference > 0 ? '#2e7d32' : '#666',
                  fontWeight: station.difference !== 0 ? 600 : 400
                }}>
                  {station.difference > 0 ? '+' : ''}{formatCurrency(station.difference)}
                </TableCell>
              </TableRow>
            ))}
            
            {/* HP+CH Subtotal */}
            <TableRow sx={{ backgroundColor: '#f0f0f0', fontWeight: 600 }}>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', fontWeight: 600 }}>
                HP+CH Subtotal
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(hpChTotals.budget)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(hpChTotals.valuePot)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(hpChTotals.total)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.universe)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.affordedTvrs)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.deliveredTa1)}
              </TableCell>
              <TableCell sx={{ 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                fontSize: '10px', 
                textAlign: 'right',
                color: hpChTotals.diffTvrs < 0 ? '#d32f2f' : hpChTotals.diffTvrs > 0 ? '#2e7d32' : '#666',
                fontWeight: 600
              }}>
                {hpChTotals.diffTvrs > 0 ? '+' : ''}{formatNumber(hpChTotals.diffTvrs)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.deliveredTa2)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.ta2Universe)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(hpChTotals.valueDelivered)}
              </TableCell>
              <TableCell sx={{ 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                fontSize: '10px', 
                textAlign: 'right',
                color: hpChTotals.difference < 0 ? '#d32f2f' : hpChTotals.difference > 0 ? '#2e7d32' : '#666',
                fontWeight: 600
              }}>
                {hpChTotals.difference > 0 ? '+' : ''}{formatCurrency(hpChTotals.difference)}
              </TableCell>
            </TableRow>

            {/* COA Section */}
            {stationData.filter(item => item.audience === 'COA').map((station, index) => (
              <TableRow key={`coa-${index}`} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}>
                  {station.station}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}>
                  <Chip label={station.audience} size="small" sx={{ fontSize: '9px', height: 20, backgroundColor: '#e3f2fd' }} />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.budget)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.valuePot)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.total)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.universe)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.cpt)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.discount)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.discountedCpt)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.secondLength)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {station.premium}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.affordedTvrs)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.deliveredTa1)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.diffTvrs)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.deliveredTa2)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.ta2Universe)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.convToTa2)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.plannedConv)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatNumber(station.convDiff)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.valueDelivered)}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right' }}>
                  {formatCurrency(station.difference)}
                </TableCell>
              </TableRow>
            ))}

            {/* Grand Total */}
            <TableRow sx={{ backgroundColor: '#e3f2fd', fontWeight: 600 }}>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', fontWeight: 600 }}>
                Grand Total
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(campaignData.budget)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(campaignData.valuePot)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(campaignData.total)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.affordedTvrs)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.deliveredTa1)}
              </TableCell>
              <TableCell sx={{ 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                fontSize: '10px', 
                textAlign: 'right',
                color: hpChTotals.diffTvrs < 0 ? '#d32f2f' : hpChTotals.diffTvrs > 0 ? '#2e7d32' : '#666',
                fontWeight: 600
              }}>
                {hpChTotals.diffTvrs > 0 ? '+' : ''}{formatNumber(hpChTotals.diffTvrs)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.deliveredTa2)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatNumber(hpChTotals.ta2Universe)}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px' }}></TableCell>
              <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5, fontSize: '10px', textAlign: 'right', fontWeight: 600 }}>
                {formatCurrency(campaignData.valueDelivered)}
              </TableCell>
              <TableCell sx={{ 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                fontSize: '10px', 
                textAlign: 'right',
                color: campaignData.difference < 0 ? '#d32f2f' : campaignData.difference > 0 ? '#2e7d32' : '#666',
                fontWeight: 600
              }}>
                {campaignData.difference > 0 ? '+' : ''}{formatCurrency(campaignData.difference)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FrontsheetTab;
