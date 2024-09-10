// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';  // Import Routes and useLocation
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Game from './components/Game';  // Import the Game component
import Navbar from './components/Navbar';  // Import Navbar
import Starfield from './components/Starfield';  // Import Starfield
import { AnimatePresence, motion } from 'framer-motion';  // Import Framer Motion components
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();  // Get the current location

  return (
    <AnimatePresence mode="wait">  {/* Use mode="wait" instead of exitBeforeEnter */}
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/about" 
          element={
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Portfolio />
            </motion.div>
          } 
        />
        <Route 
          path="/game"  // Add the game route
          element={
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Game />  {/* Display the Game component */}
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Starfield />  {/* Background Starfield */}
        <Navbar />  {/* Navigation */}
        <AnimatedRoutes />  {/* Route handling with animations */}
      </div>
    </Router>
  );
}

export default App;
