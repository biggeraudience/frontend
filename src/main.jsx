import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'         // ← no “.jsx” here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
