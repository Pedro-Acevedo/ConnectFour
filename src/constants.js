export const TURNS = {
  RED: "🔴",
  YELLOW: "🟡",
}

// export const WINNER_COMBOS = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ]

export function generateWinningCombinations(boardSize) {
  const winningCombinations = []
  const columnHeight = boardSize

  // Horizontal combinations
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - 4; col++) {
      winningCombinations.push([
        row * columnHeight + col,
        row * columnHeight + col + 1,
        row * columnHeight + col + 2,
        row * columnHeight + col + 3,
      ])
    }
  }

  // Vertical combinations
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - 4; row++) {
      winningCombinations.push([
        row * columnHeight + col,
        (row + 1) * columnHeight + col,
        (row + 2) * columnHeight + col,
        (row + 3) * columnHeight + col,
      ])
    }
  }

  // Diagonal combinations (forward slash)
  for (let row = 0; row <= boardSize - 4; row++) {
    for (let col = 0; col <= boardSize - 4; col++) {
      winningCombinations.push([
        row * columnHeight + col,
        (row + 1) * columnHeight + col + 1,
        (row + 2) * columnHeight + col + 2,
        (row + 3) * columnHeight + col + 3,
      ])
    }
  }

  // Diagonal combinations (backward slash)
  for (let row = 0; row <= boardSize - 4; row++) {
    for (let col = 3; col < boardSize; col++) {
      winningCombinations.push([
        row * columnHeight + col,
        (row + 1) * columnHeight + col - 1,
        (row + 2) * columnHeight + col - 2,
        (row + 3) * columnHeight + col - 3,
      ])
    }
  }

  return winningCombinations
}

// const boardSize = 7
// const combinations = generateWinningCombinations(boardSize)
// console.log(combinations)
