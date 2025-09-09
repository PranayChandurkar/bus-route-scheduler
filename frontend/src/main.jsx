import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { BusInfoProvider } from './context/BusInfoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BusInfoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BusInfoProvider>
  </StrictMode>,
)
