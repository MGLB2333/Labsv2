import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  CheckCircle,
  PlayCircleOutline,
  FilterList,
  Search,
  MoreVert,
} from '@mui/icons-material';

// Define Campaign type inline to avoid import issues
interface Campaign {
  id: string;
  status: 'active' | 'pending' | 'completed';
  campaignName: string;
  mediaType: string;
  agency: string;
  client: string;
  brand: string;
  budget: number;
  startDate?: string;
  endDate?: string;
  clientLead?: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#02b5e7', fontSize: 20 }} />;
      case 'pending':
        return <PlayCircleOutline sx={{ color: '#666', fontSize: 20 }} />;
      default:
        return <PlayCircleOutline sx={{ color: '#666', fontSize: 20 }} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Box>
      {/* Table Container with Filters/Search Header */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        {/* Filters and Search Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 1.5,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fff'
        }}>
          <Button
            variant="text"
            startIcon={<FilterList />}
            sx={{
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: '10px',
              backgroundColor: 'white',
              color: '#02b5e7',
              height: 24,
              px: 1.5,
              border: 'none',
              '&:hover': {
                backgroundColor: 'white',
                color: '#02b5e7',
              },
            }}
          >
            Filters
          </Button>
          
          <TextField
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              width: 250,
              '& .MuiOutlinedInput-root': {
                fontSize: '12px',
                height: 24,
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#02b5e7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#02b5e7',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#666', fontSize: 14 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Campaign
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Media Type
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Agency
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Client
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Brand
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Budget
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Start Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                End Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                Client Lead
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', color: '#666', borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                {/* Actions column header */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} sx={{ textAlign: 'center', py: 4, borderBottom: 'none' }}>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '12px' }}>
                    No campaigns found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                    {getStatusIcon(campaign.status)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                    <Typography
                      sx={{
                        color: '#02b5e7',
                        fontSize: '11px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {campaign.campaignName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.mediaType}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.agency}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.client}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.brand || '-'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {formatCurrency(campaign.budget)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.startDate || '-'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.endDate || '-'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontSize: '11px', py: 0.5 }}>
                    {campaign.clientLead || '-'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', py: 0.5 }}>
                    <IconButton size="small">
                      <MoreVert sx={{ fontSize: 16, color: '#666' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CampaignTable;
