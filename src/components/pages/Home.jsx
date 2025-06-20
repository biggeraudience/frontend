// src/components/pages/Home.jsx
import React from 'react';
import HeroSection from '../sections/HeroSection';
import FeaturedVehicles from '../sections/FeaturedVehicles';
import WhyChooseUs from '../sections/WhyChooseUs';
import AboutUsSnippet from '../sections/AboutUsSnippet';
import CallToActionSection from '../sections/CallToActionSection';

import { featuredVehicleIds } from '../../data/featuredVehicles';
import { vehicles } from '../../data/vehiclesData';
import { whyChooseUsFeatures } from '../../data/whyChooseUsData';

// Filter vehicles to get only the featured ones
const getFeaturedVehicles = (ids, allVehicles) =>
  ids
    .map(id => allVehicles.find(v => v.id === id))
    .filter(Boolean);

const Home = () => {
  const featuredCars = getFeaturedVehicles(featuredVehicleIds, vehicles);

  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedVehicles vehicles={featuredCars} />
      <WhyChooseUs features={whyChooseUsFeatures} />
      <AboutUsSnippet />
      <CallToActionSection />
    </div>
  );
};

export default Home;
