import React, { useState } from 'react';
import './About.css';

function About() {
  // State to manage visibility of each section
  const [isIntroductionOpen, setIsIntroductionOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Handlers to toggle sections
  const toggleIntroduction = () => {
    setIsIntroductionOpen(!isIntroductionOpen);
  };

  const toggleSkills = () => {
    setIsSkillsOpen(!isSkillsOpen);
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <div className="about-page">
      <div className="about-container">

        {/* Introduction Section */}
        <section className="about-section">
          <div
            className="section-header"
            onClick={toggleIntroduction}
            role="button"
            aria-expanded={isIntroductionOpen}
            aria-controls="introduction-content"
          >
            <h2>
              <span className="emoji">👽</span> Who am I?
            </h2>
            <span className="toggle-sign">{isIntroductionOpen ? '-' : '+'}</span>
          </div>
          <div className={`section-content ${isIntroductionOpen ? 'open' : ''}`} id="introduction-content">
            <p>
            Hello! I'm Roope, a 24-year old aspiring IT engineering student from Helsinki, passionate 
            about web development, programming, and all things in IT. I love learning new technologies and applying my skills to create innovative solutions. I thrive in collaborative environments, enjoy tackling complex problems, and believe that teamwork is key to driving meaningful change.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <div
            className="section-header"
            onClick={toggleSkills}
            role="button"
            aria-expanded={isSkillsOpen}
            aria-controls="skills-content"
          >
            <h2>
              <span className="emoji">✏️</span> What can I do?
            </h2>
            <span className="toggle-sign">{isSkillsOpen ? '-' : '+'}</span>
          </div>
          <div className={`section-content ${isSkillsOpen ? 'open' : ''}`} id="skills-content">
            <ul className="skills-list">
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>Django</li>
              <li>C#</li>
              <li>MySQL</li>
              <li>Linux</li>
              <li>Windows</li>
              <li>Git</li>
              <li>GitHub</li>
              <li>Microsoft 365</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
<section className="contact-section">
  <div
    className="section-header"
    onClick={toggleContact}
    role="button"
    aria-expanded={isContactOpen}
    aria-controls="contact-content"
  >
    <h2>
              <span className="emoji">📞</span> Want to contact me?
            </h2>
    <span className="toggle-sign">{isContactOpen ? '-' : '+'}</span>
  </div>
  <div className={`section-content ${isContactOpen ? 'open' : ''}`} id="contact-content">
    <div className="contact-item">
      <i className="nes-icon gmail is-small"></i>
      <span className="contact-value">
        <a href="mailto:roopehavukainen@outlook.com">‎roopehavukainen@outlook.com</a>
      </span>
    </div>
    <div className="contact-item">
      <i className="nes-icon whatsapp is-small"></i>
      <span className="contact-value">‎ +358-408-240-055</span>
    </div>
    <div className="contact-item">
      <i className="nes-icon linkedin is-small"></i>
      <span className="contact-value">
        <a href="https://www.linkedin.com/in/roope-havukainen" target="_blank" rel="noopener noreferrer">
        ‎ linkedin.com/in/roope-havukainen
        </a>
      </span>
    </div>
    <div className="contact-item">
      <i className="nes-icon github is-small"></i>
      <span className="contact-value">
        <a href="https://github.com/Havukainenn" target="_blank" rel="noopener noreferrer">
        ‎ github.com/Havukainenn
        </a>
      </span>
    </div>
  </div>
</section>


      </div>
    </div>
  );
}

export default About;
