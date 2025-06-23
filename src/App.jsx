import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom';

// Auth
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import StartScreen from './components/pages/StartScreen';
import SplashScreen from './components/pages/SplashScreen';
import Home from './components/pages/Home';
import Showroom from './components/pages/Showroom';
import VehicleDetail from './components/pages/VehicleDetail';
import BiddingPage from './components/pages/BiddingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';

// Admin
import AdminLayout from './admin/layouts/AdminLayout';
import DashboardHome from './admin/pages/DashboardHome';
import AdminVehicles from './admin/pages/AdminVehicles';
import AdminAuctions from './admin/pages/AdminAuctions';
import AdminUsers from './admin/pages/AdminUsers';
import AdminInquiries from './admin/pages/AdminInquiries';
import AdminSettings from './admin/pages/AdminSettings';
import AdminAnalytics from './admin/pages/AdminAnalytics';

// UI
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import './styles/main.scss';

// Protect routes
const PrivateRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (roles.length && (!user || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Wrapper for main app shell
function MainAppShellWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(open => !open);
  const navigateTo = ({ type, value }) => {
    let path = '/';
    switch (type) {
      case 'main':
        path = value === 'Home' ? '/' : `/${value.toLowerCase()}`;
        break;
      case 'filter-showroom':
        path = `/showroom?filter=${value}`;
        break;
      case 'vehicle-detail':
        path = `/vehicle/${value}`;
        break;
      case 'bid-page':
        path = `/bid/${value}`;
        break;
      case 'logout':
        logout();
        return;
      default:
        break;
    }
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <Navbar isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} navigateTo={navigateTo} />
      <Sidebar isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} navigateTo={navigateTo} />
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// AppContent handles initial screens and routing
const AppContent = () => {
  const [step, setStep] = useState('start');
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isRoot = location.pathname === '/';

  // Show start/splash only on root
  if (isRoot && step === 'start') {
    return <StartScreen onStart={() => setStep('splash')} />;
  }
  if (isRoot && step === 'splash') {
    return <SplashScreen onAnimationComplete={() => setStep('app')} />;
  }

  return (
    <Routes>
      {/* Public client routes under shell */}
      <Route element={<MainAppShellWrapper />}>        
        <Route path="/" element={<Home />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/bids" element={<BiddingPage />} />
        <Route path="/bid/:id" element={<BiddingPage />} />
      </Route>

      {/* Auth routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

      {/* Redirect default after login */}
      {!loading && isAuthenticated && (
        <Route path="/" element={<Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />} />
      )}

      {/* Admin routes */}
      <Route path="/admin" element={<PrivateRoute roles={[ 'admin' ]}><AdminLayout /></PrivateRoute>}>        
        <Route index element={<DashboardHome />} />
        <Route path="vehicles" element={<AdminVehicles />} />
        <Route path="vehicles/new" element={<AdminVehicles initialMode="add" />} />
        <Route path="vehicles/edit/:id" element={<AdminVehicles initialMode="edit" />} />
        <Route path="auctions" element={<AdminAuctions />} />
        <Route path="auctions/new" element={<AdminAuctions initialMode="add" />} />
        <Route path="auctions/edit/:id" element={<AdminAuctions editMode />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/edit/:id" element={<AdminUsers editMode />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
