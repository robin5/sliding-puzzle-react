import React from "react";
import "./App.css";
import Board from "./Board.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sliding Puzzle</h1>
      </header>
      <main>
        <Board></Board>
      </main>
    </div>
  );
}

export default App;
