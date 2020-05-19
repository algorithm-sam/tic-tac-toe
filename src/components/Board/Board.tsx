import React from "react";
import { Square } from "../Square";

interface BoardProps {
  squares: Array<number | null>;
  handleClick: () => {};
}

const Board: React.FC<BoardProps> = ({ squares, handleClick }) => {
  const rows = [0, 3, 6];
  const renderSquare = (i: number) => (
    <Square key={i} value={squares[i]} onClick={() => handleClick} />
  );

  const renderRow = (start: number) => {
    const iteratableRows = [0, 1, 2];
    return (
      <div>
        <div className="board-row">
          {iteratableRows.map((idx) => renderSquare(idx + start))})}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="board-row">{rows.map((x) => renderRow(x))}</div>
    </div>
  );
};

export default Board;
