import React from "react";
import { render } from "react-dom";
import "./Board.css";
import {
  shuffleArray,
  swapArrayEntries,
  arrayGenerator,
  DEFAULT_TILES,
  ONE_MOVE_TO_WIN,
} from "./Utils.js";
import {
  setStartTiles,
  getStartTiles,
  setTileRecord,
  getTileRecord,
} from "./PlayFile.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

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
    tiles: DEFAULT_TILES,
    startTiles: [],
    moveCount: 0,
    tileRecord: [],
    gameWon: false,
    replaying: false,
  };

  constructor(props) {
    super(props);

    this.state.tiles = shuffleArray(this.state.tiles);
    // this.state.tiles = ONE_MOVE_TO_WIN;
    this.state.startTiles = this.state.tiles.slice();
    setStartTiles(this.state.startTiles);
  }

  /** Slides tile given by clickedTile into open position */
  slideTile = (clickedTile, e) => {
    // If the game has been won, or we are replaying the game through the tile
    // player and thus want to ignore a clicked tile, ignore the tile move
    if (this.state.gameWon || (this.state.replaying && e !== null)) {
      return;
    }

    // Get possible moves for the clicked tile
    let possibleMoves = this.allowableMoves[clickedTile];

    // Loop through the possible moves looking to see
    // if one of the moves is into the blank position
    for (let i = 0; i < possibleMoves.length; ++i) {
      let blankTile = possibleMoves[i];

      // Test for the blank tile
      if (this.state.tiles[blankTile] === BLANK_TILE_VALUE) {
        // Blank tile was found so swap it with clicked tile
        this.setState((prevState) => {
          // Get previous record of moves
          let tileRecord = prevState.tileRecord.slice();

          // if replaying the tile record then don't add the move to the record
          if (!this.state.replaying) {
            tileRecord.push(clickedTile);
          }
          setTileRecord(tileRecord);

          // Swap the tiles thereby mimicking the tile move
          let tiles = swapArrayEntries(prevState.tiles, blankTile, clickedTile);

          // set the next state
          let nextState = {
            tiles: tiles,
            moveCount: prevState.moveCount + 1,
            tileRecord: tileRecord,
            gameWon: this.isWinningBoard(tiles),
          };

          return nextState;
        });
      }
    }
  };

  /** Returns true if tiles are in winning order otherwise false */
  isWinningBoard = (tiles) => {
    const winningTileLength = tiles.length - 1;
    for (let i = 0; i < winningTileLength; ++i) {
      if (tiles[i] !== i + 1) {
        return false;
      }
    }
    return true;
  };

  moveFocus = () => {
    console.log("mouse up!");
    document.getElementById("tile-0").focus();
  };

  resetTiles = () => {
    this.setState((prevState) => {
      // Set the tiles back to the start tiles
      const newTiles = prevState.startTiles.slice();

      // Reset the tile record
      const newTileRecord = [];
      setTileRecord(newTileRecord);

      // Setup the next state
      const nextState = {
        tiles: newTiles,
        tileRecord: newTileRecord,
        moveCount: 0,
        gameWon: false,
      };

      return nextState;
    });
  };

  newGame = () => {
    const newTiles = shuffleArray(this.state.tiles);
    setStartTiles(newTiles);
    setTileRecord([]);

    this.setState(() => ({
      tiles: newTiles,
      startTiles: newTiles.slice(),
      moveCount: 0,
      tileRecord: [],
      gameWon: false,
    }));
  };

  /**  Retrieves next tile to be replayed during game replay and cancels play when last tile is received */
  tilePlayer = () => {
    let tile = this.tileGen.next();
    if (tile.done) {
      this.cancelReplay();
    } else {
      this.slideTile(tile.value, null);
    }
  };

  /** Replays the game up to the current state */
  replayGame = () => {
    let startTiles = getStartTiles();
    this.tileGen = arrayGenerator(getTileRecord());
    // this.tileGen = tileGenerator(tileRecord);
    this.setState((prevState) => {
      const nextState = {
        tiles: startTiles,
        moveCount: 0,
        gameWon: false,
        replaying: true,
        saveState: prevState
      };
      return nextState;
    });

    this.interval = setInterval(this.tilePlayer, 200);
  };

  /** Cancels game replay */
  cancelReplay = () => {
    clearInterval(this.interval);
    this.setState((prevState) => ({
      replaying: false,
      tiles: prevState.saveState.tiles,
      moveCount: prevState.saveState.moveCount,
      gameWon: prevState.saveState.gameWon,
      }));
  };

  /** Renders liding puzzle board */
  render() {
    return (
      <div className="Board">
        <Navbar expand="sm">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.state.replaying ? (
                <Button
                  className="btn-menu btn-lg"
                  onClick={this.cancelReplay}
                  onMouseUp={this.moveFocus}
                  onMouseLeave={this.moveFocus}
                >
                  Cancel Replay
                </Button>
              ) : (
                <>
                  <Button
                    className="btn-menu btn-lg"
                    onClick={this.resetTiles}
                    onMouseUp={this.moveFocus}
                    onMouseLeave={this.moveFocus}
                  >
                    Reset
                  </Button>
                  <Button
                    id="btn-new-game"
                    className="btn-menu btn-lg"
                    onClick={this.newGame}
                    onMouseUp={this.moveFocus}
                    onMouseLeave={this.moveFocus}
                  >
                    New Game
                  </Button>
                  <Button
                    className="btn-menu btn-lg"
                    onClick={this.replayGame}
                    onMouseUp={this.moveFocus}
                    onMouseLeave={this.moveFocus}
                  >
                    Replay
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Board-outer-wrapper">
          <div className="Board-inner-wrapper flex-container">
            {this.state.gameWon ? (
              <img
                src={require("./orangecheck.png")}
                alt="check mark"
                className="Board-checkmark"
              />
            ) : null}

            {this.state.tiles.map((tile, index) => (
              <button
                key={index}
                id={`tile-${index}`}
                className={tile ? "tile" : "tile blank-tile"}
                onClick={(e) => this.slideTile(index, e)}
              >
                {tile ? tile : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="Board-counter-container">
          {this.state.gameWon ? (
            <div>
              <p className="Board-counter-text">
                You won in {this.state.moveCount} moves!
              </p>
            </div>
          ) : (
            <p
              className={
                this.state.moveCount === 0
                  ? "Board-counter-text"
                  : "Board-counter-count"
              }
            >
              {this.state.moveCount === 0
                ? "How many moves will it take you to win?"
                : `Count: ${this.state.moveCount}`}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Board;
