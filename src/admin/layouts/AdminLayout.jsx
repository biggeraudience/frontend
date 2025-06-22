// src/admin/layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar'; // Create this
import AdminSidebar from '../components/AdminSidebar'; // Create this
import Button from '../../components/atoms/Button'; // Re-use your Button component

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Admin sidebar might be open by default
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    // Simple authentication check (placeholder)
    const isAuthenticated = true; // In a real app, this would come from Auth Context/Redux

    useEffect(() => {
        if (!isAuthenticated && !location.pathname.startsWith('/auth')) {
            navigate('/auth/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate, location.pathname]);

    if (!isAuthenticated && !location.pathname.startsWith('/auth')) {
        return null; // Or a loading spinner while redirecting
    }

    const handleAdminNavigation = (path) => {
        navigate(path);
        // If the sidebar auto-closes after nav, setSidebarOpen(false);
    };

    return (
        <div className="admin-dashboard-layout">
            <AdminNavbar toggleSidebar={toggleSidebar} />
            <AdminSidebar isSidebarOpen={isSidebarOpen} onNavigate={handleAdminNavigation} />
            <main className={`admin-content-area ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="admin-content-header">
                    {/* Dynamic header based on route, e.g., "Vehicles Management" */}
                    <h1>{location.pathname.replace('/admin/', '').split('/')[0].toUpperCase() || 'Dashboard'}</h1>
                    {/* Add action buttons relevant to the current page, e.g., "Add New Vehicle" */}
                    {location.pathname === '/admin/vehicles' && (
                        <Button className="primary-button small-button" onClick={() => navigate('/admin/vehicles/add')}>
                            Add New Vehicle
                        </Button>
                    )}
                </div>
                <div className="admin-page-content">
                    <Outlet /> {/* Renders the matched admin page component */}
                </div>
            </main>
            {/* Admin specific footer if needed, or omit */}
            {/* <div className="admin-footer">Admin Footer Content</div> */}
        </div>
    );
};

export default AdminLayout;