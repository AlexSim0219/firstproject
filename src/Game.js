// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Square({value, onSquareClick}) {
  // const [value, setValue] = useState(null);
  // function handleClick() {
  //   setValue("X");
  // }
    return (<button className='square' onClick = {onSquareClick}>{value}</button>)
}

function Board({flag, squares, onPlay}) {

  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    
    if (flag) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (flag ? "X" : "O");
  }

  return(
    <>
      <div>{status}</div>
      <div className='board-row'>
        <Square value = {squares[0]} onSquareClick={ () => handleClick(0)} />
        <Square value = {squares[1]} onSquareClick={ () => handleClick(1)} />
        <Square value = {squares[2]} onSquareClick={ () => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value = {squares[3]} onSquareClick={ () => handleClick(3)} />
        <Square value = {squares[4]} onSquareClick={ () => handleClick(4)} />
        <Square value = {squares[5]} onSquareClick={ () => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value = {squares[6]} onSquareClick={ () => handleClick(6)} />
        <Square value = {squares[7]} onSquareClick={ () => handleClick(7)} />
        <Square value = {squares[8]} onSquareClick={ () => handleClick(8)} />
      </div>
    </>
  )
    
}

export default function Game() {
  const [flag, setFlag] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const currentStatus = squares[squares.length - 1];

  function handlePlay(nextSquares) {
    setSquares([...squares, nextSquares]);
    setFlag(!flag);
  }
  return (
    <Board flag = {flag} squares = {currentStatus} onPlay={handlePlay} />
  )
}

function calculateWinner(squares) {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < line.length; i++) {
    const [a ,b, c] = line[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return;
}

// export default Game;
