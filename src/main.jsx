// src/main.jsx
import React, { StrictMode } from 'react'; // Keep StrictMode for development benefits
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { store } from '../store/store.js'; // Correctly import your Redux store
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your entire application with the Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
