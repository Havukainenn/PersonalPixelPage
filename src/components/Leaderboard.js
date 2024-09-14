// src/components/Leaderboard.js
import React from 'react';
import './Leaderboard.css'; // Create this CSS file for styling

const Leaderboard = ({ scores }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {scores.map((entry, index) => (
          <li key={index}>
            <span className="player-name">{entry.name}</span>
            <span className="player-score">{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
