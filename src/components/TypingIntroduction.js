// src/components/TypingIntroduction.js
import React from 'react';
import { ReactTyped } from 'react-typed'; // Correct named import
import './TypingIntroduction.css';

const TypingIntroduction = () => {
  return (
    <div className="typing-container">
      <ReactTyped
        strings={[
          'Initializing Mission...',
          'Hello, I\'m Roope',
          'A Student Exploring the Universe of Code!',
        ]}
        typeSpeed={50}
        backSpeed={30}
        loop
      />
    </div>
  );
};

export default TypingIntroduction;
