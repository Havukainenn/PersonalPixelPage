import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <h1>Launching Portfolio...</h1>
      <div className="pixel-bar">
        <div className="pixel-progress"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
