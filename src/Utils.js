/** Shuffles the passed in array */
const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/** Returns a new array with entries specified by index1 and index2 swapped */
const swapArrayEntries = (array, index1, index2) => {
  // Make a copy of the array
  let newArray = array.slice();

  // swap the indexed positions
  newArray[index1] = array[index2];
  newArray[index2] = array[index1];
  return newArray;
};

function* arrayGenerator(arr) {
  for (let i = 0; i < arr.length; ++i) {
    yield arr[i];
  }
}

const BLANK_TILE_VALUE = false;

const DEFAULT_TILES = [
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
];

const ONE_MOVE_TO_WIN = [
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
  BLANK_TILE_VALUE,
  15,
];

export {
  shuffleArray,
  swapArrayEntries,
  arrayGenerator,
  DEFAULT_TILES,
  ONE_MOVE_TO_WIN,
};
