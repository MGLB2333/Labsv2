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
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SectionTabs from './components/SectionTabs';

// Mock data for CTV Suppliers
const ctvSuppliers = [
  {
    id: 1,
    name: 'Roku',
    inventory: 1250000,
    utilization: 78.5,
    revenue: 2450000,
    status: 'Active',
    impressions: 12500000,
    cpm: 19.60
  },
  {
    id: 2,
    name: 'Amazon Fire TV',
    inventory: 980000,
    utilization: 82.3,
    revenue: 1920000,
    status: 'Active',
    impressions: 9800000,
    cpm: 19.59
  },
  {
    id: 3,
    name: 'Samsung Smart TV',
    inventory: 750000,
    utilization: 65.2,
    revenue: 1460000,
    status: 'Active',
    impressions: 7500000,
    cpm: 19.47
  },
  {
    id: 4,
    name: 'Apple TV',
    inventory: 420000,
    utilization: 88.7,
    revenue: 820000,
    status: 'Active',
    impressions: 4200000,
    cpm: 19.52
  },
  {
    id: 5,
    name: 'Google Chromecast',
    inventory: 680000,
    utilization: 71.4,
    revenue: 1330000,
    status: 'Active',
    impressions: 6800000,
    cpm: 19.56
  },
  {
    id: 6,
    name: 'LG Smart TV',
    inventory: 520000,
    utilization: 58.9,
    revenue: 1010000,
    status: 'Active',
    impressions: 5200000,
    cpm: 19.42
  }
];

// Mock data for Advertisers/Clients
const advertisers = [
  {
    id: 1,
    name: 'IKEA',
    industry: 'Retail',
    spend: 2500000,
    campaigns: 8,
    status: 'Active',
    avgCpm: 19.60,
    reach: 12500000,
    lastCampaign: '2025-01-15'
  },
  {
    id: 2,
    name: 'Polestar',
    industry: 'Automotive',
    spend: 1800000,
    campaigns: 5,
    status: 'Active',
    avgCpm: 19.59,
    reach: 9200000,
    lastCampaign: '2025-01-12'
  },
  {
    id: 3,
    name: 'Step Change',
    industry: 'Financial Services',
    spend: 1200000,
    campaigns: 3,
    status: 'Active',
    avgCpm: 19.47,
    reach: 6100000,
    lastCampaign: '2025-01-10'
  },
  {
    id: 4,
    name: 'Nike',
    industry: 'Sports & Fitness',
    spend: 3200000,
    campaigns: 12,
    status: 'Active',
    avgCpm: 19.52,
    reach: 16400000,
    lastCampaign: '2025-01-18'
  },
  {
    id: 5,
    name: 'Coca-Cola',
    industry: 'Food & Beverage',
    spend: 2800000,
    campaigns: 10,
    status: 'Active',
    avgCpm: 19.56,
    reach: 14300000,
    lastCampaign: '2025-01-16'
  },
  {
    id: 6,
    name: 'BMW',
    industry: 'Automotive',
    spend: 2100000,
    campaigns: 6,
    status: 'Active',
    avgCpm: 19.42,
    reach: 10800000,
    lastCampaign: '2025-01-14'
  }
];

// Mock data for monthly charts
const monthlySupplierData = [
  { month: 'Jan 2025', revenue: 0 },
  { month: 'Feb 2025', revenue: 0 },
  { month: 'Mar 2025', revenue: 3183.98 },
  { month: 'Apr 2025', revenue: 78000 },
  { month: 'May 2025', revenue: 25000 },
  { month: 'Jun 2025', revenue: 0 },
  { month: 'Jul 2025', revenue: 0 },
  { month: 'Aug 2025', revenue: 0 },
  { month: 'Sep 2025', revenue: 0 },
  { month: 'Oct 2025', revenue: 0 },
  { month: 'Nov 2025', revenue: 0 },
  { month: 'Dec 2025', revenue: 0 }
];

const monthlyClientData = [
  { month: 'Jan 2025', spend: 0 },
  { month: 'Feb 2025', spend: 0 },
  { month: 'Mar 2025', spend: 15000 },
  { month: 'Apr 2025', spend: 85000 },
  { month: 'May 2025', spend: 32000 },
  { month: 'Jun 2025', spend: 0 },
  { month: 'Jul 2025', spend: 0 },
  { month: 'Aug 2025', spend: 0 },
  { month: 'Sep 2025', spend: 0 },
  { month: 'Oct 2025', spend: 0 },
  { month: 'Nov 2025', spend: 0 },
  { month: 'Dec 2025', spend: 0 }
];

const monthlyDeliveryData = [
  { month: 'Jan 2025', target: 100, actual: 0 },
  { month: 'Feb 2025', target: 100, actual: 0 },
  { month: 'Mar 2025', target: 100, actual: 95 },
  { month: 'Apr 2025', target: 100, actual: 102 },
  { month: 'May 2025', target: 100, actual: 98 },
  { month: 'Jun 2025', target: 100, actual: 0 },
  { month: 'Jul 2025', target: 100, actual: 0 },
  { month: 'Aug 2025', target: 100, actual: 0 },
  { month: 'Sep 2025', target: 100, actual: 0 },
  { month: 'Oct 2025', target: 100, actual: 0 },
  { month: 'Nov 2025', target: 100, actual: 0 },
  { month: 'Dec 2025', target: 100, actual: 0 }
];

const supplierRevenueData = [
  { name: 'Roku', revenue: 2450000, color: '#02b5e7' },
  { name: 'Amazon Fire TV', revenue: 1920000, color: '#ff6b35' },
  { name: 'Samsung Smart TV', revenue: 1460000, color: '#4caf50' },
  { name: 'Apple TV', revenue: 820000, color: '#9c27b0' },
  { name: 'Google Chromecast', revenue: 1330000, color: '#ff9800' },
  { name: 'LG Smart TV', revenue: 1010000, color: '#f44336' }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-GB').format(num);
};

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderSuppliersContent = () => (
    <Box>
      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <TextField
          select
          size="small"
          label="Year"
          value="2025"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </TextField>
        
        <TextField
          select
          size="small"
          label="Quarter"
          value="Q1"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="Q1">Q1</MenuItem>
          <MenuItem value="Q2">Q2</MenuItem>
          <MenuItem value="Q3">Q3</MenuItem>
          <MenuItem value="Q4">Q4</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Supplier"
          value="All"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="All">All Suppliers</MenuItem>
          <MenuItem value="Roku">Roku</MenuItem>
          <MenuItem value="Amazon">Amazon Fire TV</MenuItem>
          <MenuItem value="Samsung">Samsung Smart TV</MenuItem>
          <MenuItem value="Apple">Apple TV</MenuItem>
          <MenuItem value="Google">Google Chromecast</MenuItem>
          <MenuItem value="LG">LG Smart TV</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Status"
          value="All"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          size="small"
          sx={{ 
            borderColor: '#02b5e7', 
            color: '#02b5e7',
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Apply Filters
        </Button>

        <Button
          variant="text"
          size="small"
          sx={{ 
            color: '#666',
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* Monthly Revenue Chart */}
      <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 2 }}>
            Monthly Revenue Trend
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySupplierData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
              <Bar dataKey="revenue" fill="#02b5e7" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          overflowX: 'auto',
          maxWidth: '100%'
        }}
      >
        <Table size="small" sx={{ minWidth: 1600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1,
                minWidth: 150,
                width: 150
              }}>
                Supplier, Client
              </TableCell>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <TableCell 
                  key={month}
                  colSpan={2} 
                  align="center" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5,
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 120,
                    width: 120
                  }}
                >
                  {month} 2025
                </TableCell>
              ))}
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                textAlign: 'right',
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
                Total
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1
              }}>
              </TableCell>
              {Array.from({ length: 12 }, (_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5, 
                    textAlign: 'right',
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    Gross Spend
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5, 
                    textAlign: 'right',
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 80,
                    width: 80
                  }}>
                    Gross Spend %
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                textAlign: 'right',
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ctvSuppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  py: 0.5,
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  borderRight: '1px solid #e0e0e0'
                }}>
                  {supplier.name}
                </TableCell>
                {Array.from({ length: 12 }, (_, i) => (
                  <React.Fragment key={i}>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 0.5,
                      backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                      minWidth: 60,
                      width: 60
                    }}>
                      {i === 2 && supplier.name === 'Roku' ? '£3,183.98' : '£0.00'}
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 0.5,
                      backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                      minWidth: 80,
                      width: 80
                    }}>
                      {i === 2 && supplier.name === 'Roku' ? '100.0%' : '0.0%'}
                    </TableCell>
                  </React.Fragment>
                ))}
                <TableCell sx={{ 
                  fontSize: '12px', 
                  textAlign: 'right', 
                  py: 0.5,
                  backgroundColor: 'white'
                }}>
                  {formatCurrency(supplier.revenue)}
                </TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f8f9fa', fontWeight: 600 }}>
              <TableCell sx={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1,
                borderRight: '1px solid #e0e0e0'
              }}>
                Total
              </TableCell>
              {Array.from({ length: 12 }, (_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ 
                    fontSize: '12px', 
                    textAlign: 'right', 
                    py: 0.5, 
                    fontWeight: 600,
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    {i === 2 ? '£3,183.98' : '£0.00'}
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '12px', 
                    textAlign: 'right', 
                    py: 0.5, 
                    fontWeight: 600,
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 80,
                    width: 80
                  }}>
                    {i === 2 ? '100.0%' : '0.0%'}
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell sx={{ 
                fontSize: '12px', 
                textAlign: 'right', 
                py: 0.5, 
                fontWeight: 600,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
                {formatCurrency(ctvSuppliers.reduce((sum, supplier) => sum + supplier.revenue, 0))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderClientsContent = () => (
    <Box>
      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <TextField
          select
          size="small"
          label="Year"
          value="2025"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </TextField>
        
        <TextField
          select
          size="small"
          label="Quarter"
          value="Q1"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="Q1">Q1</MenuItem>
          <MenuItem value="Q2">Q2</MenuItem>
          <MenuItem value="Q3">Q3</MenuItem>
          <MenuItem value="Q4">Q4</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Client"
          value="All"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="All">All Clients</MenuItem>
          <MenuItem value="IKEA">IKEA</MenuItem>
          <MenuItem value="Polestar">Polestar</MenuItem>
          <MenuItem value="Step Change">Step Change</MenuItem>
          <MenuItem value="Nike">Nike</MenuItem>
          <MenuItem value="Coca-Cola">Coca-Cola</MenuItem>
          <MenuItem value="BMW">BMW</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Industry"
          value="All"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All Industries</MenuItem>
          <MenuItem value="Retail">Retail</MenuItem>
          <MenuItem value="Automotive">Automotive</MenuItem>
          <MenuItem value="Financial Services">Financial Services</MenuItem>
          <MenuItem value="Sports & Fitness">Sports & Fitness</MenuItem>
          <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          size="small"
          sx={{ 
            borderColor: '#02b5e7', 
            color: '#02b5e7',
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Apply Filters
        </Button>

        <Button
          variant="text"
          size="small"
          sx={{ 
            color: '#666',
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* Monthly Spend Chart */}
      <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 2 }}>
            Monthly Client Spend Trend
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyClientData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'Spend']} />
              <Bar dataKey="spend" fill="#02b5e7" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          overflowX: 'auto',
          maxWidth: '100%'
        }}
      >
        <Table size="small" sx={{ minWidth: 1600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1,
                minWidth: 150,
                width: 150
              }}>
                Supplier, Client
              </TableCell>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <TableCell 
                  key={month}
                  colSpan={2} 
                  align="center" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5,
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 120,
                    width: 120
                  }}
                >
                  {month} 2025
                </TableCell>
              ))}
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                textAlign: 'right',
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
                Total
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1
              }}>
              </TableCell>
              {Array.from({ length: 12 }, (_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5, 
                    textAlign: 'right',
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    Gross Spend
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5, 
                    textAlign: 'right',
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 80,
                    width: 80
                  }}>
                    Gross Spend %
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                textAlign: 'right',
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advertisers.map((client) => (
              <TableRow
                key={client.id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  py: 0.5,
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  borderRight: '1px solid #e0e0e0'
                }}>
                  {client.name}
                </TableCell>
                {Array.from({ length: 12 }, (_, i) => (
                  <React.Fragment key={i}>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 0.5,
                      backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                      minWidth: 60,
                      width: 60
                    }}>
                      {i === 2 && client.name === 'IKEA' ? '£3,183.98' : '£0.00'}
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 0.5,
                      backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                      minWidth: 80,
                      width: 80
                    }}>
                      {i === 2 && client.name === 'IKEA' ? '100.0%' : '0.0%'}
                    </TableCell>
                  </React.Fragment>
                ))}
                <TableCell sx={{ 
                  fontSize: '12px', 
                  textAlign: 'right', 
                  py: 0.5,
                  backgroundColor: 'white'
                }}>
                  {formatCurrency(client.spend)}
                </TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f8f9fa', fontWeight: 600 }}>
              <TableCell sx={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1,
                borderRight: '1px solid #e0e0e0'
              }}>
                Total
              </TableCell>
              {Array.from({ length: 12 }, (_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ 
                    fontSize: '12px', 
                    textAlign: 'right', 
                    py: 0.5, 
                    fontWeight: 600,
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    {i === 2 ? '£3,183.98' : '£0.00'}
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '12px', 
                    textAlign: 'right', 
                    py: 0.5, 
                    fontWeight: 600,
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 80,
                    width: 80
                  }}>
                    {i === 2 ? '100.0%' : '0.0%'}
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell sx={{ 
                fontSize: '12px', 
                textAlign: 'right', 
                py: 0.5, 
                fontWeight: 600,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
                {formatCurrency(advertisers.reduce((sum, client) => sum + client.spend, 0))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderDeliveryGoalsContent = () => (
    <Box>
      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <TextField
          select
          size="small"
          label="Year"
          value="2025"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="2025">2025</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </TextField>
        
        <TextField
          select
          size="small"
          label="Quarter"
          value="Q1"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="Q1">Q1</MenuItem>
          <MenuItem value="Q2">Q2</MenuItem>
          <MenuItem value="Q3">Q3</MenuItem>
          <MenuItem value="Q4">Q4</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Goal Type"
          value="All"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All Goals</MenuItem>
          <MenuItem value="Delivery">Delivery Targets</MenuItem>
          <MenuItem value="Efficiency">Efficiency Goals</MenuItem>
          <MenuItem value="Performance">Performance Metrics</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Status"
          value="All"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Met">Target Met</MenuItem>
          <MenuItem value="Below">Below Target</MenuItem>
          <MenuItem value="Exceeded">Exceeded Target</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          size="small"
          sx={{ 
            borderColor: '#02b5e7', 
            color: '#02b5e7',
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Apply Filters
        </Button>

        <Button
          variant="text"
          size="small"
          sx={{ 
            color: '#666',
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* Monthly Delivery Performance Chart */}
      <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 2 }}>
            Monthly Delivery Performance
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyDeliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="target" fill="#e0e0e0" name="Target" radius={[2, 2, 0, 0]} />
              <Bar dataKey="actual" fill="#02b5e7" name="Actual" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Delivery Goals Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          overflowX: 'auto',
          maxWidth: '100%'
        }}
      >
        <Table size="small" sx={{ minWidth: 1600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1,
                minWidth: 150,
                width: 150
              }}>
                Supplier, Client
              </TableCell>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <TableCell 
                  key={month}
                  colSpan={2} 
                  align="center" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5,
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 120,
                    width: 120
                  }}
                >
                  {month} 2025
                </TableCell>
              ))}
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                textAlign: 'right',
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
                Total
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1
              }}>
              </TableCell>
              {Array.from({ length: 12 }, (_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5, 
                    textAlign: 'right',
                    backgroundColor: '#f0f8ff',
                    borderLeft: '2px solid #02b5e7',
                    borderRight: '1px solid #e0e0e0',
                    '&:first-of-type': {
                      borderLeft: 'none'
                    }
                  }}>
                    Target %
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    fontSize: '10px', 
                    textTransform: 'uppercase', 
                    color: '#666', 
                    borderBottom: '1px solid #e0e0e0', 
                    py: 0.5, 
                    textAlign: 'right',
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 80,
                    width: 80
                  }}>
                    Actual %
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell sx={{ 
                fontWeight: 600, 
                fontSize: '10px', 
                textTransform: 'uppercase', 
                color: '#666', 
                borderBottom: '1px solid #e0e0e0', 
                py: 0.5, 
                textAlign: 'right',
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyDeliveryData.map((goal, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(2, 181, 231, 0.04)',
                  },
                }}
              >
                <TableCell sx={{ 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  py: 0.5,
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 1,
                  borderRight: '1px solid #e0e0e0'
                }}>
                  {goal.month}
                </TableCell>
                {Array.from({ length: 12 }, (_, i) => (
                  <React.Fragment key={i}>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 0.5,
                      backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                      minWidth: 60,
                      width: 60
                    }}>
                      {goal.target}%
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: '12px', 
                      textAlign: 'right', 
                      py: 0.5,
                      backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                      minWidth: 80,
                      width: 80
                    }}>
                      {goal.actual}%
                    </TableCell>
                  </React.Fragment>
                ))}
                <TableCell sx={{ 
                  fontSize: '12px', 
                  textAlign: 'right', 
                  py: 0.5,
                  backgroundColor: 'white'
                }}>
                  {goal.actual}%
                </TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow sx={{ backgroundColor: '#f8f9fa', fontWeight: 600 }}>
              <TableCell sx={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                py: 0.5,
                position: 'sticky',
                left: 0,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100,
                zIndex: 1,
                borderRight: '1px solid #e0e0e0'
              }}>
                Total
              </TableCell>
              {Array.from({ length: 12 }, (_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ 
                    fontSize: '12px', 
                    textAlign: 'right', 
                    py: 0.5, 
                    fontWeight: 600,
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5'
                  }}>
                    100%
                  </TableCell>
                  <TableCell sx={{ 
                    fontSize: '12px', 
                    textAlign: 'right', 
                    py: 0.5, 
                    fontWeight: 600,
                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#f5f5f5',
                    minWidth: 80,
                    width: 80
                  }}>
                    {i === 2 ? '95%' : '0%'}
                  </TableCell>
                </React.Fragment>
              ))}
              <TableCell sx={{ 
                fontSize: '12px', 
                textAlign: 'right', 
                py: 0.5, 
                fontWeight: 600,
                backgroundColor: '#f8f9fa',
                minWidth: 100,
                width: 100
              }}>
                {((monthlyDeliveryData.reduce((sum, goal) => sum + goal.actual, 0) / monthlyDeliveryData.length)).toFixed(1)}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return renderSuppliersContent();
      case 1:
        return renderClientsContent();
      case 2:
        return renderDeliveryGoalsContent();
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '20px', fontWeight: 400, color: '#333' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Tabs */}
      <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default DashboardPage;
