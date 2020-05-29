import React from "react";
import "./Tile.css";

function Tile({ index, value }) {
  return (
    <div id={`tile-${index}`} className={value ? "tile" : "tile blank-tile"}>
      {value ? value : ""}
    </div>
  );
}

export default Tile;
