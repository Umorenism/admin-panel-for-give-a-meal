import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./component/Dashboard/Dashboard";
import ProtectedRoute from "./component/Dashboard/ProtectedRoute";
import Login from "./component/Auth/Login";

// Pages
import OverviewPage from "./pages/OverviewPage";
import CampaignsPage from "./pages/CampaignsPage";
import CreateBlog from "./pages/CreateBlog";
import CreateCampaign from "./pages/CreateCampaign";
import TotalDonationPage from "./pages/TotalDonationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/Settings";
import NotificationDashboard from "./pages/NotificationDashboard";
import Notification from "./pages/Notification";
import ProfileSettings from "./pages/ProfileSettings";
import ViewNotification from "./pages/ViewNotification";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="donations" element={<TotalDonationPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="notifications" element={<NotificationDashboard />} />
        <Route path="send-notifications" element={<Notification />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="view" element={<ViewNotification />} />
      </Route>

      {/* Catch all → redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
