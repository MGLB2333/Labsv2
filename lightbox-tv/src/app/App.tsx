import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { SupabaseProvider } from './providers/SupabaseProvider';
import { AuthProvider } from './providers/AuthProvider';
import { LogoProvider } from '../contexts/LogoContext';
import AppLayout from './layout/AppLayout';
import AppRouter from './router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SupabaseProvider>
            <AuthProvider>
              <LogoProvider>
                <CssBaseline />
                <AppLayout>
                  <AppRouter />
                </AppLayout>
              </LogoProvider>
            </AuthProvider>
          </SupabaseProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
