import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '@/features/dashboard/DashboardPage';
import { AudiencesPage } from '@/features/audiences';
import { CampaignAnalyticsPage, CustomReportsPage, TvSpotReportingPage } from '@/features/reporting';
import TvSpotAnalysisPage from '@/features/reporting/TvSpotAnalysisPage';
import CtvCinemaCampaignsPage from '@/features/campaigns/CtvCinemaCampaignsPage';
import LinearDrtvCampaignsPage from '@/features/campaigns/LinearDrtvCampaignsPage';
import LoginPage from '@/features/auth/LoginPage';
import SignUpPage from '@/features/auth/SignUpPage';
import { WhitelabelPage } from '@/features/whitelabel';
import { ProfilePage } from '@/features/profile';
import LabsEmptySlate from '@/shared/components/LabsEmptySlate';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/audiences" element={<ProtectedRoute><AudiencesPage /></ProtectedRoute>} />
      {/* Campaign sub-routes */}
      <Route path="/campaigns/ctv-cinema" element={<ProtectedRoute><CtvCinemaCampaignsPage /></ProtectedRoute>} />
      <Route path="/campaigns/linear-drtv" element={<ProtectedRoute><LinearDrtvCampaignsPage /></ProtectedRoute>} />
      <Route path="/campaigns/lite" element={<ProtectedRoute><LabsEmptySlate title="Lite Campaigns" /></ProtectedRoute>} />
      {/* Reporting & Insights sub-routes */}
      <Route path="/reporting/campaign-analytics" element={<ProtectedRoute><CampaignAnalyticsPage /></ProtectedRoute>} />
      <Route path="/reporting/custom-reports" element={<ProtectedRoute><CustomReportsPage /></ProtectedRoute>} />
      <Route path="/reporting/tv-spot" element={<ProtectedRoute><TvSpotReportingPage /></ProtectedRoute>} />
      <Route path="/reporting/tv-spot/:campaignId" element={<ProtectedRoute><TvSpotAnalysisPage /></ProtectedRoute>} />
      <Route path="/whitelabel" element={<ProtectedRoute><WhitelabelPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRouter;
