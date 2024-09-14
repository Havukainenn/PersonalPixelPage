// src/components/Game.js
import React, { useRef, useEffect, useState } from 'react';
import './Game.css';

function Game() {
  const canvasRef = useRef(null);

  // Constants
  const tileSize = 32;

  // Levels data (define before using in state)
  const levels = [
    // Level 1
    {
      mazeData: [
        [1,1,1,1,1,1,1],
        [1,0,2,0,0,3,1],
        [1,0,1,1,1,0,1],
        [1,0,1,0,1,0,1],
        [1,0,1,0,2,0,1],
        [1,1,1,1,1,1,1],
      ],
      enemies: [
        { x: 3, y: 3, direction: 'vertical', movingDown: true },
      ],
    },
    // Level 2
    {
      mazeData: [
        [1,1,1,1,1,1,1,1,1],
        [1,0,0,0,2,0,0,3,1],
        [1,0,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,1,0,1],
        [1,0,1,1,1,0,1,0,1],
        [1,0,0,0,1,0,1,0,1],
        [1,1,1,0,1,0,1,0,1],
        [1,1,1,1,1,1,1,1,1],
      ],
      enemies: [
        { x: 4, y: 2, direction: 'horizontal', movingRight: true },
        { x: 6, y: 5, direction: 'vertical', movingDown: false },
      ],
    },
    // Additional levels can be added here
  ];

  // Game States
  const [level, setLevel] = useState(0);
  const [maze, setMaze] = useState(levels[0].mazeData);
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [enemies, setEnemies] = useState(levels[0].enemies);
  const [visibility, setVisibility] = useState(
    levels[0].mazeData.map((row) => row.map(() => false))
  );
  const [collectedItems, setCollectedItems] = useState(0);

  // Initialize the maze and enemies when level changes
  useEffect(() => {
    if (level >= levels.length) {
      // No more levels, game completed
      setGameOver(true);
    } else {
      const currentLevel = levels[level];
      setMaze(currentLevel.mazeData);
      setEnemies(currentLevel.enemies);
      setPlayer({ x: 1, y: 1 });
      setVisibility(currentLevel.mazeData.map((row) => row.map(() => false)));
      setCollectedItems(0);
    }
  }, [level]);

  // Handle player movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      let newX = player.x;
      let newY = player.y;
      if (e.key === 'ArrowUp' || e.key === 'w') {
        newY -= 1;
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        newY += 1;
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        newX -= 1;
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        newX += 1;
      }

      // Prevent out-of-bounds errors
      if (maze[newY] && maze[newY][newX] !== undefined) {
        const cellValue = maze[newY][newX];
        if (cellValue !== 1) {
          // Move player
          setPlayer({ x: newX, y: newY });

          // Update visibility
          updateVisibility(newX, newY);

          // Handle collectibles
          if (cellValue === 2) {
            setScore((prevScore) => prevScore + 10);
            setCollectedItems((prevCollectedItems) => prevCollectedItems + 1);
            // Remove collectible from maze
            const updatedMaze = maze.map((row) => row.slice());
            updatedMaze[newY][newX] = 0;
            setMaze(updatedMaze);
          }

          // Check for exit
          if (cellValue === 3) {
            if (level < levels.length - 1) {
              // Proceed to next level
              setLevel((prevLevel) => prevLevel + 1);
            } else {
              // Game completed
              setGameOver(true);
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maze, gameOver]); // Only re-run if maze or gameOver changes

  // Update visibility map
  const updateVisibility = (x, y) => {
    const updatedVisibility = visibility.map((row) => row.slice());
    updatedVisibility[y][x] = true;
    // Reveal adjacent cells (optional)
    const adjacentCells = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    adjacentCells.forEach(([adjX, adjY]) => {
      if (
        maze[adjY] &&
        maze[adjY][adjX] !== undefined &&
        !updatedVisibility[adjY][adjX]
      ) {
        updatedVisibility[adjY][adjX] = true;
      }
    });
    setVisibility(updatedVisibility);
  };

  // Game loop for rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw maze
      for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
          if (visibility[y][x]) {
            if (maze[y][x] === 1) {
              // Wall
              ctx.fillStyle = '#000';
              ctx.fillRect(
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
              );
            } else if (maze[y][x] === 0) {
              // Path
              ctx.fillStyle = '#ccc';
              ctx.fillRect(
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
              );
            } else if (maze[y][x] === 2) {
              // Collectible
              ctx.fillStyle = '#ccc';
              ctx.fillRect(
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
              );
              ctx.fillStyle = 'gold';
              ctx.beginPath();
              ctx.arc(
                x * tileSize + tileSize / 2,
                y * tileSize + tileSize / 2,
                tileSize / 4,
                0,
                2 * Math.PI
              );
              ctx.fill();
            } else if (maze[y][x] === 3) {
              // Exit
              ctx.fillStyle = 'lightgreen';
              ctx.fillRect(
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize
              );
            }
          } else {
            // Fog
            ctx.fillStyle = 'black';
            ctx.fillRect(
              x * tileSize,
              y * tileSize,
              tileSize,
              tileSize
            );
          }
        }
      }

      // Draw enemies
      ctx.fillStyle = 'purple';
      enemies.forEach((enemy) => {
        ctx.fillRect(
          enemy.x * tileSize,
          enemy.y * tileSize,
          tileSize,
          tileSize
        );
      });

      // Draw player
      ctx.fillStyle = '#f00';
      ctx.fillRect(
        player.x * tileSize,
        player.y * tileSize,
        tileSize,
        tileSize
      );
    };

    drawGame();
  }, [maze, player, enemies, visibility]);

  // Timer
  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  // Enemy movement
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setEnemies((prevEnemies) =>
          prevEnemies.map((enemy) => {
            let { x, y, direction } = enemy;
            let dx = 0;
            let dy = 0;
            if (direction === 'vertical') {
              dy = enemy.movingDown ? 1 : -1;
            } else {
              dx = enemy.movingRight ? 1 : -1;
            }
            let newX = x + dx;
            let newY = y + dy;

            if (
              maze[newY] &&
              maze[newY][newX] !== 1 &&
              maze[newY][newX] !== undefined
            ) {
              // Move enemy
              return { ...enemy, x: newX, y: newY };
            } else {
              // Change direction
              if (direction === 'vertical') {
                return { ...enemy, movingDown: !enemy.movingDown };
              } else {
                return { ...enemy, movingRight: !enemy.movingRight };
              }
            }
          })
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [gameOver, maze]);

  // Check for collision with enemies
  useEffect(() => {
    if (
      enemies.some(
        (enemy) => enemy.x === player.x && enemy.y === player.y
      )
    ) {
      alert('Game Over! You were caught by an enemy.');
      setGameOver(true);
    }
  }, [player, enemies]);

  // Update canvas size when maze changes
  useEffect(() => {
    if (canvasRef.current && maze.length > 0) {
      const canvas = canvasRef.current;
      canvas.width = maze[0].length * tileSize;
      canvas.height = maze.length * tileSize;
    }
  }, [maze]);

  // Restart game
  const restartGame = () => {
    setLevel(0);
    setScore(0);
    setTimer(0);
    setGameOver(false);
    // Re-initialize maze, player, enemies
    const currentLevel = levels[0];
    setMaze(currentLevel.mazeData);
    setEnemies(currentLevel.enemies);
    setPlayer({ x: 1, y: 1 });
    setVisibility(currentLevel.mazeData.map((row) => row.map(() => false)));
    setCollectedItems(0);
  };

  return (
    <div className="game-container">
      <canvas ref={canvasRef} className="game-canvas"></canvas>
      <div className="hud">
        <p>Time: {timer}s</p>
        <p>Score: {score}</p>
        <p>Level: {level + 1}</p>
      </div>
      {gameOver && (
        <div className="game-over">
          <h1>{level >= levels.length ? 'You Win!' : 'Game Over'}</h1>
          <p>Your time: {timer} seconds</p>
          <p>Your score: {score}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Game;
