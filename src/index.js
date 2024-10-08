// Importing necessary libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing CSS styles
import App from './App'; // Importing the main App component


// Rendering the App component into the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Log performance metrics
reportWebVitals();
