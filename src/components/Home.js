// src/components/Home.js
import React from 'react';
import './Home.css';  // Ensure you style it correctly
import TypingIntroduction from './TypingIntroduction'; // Import the TypingIntroduction

function Home() {
  return (
    <div className="home-container">
      <h1>WELCOME</h1>
      <TypingIntroduction /> {/* Add the TypingIntroduction */}
    </div>
  );
}

export default Home;
