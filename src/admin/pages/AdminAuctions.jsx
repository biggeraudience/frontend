// src/admin/pages/AdminAuctions.jsx
import React, { useState } from 'react';
import Button from '../../components/atoms/Button';
import Modal from '../../admin/components/Modal';
import {
  useGetAuctionsQuery,
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionMutation,
  useGetVehiclesQuery // Import useGetVehiclesQuery to get vehicle names for the dropdown
} from '../../../store/api'; // Corrected path to api.js

const AdminAuctions = () => {
  // --- RTK Query hooks ---
  const { data: auctions = [], isLoading, isError } = useGetAuctionsQuery();
  const [createAuction] = useCreateAuctionMutation();
  const [updateAuction] = useUpdateAuctionMutation();
  const [deleteAuction] = useDeleteAuctionMutation();

  // Fetch vehicles for the dropdown in the modal
  const { data: vehicles = [], isLoading: isLoadingVehicles, isError: isErrorVehicles } = useGetVehiclesQuery();

  // --- Modal & form state ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [form, setForm] = useState({
    vehicle_id: '',
    description: '', // Keeping description in form, although it was removed in the provided new code for backend payload, this allows UI to capture it.
    start_time: '',
    end_time: '',
    starting_bid: '',
    status: 'pending',
  });

  const resetForm = () => {
    setForm({
      vehicle_id: '',
      description: '',
      start_time: '',
      end_time: '',
      starting_bid: '',
      status: 'pending',
    });
  };

  const openAdd = () => {
    setModalMode('add');
    resetForm();
    setSelectedAuction(null);
    setIsModalOpen(true);
  };

  const openEdit = (auction) => {
    setModalMode('edit');
    setSelectedAuction(auction);
    setForm({
      // Ensure that values are correctly formatted for input types
      vehicle_id: auction.vehicle_id || '',
      description: auction.description || '', // Assuming description might come from backend
      start_time: auction.start_time ? new Date(auction.start_time).toISOString().slice(0, 16) : '', // Format for datetime-local
      end_time: auction.end_time ? new Date(auction.end_time).toISOString().slice(0, 16) : '',     // Format for datetime-local
      starting_bid: auction.starting_bid !== null ? auction.starting_bid.toString() : '',
      status: auction.status || 'pending',
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!form.vehicle_id || !form.start_time || !form.end_time || form.starting_bid === '') {
        // In a real app, you'd show a user-friendly error message here (e.g., a toast or alert modal)
        console.error("Please fill in all required fields (Vehicle ID, Start Time, End Time, Starting Bid).");
        return;
    }

    const payload = {
      vehicle_id: form.vehicle_id,
      description: form.description, // Include description if your backend supports it for auctions
      start_time: new Date(form.start_time).toISOString(),
      end_time: new Date(form.end_time).toISOString(),
      starting_bid: parseFloat(form.starting_bid),
      status: form.status,
    };

    try {
      if (modalMode === 'add') {
        await createAuction(payload).unwrap();
      } else {
        await updateAuction({ id: selectedAuction.id, ...payload }).unwrap();
      }
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Failed to save auction:', err);
      // More sophisticated error handling for the user could go here
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this auction? This action cannot be undone.')) {
      try {
        await deleteAuction(id).unwrap();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (isLoading || isLoadingVehicles) return <p>Loading auctions...</p>;
  if (isError) return <p>Error loading auctions: {isError.message || 'Unknown error'}</p>;
  if (isErrorVehicles) return <p>Error loading vehicles for dropdown: {isErrorVehicles.message || 'Unknown error'}</p>;


  return (
    <div className="admin-page admin-auctions-page">
      <h2 className="orbitron-font">Auction Management</h2>
      <p>Manage and track all vehicle auctions here.</p>

      <div className="admin-actions-bar">
        <Button className="primary-button" onClick={openAdd}>
          Add New Auction
        </Button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Vehicle (ID)</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Starting Bid</th>
              <th>Current Bid</th> {/* Added Current Bid column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map(auction => (
              <tr key={auction.id}>
                <td>#{auction.id}</td>
                <td>{auction.vehicle_id}</td> {/* Display vehicle_id */}
                <td className={`auction-status auction-status--${auction.status.toLowerCase()}`}>
                  {auction.status}
                </td>
                <td>{new Date(auction.start_time).toLocaleString()}</td>
                <td>{new Date(auction.end_time).toLocaleString()}</td>
                <td>₦{auction.starting_bid.toLocaleString()}</td>
                <td>{auction.current_highest_bid ? `₦${auction.current_highest_bid.toLocaleString()}` : 'N/A'}</td> {/* Display current_highest_bid */}
                <td className="actions">
                  <Button
                    className="secondary-button small-button"
                    onClick={() => openEdit(auction)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="primary-button small-button danger-button"
                    onClick={() => handleDelete(auction.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auction Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Auction' : 'Edit Auction'}
        footer={
          <div className="modal-footer-buttons">
            <Button className="secondary-button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="primary-button" onClick={handleSave}>
              {modalMode === 'add' ? 'Create Auction' : 'Save Changes'}
            </Button>
          </div>
        }
      >
        <form className="auction-form">
          <div className="form-group">
            <label htmlFor="vehicle_id">Vehicle:</label>
            <select
              id="vehicle_id"
              name="vehicle_id"
              value={form.vehicle_id}
              onChange={handleFormChange}
              className="select-input"
              required
            >
              <option value="">Select a Vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional):</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              className="text-area-input"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="start_time">Start Time:</label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={form.start_time}
              onChange={handleFormChange}
              className="text-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time">End Time:</label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={form.end_time}
              onChange={handleFormChange}
              className="text-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="starting_bid">Starting Bid (₦):</label>
            <input
              type="number"
              id="starting_bid"
              name="starting_bid"
              value={form.starting_bid}
              onChange={handleFormChange}
              className="text-input"
              required
              min="0"
              step="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="select-input"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAuctions;
