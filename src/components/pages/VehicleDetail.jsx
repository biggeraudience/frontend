import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Removed: import { vehicles } from '../../data/vehiclesData'; // Your vehicle data
import Button from '../atoms/Button';
import EngineSoundPlayer from '../molecules/EngineSoundPlayer';
// New: Import useGetVehicleByIdQuery from your store API
import { useGetVehicleByIdQuery } from '../../../store/api';

const VehicleDetail = () => {
  const { id } = useParams(); // Get vehicle ID from URL
  const navigate = useNavigate();

  // Use RTK Query hook to fetch vehicle data by ID
  const { data: vehicle, isLoading, isError } = useGetVehicleByIdQuery(id);

  // Scroll to top on component mount (after data potentially loads)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Re-scroll if the ID changes (e.g., navigating between vehicle details)

  // Handle loading state
  if (isLoading) {
    return (
      <div className="vehicle-detail-loading-state flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading vehicle details...</p>
      </div>
    );
  }

  // Handle error state (e.g., network error or invalid ID)
  if (isError) {
    console.error(`Error fetching vehicle with ID: ${id}`);
    return (
      <div className="vehicle-detail-loading-state flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-red-700">Error loading vehicle details. Please try again later.</p>
        <Button className="primary-button mt-4" onClick={() => navigate('/showroom')}>
          Back to Showroom
        </Button>
      </div>
    );
  }

  // Handle case where vehicle is not found after loading
  if (!vehicle) {
    // This case will also be covered by isError if the API returns a 404 or similar,
    // but it's good to have an explicit check if the API returns null/undefined on success for non-existent IDs.
    return (
      <div className="vehicle-detail-loading-state flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Vehicle not found.</p>
        <Button className="primary-button mt-4" onClick={() => navigate('/showroom')}>
          Back to Showroom
        </Button>
      </div>
    );
  }

  return (
    <div className="vehicle-detail-page">
      {/* Vehicle Header Section */}
      <section className="vehicle-header-section">
        <div className="vehicle-title-price">
          <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <p className="vehicle-price">₦{vehicle.price.toLocaleString()}</p>
        </div>
        <div className="vehicle-key-stats">
          <span><i className="fas fa-tachometer-alt"></i> {vehicle.mileage}</span>
          <span><i className="fas fa-palette"></i> {vehicle.exteriorColor}</span>
          <span><i className="fas fa-cogs"></i> {vehicle.transmission}</span>
        </div>
        <div className="vehicle-ctas">
          <Button className="primary-button" onClick={() => console.log('Schedule Test Drive')}>
            Schedule Test Drive
          </Button>
          <Button className="secondary-button" onClick={() => console.log('Request Quote')}>
            Request Quote
          </Button>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="vehicle-gallery-section">
        <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="main-vehicle-image" />
        <div className="thumbnail-gallery">
          {/* Assuming vehicle.images is an array of image URLs from the backend, or use placeholders */}
          {vehicle.images && vehicle.images.length > 0 ? (
            vehicle.images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
            ))
          ) : (
            <>
              {/* Fallback to placeholder images if no `vehicle.images` array */}
              <img src={vehicle.imageUrl} alt="Thumbnail 1" className="thumbnail active" />
              <img src="https://placehold.co/100x60/cccccc/000000?text=Interior" alt="Thumbnail 2" className="thumbnail" />
              <img src="https://placehold.co/100x60/cccccc/000000?text=Engine" alt="Thumbnail 3" className="thumbnail" />
              <img src="https://placehold.co/100x60/cccccc/000000?text=360" alt="Thumbnail 4" className="thumbnail" />
            </>
          )}
        </div>

        {/* Engine Sound Player Section - Pass the single engineSound URL */}
        {/* Only render if vehicle.engineSound exists */}
        {vehicle.engineSound && <EngineSoundPlayer audioSrc={vehicle.engineSound} />}
      </section>

      {/* Vehicle Details & Specifications */}
      <section className="vehicle-specifications-section">
        <h2>Detailed Specifications</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <strong>Engine:</strong> <span>{vehicle.engine}</span>
          </div>
          <div className="spec-item">
            <strong>Transmission:</strong> <span>{vehicle.transmission}</span>
          </div>
          <div className="spec-item">
            <strong>Fuel Type:</strong> <span>{vehicle.fuelType}</span>
          </div>
          <div className="spec-item">
            <strong>Exterior Color:</strong> <span>{vehicle.exteriorColor}</span>
          </div>
          <div className="spec-item">
            <strong>Interior Color:</strong> <span>{vehicle.interiorColor}</span>
          </div>
          <div className="spec-item">
            <strong>Mileage:</strong> <span>{vehicle.mileage}</span>
          </div>
          {/* Assuming these might come from backend later, or are fixed for now */}
          <div className="spec-item">
            <strong>0-60 MPH:</strong> <span>{vehicle['0-60MPH'] || 'N/A'}</span>
          </div>
          <div className="spec-item">
            <strong>Horsepower:</strong> <span>{vehicle.horsepower || 'N/A'}</span>
          </div>
        </div>

        <h3>Key Features</h3>
        <ul className="features-list">
          {/* Ensure vehicle.features is an array. Added optional chaining/fallback for safety. */}
          {vehicle.features && vehicle.features.length > 0 ? (
            vehicle.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))
          ) : (
            // Placeholder features if none come from the backend or array is empty
            <>
              <li>Premium Sound System</li>
              <li>Advanced Driver Assistance Systems (ADAS)</li>
              <li>Carbon Fiber Interior Trim</li>
              <li>Sport Exhaust</li>
            </>
          )}
        </ul>
      </section>

      {/* Vehicle Description */}
      <section className="vehicle-description-section">
        <h2>About This {vehicle.make} {vehicle.model}</h2>
        <p>{vehicle.description}</p>
        <p>
          This exquisite {vehicle.year} {vehicle.make} {vehicle.model} is a prime example of
          automotive excellence, offering unparalleled performance and luxury. Maintained to the highest standards,
          it represents a rare opportunity to own a meticulously cared-for vehicle from our curated collection.
        </p>
      </section>

      {/* Vehicle History Section (Crucial for Used Luxury Cars) */}
      <section className="vehicle-history-section">
        <h2>Vehicle History & Inspection</h2>
        <p>We believe in full transparency for our discerning clients. This vehicle comes with:</p>
        <ul>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Comprehensive Vehicle History Report (e.g., Carfax/AutoCheck)</a></li>
          <li>Detailed Multi-Point Inspection by our Certified Technicians</li>
          <li>Documented Service Records (Available upon request/viewing)</li>
          <li>Clean Title Guaranteed</li>
        </ul>
        <Button className="secondary-button" onClick={() => console.log('Request Full History Report')}>
          Request Full History Report
        </Button>
      </section>

      {/* Financing & Contact Section */}
      <section className="vehicle-financing-contact-section">
        <h2>Financing & Next Steps</h2>
        <div className="financing-options">
          <p>Interested in flexible financing options? Use our calculator or apply online.</p>
          <Button className="primary-button" onClick={() => console.log('Apply for Financing')}>
            Apply for Financing
          </Button>
          <Button className="secondary-button" onClick={() => console.log('Calculate Payments')}>
            Calculate Payments
          </Button>
        </div>
        <div className="contact-dealer">
          <h3>Ready for a Private Viewing?</h3>
          <p>Contact our sales specialists for a personalized experience.</p>
          <p><strong>Call Us:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          <Button className="primary-button" onClick={() => console.log('Chat with Advisor')}>
            Chat with an Advisor
          </Button>
        </div>
      </section>

      {/* Placeholder for Similar Vehicles */}
      <section className="similar-vehicles-section">
        <h2>Similar Vehicles You Might Like</h2>
        <div className="similar-vehicles-grid">
          <div className="placeholder-vehicle-card">
            <img src="https://placehold.co/200x120/cccccc/000000?text=Car+A" alt="Similar Car A" />
            <p>Luxury Sedan</p>
          </div>
          <div className="placeholder-vehicle-card">
            <img src="https://placehold.co/200x120/cccccc/000000?text=Car+B" alt="Similar Car B" />
            <p>Performance Coupe</p>
          </div>
          <div className="placeholder-vehicle-card">
            <img src="https://placehold.co/200x120/cccccc/000000?text=Car+C" alt="Similar Car C" />
            <p>High-End SUV</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehicleDetail;
