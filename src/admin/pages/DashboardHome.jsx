// src/admin/pages/DashboardHome.jsx
import React from 'react';
import DashboardCard from '../components/DashboardCard';

const DashboardHome = () => {
    return (
        <div className="dashboard-home">
            <h2 className="orbitron-font">Welcome, Admin!</h2>
            <div className="dashboard-grid">
                <DashboardCard title="Active Auctions" value="12" link="/admin/auctions" />
                <DashboardCard title="New Inquiries" value="5" link="/admin/inquiries" />
                <DashboardCard title="Total Vehicles" value="150" link="/admin/vehicles" />
                <DashboardCard title="Registered Users" value="1,200" link="/admin/users" />
                {/* New card for Analytics */}
                <DashboardCard title="View Analytics" value="📈" link="/admin/analytics" isIcon={true} />
            </div>
            {/* Add more sections like recent activity, quick stats */}
        </div>
    );
};

export default DashboardHome;
