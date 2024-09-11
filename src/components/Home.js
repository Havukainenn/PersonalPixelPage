// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css';  // Ensure you style it correctly

function Home() {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <div className="home-container">
      <h1>WELCOME</h1>
      <p>Click that button to play a game, or use the navigation to explore</p>
      <div className="astronaut-container">
        <img src="/images/astro.png" alt="Astronaut" className="astronaut-image" />
        {/* Add the button with navigation to the game */}
        <button className="action-button" onClick={() => navigate('/game')}>
          PLAY
        </button>
      </div>
    </div>
  );
}

export default Home;
