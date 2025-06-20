// src/components/sections/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBackground from '../../assets/images/Lamborghini-showroom-018-1024x633-1.webp'; // Import the image directly

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/showroom');
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        {/* Use the imported image variable as the src */}
        <img src={heroBackground} alt="Luxury Sports Car" className="hero-image" />
      </div>
      <div className="hero-content container">
        <h1 className="hero-headline">Unleash Your Dream Drive</h1>
        <p className="hero-tagline">Explore our exquisite collection of pre-owned sports and luxury automobiles.</p>
        <button className="button hero-cta" onClick={handleCtaClick}>
          View Showroom
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
