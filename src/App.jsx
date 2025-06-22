import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'; // Added Navigate
import { Outlet } from 'react-router-dom';

// Import AuthProvider and useAuth
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Client-side imports
import StartScreen from './components/pages/StartScreen';
import SplashScreen from './components/pages/SplashScreen';
import Home from './components/pages/Home';
import Showroom from './components/pages/Showroom';
import VehicleDetail from './components/pages/VehicleDetail';
import BiddingPage from './components/pages/BiddingPage';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Admin-side imports
import AdminLayout from './admin/layouts/AdminLayout';
import DashboardHome from './admin/pages/DashboardHome';
import AdminVehicles from './admin/pages/AdminVehicles';
import AdminAuctions from './admin/pages/AdminAuctions';
import AdminUsers from './admin/pages/AdminUsers';
import AdminInquiries from './admin/pages/AdminInquiries';
import AdminSettings from './admin/pages/AdminSettings';
import AdminAnalytics from './admin/pages/AdminAnalytics';

// Auth pages (moved to a more neutral location)
import LoginPage from './components/pages/LoginPage'; // Updated path
import RegisterPage from './components/pages/RegisterPage'; // Updated path
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'; // Updated path

import './styles/main.scss';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, roles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading authentication...</div>; // Or a spinner component
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (roles.length > 0 && (!user || !roles.includes(user.role))) {
        // User is authenticated but doesn't have the required role
        return <Navigate to="/" replace />; // Redirect to home or an unauthorized page
    }

    return children;
};


const AppContent = () => {
    const [step, setStep] = useState('start');
    const location = useLocation();
    const { isAuthenticated, user, loading } = useAuth(); // Get auth state

    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAuthRoute = location.pathname.startsWith('/auth');

    // Determine if we should show the initial screens
    const showInitialScreens = !isAdminRoute && !isAuthRoute && (location.pathname === '/');

    // Logic to control initial screens based on route and step
    if (showInitialScreens) {
        if (step === 'start') {
            return <StartScreen onStart={() => setStep('splash')} />;
        }
        if (step === 'splash') {
            return <SplashScreen onAnimationComplete={() => setStep('app')} />;
        }
    }

    // Main application rendering
    return (
        <Routes>
            {/* Public / Client-facing routes */}
            {/* Only render these if initial screens are bypassed or completed */}
            {showInitialScreens && step === 'app' && (
                <Route path="/" element={<MainAppShellWrapper />}>
                    <Route index element={<Home />} />
                    <Route path="showroom" element={<Showroom />} />
                    <Route path="vehicle/:id" element={<VehicleDetail />} />
                    <Route path="bids" element={<BiddingPage />} />
                    <Route path="bid/:id" element={<BiddingPage />} />
                </Route>
            )}

            {/* If initial screens are *not* shown (e.g., direct admin access, or app step completed) */}
            {(!showInitialScreens || step === 'app') && (
                <>
                    {/* Authentication Routes (Outside AdminLayout for direct access) */}
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Default route to redirect logged-in users based on role */}
                    {isAuthenticated && !loading && (
                        <Route path="/" element={user?.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />} />
                    )}


                    {/* Admin Routes - Protected */}
                    <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminLayout /></PrivateRoute>}>
                        <Route index element={<DashboardHome />} />
                        <Route path="vehicles" element={<AdminVehicles />} />
                        <Route path="vehicles/new" element={<AdminVehicles initialMode="add" />} />
                        <Route path="vehicles/edit/:id" element={<AdminVehicles initialMode="edit" />} />
                        <Route path="auctions" element={<AdminAuctions />} />
                        <Route path="auctions/new" element={<AdminAuctions initialMode="add" />} />
                        <Route path="auctions/edit/:id" element={<AdminAuctions editMode={true} />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="users/edit/:id" element={<AdminUsers editMode={true} />} />
                        <Route path="inquiries" element={<AdminInquiries />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                        <Route path="settings" element={<AdminSettings />} />
                    </Route>
                </>
            )}

            {/* Fallback for unknown routes - consider what happens if app step hasn't completed */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
};

// Moved MainAppShellWrapper into a component that uses `useNavigate`
function MainAppShellWrapper() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth(); // Use logout from AuthContext

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const navigateTo = ({ type, value }) => {
        let path;
        switch(type) {
            case 'main':
                path = value === 'Home' ? '/' : `/${value.toLowerCase().replace(/\s+/g,'-')}`;
                if (value === 'Bids') {
                    path = '/bids';
                }
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
            case 'logout': // Add a case for logout
                logout();
                return; // Prevent further navigation after logout
            default:
                path = '/';
        }
        navigate(path);
        setSidebarOpen(false); // Close sidebar after navigation
    };

    return (
        <>
            <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} navigateTo={navigateTo} /> {/* Pass isAuthenticated */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} navigateTo={navigateTo} isAuthenticated={isAuthenticated} /> {/* Pass isAuthenticated */}
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

// The main App component now only renders the BrowserRouter and AppContent, wrapped in AuthProvider
const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;