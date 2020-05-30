import React from "react";
import { render } from "react-dom";
import "./Board.css";
import { shuffleArray, swapArrayEntries } from "./Utils.js";

const BLANK_TILE_VALUE = false;

class Board extends React.Component {
  // A list which describes allowable tile moves on the puzzle
  allowableMoves = [
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

  state = {
    // Place the 16 tiles into the tile list
    tiles: [
      BLANK_TILE_VALUE,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
    ],
    moveCount: 0,
  };

  constructor(props) {
    super(props);

    this.state.tiles = shuffleArray(this.state.tiles);
    this.startTiles = this.state.tiles.slice();
  }

  slideTile = (clickedTile, e) => {
    let possibleMoves = this.allowableMoves[clickedTile];

    // Loop through the possible moves
    for (let i = 0; i < possibleMoves.length; ++i) {
      let blankTile = possibleMoves[i];

      // Test for the blank tile
      if (this.state.tiles[blankTile] === BLANK_TILE_VALUE) {
        // Blank tile was found so swap it with clicked tile
        this.setState((prevState) => {
          // copy the previous states tile array
          console.log(typeof prevState.moveCount);
          return {
            tiles: swapArrayEntries(prevState.tiles, blankTile, clickedTile),
            moveCount: prevState.moveCount + 1,
          };
        });
      }
    }
  };

  resetTiles = () => {
    console.log("reset the tiles");
    this.setState(() => ({ tiles: this.startTiles.slice() }));
  };

  render() {
    return (
      <div>
        <div className="Board-button-container">
          <button onClick={this.resetTiles}>Reset</button>
          <button>New Game</button>
          <button>Replay</button>
        </div>
        <div className="Board-outer-wrapper">
          <div className="Board-inner-wrapper flex-container">
            {this.state.tiles.map((tile, index) => (
              <div
                key={index}
                id={`tile-${index}`}
                className={tile ? "tile" : "tile blank-tile"}
                onClick={(e) => this.slideTile(index, e)}
              >
                {tile ? tile : ""}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p
            className={
              this.state.moveCount === 0
                ? "Board-counter-sm"
                : "Board-counter-lg"
            }
          >
            {this.state.moveCount === 0
              ? "How many moves will it take you to win?"
              : `Count: ${this.state.moveCount}`}
          </p>
        </div>
      </div>
    );
  }
}

export default Board;
