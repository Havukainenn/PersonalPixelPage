import React from 'react';
import './Home.css';  
import TypingIntroduction from './TypingIntroduction'; 

function Home() {
  return (
    <div className="home-container">
      <h1>WELCOME</h1>
      <TypingIntroduction /> 
    </div>
  );
}

export default Home;
