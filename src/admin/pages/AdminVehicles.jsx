// frontend/src/admin/pages/AdminVehicles.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/atoms/Button.jsx';
import Modal from '../../admin/components/Modal.jsx';
import AdminVehicleForm from '../components/AdminVehicleForm.jsx';

// fixed import: pull `vehicles` and alias to `mockAdminVehicles`
import { vehicles as mockAdminVehicles } from '../../data/vehiclesData.js';

const AdminVehicles = ({ initialMode }) => {
  const { id: routeVehicleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentVehicleToEdit, setCurrentVehicleToEdit] = useState(null);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [vehicleToDeleteId, setVehicleToDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setVehicles(mockAdminVehicles);
      setIsLoading(false);

      if (initialMode === 'add') {
        setCurrentVehicleToEdit(null);
        setIsFormModalOpen(true);
      } else if ((initialMode === 'edit' || routeVehicleId) && routeVehicleId) {
        const vehicle = mockAdminVehicles.find(v => v.id === routeVehicleId);
        if (vehicle) {
          setCurrentVehicleToEdit(vehicle);
          setIsFormModalOpen(true);
        } else {
          console.error(`Vehicle ID ${routeVehicleId} not found.`);
          navigate('/admin/vehicles', { replace: true });
        }
      }
    }, 500);
  }, [initialMode, routeVehicleId, navigate]);

  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];
    if (searchTerm) {
      const lc = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        v.make.toLowerCase().includes(lc) ||
        v.model.toLowerCase().includes(lc) ||
        v.id.toLowerCase().includes(lc)
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(v => v.status === filterStatus);
    }
    filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    return filtered;
  }, [vehicles, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const idxLast = currentPage * vehiclesPerPage;
  const idxFirst = idxLast - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(idxFirst, idxLast);

  const handleAddVehicle = () => {
    setCurrentVehicleToEdit(null);
    setIsFormModalOpen(true);
    navigate('/admin/vehicles/new');
  };
  const handleEditVehicle = v => {
    setCurrentVehicleToEdit(v);
    setIsFormModalOpen(true);
    navigate(`/admin/vehicles/edit/${v.id}`);
  };
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setCurrentVehicleToEdit(null);
    if (location.pathname !== '/admin/vehicles') {
      navigate('/admin/vehicles', { replace: true });
    }
  };
  const handleSaveVehicle = formData => {
    setVehicles(prev => {
      const idx = prev.findIndex(v => v.id === formData.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = formData;
        return copy;
      }
      return [formData, ...prev];
    });
    handleCloseFormModal();
    console.log(`Saved ${formData.make} ${formData.model}`);
  };

  const handleDeleteClick = id => {
    setVehicleToDeleteId(id);
    setIsDeleteConfirmModalOpen(true);
  };
  const handleConfirmDelete = () => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleToDeleteId));
    setIsDeleteConfirmModalOpen(false);
    setVehicleToDeleteId(null);
    console.log('Deleted vehicle');
  };
  const handleCancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setVehicleToDeleteId(null);
  };
  const paginate = n => setCurrentPage(n);

  if (isLoading) return <div className="admin-page admin-vehicles-page"><p>Loading…</p></div>;
  if (error)   return <div className="admin-page admin-vehicles-page"><p>Error: {error.message}</p></div>;

  return (
    <div className="admin-page admin-vehicles-page">
      <h2 className="orbitron-font">Vehicle Management</h2>

      <div className="controls-bar">
        <div className="filters">
          <input
            type="text"
            placeholder="Search…"
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
        <Button className="primary-button" onClick={handleAddVehicle}>
          Add New Vehicle
        </Button>
      </div>

      <div className="admin-table-container">
        {currentVehicles.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Make</th><th>Model</th><th>Year</th>
                <th>Price</th><th>Mileage</th><th>Status</th>
                <th>Featured</th><th>Last Updated</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentVehicles.map(vehicle => {
                const status = vehicle.status ?? 'unknown';
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
                        onClick={() => handleEditVehicle(vehicle)}
                      >Edit</Button>
                      <Button
                        className="primary-button small-button"
                        onClick={() => handleDeleteClick(vehicle.id)}
                      >Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="no-results-message">No vehicles match your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i+1)}
              className={`pagination-button ${currentPage === i+1 ? 'active' : ''}`}
            >{i+1}</Button>
          ))}
        </div>
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={currentVehicleToEdit ? 'Edit Vehicle' : 'Add New Vehicle'}
      >
        <AdminVehicleForm
          vehicle={currentVehicleToEdit}
          onSubmit={handleSaveVehicle}
          onCancel={handleCloseFormModal}
        />
      </Modal>

      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCancelDelete}
        title="Confirm Deletion"
        footer={
          <>
            <Button className="secondary-button" onClick={handleCancelDelete}>Cancel</Button>
            <Button className="primary-button" onClick={handleConfirmDelete}>Delete</Button>
          </>
        }
      >
        <p>Are you sure? This cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AdminVehicles;
