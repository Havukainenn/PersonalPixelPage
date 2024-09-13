// src/components/Game.js
import React, { useEffect, useState } from 'react';
import './Game.css';  // Keep the general game styles

function Game() {
  const [astronautPosition, setAstronautPosition] = useState(50);
  const [stars, setStars] = useState([]);
  const [score, setScore] = useState(0);
  const [missedStars, setMissedStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let gameInterval;

    if (!gameOver) {
      gameInterval = setInterval(() => {
        setStars((prevStars) =>
          prevStars.map((star) => ({ ...star, top: star.top + 5 }))
        );

        // Randomly generate stars at the top
        if (Math.random() < 0.05) {
          setStars((prevStars) => [
            ...prevStars,
            { left: Math.random() * 90, top: 0 },
          ]);
        }

        stars.forEach((star, index) => {
          if (star.top > 90) {
            setStars((prevStars) => prevStars.filter((_, i) => i !== index));

            // Check if the astronaut caught the star
            if (Math.abs(star.left - astronautPosition) < 5) {
              setScore((prevScore) => prevScore + 1);
            } else {
              setMissedStars((misses) => misses + 1);

              // End the game if too many stars are missed
              if (missedStars + 1 >= 5) {
                setGameOver(true);
              }
            }
          }
        });
      }, 100);
    }

    return () => clearInterval(gameInterval);
  }, [astronautPosition, stars, missedStars, gameOver]);

  // Handle astronaut movement with smoother steps
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft' && astronautPosition > 0) {
      setAstronautPosition((prevPosition) => Math.max(0, prevPosition - 5)); // Smoother movement
    } else if (e.key === 'ArrowRight' && astronautPosition < 95) {
      setAstronautPosition((prevPosition) => Math.min(95, prevPosition + 5)); // Smoother movement
    }
  };

  // Attach keypress event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [astronautPosition]);

  // Stop the game when game over
  if (gameOver) {
    return (
      <div className="game-over-container">
        <h1 className="game-over">Game Over! Score: {score}</h1>
        <button
          className="nes-btn is-primary"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Astronaut */}
      <img
        src="/images/astro.png"
        alt="Astronaut"
        className="astronaut"
        style={{ left: `${astronautPosition}%` }}
      />

      {/* Render stars */}
      {stars.map((star, index) => (
        <img
          key={index}
          src="/images/star.png"
          alt="Star"
          className="star"
          style={{ left: `${star.left}%`, top: `${star.top}%` }}
        />
      ))}

      {/* Display score */}
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default Game;
