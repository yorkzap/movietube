import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Add the favicon dynamically
const addFavicon = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/favicon.ico';
  document.head.appendChild(link);
};

addFavicon(); // Call the function to add the favicon

renderApp(); // Call the function to render the app
