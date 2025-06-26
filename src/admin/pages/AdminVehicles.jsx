// src/admin/pages/AdminVehicles.jsx

import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Button from '../../components/atoms/Button.jsx';
import Modal from '../../admin/components/Modal.jsx';
import AdminVehicleForm from '../components/AdminVehicleForm.jsx';
import {
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation
} from '../../../store/api'; // Corrected import path

const AdminVehicles = ({ initialMode }) => {
  // RTK Query hooks for fetching and modifying vehicles
  const { data: vehicles = [], isLoading, isError } = useGetVehiclesQuery();
  const [createVehicle] = useCreateVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();

  const navigate = useNavigate();
  const { id: routeId } = useParams(); // Get vehicle ID from URL for edit mode
  const location = useLocation();

  // State for controlling the Add/Edit Vehicle Modal
  const [isFormOpen, setFormOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null); // Vehicle object being added/edited

  // State for Delete Confirmation Modal
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [vehicleToDeleteId, setVehicleToDeleteId] = useState(null);

  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;

  /**
   * useEffect to handle initial mode (add/edit) and route ID.
   * This runs when the component mounts or when `initialMode`, `routeId`, or `vehicles` change.
   */
  useEffect(() => {
    // Only proceed if vehicles data is loaded and no error, or if it's an 'add' mode
    if (!isLoading && !isError) {
      if (initialMode === 'add') {
        setCurrentVehicle(null); // Clear any previous vehicle data for a new entry
        setFormOpen(true);
      } else if (routeId) {
        // If routeId is present (edit mode), try to find the vehicle
        const vehicleFound = vehicles.find(v => v.id === routeId);
        if (vehicleFound) {
          setCurrentVehicle(vehicleFound);
          setFormOpen(true);
        } else {
          // If vehicle not found, log error and navigate away from edit route
          console.error(`Vehicle with ID ${routeId} not found.`);
          navigate('/admin/vehicles', { replace: true });
        }
      }
    }
  }, [initialMode, routeId, vehicles, isLoading, isError, navigate]); // Dependencies for useEffect

  /**
   * Memoized filtered and paginated list of vehicles.
   * Recalculates only when `vehicles`, `searchTerm`, `filterStatus`, `currentPage`, or `vehiclesPerPage` change.
   */
  const filteredAndPaginatedVehicles = useMemo(() => {
    let filtered = [...vehicles];

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        v.make.toLowerCase().includes(lowerCaseSearchTerm) ||
        v.model.toLowerCase().includes(lowerCaseSearchTerm) ||
        (v.id && v.id.toLowerCase().includes(lowerCaseSearchTerm)) // Ensure v.id exists
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(v => v.status === filterStatus);
    }

    // Sort by lastUpdated (newest first)
    // Assuming 'lastUpdated' exists and is a valid date string
    filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

    // Calculate pagination details
    const totalPages = Math.ceil(filtered.length / vehiclesPerPage);
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = filtered.slice(indexOfFirstVehicle, indexOfLastVehicle);

    return {
      currentVehicles,
      totalPages,
      totalItems: filtered.length
    };
  }, [vehicles, searchTerm, filterStatus, currentPage, vehiclesPerPage]);

  const { currentVehicles: displayedVehicles, totalPages } = filteredAndPaginatedVehicles;

  /**
   * Closes the form modal and resets selected vehicle state.
   * Also navigates back to the main admin vehicles list if currently on an add/edit route.
   */
  const closeFormModal = () => {
    setFormOpen(false);
    setCurrentVehicle(null);
    // If the current URL path is not '/admin/vehicles', navigate back
    if (location.pathname !== '/admin/vehicles') {
      navigate('/admin/vehicles', { replace: true });
    }
  };

  /**
   * Handles saving a new or updated vehicle.
   * Uses `createVehicle` or `updateVehicle` mutations.
   * @param {object} formData - The vehicle data from the form.
   */
  const handleSaveVehicle = async (formData) => {
    try {
      // Prepare payload, ensuring numerical fields are parsed
      const payload = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        mileage: formData.mileage,
        engine: formData.engine,
        transmission: formData.transmission,
        exteriorColor: formData.exteriorColor,
        interiorColor: formData.interiorColor,
        fuelType: formData.fuelType,
        description: formData.description,
        imageUrl: formData.imageUrl,
        engineSound: formData.engineSound,
        status: formData.status,
        isFeatured: formData.isFeatured,
        features: formData.features, // Ensure features array is passed
        lastUpdated: new Date().toISOString(), // Update lastUpdated on save
      };

      if (currentVehicle) {
        // If `currentVehicle` exists, it's an update operation
        // The backend `updateVehicle` mutation expects the ID in the URL,
        // so ensure formData.id is used for the URL, and the rest as body.
        await updateVehicle({ id: currentVehicle.id, ...payload }).unwrap();
      } else {
        // Otherwise, it's a create operation. Remove ID if present as backend usually generates it.
        await createVehicle(payload).unwrap();
      }
      closeFormModal(); // Close modal on success
    } catch (e) {
      console.error('Failed to save vehicle:', e);
      // In a real app, display a user-friendly error message
    }
  };

  /**
   * Opens the delete confirmation modal.
   * @param {string} id - The ID of the vehicle to be deleted.
   */
  const handleDeleteClick = (id) => {
    setVehicleToDeleteId(id);
    setIsDeleteConfirmModalOpen(true);
  };

  /**
   * Confirms and performs the vehicle deletion using `deleteVehicle` mutation.
   */
  const handleConfirmDelete = async () => {
    try {
      if (vehicleToDeleteId) {
        await deleteVehicle(vehicleToDeleteId).unwrap();
        // RTK Query's invalidatesTags will handle re-fetching the list automatically
      }
      setIsDeleteConfirmModalOpen(false); // Close modal on success
      setVehicleToDeleteId(null); // Reset state
    } catch (e) {
      console.error('Failed to delete vehicle:', e);
      // In a real app, display a user-friendly error message
    }
  };

  /**
   * Cancels the delete operation and closes the confirmation modal.
   */
  const handleCancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setVehicleToDeleteId(null);
  };

  /**
   * Changes the current page for pagination.
   * @param {number} pageNumber - The page number to navigate to.
   */
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading and error states from RTK Query
  if (isLoading) return <p className="text-center text-gray-500">Loading vehicles...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading vehicles.</p>;

  return (
    <div className="admin-page admin-vehicles-page">
      <h2 className="orbitron-font">Vehicle Management</h2>

      <div className="controls-bar">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by ID, Make, or Model…"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="auctioning">Auctioning</option>
            <option value="sold">Sold</option>
            <option value="pending_inspection">Pending Inspection</option>
          </select>
        </div>
        <Button className="primary-button" onClick={() => navigate('/admin/vehicles/new')}>
          Add New Vehicle
        </Button>
      </div>

      <div className="admin-table-container">
        {displayedVehicles.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Make</th><th>Model</th><th>Year</th>
                <th>Price</th><th>Mileage</th><th>Status</th>
                <th>Featured</th><th>Last Updated</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedVehicles.map(vehicle => {
                const status = vehicle.status ?? 'unknown'; // Fallback for status if undefined
                return (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>₦{vehicle.price.toLocaleString()}</td>
                    <td>{vehicle.mileage}</td>
                    <td>
                      <span className={`status-badge status-${status.replace('_','-')}`}>
                        {status.replace(/_/g,' ')}
                      </span>
                    </td>
                    <td>{vehicle.isFeatured ? 'Yes' : 'No'}</td>
                    <td>{new Date(vehicle.lastUpdated).toLocaleDateString()}</td>
                    <td className="actions">
                      <Button
                        className="secondary-button small-button"
                        onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="primary-button small-button danger-button"
                        onClick={() => handleDeleteClick(vehicle.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="no-results-message">No vehicles found matching your criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Add/Edit Vehicle Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeFormModal}
        title={currentVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
      >
        <AdminVehicleForm
          vehicle={currentVehicle}
          onSubmit={handleSaveVehicle}
          onCancel={closeFormModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCancelDelete}
        title="Confirm Deletion"
        footer={
          <>
            <Button className="secondary-button" onClick={handleCancelDelete}>Cancel</Button>
            <Button className="primary-button danger-button" onClick={handleConfirmDelete}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this vehicle? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AdminVehicles;
