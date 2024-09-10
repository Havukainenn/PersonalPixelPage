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
    const intervalId = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({ ...star, top: star.top + 5 }))
      );

      if (Math.random() < 0.05) {
        setStars((prevStars) => [
          ...prevStars,
          { left: Math.random() * 90, top: 0 },
        ]);
      }

      stars.forEach((star, index) => {
        if (star.top > 90) {
          setStars((prevStars) => prevStars.filter((_, i) => i !== index));
          if (Math.abs(star.left - astronautPosition) < 10) {
            setScore((prevScore) => prevScore + 1);
          } else {
            setMissedStars((misses) => misses + 1);
            if (missedStars >= 5) {
              setGameOver(true);
            }
          }
        }
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [astronautPosition, stars, missedStars]);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft' && astronautPosition > 0) {
      setAstronautPosition(astronautPosition - 10);
    } else if (e.key === 'ArrowRight' && astronautPosition < 90) {
      setAstronautPosition(astronautPosition + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [astronautPosition]);

  if (gameOver) {
    return <h1 className="game-over">Game Over! Score: {score}</h1>;
  }

  return (
    <div className="game-container">
      {/* Use img element for the astronaut */}
      <img
        src="/images/astro.png"
        alt="Astronaut"
        className="astronaut"
        style={{ left: `${astronautPosition}%` }}
      />
      {/* Render stars as img elements */}
      {stars.map((star, index) => (
        <img
          key={index}
          src="/images/star.png"
          alt="Star"
          className="star"
          style={{ left: `${star.left}%`, top: `${star.top}%` }}
        />
      ))}
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default Game;
