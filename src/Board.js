import React from "react";
import { render } from "react-dom";
import "./Board.css";

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
    tiles: [false, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  };

  constructor(props) {
    super(props);

    this.shuffleArray(this.state.tiles);
    this.startTiles = this.state.tiles.slice();
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  slideTile = (position, e) => {
    let possibleMoves = this.allowableMoves[position];

    // Loop through the possible moves
    for (let i = 0; i < possibleMoves.length; ++i) {
      // if one of the possible moves is into the blank position
      let blankPosition = possibleMoves[i];

      if (this.state.tiles[blankPosition] === false) {
        this.setState((prevState) => {
          // copy the previous states tile array
          let newTiles = prevState.tiles.slice();

          // swap the blank position with the current position
          newTiles[blankPosition] = prevState.tiles[position];
          newTiles[position] = prevState.tiles[blankPosition];

          return { tiles: newTiles };
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
      <div className="Board-outer-wrapper">
        <div className="Board-button-container">
          <button onClick={this.resetTiles}>Reset</button>
          <button>New Game</button>
          <button>Replay</button>
        </div>
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
    );
  }
}

export default Board;
