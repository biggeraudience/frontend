// src/components/sections/CallToActionSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToActionSection = () => {
  const navigate = useNavigate();

  const handleContactUsClick = () => {
    navigate('/contact'); // Assuming you'll create a /contact route later
  };

  const handleTestDriveClick = () => {
    // This could navigate to a form or a contact page with a specific section highlighted
    navigate('/contact?action=testdrive');
  };

  return (
    <section className="call-to-action-section">
      <div className="container">
        <h2 className="section-headline">Ready to Find Your Dream Car?</h2>
        <p className="cta-description">Connect with our team to explore your options or schedule an exclusive test drive.</p>
        <div className="cta-buttons">
          <button className="button primary-button" onClick={handleContactUsClick}>
            Contact Us
          </button>
          <button className="button secondary-button" onClick={handleTestDriveClick}>
            Schedule a Test Drive
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
