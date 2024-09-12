import React, { useState, useEffect } from 'react';
import './About.css';  // Import the CSS file

function About() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-page wrapper"> {/* Add wrapper class for flexbox */}
      <div className="about-container">
        
        {/* About Me Section with Retro Window Style */}
        <div className="card about-me" data-title="About Me">
          <div className="control-buttons">
            <span className="control-button"></span>
            <span className="control-button"></span>
            <span className="control-button"></span>
          </div>
          <span className="close-button">X</span>
          <h2>About Me</h2>
          <p>
            Hi! I'm Roope, an aspiring IT engineer passionate about web development, mobile apps, and technology. 
            I enjoy learning new technologies and applying my skills to create innovative solutions.
          </p>
        </div>

        {/* Astronaut and Scroll Message */}
        <div className="astro-container">
          <img src="/images/astro2.png" alt="Astronaut" className="astro-image" />
          <p className="scroll-text">Scroll down for more!</p>
        </div>
      </div>

      {/* Sky background that fades in on scroll */}
      <div
        className="sky-background"
        style={{
          opacity: scrollY > 300 ? 1 : 0,  // Fades in the sky effect as you scroll
          transition: 'opacity 1s ease-in-out',
        }}
      />

      {/* Sun and Clouds in their fixed position */}
      <div className="sky-content">
        <img src="/images/sun.png" alt="Sun" className="sun" />
        <img src="/images/cloud1.png" alt="Cloud 1" className="cloud cloud1" />
        <img src="/images/cloud2.png" alt="Cloud 2" className="cloud cloud2" />
        <img src="/images/cloud3.png" alt="Cloud 3" className="cloud cloud3" />
        <img src="/images/cloud4.png" alt="Cloud 4" className="cloud cloud4" />
        <img src="/images/cloud5.png" alt="Cloud 5" className="cloud cloud5" />
        <img src="/images/cloud6.png" alt="Cloud 6" className="cloud cloud6" />
      </div>

      {/* Contact Info with Retro Window Style */}
      <div className="card contact-info" data-title="Contact Info">
        <div className="control-buttons">
          <span className="control-button"></span>
          <span className="control-button"></span>
          <span className="control-button"></span>
        </div>
        <span className="close-button">X</span>
        <h2>Contact Info</h2>
        <p>Email: roopehavukainen@hotmail.com</p>
        <p>Phone: +358-408-240-055</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/roope-havukainen" target="_blank" rel="noopener noreferrer">linkedin.com/in/roope</a></p>
      </div>

      {/* Ground Element as Footer */}
      <div 
        className="ground" 
        style={{
          backgroundImage: "url('/images/ground.png')",  // Image path defined inline here
        }}
      />
    </div>
  );
}

export default About;
