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
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { Download, Update, History, MoreVert, Warning } from '@mui/icons-material';

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

const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '£0.00';
  }
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatNumber = (num: number | undefined, decimals = 2) => {
  if (num === undefined || num === null || isNaN(num)) {
    return '0.00';
  }
  return num.toFixed(decimals);
};

const FrontsheetTab: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const menuOpen = Boolean(menuAnchorEl);

  // Calculate totals
  const hpChData = stationData.filter(item => item.audience === 'HP+CH');
  const hpChTotals = {
    budget: hpChData.reduce((sum, item) => sum + (item.budget || 0), 0),
    valuePot: hpChData.reduce((sum, item) => sum + (item.valuePot || 0), 0),
    total: hpChData.reduce((sum, item) => sum + (item.total || 0), 0),
    universe: hpChData.reduce((sum, item) => sum + (item.universe || 0), 0),
    affordedTvrs: hpChData.reduce((sum, item) => sum + (item.affordedTvrs || 0), 0),
    deliveredTa1: hpChData.reduce((sum, item) => sum + (item.deliveredTa1 || 0), 0),
    diffTvrs: hpChData.reduce((sum, item) => sum + (item.diffTvrs || 0), 0),
    deliveredTa2: hpChData.reduce((sum, item) => sum + (item.deliveredTa2 || 0), 0),
    ta2Universe: hpChData.reduce((sum, item) => sum + (item.ta2Universe || 0), 0),
    convToTa2: hpChData.reduce((sum, item) => sum + (item.convToTa2 || 0), 0),
    plannedConv: hpChData.reduce((sum, item) => sum + (item.plannedConv || 0), 0),
    convDiff: hpChData.reduce((sum, item) => sum + (item.convDiff || 0), 0),
    valueDelivered: hpChData.reduce((sum, item) => sum + (item.valueDelivered || 0), 0),
    difference: hpChData.reduce((sum, item) => sum + (item.difference || 0), 0),
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

  const handleUpdateData = () => {
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  return (
    <Box>
      {/* Campaign Details */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        mb: 2,
        p: 2,
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 1
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 1 }}>
            Campaign Details
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                {campaignData.client}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                {campaignData.spend}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                {campaignData.approvalDate}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                {campaignData.month}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', mb: 0.5 }}>
                {campaignData.ddsCode}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>
                Campaign Code
              </Typography>
            </Box>
          </Box>
          
          {/* Horizontal Divider */}
          <Box sx={{ width: '100%', my: 2 }}>
            <Divider />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                Budget:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500 }}>
                {formatCurrency(campaignData.budget)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                Value Pot:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500 }}>
                {formatCurrency(campaignData.valuePot)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                Total:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500 }}>
                {formatCurrency(campaignData.total)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                Value Delivered:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 500 }}>
                {formatCurrency(campaignData.valueDelivered)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '11px', color: '#666' }}>
                Difference:
              </Typography>
              <Chip 
                label={formatCurrency(campaignData.difference)} 
                size="small" 
                sx={{ 
                  fontSize: '10px', 
                  height: 20,
                  backgroundColor: campaignData.difference >= 0 ? '#e8f5e8' : '#ffebee',
                  color: campaignData.difference >= 0 ? '#2e7d32' : '#c62828',
                  fontWeight: 500
                }} 
              />
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Update />}
            onClick={handleUpdateData}
            sx={{
              textTransform: 'none',
              fontSize: '11px',
              fontWeight: 500,
              px: 2,
              py: 0.25,
              backgroundColor: '#02b5e7',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0295c7',
                color: 'white',
              },
            }}
          >
            Update Data
          </Button>
          <IconButton
            onClick={handleMenuClick}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              p: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(2, 181, 231, 0.08)',
                borderColor: '#02b5e7',
              },
            }}
          >
            <MoreVert sx={{ fontSize: '16px', color: '#666' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            minWidth: 150,
          },
        }}
      >
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download sx={{ fontSize: '16px', color: '#666' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Download" 
            primaryTypographyProps={{ fontSize: '12px', fontWeight: 500 }}
          />
        </MenuItem>
        <MenuItem onClick={handleChangeLog}>
          <ListItemIcon>
            <History sx={{ fontSize: '16px', color: '#666' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Change Log" 
            primaryTypographyProps={{ fontSize: '12px', fontWeight: 500 }}
          />
        </MenuItem>
      </Menu>

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
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Budget
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Value Pot
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60, textAlign: 'right' }}>
                Universe
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 50, textAlign: 'right' }}>
                CPT
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60, textAlign: 'right' }}>
                Discount
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Discounted CPT
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Second Length
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60, textAlign: 'right' }}>
                Premium
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Afforded TVRs
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Delivered TA1
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60, textAlign: 'right' }}>
                Diff TVRs
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Delivered TA2
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                TA2 Universe
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Conv to TA2
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Planned Conv
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 60, textAlign: 'right' }}>
                Conv Diff
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 100, textAlign: 'right' }}>
                Value Delivered
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '9px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5, minWidth: 80, textAlign: 'right' }}>
                Difference
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stationData.map((row, index) => (
              <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: 'rgba(2, 181, 231, 0.04)' } }}>
                <TableCell sx={{ fontSize: '11px', py: 0.5, fontWeight: 500 }}>
                  {row.station}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5 }}>
                  {row.audience}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatCurrency(row.budget)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatCurrency(row.valuePot)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatCurrency(row.total)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.universe)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.cpt)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.discount, 2)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.discountedCpt)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.secondLength)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.premium)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.affordedTvrs)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.deliveredTa1)}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '11px', 
                  py: 0.5, 
                  textAlign: 'right',
                  color: (row.diffTvrs || 0) >= 0 ? '#4caf50' : '#f44336',
                  fontWeight: 500
                }}>
                  {(row.diffTvrs || 0) >= 0 ? '+' : ''}{formatNumber(row.diffTvrs)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.deliveredTa2)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.ta2Universe)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.convToTa2)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatNumber(row.plannedConv)}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '11px', 
                  py: 0.5, 
                  textAlign: 'right',
                  color: (row.convDiff || 0) >= 0 ? '#4caf50' : '#f44336',
                  fontWeight: 500
                }}>
                  {(row.convDiff || 0) >= 0 ? '+' : ''}{formatNumber(row.convDiff)}
                </TableCell>
                <TableCell sx={{ fontSize: '11px', py: 0.5, textAlign: 'right' }}>
                  {formatCurrency(row.valueDelivered)}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: '11px', 
                  py: 0.5, 
                  textAlign: 'right',
                  color: (row.difference || 0) >= 0 ? '#4caf50' : '#f44336',
                  fontWeight: 500
                }}>
                  {(row.difference || 0) >= 0 ? '+' : ''}{formatCurrency(row.difference)}
                </TableCell>
              </TableRow>
            ))}
            
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f8f9fa', fontWeight: 600 }}>
              <TableCell sx={{ fontSize: '11px', fontWeight: 600, py: 0.5, borderTop: '2px solid #e0e0e0' }}>
                TOTAL
              </TableCell>
              <TableCell sx={{ fontSize: '11px', py: 0.5, borderTop: '2px solid #e0e0e0' }}>
                -
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatCurrency(hpChTotals.budget)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatCurrency(hpChTotals.valuePot)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatCurrency(hpChTotals.total)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.universe)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                -
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                -
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                -
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                -
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                -
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.affordedTvrs)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.deliveredTa1)}
              </TableCell>
              <TableCell sx={{ 
                fontSize: '11px', 
                textAlign: 'right', 
                py: 0.5, 
                fontWeight: 600, 
                borderTop: '2px solid #e0e0e0',
                color: (hpChTotals.diffTvrs || 0) >= 0 ? '#4caf50' : '#f44336'
              }}>
                {(hpChTotals.diffTvrs || 0) >= 0 ? '+' : ''}{formatNumber(hpChTotals.diffTvrs)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.deliveredTa2)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.ta2Universe)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.convToTa2)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatNumber(hpChTotals.plannedConv)}
              </TableCell>
              <TableCell sx={{ 
                fontSize: '11px', 
                textAlign: 'right', 
                py: 0.5, 
                fontWeight: 600, 
                borderTop: '2px solid #e0e0e0',
                color: (hpChTotals.convDiff || 0) >= 0 ? '#4caf50' : '#f44336'
              }}>
                {(hpChTotals.convDiff || 0) >= 0 ? '+' : ''}{formatNumber(hpChTotals.convDiff)}
              </TableCell>
              <TableCell sx={{ fontSize: '11px', textAlign: 'right', py: 0.5, fontWeight: 600, borderTop: '2px solid #e0e0e0' }}>
                {formatCurrency(hpChTotals.valueDelivered)}
              </TableCell>
              <TableCell sx={{ 
                fontSize: '11px', 
                textAlign: 'right', 
                py: 0.5, 
                fontWeight: 600, 
                borderTop: '2px solid #e0e0e0',
                color: (hpChTotals.difference || 0) >= 0 ? '#4caf50' : '#f44336'
              }}>
                {(hpChTotals.difference || 0) >= 0 ? '+' : ''}{formatCurrency(hpChTotals.difference)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Data Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={handleCloseUpdateDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          pb: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Warning sx={{ color: '#ff9800', fontSize: '24px' }} />
          <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
            Labs Environment Notice
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography variant="body1" sx={{ fontSize: '14px', color: '#666', lineHeight: 1.6, mb: 2 }}>
            The API is currently disconnected in the Labs environment. Data updates are not available at this time.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
            Please contact LightBoxTV support to access live data functionality.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseUpdateDialog}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 500,
              px: 3,
              py: 1,
              backgroundColor: '#02b5e7',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0295c7',
              },
            }}
          >
            Understood
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FrontsheetTab;