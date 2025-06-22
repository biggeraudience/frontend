// src/admin/pages/AdminUsers.jsx
import React from 'react';
import Button from '../../components/atoms/Button'; // Assuming your Button component path

const AdminUsers = () => {
    const users = [
        { id: 1, username: "adminuser", email: "admin@example.com", role: "Admin", status: "Active" },
        { id: 2, username: "clientuser1", email: "client1@example.com", role: "Client", status: "Active" },
        { id: 3, username: "testuser", email: "test@example.com", role: "Client", status: "Inactive" },
    ];

    return (
        <div className="admin-page admin-users-page">
            <h2 className="orbitron-font">User Management</h2>
            <p>Manage registered users (clients and admins).</p>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>#{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td className="actions">
                                    <Button className="secondary-button small-button">Edit</Button>
                                    <Button className="primary-button small-button">Disable</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;