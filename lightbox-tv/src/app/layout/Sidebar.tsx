import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Box,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  Campaign,
  People,
  Insights,
  Inventory2,
  Build,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import LabsRibbon from '@/shared/components/LabsRibbon';

const drawerWidth = 225;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [campaignsOpen, setCampaignsOpen] = useState(true);
  const [reportingOpen, setReportingOpen] = useState(true);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCampaignsToggle = () => {
    setCampaignsOpen(!campaignsOpen);
  };

  const handleReportingToggle = () => {
    setReportingOpen(!reportingOpen);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: drawerWidth,
        height: '100vh',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        zIndex: 1,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ pt: 8 }}>
        <List dense>
          <ListItemButton 
            selected={isActive('/')} 
            onClick={() => handleNavigation('/')}
            sx={{ py: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Dashboard sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Dashboard" 
              primaryTypographyProps={{ fontSize: '13px', fontWeight: 500 }}
            />
          </ListItemButton>

          <ListSubheader sx={{ color: '#666', fontWeight: 600, fontSize: '11px', lineHeight: 1.2, py: 1 }}>
            Campaign Management
          </ListSubheader>

          <ListItemButton 
            onClick={handleCampaignsToggle}
            sx={{ py: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Campaign sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Campaigns" 
              primaryTypographyProps={{ fontSize: '13px' }}
            />
            {campaignsOpen ? <ExpandLess sx={{ fontSize: 14 }} /> : <ExpandMore sx={{ fontSize: 14 }} />}
          </ListItemButton>

          <Collapse in={campaignsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                selected={isActive('/campaigns/ctv-cinema')}
                onClick={() => handleNavigation('/campaigns/ctv-cinema')}
                sx={{ py: 0.5, pl: 4 }}
              >
                <ListItemText 
                  primary="CTV & Cinema Campaigns" 
                  primaryTypographyProps={{ fontSize: '13px' }}
                />
              </ListItemButton>
              <ListItemButton 
                selected={isActive('/campaigns/linear-drtv')}
                onClick={() => handleNavigation('/campaigns/linear-drtv')}
                sx={{ py: 0.5, pl: 4 }}
              >
                <ListItemText 
                  primary="Linear & DRTV Campaigns" 
                  primaryTypographyProps={{ fontSize: '13px' }}
                />
              </ListItemButton>
              <ListItemButton 
                selected={isActive('/campaigns/lite')}
                onClick={() => handleNavigation('/campaigns/lite')}
                sx={{ py: 0.5, pl: 4 }}
              >
                <ListItemText 
                  primary="Lite Campaigns" 
                  primaryTypographyProps={{ fontSize: '13px' }}
                />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton 
            selected={isActive('/audiences')} 
            onClick={() => handleNavigation('/audiences')}
            sx={{ py: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <People sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Audiences" 
              primaryTypographyProps={{ fontSize: '13px' }}
            />
          </ListItemButton>

          <ListItemButton 
            onClick={handleReportingToggle}
            sx={{ py: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Insights sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Reporting & Insights" 
              primaryTypographyProps={{ fontSize: '13px' }}
            />
            {reportingOpen ? <ExpandLess sx={{ fontSize: 14 }} /> : <ExpandMore sx={{ fontSize: 14 }} />}
          </ListItemButton>

          <Collapse in={reportingOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                selected={isActive('/reporting/campaign-analytics')}
                onClick={() => handleNavigation('/reporting/campaign-analytics')}
                sx={{ py: 0.5, pl: 4 }}
              >
                <ListItemText 
                  primary="Campaign Analytics" 
                  primaryTypographyProps={{ fontSize: '13px' }}
                />
              </ListItemButton>
              <ListItemButton 
                selected={isActive('/reporting/custom-reports')}
                onClick={() => handleNavigation('/reporting/custom-reports')}
                sx={{ py: 0.5, pl: 4 }}
              >
                <ListItemText 
                  primary="Custom Reports" 
                  primaryTypographyProps={{ fontSize: '13px' }}
                />
              </ListItemButton>
              <ListItemButton 
                selected={isActive('/reporting/tv-spot')}
                onClick={() => handleNavigation('/reporting/tv-spot')}
                sx={{ py: 0.5, pl: 4 }}
              >
                <ListItemText 
                  primary={
                    <LabsRibbon>
                      <span>TV Spot Reporting</span>
                    </LabsRibbon>
                  }
                  primaryTypographyProps={{ fontSize: '13px' }}
                />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Inventory2 sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Inventory" 
              primaryTypographyProps={{ fontSize: '13px' }}
            />
            <ExpandMore sx={{ fontSize: 14 }} />
          </ListItemButton>

          <ListSubheader sx={{ color: '#666', fontWeight: 600, fontSize: '11px', lineHeight: 1.2, py: 1, mt: 1 }}>
            Administration
          </ListSubheader>

          <ListItemButton sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Build sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText 
              primary="Admin" 
              primaryTypographyProps={{ fontSize: '13px' }}
            />
            <ExpandMore sx={{ fontSize: 14 }} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
