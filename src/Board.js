import React from "react";
import Tile from "./Tile.js";
import "./Board.css";

// Place the 16 tiles into the tile list
const tiles = [false, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// A list which describes allowable tile moves on the puzzle
const allowableMoves = [
  [1, 4],
  [0, 2, 5],
  [1, 3, 6],
  [2, 7],
  [0, 5, 8],
  [1, 4, 6, 9],
  [2, 5, 7, 10],
  [3, 6, 11],
  [4, 9, 12],
  [5, 8, 10, 13],
  [6, 9, 11, 14],
  [7, 10, 15],
  [8, 13],
  [9, 12, 14],
  [10, 13, 15],
  [11, 14],
];

function Board() {
  return (
    <div className="Board-outer-wrapper">
      <div className="Board-button-container">
        <button>Reset</button>
        <button>New Game</button>
        <button>Replay</button>
      </div>
      <div className="Board-inner-wrapper flex-container">
        {tiles.map((tile, i) => (
          <Tile key={i} index={i} value={tile}></Tile>
        ))}
      </div>
    </div>
  );
}

export default Board;
