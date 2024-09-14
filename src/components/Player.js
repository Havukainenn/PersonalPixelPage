// src/components/Player.js
import React from 'react';
import './Player.css';

const Player = ({ position, shield }) => {
  const style = {
    left: position.x,
    top: position.y,
    width: '57px',
    height: '50px',
    backgroundImage: `url(/images/playerShip.png)`, // Correct absolute path
    backgroundSize: 'cover',
  };

  return (
    <div className="player" style={style}>
      {shield && <div className="shield" />}
    </div>
  );
};

export default Player;
