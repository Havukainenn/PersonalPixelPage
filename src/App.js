// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Navbar from './components/Navbar';
import Starfield from './components/Starfield';
import LoadingScreen from './components/LoadingScreen'; // Import LoadingScreen
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation(); // Get the current location

  return (
    <AnimatePresence mode="wait">
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
        {/* Add more routes as needed */}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Simulate a loading time (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Render LoadingScreen if isLoading is true */}
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Starfield /> {/* Background Starfield */}
            <Navbar /> {/* Navigation */}
            <AnimatedRoutes /> {/* Route handling with animations */}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
