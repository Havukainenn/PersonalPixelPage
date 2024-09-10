// src/components/Portfolio.js
import React from 'react';
import './Portfolio.css';  

function Portfolio() {
  const projects = [
    { title: 'Project 1', description: 'An image-gallery application made with Django', image: '/images/django.png' },
    { title: 'Project 2', description: 'An 8-bit retro game', image: '/images/placeholder.png' },
    { title: 'Project 3', description: 'An old-school themed portfolio website', image: '/images/placeholder.png' },
  ];

  return (
    <div className="portfolio-container">
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
