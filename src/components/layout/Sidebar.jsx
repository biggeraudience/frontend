// src/components/layout/Sidebar.jsx
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { sidebarVehiclesData } from '../../data/vehicleSidebarData';

const BackArrowSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="back-arrow-svg"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const Sidebar = ({ isSidebarOpen, toggleSidebar, navigateTo }) => {
  const sidebarRef = useRef(null);
  // navLinksRef now points to the scrollable content area
  const navLinksRef = useRef(null);

  const [currentView, setCurrentView] = useState('main');
  const [navigationHistory, setNavigationHistory] = useState(['Home']);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Effect to handle sidebar open/close animations and body overflow
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
    }

    if (isSidebarOpen) {
      setCurrentView('main'); // Reset to main view on open
      setNavigationHistory(['Home']);
      setSelectedBrand(null);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      gsap.to(sidebarRef.current, {
        x: '0%',
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else {
      document.body.style.overflow = ''; // Restore overflow on close
      document.documentElement.style.overflow = '';
      gsap.to(sidebarRef.current, {
        x: '100%',
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.in',
      });
    }
  }, [isSidebarOpen]);

  // Effect to animate links when the view changes
  useLayoutEffect(() => {
    if (!isSidebarOpen) return;

    let targetLinks;
    // Targeting children of the specific views within the scroll area
    if (currentView === 'main') {
      targetLinks = navLinksRef.current?.querySelector('.main-nav')?.children;
    } else if (currentView === 'vehicles-options') {
      targetLinks = navLinksRef.current?.querySelector('.vehicles-options-list')?.children;
    } else if (currentView === 'brand-selection') {
      targetLinks = navLinksRef.current?.querySelector('.brand-selection-grid')?.children;
    } else if (currentView === 'brand-models') {
      targetLinks = navLinksRef.current?.querySelector('.brand-models-grid')?.children;
    }

    if (targetLinks) {
      gsap.fromTo(
        targetLinks,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.4, delay: 0.2, ease: 'power2.out' }
      );
    }
  }, [currentView, isSidebarOpen]);

  // Handlers
  const handleMainNavigation = label => {
    if (label === 'Vehicles') {
      setCurrentView('vehicles-options');
      setNavigationHistory(['Home', 'Vehicles']);
    } else {
      navigateTo({ type: 'main', value: label });
    }
  };

  const handleVehicleOptionClick = optionId => {
    if (optionId === 'brands') {
      setCurrentView('brand-selection');
      setNavigationHistory(prev => [...prev, 'Brands']);
    } else {
      navigateTo({ type: 'filter-showroom', value: optionId });
    }
  };

  const handleBrandClick = brand => {
    setSelectedBrand(brand);
    setCurrentView('brand-models');
    setNavigationHistory(prev => [...prev, brand.name]);
  };

  const handleModelClick = model => {
    navigateTo({ type: 'vehicle-detail', value: model.id });
  };

  const goBack = () => {
    if (currentView === 'brand-models') {
      setCurrentView('brand-selection');
      setNavigationHistory(['Home', 'Vehicles', 'Brands']);
    } else if (currentView === 'brand-selection') {
      setCurrentView('vehicles-options');
      setNavigationHistory(['Home', 'Vehicles']);
    } else if (currentView === 'vehicles-options') {
      setCurrentView('main');
      setNavigationHistory(['Home']);
    }
  };

  const renderBreadcrumbs = () =>
    navigationHistory.length > 1 && (
      <div className="sidebar-breadcrumb urbanist-font">
        {navigationHistory.slice(1).map((crumb, idx) => (
          <span key={idx}>
            {idx > 0 && <span className="breadcrumb-separator">&gt;</span>}
            {crumb}
          </span>
        ))}
      </div>
    );

  // Views
  const renderMainNavigation = () => (
    <nav className="sidebarNav main-nav">
      {['Home', 'Vehicles', 'About Us', 'Contact'].map(label => (
        <a
          key={label}
          className="navLink orbitron-font"
          onClick={() => handleMainNavigation(label)}
        >
          {label}
        </a>
      ))}
    </nav>
  );

  const renderVehiclesOptions = () => (
    <div className="sidebarNav vehicles-options-view">
      <div className="sidebar-header-controls">
        <button onClick={goBack} className="back-button"><BackArrowSvg /></button>
        {renderBreadcrumbs()}
      </div>
      <div className="vehicles-options-list">
        {sidebarVehiclesData.vehicleOptions.map(opt => (
          <a
            key={opt.id}
            className="navLink orbitron-font"
            onClick={() => handleVehicleOptionClick(opt.id)}
          >
            {opt.name}
          </a>
        ))}
      </div>
    </div>
  );

  const renderBrandSelection = () => (
    <div className="sidebarNav brand-selection-view">
      <div className="sidebar-header-controls">
        <button onClick={goBack} className="back-button"><BackArrowSvg /></button>
        {renderBreadcrumbs()}
      </div>
      <div className="brand-selection-grid">
        {sidebarVehiclesData.brands.map(b => (
          <div key={b.id} className="brand-item" onClick={() => handleBrandClick(b)}>
            {/* Render SVG string directly using dangerouslySetInnerHTML */}
            <div
              className="brand-badge"
              dangerouslySetInnerHTML={{ __html: b.badge }}
            />
            <span className="brand-name urbanist-font">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrandModels = () => (
    <div className="sidebarNav brand-models-view">
      <div className="sidebar-header-controls">
        <button onClick={goBack} className="back-button"><BackArrowSvg /></button>
        {renderBreadcrumbs()}
      </div>
      {selectedBrand && (
        <>
          <div className="current-brand-info">
            {/* Render SVG string directly using dangerouslySetInnerHTML */}
            <div
              className="current-brand-badge"
              dangerouslySetInnerHTML={{ __html: selectedBrand.badge }}
            />
          </div>
          <div className="brand-models-grid">
            {selectedBrand.models.map(m => (
              <div
                key={m.id}
                className="model-item"
                onClick={() => handleModelClick(m)}
              >
                <img className="model-image" src={m.image} alt={m.name} />
                <span className="model-name urbanist-font">{m.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isSidebarOpen ? 'isOpen' : ''}`}
      aria-hidden={!isSidebarOpen}
    >
      {/* NEW: Scrollable content area */}
      <div ref={navLinksRef} className="sidebar-content-scroll-area">
        {currentView === 'main' && renderMainNavigation()}
        {currentView === 'vehicles-options' && renderVehiclesOptions()}
        {currentView === 'brand-selection' && renderBrandSelection()}
        {currentView === 'brand-models' && renderBrandModels()}
      </div>

      <div className="sidebarFooter">
        <p>&copy; {new Date().getFullYear()} MangaAuto. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;