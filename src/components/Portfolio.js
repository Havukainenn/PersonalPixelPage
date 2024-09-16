// src/components/Portfolio.js
import React, { useState } from 'react';
import './Portfolio.css';
import ProjectModal from './ProjectModal'; // Import the ProjectModal component
import { motion } from 'framer-motion'; // Import Framer Motion for animations

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null); // State to manage the selected project

  const projects = [
    {
      title: 'Image Gallery',
      description: 'An image-gallery application made with Django, featuring user authentication, image uploads, and categorization.',
      image: '/images/django.png',
      liveLink: 'https://havukr.pythonanywhere.com/gallery/',
      sourceLink: 'https://github.com/Havukainenn/GalleriaProjekti',
      technologies: ['Django', 'Python', 'HTML5', 'CSS3', 'SQLITE'],
    },
    {
      title: 'Website For a Business',
      description: 'A simple, static, yet good looking website with a landing page and a contact page',
      image: '/images/elwell.jpg',
      liveLink: 'https://havukainenn.github.io/testiSivu/',
      sourceLink: 'https://github.com/Havukainenn/testiSivu',
      technologies: ['JavaScript', 'HTML5', 'CSS3'],
    },
    {
      title: 'Retro Portfolio Website',
      description: 'An old-school themed portfolio website built with React, showcasing projects with pixelated designs and space-themed animations.',
      image: '/images/portfolio.png',
      liveLink: 'https://your-live-link.com/retro-portfolio',
      sourceLink: 'https://github.com/Havukainenn',
      technologies: ['React', 'CSS3', 'Framer Motion', 'React Router'],
    },
    // Add more projects as needed
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project to open the modal
  };

  const closeModal = () => {
    setSelectedProject(null); // Close the modal
  };

  return (
    <div className="portfolio-container">
      <h1>Some of my work</h1>
      <h2>Click to expand</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleProjectClick(project)}
          >
            <img src={project.image} alt={project.title} className="project-image" />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-buttons">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn">
                🔗 Live
              </a>
              <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="btn">
                🛠️ Code
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} closeModal={closeModal} />} {/* Render ProjectModal if a project is selected */}
    </div>
  );
}

export default Portfolio;
