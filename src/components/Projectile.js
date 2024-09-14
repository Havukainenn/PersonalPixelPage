// src/components/Projectile.js
import React from 'react';
import './Projectile.css'; // Optional for additional styling

const Projectile = ({ position }) => {
  const style = {
    left: position.x,
    top: position.y,
    width: '5px',
    height: '10px',
    backgroundColor: 'darkblue',
    borderRadius: '2px',
  };

  return <div className="projectile" style={style} />;
};

export default Projectile;
