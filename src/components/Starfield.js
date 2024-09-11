// src/components/Starfield.js
import React, { useEffect, useState } from 'react';
import './Starfield.css';

const Starfield = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starCount = 100; // Number of stars
    const starsArray = [];

    for (let i = 0; i < starCount; i++) {
      const size = Math.floor(Math.random() * 3 + 1);  // Random size for each star
      starsArray.push({
        id: i,
        size: size,
        top: Math.random() * 100,  // Random vertical position
        left: Math.random() * 100, // Random horizontal position
      });
    }

    setStars(starsArray);  // Store the star data in state
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}vh`,
            left: `${star.left}vw`,
          }}
        />
      ))}

      {/* Planets */}
      <img src="/images/planet1.png" alt="Planet 1" className="planet planet1" />
      <img src="/images/planet2.png" alt="Planet 2" className="planet planet2" />
      <img src="/images/planet3.png" alt="Planet 3" className="planet planet3" />
    </>
  );
};

export default Starfield;
