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
    <div className="about-page wrapper">
      <div className="about-container">
        
        {/* About Me Section inside a Monitor */}
        <div className="monitor-container">
          <img src="/images/monitor.png" alt="Monitor" className="monitor-image" />
          <div className="monitor-text">
            <h2>About Me</h2>
            <p>
              Hi! I'm Roope, an aspiring IT-engineering student passionate about web development, mobile apps, and all tech in general. 
              I enjoy learning new technologies and applying my skills to create innovative solutions.
            </p>
          </div>
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
          opacity: scrollY > 300 ? 1 : 0,
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

      {/* Billboard with Contact Info */}
      <div className="billboard-container">
        <img src="/images/billboard.png" alt="Billboard" className="billboard-image" />
        <div className="billboard-text">
          <p className="billboard-header"></p> 
          <p><i className="nes-icon gmail is-small"></i> roopehavukainen@outlook.com</p>
          <p><i className="nes-icon whatsapp is-small"></i> +358-408-240-055</p>
          <p><i className="nes-icon linkedin is-small"></i> <a href="https://www.linkedin.com/in/roope-havukainen" target="_blank" rel="noopener noreferrer">linkedin.com/in/roope</a></p>
          <p><i className="nes-icon github is-small"></i> <a href="https://github.com/Havukainenn" target="_blank" rel="noopener noreferrer">github.com/Havukainenn</a></p>
        </div>
      </div>

      {/* Ground Element with Doge and Balloon */}
      <div className="ground" style={{ backgroundImage: "url('/images/ground.png')" }}>
        {/* Doge image placed on the ground */}
        <div className="doge-container">
          <img src="/images/doge.png" alt="Doge" className="doge-image" />

          {/* Balloon (text bubble) for Doge */}
          <div className="nes-balloon from-left balloon">
            <p>Contact me!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
