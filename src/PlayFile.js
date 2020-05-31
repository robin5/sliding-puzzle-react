import { setCookie } from "./Cookie.js";
import { getCookie } from "./Cookie.js";

const START_TILES = "startTiles";
const TILE_RECORD = "tiles";
const ONE_YEAR = 365;

/** Writes the starting tiles to the cookie */
const setStartTiles = (arr) => {
  console.log(`setStartTiles ${arr}`);
  saveArray(START_TILES, arr);
};

/** Reads the starting tiles from the cookie */
const getStartTiles = () => {
  return getArray(START_TILES);
};

/** Writes the starting tiles to the cookie */
const setTileRecord = (arr) => {
  saveArray(TILE_RECORD, arr);
};

/** Reads the starting tiles from the cookie */
const getTileRecord = () => {
  return getArray(TILE_RECORD);
};

export { setStartTiles, getStartTiles, setTileRecord, getTileRecord };

/** Writes the starting tiles to the cookie */
const saveArray = (arrayName, arr) => {
  var json_array = JSON.stringify(arr);
  setCookie(arrayName, json_array, ONE_YEAR);
  return true;
};

/** Reads the starting tiles from the cookie */
const getArray = (arrayName) => {
  const json_array = getCookie(arrayName);
  if (json_array === "") {
    return [];
  }
  const arr = JSON.parse(json_array);
  return arr;
};
