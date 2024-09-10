// src/components/About.js
import React from 'react';
import './About.css';  // Import the CSS file

function About() {
  return (
    <div className="about-container">
      <div className="card">
        <h2>About Me</h2>
        <p>
          Hi! I'm Roope, an aspiring IT engineer passionate about web development, mobile apps, and technology. I enjoy learning new technologies and applying my skills to create innovative solutions.
        </p>
      </div>

      <div className="card">
        <h2>Contact Info</h2>
        <p>Email: roopehavukainen@hotmail.com</p>
        <p>Phone: +358-408-240-055</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/roope-havukainen" target="_blank" rel="noopener noreferrer">linkedin.com/in/roope</a></p>
      </div>
    </div>
  );
}

export default About;
