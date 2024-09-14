// src/components/ScoreBoard.js
import React from 'react';
import './ScoreBoard.css'; // Optional for additional styling

const ScoreBoard = ({ score, lives }) => {
  return (
    <div className="scoreboard">
      <div>Score: {score}</div>
      <div>Lives: {lives}</div>
    </div>
  );
};

export default ScoreBoard;
