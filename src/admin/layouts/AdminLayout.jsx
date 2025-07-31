// src/admin/layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminNavbar  from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import Button       from '../../components/atoms/Button';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(o => !o);

  // Simple auth guard (you probably already handle this upstream)
  useEffect(() => {
    // if you have a real isAuthenticated flag, use it instead
    const isAuthenticated = true; 
    if (!isAuthenticated && !location.pathname.startsWith('/auth')) {
      navigate('/auth/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  // Only show the “Add New Vehicle” button when anywhere under /admin/vehicles
  const isVehicleSection = location.pathname.startsWith('/admin/vehicles');

  const handleAddVehicle = () => {
    navigate('/admin/vehicles/new', { replace: false });
  };

  return (
    <div className="admin-dashboard-layout">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        onNavigate={(path) => navigate(path)}
      />
      <main className={`admin-content-area ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="admin-content-header">
          <h1>
            {location.pathname
              .replace('/admin/', '')
              .split('/')[0]
              .toUpperCase() || 'DASHBOARD'}
          </h1>
          {isVehicleSection && (
            <Button
              className="primary-button small-button"
              onClick={handleAddVehicle}
            >
              Add New Vehicle
            </Button>
          )}
        </div>
        <div className="admin-page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
