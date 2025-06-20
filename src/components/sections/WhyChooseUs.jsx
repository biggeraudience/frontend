// src/components/sections/WhyChooseUs.jsx
import React from 'react';

const WhyChooseUs = ({ features }) => {
  return (
    <section className="why-choose-us container">
      <h2 className="section-headline">Why Choose Manga Automobiles?</h2>
      <div className="features-grid">
        {features.map(feature => (
          <div key={feature.id} className="feature-item">
            <div className="feature-icon" dangerouslySetInnerHTML={{ __html: feature.iconSvg }}>
              {/* SVG icon will be rendered here */}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
