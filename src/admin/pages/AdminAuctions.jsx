// src/admin/pages/AdminAuctions.jsx
import React, { useState } from 'react';
import Button from '../../components/atoms/Button';
import Modal from '../../admin/components/Modal'; // Assuming correct path for Modal

const AdminAuctions = () => {
    // Initial hardcoded auction data
    const [auctions, setAuctions] = useState([
        {
            id: 1,
            vehicle: "2023 Manga X1",
            description: "Luxury electric SUV with panoramic roof and advanced autopilot. Low mileage.",
            status: "Active",
            startDate: "2025-06-20",
            endDate: "2025-06-27",
            currentBid: 55000,
            minimumBid: 50000,
            image: "https://placehold.co/400x300/E10600/FFFFFF?text=Manga+X1"
        },
        {
            id: 2,
            vehicle: "2024 Manga Roadster",
            description: "High-performance electric sports car, 0-60 in 2.5s. Limited edition.",
            status: "Upcoming",
            startDate: "2025-07-01",
            endDate: "2025-07-08",
            currentBid: null, // N/A for upcoming
            minimumBid: 90000,
            image: "https://placehold.co/400x300/000000/FFFFFF?text=Manga+Roadster"
        },
        {
            id: 3,
            vehicle: "1969 Vintage Mustang",
            description: "Classic American muscle car, fully restored with original parts. V8 engine.",
            status: "Ended",
            startDate: "2025-06-01",
            endDate: "2025-06-08",
            currentBid: 78000,
            minimumBid: 70000,
            image: "https://placehold.co/400x300/666666/FFFFFF?text=Vintage+Mustang"
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [selectedAuction, setSelectedAuction] = useState(null);

    // Form states for new/edited auction
    const [auctionForm, setAuctionForm] = useState({
        vehicle: '',
        description: '',
        status: 'Upcoming', // Default status
        startDate: '',
        endDate: '',
        currentBid: '',
        minimumBid: '',
        image: ''
    });

    /**
     * Resets the form fields to their initial empty state.
     */
    const resetForm = () => {
        setAuctionForm({
            vehicle: '',
            description: '',
            status: 'Upcoming',
            startDate: '',
            endDate: '',
            currentBid: '',
            minimumBid: '',
            image: ''
        });
    };

    /**
     * Opens the modal in 'add' mode.
     */
    const handleAddAuction = () => {
        setModalMode('add');
        resetForm();
        setSelectedAuction(null);
        setIsModalOpen(true);
    };

    /**
     * Opens the modal in 'edit' mode and pre-fills the form with selected auction data.
     * @param {object} auction - The auction object to edit.
     */
    const handleEditAuction = (auction) => {
        setModalMode('edit');
        setSelectedAuction(auction);
        setAuctionForm({
            vehicle: auction.vehicle,
            description: auction.description,
            status: auction.status,
            startDate: auction.startDate,
            endDate: auction.endDate,
            currentBid: auction.currentBid !== null ? auction.currentBid.toString() : '',
            minimumBid: auction.minimumBid !== null ? auction.minimumBid.toString() : '',
            image: auction.image || ''
        });
        setIsModalOpen(true);
    };

    /**
     * Handles form input changes.
     * @param {object} e - The event object.
     */
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setAuctionForm(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Saves a new or updated auction.
     */
    const handleSaveAuction = () => {
        // Basic validation (can be expanded)
        if (!auctionForm.vehicle || !auctionForm.startDate || !auctionForm.endDate || !auctionForm.minimumBid) {
            console.error("Please fill in all required fields.");
            return;
        }

        const newAuctionData = {
            ...auctionForm,
            // Convert bid values to numbers, handle empty strings for currentBid
            currentBid: auctionForm.currentBid ? parseFloat(auctionForm.currentBid) : null,
            minimumBid: parseFloat(auctionForm.minimumBid),
            // Ensure status is valid
            status: ['Active', 'Upcoming', 'Ended'].includes(auctionForm.status) ? auctionForm.status : 'Upcoming',
        };

        if (modalMode === 'add') {
            const newId = auctions.length > 0 ? Math.max(...auctions.map(a => a.id)) + 1 : 1;
            setAuctions(prev => [...prev, { ...newAuctionData, id: newId }]);
        } else if (modalMode === 'edit' && selectedAuction) {
            setAuctions(prev => prev.map(auction =>
                auction.id === selectedAuction.id ? { ...newAuctionData, id: selectedAuction.id } : auction
            ));
        }
        closeModal();
    };

    /**
     * Deletes an auction.
     * @param {number} id - The ID of the auction to delete.
     */
    const handleDeleteAuction = (id) => {
        if (window.confirm("Are you sure you want to delete this auction? This action cannot be undone.")) {
            setAuctions(prev => prev.filter(auction => auction.id !== id));
        }
    };

    /**
     * Closes the modal and resets states.
     */
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAuction(null);
        resetForm();
    };

    return (
        <div className="admin-page admin-auctions-page">
            <h2 className="orbitron-font">Auction Management</h2>
            <p>Manage and track all vehicle auctions here.</p>

            <div className="admin-actions-bar">
                <Button className="primary-button" onClick={handleAddAuction}>
                    Add New Auction
                </Button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Auction ID</th>
                            <th>Vehicle</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Current Bid</th>
                            <th>Min Bid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctions.map(auction => (
                            <tr key={auction.id}>
                                <td>#{auction.id}</td>
                                <td>{auction.vehicle}</td>
                                <td className={`auction-status auction-status--${auction.status.toLowerCase()}`}>
                                    {auction.status}
                                </td>
                                <td>{auction.startDate}</td>
                                <td>{auction.endDate}</td>
                                <td>{auction.currentBid ? `$${auction.currentBid.toLocaleString()}` : 'N/A'}</td>
                                <td>${auction.minimumBid.toLocaleString()}</td>
                                <td className="actions">
                                    <Button
                                        className="secondary-button small-button"
                                        onClick={() => handleEditAuction(auction)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="primary-button small-button danger-button" // Adding danger-button for styling delete
                                        onClick={() => handleDeleteAuction(auction.id)}
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
                onClose={closeModal}
                title={modalMode === 'add' ? 'Add New Auction' : 'Edit Auction'}
                footer={
                    <div className="modal-footer-buttons">
                        <Button className="secondary-button" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button className="primary-button" onClick={handleSaveAuction}>
                            {modalMode === 'add' ? 'Create Auction' : 'Save Changes'}
                        </Button>
                    </div>
                }
            >
                <form className="auction-form">
                    <div className="form-group">
                        <label htmlFor="vehicle">Vehicle Name:</label>
                        <input
                            type="text"
                            id="vehicle"
                            name="vehicle"
                            value={auctionForm.vehicle}
                            onChange={handleFormChange}
                            className="text-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={auctionForm.description}
                            onChange={handleFormChange}
                            className="text-area-input"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={auctionForm.status}
                            onChange={handleFormChange}
                            className="select-input"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Active">Active</option>
                            <option value="Ended">Ended</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={auctionForm.startDate}
                            onChange={handleFormChange}
                            className="text-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={auctionForm.endDate}
                            onChange={handleFormChange}
                            className="text-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="minimumBid">Minimum Bid ($):</label>
                        <input
                            type="number"
                            id="minimumBid"
                            name="minimumBid"
                            value={auctionForm.minimumBid}
                            onChange={handleFormChange}
                            className="text-input"
                            required
                            min="0"
                            step="100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="currentBid">Current Bid ($):</label>
                        <input
                            type="number"
                            id="currentBid"
                            name="currentBid"
                            value={auctionForm.currentBid}
                            onChange={handleFormChange}
                            className="text-input"
                            min="0"
                            step="100"
                            // Make currentBid optional for Upcoming auctions
                            readOnly={auctionForm.status === 'Upcoming'}
                            disabled={auctionForm.status === 'Upcoming'}
                        />
                    </div>
                     <div className="form-group">
                        <label htmlFor="image">Image URL (Optional):</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={auctionForm.image}
                            onChange={handleFormChange}
                            className="text-input"
                            placeholder="e.g., https://placehold.co/400x300"
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminAuctions;
