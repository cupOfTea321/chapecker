import { useEffect, useRef, useState } from 'react'
import { GameEngine } from './Engine'
import styles from './GamePage.module.css'

let gameEngine: GameEngine | null = null

const enum Status {
  start = 'start',
  gameOver = 'game-over',
  run = 'run',
}

const Game = () => {
  const [gameStatus, setGameStatus] = useState(Status.start)
  const [score, setScore] = useState(999)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  const gameStart = () => {
    setScore(0)
    setGameStatus(Status.run)
    if (!gameEngine) {
      throw new Error('Игра еще не инициализирована')
    }
    gameEngine.start()
  }

  useEffect(() => {
    const { current: canvasNode } = canvasRef
    const { current: gameNode } = gameRef
    if (!canvasNode || !gameNode) {
      throw new Error('Could not get canvas node')
    }
    const ctx = canvasNode.getContext('2d')
    if (ctx == null) {
      throw new Error('Could not get 2d context')
    }
    gameEngine = new GameEngine({
      ctx,
      ref: canvasNode,
      debug: false,
      onScoreUpdate: setScore,
      onGameOver(newScore) {
        setGameStatus(Status.gameOver)
        setScore(newScore)
        // leaderboardService.setCSRFToken(token)
        // leaderboardService.addToLeaderboard({ score: newScore })
      },
    })
    console.log('context', ctx)
    gameEngine.init()
  }, [canvasRef, gameRef])

  const className = (...args: string[]) => {
    return args.join(' ')
  }

  return (
    <>
      <h1>THE CHAPECKER</h1>
      <div ref={gameRef} className={styles.game}>
        <div className={styles.game_area}>
          <div className={className(styles.game_score, styles['score-text'])}>
            {`Score: ${score}`}
          </div>
          <div className={className(styles.game_score, styles['score-text'])}>
            {`Status: ${gameStatus}`}
          </div>
          <div style={{ display: 'flex' }}>
            <button onClick={gameStart}>начать</button>
          </div>

          <canvas ref={canvasRef} />
        </div>
      </div>
    </>
  )
}

export default Game
