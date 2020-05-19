import React from "react";
import "./App.css";
import { Board } from "./components";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: [],
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    const current = history[history.length - 1];

    const moveLocation = [Math.floor(i / 3), i % 3];
    if (calculateWinner(current.squares) || current.squares[i]) return;
    let newBoardState = {
      squares: current.squares.slice(),
      location: moveLocation,
    };
    // let newBoardState = Object.assign({},current);
    newBoardState.squares[i] = this.state.xIsNext ? "X" : "O";
    let xIsNextNew = !this.state.xIsNext;

    this.setState({
      history: history.concat([newBoardState]),
      xIsNext: xIsNextNew,
      stepNumber: history.length,
    });
  }

  gotoMove(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history.slice();
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const movesHistory = history.map((move, index) => {
      const desc =
        index === 0
          ? `Go to start of game`
          : `Go to move #${index} (${move.location})`;

      return (
        <li key={index}>
          <button
            onClick={() => this.gotoMove(index)}
            className={this.state.stepNumber === index ? "boldMe" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = "Winner is : " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext === true ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <ol>{movesHistory}</ol>
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  let newSquares = squares.slice();
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
      newSquares[a] &&
      newSquares[a] === newSquares[b] &&
      newSquares[a] === newSquares[c]
    ) {
      return newSquares[a];
    }
  }
  return null;
}
