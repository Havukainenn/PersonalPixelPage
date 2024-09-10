// src/components/Starfield.js
import React, { useEffect } from 'react';

const Starfield = () => {
  useEffect(() => {
    const starCount = 100; // Number of stars
    const body = document.querySelector('body');

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position for the stars
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      
      body.appendChild(star);
    }
  }, []);

  return null;
};

export default Starfield;
