// src/admin/pages/AdminSettings.jsx
import React, { useState } from 'react';
import Button from '../../components/atoms/Button'; // Assuming your Button component path

const AdminSettings = () => {
    const [siteTitle, setSiteTitle] = useState('Manga Automobiles');
    const [adminEmail, setAdminEmail] = useState('admin@mangaauto.com');

    const handleSaveSettings = (e) => {
        e.preventDefault();
        console.log('Saving settings:', { siteTitle, adminEmail });
        // Implement API call to save settings
        alert('Settings saved!');
    };

    return (
        <div className="admin-page admin-settings-page">
            <h2 className="orbitron-font">Admin Settings</h2>
            <p>Configure general site and admin panel settings.</p>

            <form onSubmit={handleSaveSettings}>
                <div className="form-group">
                    <label htmlFor="siteTitle">Website Title</label>
                    <input
                        type="text"
                        id="siteTitle"
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        placeholder="Enter website title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="adminEmail">Admin Contact Email</label>
                    <input
                        type="email"
                        id="adminEmail"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="Enter admin email"
                        required
                    />
                </div>
                {/* Add more settings fields as needed */}
                <Button type="submit" className="primary-button">
                    Save Settings
                </Button>
            </form>
        </div>
    );
};

export default AdminSettings;