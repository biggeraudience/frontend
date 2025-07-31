// src/App.jsx
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Outlet
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Screens
import StartScreen         from './components/pages/StartScreen';
import SplashScreen       from './components/pages/SplashScreen';
import Home               from './components/pages/Home';
import Showroom           from './components/pages/Showroom';
import VehicleDetail      from './components/pages/VehicleDetail';
import BiddingPage        from './components/pages/BiddingPage';

// Auth pages — folder is lowercase `auth`
import LoginPage           from './components/pages/LoginPage';
import RegisterPage        from './components/pages/RegisterPage';
import ForgotPasswordPage  from './components/pages/ForgotPasswordPage';
// Admin
import AdminLayout      from './admin/layouts/AdminLayout';
import DashboardHome    from './admin/pages/DashboardHome';
import AdminVehicles    from './admin/pages/AdminVehicles';
import AdminAuctions    from './admin/pages/AdminAuctions';
import AdminUsers       from './admin/pages/AdminUsers';
import AdminInquiries   from './admin/pages/AdminInquiries';
import AdminSettings    from './admin/pages/AdminSettings';
import AdminAnalytics   from './admin/pages/AdminAnalytics';

// UI
import Navbar   from './components/layout/Navbar';
import Sidebar  from './components/layout/Sidebar';
import Footer   from './components/layout/Footer';
import './styles/main.scss';

const PrivateRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div>Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function MainAppShellWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout }    = useAuth();
  const navigate                       = useNavigate();

  const toggleSidebar = () => setSidebarOpen(o => !o);
  const navigateTo   = ({ type, value }) => {
    // … your existing nav logic …
  };

  return (
    <>
      <Navbar
        isSidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isAuthenticated={isAuthenticated}
        navigateTo={navigateTo}
      />
      <Sidebar
        isSidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isAuthenticated={isAuthenticated}
        navigateTo={navigateTo}
      />
      <div className="app-content"><Outlet /></div>
      <Footer />
    </>
  );
}

function AppContent() {
  const [step, setStep] = useState('start');
  const location        = useLocation();
  const { isAuthenticated, user, loading } = useAuth();
  const isRoot = location.pathname === '/';

  // only show start/splash for non-logged-in
  if (isRoot && !isAuthenticated) {
    if (step === 'start') {
      return <StartScreen onStart={() => setStep('splash')} />;
    }
    if (step === 'splash') {
      return <SplashScreen onAnimationComplete={() => setStep('app')} />;
    }
  }

  return (
    <Routes>
      {/* Main shell */}
      <Route element={<MainAppShellWrapper />}>
        <Route path="/"            element={<Home />} />
        <Route path="/showroom"    element={<Showroom />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/bids"        element={<BiddingPage />} />
        <Route path="/bid/:id"     element={<BiddingPage />} />
      </Route>

      {/* Auth */}
      <Route path="/auth/login"           element={<LoginPage />} />
      <Route path="/auth/register"        element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

      {/* Redirect after login */}
      {!loading && isAuthenticated && (
        <Route
          path="/"
          element={
            <Navigate
              to={user.role === 'admin' ? '/admin' : '/'}
              replace
            />
          }
        />
      )}

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={['admin']}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index                            element={<DashboardHome />} />
        <Route path="vehicles"                  element={<AdminVehicles />} />
        <Route path="vehicles/new"              element={<AdminVehicles initialMode="add" />} />
        <Route path="vehicles/edit/:id"         element={<AdminVehicles initialMode="edit" />} />
        <Route path="auctions"                  element={<AdminAuctions />} />
        <Route path="auctions/new"              element={<AdminAuctions initialMode="add" />} />
        <Route path="auctions/edit/:id"         element={<AdminAuctions editMode />} />
        <Route path="users"                     element={<AdminUsers />} />
        <Route path="users/edit/:id"            element={<AdminUsers editMode />} />
        <Route path="inquiries"                 element={<AdminInquiries />} />
        <Route path="analytics"                 element={<AdminAnalytics />} />
        <Route path="settings"                  element={<AdminSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
