import { useEffect, useRef, useState } from 'react'
import { GameEngine } from './Engine'
import styles from './GamePage.module.scss'
import PrimitivePaper from '../../components/PrimitivePaper/PrimitivePaper'
import { Navigate } from 'react-router-dom'
import { useFullscreen } from '../../utils/fullscreenHook'
import PrimitiveButton from '../../components/PrimitiveButton/PrimitiveButton'
import { useAddLeaderMutation } from '../../redux/services/leaders'
import { getUser } from '../../redux/features/userSlice'
import { useTypedSelector } from '../../redux/store'

const enum Status {
  start = 'start',
  gameOver = 'game-over',
  run = 'run',
}

const Game = () => {
  const [gameStatus, setGameStatus] = useState(Status.start)
  const [score, setScore] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<GameEngine>(null)
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  const gameStart = () => {
    const gameEngine = engineRef.current
    if (!gameEngine) {
      throw new Error('Игра еще не инициализирована')
    }
    setScore(0)
    setGameStatus(Status.run)

    gameEngine.start()
  }
  const [leader] = useAddLeaderMutation()

  const currentUser = useTypedSelector(getUser)
  // функция записи результата на сервер
  const leaderList = async () => {
    try {
      await leader({
        ratingFieldName: 'chapecker',
        data: {
          name: currentUser.login,
          chapecker: '110',
        },
        teamName: 'team',
      }).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const { current: canvasNode } = canvasRef
    if (!canvasNode) {
      throw new Error('Could not get canvas node')
    }
    const ctx = canvasNode.getContext('2d')
    if (ctx == null) {
      throw new Error('Could not get 2d context')
    }
    if (!engineRef.current) {
      const gameEngine = new GameEngine({
        ctx,
        ref: canvasNode,
        onScoreUpdate: setScore,
        onGameOver(newScore) {
          setGameStatus(Status.gameOver)
          setScore(newScore)
        },
      })
      ;(engineRef.current as null | GameEngine) = gameEngine
      gameEngine.init()
      gameStart()
    }
    return () => {
      leaderList()
    }
  }, [])

  const className = (...args: string[]) => {
    return args.join(' ')
  }

  if (gameStatus == Status.gameOver) return <Navigate to={'/end'} />
  return (
    <PrimitivePaper class={styles.game} outerClass={styles.game__outer}>
      <h1>THE CHAPECKER</h1>
      <div className={styles.game_area}>
        <div className={className(styles.game_score, styles['score-text'])}>
          {`Status: ${gameStatus}`}
        </div>
        <div className={styles.game_area}>
          <div className={className(styles.game_score, styles['score-text'])}>
            {`Score: ${score}`}
          </div>
          <PrimitiveButton onClick={() => toggleFullscreen()}>
            {isFullscreen ? 'В окне' : 'Полноэкранный режим'}
          </PrimitiveButton>
        </div>
        <canvas ref={canvasRef} />
      </div>
    </PrimitivePaper>
  )
}

export default Game
