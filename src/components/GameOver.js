// src/components/GameOver.js
import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import './GameOver.css'; // Ensure this file exists and contains necessary styles

const LEADERBOARD_CAPACITY = 10;

const GameOver = ({ score, onRestart }) => {
  const [isHighScore, setIsHighScore] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch existing leaderboard from localStorage
    const existingScores = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(existingScores);

    // Determine if the current score is a high score
    if (existingScores.length < LEADERBOARD_CAPACITY || score > existingScores[existingScores.length - 1].score) {
      setIsHighScore(true);
    }
  }, [score]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = playerName.trim();
    if (trimmedName === '') {
      alert('Please enter a valid name.');
      return;
    }

    const newEntry = { name: trimmedName, score };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score) // Sort descending
      .slice(0, LEADERBOARD_CAPACITY); // Keep top N

    // Save updated leaderboard to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    setLeaderboard(updatedLeaderboard);
    setIsHighScore(false); // No longer a high score after saving
    setPlayerName(''); // Reset player name
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the leaderboard?')) {
      localStorage.removeItem('leaderboard');
      setLeaderboard([]);
      setIsHighScore(true); // Any score will now be a high score
    }
  };

  return (
    <div className="gameover-overlay">
      <div className="gameover-content">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>

        {isHighScore ? (
          <form onSubmit={handleSubmit} className="name-form">
            <label htmlFor="playerName">New High Score! Enter your name:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              required
            />
            <button type="submit">Submit</button>
          </form>
        ) : null}

        <Leaderboard scores={leaderboard} />

        <button onClick={onRestart} className="restart-button">
          Restart Game
        </button>
        <button onClick={handleReset} className="reset-button">
          Reset Leaderboard
        </button>
      </div>
    </div>
  );
};

export default GameOver;
