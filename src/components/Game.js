import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleClick = (i) => {
    const squares = [...board];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);

    // AI move
    if (!xIsNext) {
      const aiMove = getAiMove(squares);
      if (aiMove !== null) {
        squares[aiMove] = 'O';
        setBoard(squares);
        setXIsNext(!xIsNext);
      }
    }
  };

  const renderStatus = () => {
    const winner = calculateWinner(board);

    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square !== null)) {
      return 'Draw';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
  
    return null;
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsGameStarted(false);
    setPlayerName('');
  };

  const getAiMove = (squares) => {
    // Simple AI logic: randomly select an available square
    const availableMoves = squares
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (availableMoves.length === 0) {
      return null; // No available moves
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  };

  const startGame = () => {
    if (playerName.trim() !== '') {
      setIsGameStarted(true);
    }
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <div className="game">
      {!isGameStarted && (
        <div className="player-name-input">
          <label htmlFor="nameInput">Enter Your Name: </label>
          <input type="text" id="nameInput" value={playerName} onChange={handleNameChange} />
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
      {isGameStarted && (
        <>
          <div className="game-board">
            <Board squares={board} onClick={handleClick} />
          </div>
          <div className="game-info">
            <div>{renderStatus()}</div>
            <button onClick={resetGame}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;