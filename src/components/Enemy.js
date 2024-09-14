// src/components/Enemy.js
import React from 'react';
import './Enemy.css'; // Ensure this file exists and contains necessary styles

const Enemy = ({ position }) => {
  const style = {
    left: position.x,
    top: position.y,
    width: '60px', // As per ENEMY_WIDTH
    height: '60px', // As per ENEMY_HEIGHT
    position: 'absolute',
    zIndex: 2,
  };

  return (
    <div className="enemy" style={style}>
      <img
        src="/images/enemyShip.png"
        alt="Enemy Ship"
        className="rotated-image" /* Optional: Assign a specific class if needed */
      />
    </div>
  );
};

export default Enemy;
