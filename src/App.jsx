import { useState } from "react"
import { Square } from "./components/square"
import confetti from "canvas-confetti"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { resetGameStorage, saveGameToStorage } from "./storage"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(49).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFormStorage = window.localStorage.getItem("turn")
    return turnFormStorage ?? TURNS.RED
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.RED ? TURNS.YELLOW : TURNS.RED
    setTurn(newTurn)

    saveGameToStorage({ newBoard: newBoard, newTurn: newTurn })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(49).fill(null))
    setTurn(TURNS.RED)
    setWinner(null)

    resetGameStorage()
  }

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}> Reset del juego</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <>
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              </>
            )
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.RED}>{TURNS.RED}</Square>
          <Square isSelected={turn === TURNS.YELLOW}>{TURNS.YELLOW}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App
