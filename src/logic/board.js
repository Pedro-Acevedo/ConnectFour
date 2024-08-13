import { generateWinningCombinations } from "../constants"

const combinations = generateWinningCombinations(7)
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of combinations) {
    const [a, b, c, d] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c] &&
      boardToCheck[a] === boardToCheck[d]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
