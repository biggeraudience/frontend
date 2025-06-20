import React from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '../atoms/VehicleCard';

const FeaturedVehicles = ({ vehicles }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/vehicle/${id}`);
  };

  const handleViewAllClick = () => {
    navigate('/showroom');
  };

  return (
    <section className="featured-vehicles container">
      <h2 className="section-headline">Our Top Picks</h2>
      <div className="vehicle-grid">
        {vehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onViewDetails={() => handleViewDetails(vehicle.id)}
          />
        ))}
      </div>
      <div className="text-center">
        <button className="button secondary-button" onClick={handleViewAllClick}>
          View All Vehicles
        </button>
      </div>
    </section>
  );
};

export default FeaturedVehicles;