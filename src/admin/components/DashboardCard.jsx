// src/admin/components/DashboardCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, link, isIcon = false }) => {
    return (
        <Link to={link} className="dashboard-card">
            <h3 className="urbanist-font">{title}</h3>
            {isIcon ? (
                <p className="dashboard-card-icon">{value}</p> // Use a different class for icon
            ) : (
                <p className="digital-7-font">{value}</p>
            )}
            <span>View Details &rarr;</span>
        </Link>
    );
};

export default DashboardCard;
