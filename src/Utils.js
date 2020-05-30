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

export { shuffleArray, swapArrayEntries };
