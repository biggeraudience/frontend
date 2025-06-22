// src/admin/components/AdminNavbar.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const AdminNavbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout logic (clear token, state, etc.)
        console.log('Admin Logout');
        navigate('/auth/login');
    };

    // Inline SVG for Menu/Hamburger icon
    const MenuIcon = ({ size = 24, color = 'currentColor' }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    );

    // Inline SVG for Bell icon
    const BellIcon = ({ size = 20, color = 'currentColor' }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    );

    // Inline SVG for User icon
    const UserIcon = ({ size = 20, color = 'currentColor' }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-left">
                <button onClick={toggleSidebar} className="menu-toggle-button">
                    <MenuIcon />
                </button>
                <Link to="/admin" className="admin-brand-name orbitron-font"> {/* Use Link for brand name */}
                    MangaAuto Admin
                </Link>
            </div>
            <div className="admin-navbar-right">
                <div className="admin-icon-button">
                    <BellIcon />
                    <span className="notification-badge">3</span>
                </div>
                <div className="admin-user-menu">
                    <UserIcon />
                    <span className="admin-username">Admin User</span>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
