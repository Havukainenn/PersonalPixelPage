// src/components/ProjectModal.js
import React from 'react';
import './ProjectModal.css';
import { motion } from 'framer-motion';

const ProjectModal = ({ project, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="close-button" onClick={closeModal} aria-label="Close Modal">
          ❌
        </button>
        <img src={project.image} alt={project.title} className="modal-image" />
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="modal-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="modal-tech-badge">
              {tech}
            </span>
          ))}
        </div>
        <div className="modal-buttons">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn">
            🔗 View Live
          </a>
          <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="btn">
            🛠️ View Code
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
