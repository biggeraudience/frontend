// src/admin/pages/AdminInquiries.jsx
import React, { useState } from 'react';
import Button from '../../components/atoms/Button';
import Modal from '../../admin/components/Modal';
import {
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation
} from '../../../store/api'; // Corrected import path

const AdminInquiries = () => {
  // RTK Query hooks for inquiries
  const { data: inquiries = [], isLoading, isError } = useGetInquiriesQuery();
  const [updateInquiryStatus] = useUpdateInquiryStatusMutation();
  const [deleteInquiry] = useDeleteInquiryMutation();

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Handle loading and error states for RTK Query
  if (isLoading) return <p className="text-center text-gray-500">Loading inquiries...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading inquiries.</p>;

  /**
   * Handles opening the modal and setting the selected inquiry for viewing/responding.
   * @param {object} inquiry - The inquiry object to display.
   */
  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    // Assuming 'response' comes directly from the backend inquiry object if already present
    setResponseText(inquiry.response || '');
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
   * Marks an inquiry as 'Read' using the RTK Query mutation.
   * @param {object} inq - The inquiry object to mark as read.
   */
  const handleMarkAsRead = async (inq) => {
    try {
      // Assuming your backend expects 'Read' as the status string
      await updateInquiryStatus({ id: inq.id, status: 'Read' }).unwrap();
      closeModal(); // Close modal after successful action
    } catch (err) {
      console.error('Failed to mark inquiry as read:', err);
      // In a real application, display a user-friendly error message
    }
  };

  /**
   * Handles sending a response to an inquiry and updates its status to 'Responded'.
   * Uses the RTK Query mutation.
   * @param {object} inq - The inquiry object to respond to.
   */
  const handleRespond = async (inq) => {
    if (!responseText.trim()) {
      console.warn("Response text cannot be empty.");
      // In a real app, you'd show a user-friendly modal alert instead of console.warn
      return;
    }
    try {
      // Assuming your backend expects 'Responded' as the status string
      // And also handles storing the response text
      await updateInquiryStatus({ id: inq.id, status: 'Responded', response: responseText.trim() }).unwrap();
      closeModal(); // Close modal after successful action
    } catch (err) {
      console.error('Failed to send response:', err);
      // In a real application, display a user-friendly error message
    }
  };

  /**
   * Deletes an inquiry using the RTK Query mutation.
   * @param {number} id - The ID of the inquiry to delete.
   */
  const handleDelete = async (id) => {
    // Replace window.confirm with a custom modal for better UX
    if (window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) {
      try {
        await deleteInquiry(id).unwrap();
      } catch (err) {
        console.error('Failed to delete inquiry:', err);
        // In a real application, display a user-friendly error message
      }
    }
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
                {/* Assuming 'subject' exists in the inquiry data from backend */}
                <td>{inquiry.subject || 'N/A'}</td>
                <td className={`inquiry-status inquiry-status--${inquiry.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {inquiry.status}
                </td>
                {/* Assuming 'created_at' is the date field from backend */}
                <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                <td className="actions">
                  <Button
                    className="primary-button small-button"
                    onClick={() => handleViewInquiry(inquiry)}
                  >
                    View
                  </Button>
                  {/* Conditionally render Mark as Read/Respond buttons based on status */}
                  {inquiry.status === 'New' && (
                    <Button
                      className="secondary-button small-button"
                      onClick={() => handleMarkAsRead(inquiry)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {inquiry.status !== 'Responded' && (
                    <Button
                      className="secondary-button small-button"
                      onClick={() => handleViewInquiry(inquiry)} // Re-use view to open modal for response
                    >
                      Respond
                    </Button>
                  )}
                  <Button
                    className="primary-button small-button danger-button"
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    Delete
                  </Button>
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
        title={selectedInquiry ? `Inquiry #${selectedInquiry.id}: ${selectedInquiry.subject || 'No Subject'}` : ''}
        footer={
          selectedInquiry && (
            <div className="modal-footer-buttons">
              <Button
                className="secondary-button"
                onClick={closeModal}
              >
                Close
              </Button>
              {selectedInquiry.status !== 'Responded' && (
                <Button
                  className="primary-button"
                  onClick={() => handleRespond(selectedInquiry)}
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
            <p><strong>Date:</strong> {new Date(selectedInquiry.created_at).toLocaleDateString()}</p>
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
