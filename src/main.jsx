import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Fix for mobile viewport height issues with dynamic browser UI
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set on initial load
setViewportHeight();

// Update on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Also fix for iOS Safari which has issues with 100vh
if (CSS.supports && CSS.supports('-webkit-fill-available', '100%')) {
  document.documentElement.style.setProperty('min-height', '-webkit-fill-available');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
