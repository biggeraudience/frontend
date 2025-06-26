// src/admin/pages/AdminUsers.jsx
import React from 'react';
import Button from '../../components/atoms/Button';
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation
} from '../../../store/api'; // Corrected import path

const AdminUsers = () => {
  // RTK Query hooks for users
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();

  // Handle loading and error states for RTK Query
  if (isLoading) return <p className="text-center text-gray-500">Loading users...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading users.</p>;

  /**
   * Handles changing a user's role using the RTK Query mutation.
   * @param {number} id - The ID of the user to update.
   * @param {string} newRole - The new role for the user ('user' or 'admin').
   */
  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole({ id, role: newRole }).unwrap();
    } catch (err) {
      console.error('Failed to update user role:', err);
      // In a real application, display a user-friendly error message (e.g., a toast notification)
    }
  };

  /**
   * Placeholder for handling user edit.
   * In a full application, this would open a modal to edit user details.
   * @param {object} user - The user object to edit.
   */
  const handleEditUser = (user) => {
    console.log("Edit user clicked for:", user.id);
    // TODO: Implement modal or navigation to edit user details
    // You would likely need a new RTK Query mutation for updating full user profiles
  };

  /**
   * Placeholder for handling user disable/status change.
   * In a full application, this would update the user's active status.
   * Requires a 'status' field on the user object and a corresponding API endpoint.
   * @param {number} id - The ID of the user to disable.
   */
  const handleDisableUser = (id) => {
    console.log("Disable user clicked for:", id);
    // TODO: Implement logic to disable/change user status.
    // This would likely require a new RTK Query mutation like `updateUserStatus`
    // and a 'status' field in your user data from the backend.
    // For now, it's just a console log.
    if (window.confirm("Are you sure you want to disable this user?")) {
        // Example: If your backend has a 'status' field and an endpoint to update it
        // updateUserStatus({ id, status: 'inactive' });
        console.log(`User ${id} disabled (simulated).`);
    }
  };

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
              {/* Restored 'Status' column */}
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
                {/* Display user status - assuming your backend user data includes a 'status' field */}
                <td>{user.status || 'N/A'}</td>
                <td className="actions">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    className="select-input"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {/* Restored 'Edit' button */}
                  <Button
                    className="secondary-button small-button"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  {/* Restored 'Disable' button */}
                  <Button
                    className="primary-button small-button danger-button" // Added danger-button class
                    onClick={() => handleDisableUser(user.id)}
                  >
                    Disable
                  </Button>
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
