// src/admin/pages/AdminInquiries.jsx
import React, { useState } from 'react';
import Button from '../../components/atoms/Button';
import Modal from '../../admin/components/Modal'; // Import the Modal component

const AdminInquiries = () => {
    // Initial hardcoded inquiry data
    const [inquiries, setInquiries] = useState([
        { id: 1, name: "John Doe", email: "john.doe@example.com", subject: "Vehicle availability", message: "Hi, I'm interested in the 2023 Tesla Model S. Is it still available? What's the process for viewing it?", status: "New", date: "2025-06-21", response: "" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", subject: "Bidding process query", message: "Can you explain the bidding process in more detail, especially for international buyers?", status: "Responded", date: "2025-06-20", response: "Hello Jane, The bidding process for international buyers involves..." },
        { id: 3, name: "Alice Johnson", email: "alice.j@example.com", subject: "Engine sound download", message: "I'd love to download the engine sound of the 1969 Ford Mustang. Is there a link available?", status: "New", date: "2025-06-20", response: "" },
        { id: 4, name: "Bob Williams", email: "bob.w@example.com", subject: "Account creation issue", message: "I'm having trouble creating an account. The registration form keeps giving me an error about my email address.", status: "Read", date: "2025-06-19", response: "" },
    ]);

    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [responseText, setResponseText] = useState('');

    /**
     * Handles opening the modal and setting the selected inquiry for viewing/responding.
     * @param {object} inquiry - The inquiry object to display.
     */
    const handleViewInquiry = (inquiry) => {
        setSelectedInquiry(inquiry);
        setResponseText(inquiry.response || ''); // Pre-fill response if already exists
        setIsViewModalOpen(true);
    };

    /**
     * Closes the inquiry view/response modal and resets states.
     */
    const closeModal = () => {
        setIsViewModalOpen(false);
        setSelectedInquiry(null);
        setResponseText('');
    };

    /**
     * Marks an inquiry as 'Read' without sending a response.
     * @param {number} id - The ID of the inquiry to mark as read.
     */
    const handleMarkAsRead = (id) => {
        setInquiries(prevInquiries =>
            prevInquiries.map(inq =>
                inq.id === id && inq.status === 'New' ? { ...inq, status: 'Read' } : inq
            )
        );
        closeModal(); // Close modal after action
    };

    /**
     * Handles sending a response to an inquiry and updates its status to 'Responded'.
     * @param {number} id - The ID of the inquiry to respond to.
     */
    const handleRespond = (id) => {
        if (!responseText.trim()) {
            // In a real app, you might show a user-friendly message, not an alert
            console.warn("Response text cannot be empty.");
            return;
        }

        setInquiries(prevInquiries =>
            prevInquiries.map(inq =>
                inq.id === id
                    ? { ...inq, status: 'Responded', response: responseText.trim() }
                    : inq
            )
        );
        closeModal(); // Close modal after action
    };

    return (
        <div className="admin-page admin-inquiries-page">
            <h2 className="orbitron-font">Customer Inquiries</h2>
            <p>Manage and respond to customer inquiries here.</p>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map(inquiry => (
                            <tr key={inquiry.id}>
                                <td>#{inquiry.id}</td>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.email}</td>
                                <td>{inquiry.subject}</td>
                                <td className={`inquiry-status inquiry-status--${inquiry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {inquiry.status}
                                </td>
                                <td>{inquiry.date}</td>
                                <td className="actions">
                                    <Button
                                        className="primary-button small-button"
                                        onClick={() => handleViewInquiry(inquiry)}
                                    >
                                        View
                                    </Button>
                                    {inquiry.status === 'New' && (
                                        <Button
                                            className="secondary-button small-button"
                                            onClick={() => handleMarkAsRead(inquiry.id)}
                                        >
                                            Mark as Read
                                        </Button>
                                    )}
                                    {inquiry.status === 'Read' && (
                                        <Button
                                            className="secondary-button small-button"
                                            onClick={() => handleViewInquiry(inquiry)} // Allow responding after reading
                                        >
                                            Respond
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Inquiry Detail/Response Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={closeModal}
                title={selectedInquiry ? `Inquiry #${selectedInquiry.id}: ${selectedInquiry.subject}` : ''}
                footer={
                    selectedInquiry && (
                        <div className="modal-footer-buttons">
                            <Button
                                className="secondary-button"
                                onClick={closeModal}
                            >
                                Close
                            </Button>
                            {selectedInquiry.status !== 'Responded' && ( // Only show respond button if not already responded
                                <Button
                                    className="primary-button"
                                    onClick={() => handleRespond(selectedInquiry.id)}
                                >
                                    Send Response
                                </Button>
                            )}
                        </div>
                    )
                }
            >
                {selectedInquiry && (
                    <div className="inquiry-detail">
                        <p><strong>Name:</strong> {selectedInquiry.name}</p>
                        <p><strong>Email:</strong> <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a></p>
                        <p><strong>Date:</strong> {selectedInquiry.date}</p>
                        <p><strong>Status:</strong> <span className={`inquiry-status inquiry-status--${selectedInquiry.status.toLowerCase().replace(/\s+/g, '-')}`}>{selectedInquiry.status}</span></p>
                        <hr />
                        <h4>Message:</h4>
                        <p className="inquiry-message">{selectedInquiry.message}</p>
                        <hr />
                        <h4>Your Response:</h4>
                        <textarea
                            className="text-area-input"
                            placeholder="Type your response here..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            rows="7"
                        ></textarea>
                        {selectedInquiry.response && selectedInquiry.status === 'Responded' && (
                            <p className="responded-message">
                                <strong>Previously Sent:</strong> {selectedInquiry.response}
                            </p>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminInquiries;
