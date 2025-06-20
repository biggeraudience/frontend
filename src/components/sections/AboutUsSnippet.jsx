// src/components/sections/AboutUsSnippet.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUsSnippet = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about'); // Assuming you'll create an /about route later
  };

  return (
    <section className="about-us-snippet container">
      <div className="about-content">
        <h2 className="section-headline">Our Passion Drives Us</h2>
        <p>
          At Manga Automobiles, we share your passion for exceptional vehicles.
          Founded by Muhammad Manga, our dealership is built on a foundation of
          integrity, expertise, and a commitment to delivering the finest
          pre-owned sports and luxury cars. We meticulously select each vehicle,
          ensuring it meets our rigorous standards for quality and performance.
        </p>
        <p>
          We believe that acquiring a luxury or sports car should be an experience
          as thrilling as the drive itself. Let us help you find your next dream car.
        </p>
        <button className="button secondary-button" onClick={handleLearnMoreClick}>
          Learn More About Us
        </button>
      </div>
      <div className="owner-image-container">
        {/* Replace with the owner's image */}
        <img src="../src/assets/images/muhamad-manga.jpeg" alt="Manga Automobiles Owner" className="owner-image" />
        <p className="owner-name">Muhammad Manga</p> {/* Replace with actual owner name */}
      </div>
    </section>
  );
};

export default AboutUsSnippet;
