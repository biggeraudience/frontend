// src/App.jsx
import React, { useState } from 'react';
// CORRECTED: Added useNavigate back to the import list
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import StartScreen from './components/pages/StartScreen';
import SplashScreen from './components/pages/SplashScreen';
import Home from './components/pages/Home';
import Showroom from './components/pages/Showroom';
import VehicleDetail from './components/pages/VehicleDetail';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import './styles/main.scss';

const App = () => {
  const [step, setStep] = useState('start');

  if (step === 'start') {
    return <StartScreen onStart={() => setStep('splash')} />;
  }

  if (step === 'splash') {
    return <SplashScreen onAnimationComplete={() => setStep('app')} />;
  }

  // Only mount the router once step === 'app'
  if (step === 'app') {
    return (
      <BrowserRouter>
        {/* Navbar, Sidebar, Footer, and Routes are now inside BrowserRouter */}
        <MainAppShellWrapper /> {/* Use a wrapper to encapsulate MainAppShell's logic including useNavigate */}
      </BrowserRouter>
    );
  }

  // Fallback (shouldn't be reached if states are managed correctly)
  return null;
};

// Create a new wrapper component for the MainAppShell content that needs useNavigate
// This component *will* be rendered inside BrowserRouter
function MainAppShellWrapper() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // useNavigate is now correctly imported and available here
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // navigation handler to pass into Sidebar
  const navigateTo = ({ type, value }) => {
    let path;
    switch(type) {
      case 'main':
        path = value === 'Home' ? '/' : `/${value.toLowerCase().replace(/\s+/g,'-')}`;
        break;
      case 'filter-showroom':
        path = `/showroom?filter=${value}`;
        break;
      case 'vehicle-detail':
        path = `/vehicle/${value}`;
        break;
      default:
        path = '/';
    }
    navigate(path);
  };

  return (
    <>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} navigateTo={navigateTo} />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/vehicle/:id" element={<VehicleDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;