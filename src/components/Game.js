// src/components/Game.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Player from './Player';
import Enemy from './Enemy';
import Projectile from './Projectile';
import Starfield from './Starfield';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import './Game.css'; // Ensure this file exists and contains necessary styles

const Game = () => {
  // ---------------------------
  // State Variables
  // ---------------------------
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerPosition, setPlayerPosition] = useState({
    x: window.innerWidth / 2 - 25, // Centered horizontally
    y: window.innerHeight - 100, // Positioned near the bottom
  });
  const [projectiles, setProjectiles] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [canShoot, setCanShoot] = useState(true); // Shooting cooldown

  // Ref for the game container
  const gameContainerRef = useRef(null);

  // Ref for Game Loop
  const animationFrameId = useRef(null);
  const enemySpawnTimer = useRef(0); // Use ref to persist value across renders

  // Ref to track the latest player position
  const playerPositionRef = useRef(playerPosition);

  // Update the ref whenever playerPosition changes
  useEffect(() => {
    playerPositionRef.current = playerPosition;
  }, [playerPosition]);

  // Maximum number of enemies on screen
  const MAX_ENEMIES = 5; // Adjust as needed

  // ---------------------------
  // Movement State
  // ---------------------------
  const [keysPressed, setKeysPressed] = useState({
    ArrowLeft: false,
    ArrowRight: false,
  });

  // Movement speed in pixels per frame
  const PLAYER_SPEED = 5;

  // ---------------------------
  // Collision Detection Constants
  // ---------------------------
  const ENEMY_WIDTH = 60;
  const ENEMY_HEIGHT = 60;
  const PROJECTILE_WIDTH = 5;
  const PROJECTILE_HEIGHT = 10;
  const PLAYER_WIDTH = 50;
  const PLAYER_HEIGHT = 50;

  // ---------------------------
  // Sound Effects Setup
  // ---------------------------
  const shootSound = useRef(null);
  const hitSound = useRef(null);
  const gameOverSound = useRef(null);

  useEffect(() => {
    // Initialize Audio objects
    shootSound.current = new Audio('/sounds/shoot.mp3');
    hitSound.current = new Audio('/sounds/hit.mp3');
    gameOverSound.current = new Audio('/sounds/gameover.mp3');

    // Optional: Preload audio
    shootSound.current.preload = 'auto';
    hitSound.current.preload = 'auto';
    gameOverSound.current.preload = 'auto';

    // Handle audio loading errors
    const handleAudioError = (e) => {
      console.error('Error loading audio:', e);
    };

    shootSound.current.addEventListener('error', handleAudioError);
    hitSound.current.addEventListener('error', handleAudioError);
    gameOverSound.current.addEventListener('error', handleAudioError);

    // Cleanup listeners on unmount
    return () => {
      shootSound.current.removeEventListener('error', handleAudioError);
      hitSound.current.removeEventListener('error', handleAudioError);
      gameOverSound.current.removeEventListener('error', handleAudioError);
    };
  }, []);

  // ---------------------------
  // Shooting Mechanism
  // ---------------------------
  const fireProjectile = useCallback(() => {
    const currentPosition = playerPositionRef.current;
    setProjectiles((prev) => [
      ...prev,
      { 
        x: currentPosition.x + (PLAYER_WIDTH / 2) - (PROJECTILE_WIDTH / 2), 
        y: currentPosition.y 
      }, // Center the projectile
    ]);
    console.log('Projectile fired at:', { 
      x: currentPosition.x + (PLAYER_WIDTH / 2) - (PROJECTILE_WIDTH / 2), 
      y: currentPosition.y 
    });
    setCanShoot(false); // Disable shooting

    // Play shoot sound
    if (shootSound.current) {
      shootSound.current.currentTime = 0; // Reset to start
      shootSound.current.play().catch((e) => {
        console.error('Failed to play shoot sound:', e);
      });
    }

    // Re-enable shooting after a short delay (e.g., 300ms)
    setTimeout(() => setCanShoot(true), 300);
  }, [PLAYER_WIDTH, PROJECTILE_WIDTH]);

  // ---------------------------
  // Event Handlers
  // ---------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setKeysPressed((prev) => ({
          ...prev,
          [e.key]: true,
        }));
      }

      if (e.key === ' ') {
        e.preventDefault(); // Prevent default spacebar behavior (scrolling)
        if (canShoot) {
          fireProjectile();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setKeysPressed((prev) => ({
          ...prev,
          [e.key]: false,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [canShoot, gameOver, fireProjectile]);

  // ---------------------------
  // Game Loop
  // ---------------------------
  useEffect(() => {
    const spawnEnemy = () => {
      if (enemies.length >= MAX_ENEMIES) {
        console.log('Maximum enemies on screen. Skipping spawn.');
        return; // Do not spawn more than MAX_ENEMIES
      }

      // Get the container's width
      const containerWidth = gameContainerRef.current
        ? gameContainerRef.current.clientWidth
        : window.innerWidth;

      // Calculate the maximum X position to keep the enemy fully within the container
      const maxX = containerWidth - ENEMY_WIDTH;
      
      // Generate a random X position between 0 and maxX
      const enemyX = Math.random() * maxX;

      const speed = 1.5 + Math.random() * 1.5; // Enemy speed between 1.5 and 3
      const id = Date.now(); // Unique identifier

      console.log('Spawning enemy at X:', enemyX, 'with speed:', speed);

      setEnemies((prev) => [
        ...prev,
        { x: enemyX, y: -ENEMY_HEIGHT, speed, id }, // Start slightly above the screen
      ]);
    };

    const gameLoop = () => {
      // ---------------------------
      // Update Player Position
      // ---------------------------
      setPlayerPosition((prev) => {
        let newX = prev.x;
        if (keysPressed.ArrowLeft) {
          newX = Math.max(prev.x - PLAYER_SPEED, 0);
        }
        if (keysPressed.ArrowRight) {
          newX = Math.min(prev.x + PLAYER_SPEED, window.innerWidth - PLAYER_WIDTH); // Assuming player width is 50px
        }
        return { ...prev, x: newX };
      });

      // ---------------------------
      // Update Projectiles
      // ---------------------------
      setProjectiles((prev) =>
        prev
          .map((proj) => ({ ...proj, y: proj.y - 10 })) // Move projectile upward
          .filter((proj) => {
            const isVisible = proj.y > -PROJECTILE_HEIGHT;
            if (!isVisible) {
              console.log('Removing off-screen projectile at Y:', proj.y);
            }
            return isVisible;
          }) // Remove projectiles off-screen
      );

      // ---------------------------
      // Update Enemies
      // ---------------------------
      setEnemies((prev) =>
        prev
          .map((enemy) => ({ ...enemy, y: enemy.y + enemy.speed })) // Move enemy downward
          .filter((enemy) => {
            const isVisible = enemy.y < window.innerHeight + ENEMY_HEIGHT;
            if (!isVisible) {
              console.log('Removing off-screen enemy:', enemy.id);
            }
            return isVisible;
          }) // Remove enemies off-screen
      );

      // ---------------------------
      // Spawn Enemies
      // ---------------------------
      enemySpawnTimer.current += 1;
      if (enemySpawnTimer.current > 180) { // Spawn approximately every 3 seconds (assuming 60 FPS)
        spawnEnemy();
        enemySpawnTimer.current = 0;
      }

      // ---------------------------
      // Collision Detection
      // ---------------------------
      // Step 1: Detect collisions between projectiles and enemies
      const collidedEnemies = new Set();
      const collidedProjectiles = new Set();

      projectiles.forEach((proj, projIdx) => {
        enemies.forEach((enemy, enemyIdx) => {
          if (
            proj.x < enemy.x + ENEMY_WIDTH &&
            proj.x + PROJECTILE_WIDTH > enemy.x &&
            proj.y < enemy.y + ENEMY_HEIGHT &&
            proj.y + PROJECTILE_HEIGHT > enemy.y
          ) {
            collidedEnemies.add(enemy.id);
            collidedProjectiles.add(projIdx);
            setScore((prev) => prev + 10);
            console.log('Projectile hit enemy:', enemy.id);

            // Play hit sound
            if (hitSound.current) {
              hitSound.current.currentTime = 0; // Reset to start
              hitSound.current.play().catch((e) => {
                console.error('Failed to play hit sound:', e);
              });
            }
          }
        });
      });

      // Remove collided enemies
      if (collidedEnemies.size > 0) {
        setEnemies((prev) => prev.filter((enemy) => !collidedEnemies.has(enemy.id)));
      }

      // Remove collided projectiles
      if (collidedProjectiles.size > 0) {
        setProjectiles((prev) =>
          prev.filter((_, idx) => !collidedProjectiles.has(idx))
        );
      }

      // Step 2: Detect collisions between player and enemies
      const collidedWithPlayer = enemies.filter((enemy) => {
        return (
          playerPosition.x < enemy.x + ENEMY_WIDTH &&
          playerPosition.x + PLAYER_WIDTH > enemy.x &&
          playerPosition.y < enemy.y + ENEMY_HEIGHT &&
          playerPosition.y + PLAYER_HEIGHT > enemy.y
        );
      });

      if (collidedWithPlayer.length > 0) {
        console.log('Player collided with enemy(s):', collidedWithPlayer.map(e => e.id));
        setLives((prevLives) => {
          const newLives = prevLives - collidedWithPlayer.length;
          if (newLives <= 0) {
            setGameOver(true);

            // Play game over sound
            if (gameOverSound.current) {
              gameOverSound.current.currentTime = 0; // Reset to start
              gameOverSound.current.play().catch((e) => {
                console.error('Failed to play game over sound:', e);
              });
            }

            return 0;
          }
          return newLives;
        });

        // Remove collided enemies
        setEnemies((prev) =>
          prev.filter((enemy) => !collidedWithPlayer.map(e => e.id).includes(enemy.id))
        );
      }

      // Continue the game loop
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);

    // Cleanup on component unmount
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [keysPressed, playerPosition, projectiles, enemies, score]);

  // ---------------------------
  // Restart Game Function
  // ---------------------------
  const restartGame = () => {
    setScore(0);
    setLives(3);
    setPlayerPosition({ x: window.innerWidth / 2 - 25, y: window.innerHeight - 100 }); // Center player
    setProjectiles([]);
    setEnemies([]);
    setGameOver(false);
    setCanShoot(true);
    setKeysPressed({
      ArrowLeft: false,
      ArrowRight: false,
    });
    console.log('Game restarted');
  };

  // ---------------------------
  // Handle Shoot Button Click
  // ---------------------------
  const handleShoot = useCallback(() => {
    if (canShoot && !gameOver) {
      fireProjectile();
    }
  }, [canShoot, gameOver, fireProjectile]);

  // ---------------------------
  // Render Components
  // ---------------------------
  return (
    <div className="game-container" ref={gameContainerRef}>
      <Starfield />
      <ScoreBoard score={score} lives={lives} />
      <Player position={playerPosition} />
      {projectiles.map((proj, idx) => (
        <Projectile key={idx} position={proj} />
      ))}
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} position={enemy} />
      ))}
      {gameOver && <GameOver score={score} onRestart={restartGame} />}
      {/* On-Screen Shoot Button */}
      {!gameOver && (
        <button
          className={`shoot-button ${!canShoot ? 'disabled' : ''}`}
          onClick={handleShoot}
          disabled={!canShoot}
          aria-label="Shoot Projectile"
        >
          Shoot
        </button>
      )}
    </div>
  );
};

export default Game;
