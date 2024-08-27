import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square text-center w-18 h-20 text-xl md:text-2xl font-bold bg-gray-200 md:hover:scale-95 hover:bg-gray-300" onClick={onSquareClick}>{value}</button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  var status;

  if (winner) {
    status = '¡Ganador: ' + winner + "!";
  } else if (squares.every(square => square !== null)) {
    status = '¡Empate!'
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 px-10 py-2 sm:px-28 md:px-56 lg:px-80 xl:px-96">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="status p-4 flex justify-center">
        <button className="bg-black font-semibold text-white rounded-xl py-4 px-6">{status}</button>
      </div>
    </>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="w-screen h-screen bg-zinc-100">
      
      <div className="game-info text-center py-6">
        <button onClick={resetGame} className="p-4 bg-sky-500 text-white font-bold rounded-xl transition duration-300 ease-in-out transform hover:scale-105">
          Reiniciar el juego
        </button>
      </div>

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      </div>

    </div>
  );
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
