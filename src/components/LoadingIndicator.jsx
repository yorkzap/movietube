import React from 'react';
import './LoadingIndicator.css';

function LoadingIndicator() {
  return (
    <div className="loading-overlay">
      <div className="loading-blur"></div>
      <div className="loading-spinner">
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
      </div>
      <div className="loading-message">Loading...</div>
    </div>
  );
}

export default LoadingIndicator;
