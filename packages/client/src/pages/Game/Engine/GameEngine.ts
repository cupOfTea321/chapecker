import { Checkers, ChessBoard } from '../Engine'
import { AbstractGameObject } from './AbstractGameObject'
import {
  BG_COLOR,
  BEGIN_COORD_X,
  BEGIN_COORD_Y,
  CHESSBOARD_WIDTH,
  CHESSBOARD_HEIGHT,
} from './const'

export type TGameEngineOptions = {
  ctx: CanvasRenderingContext2D
  ref: HTMLCanvasElement
  debug?: boolean
  onScoreUpdate?: (newScore: number) => void
  onGameOver?: (score: number) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

enum GameState {
  init,
  ready,
  run,
  gameOver,
}

export class GameEngine {
  static gameAreaWidth = 800

  static gameAreaHeight = 800

  private _ctx: CanvasRenderingContext2D

  private _ref: HTMLCanvasElement

  private _gameState: GameState = GameState.init

  private _score = 0

  private _onScoreUpdate: (newScore: number) => void

  private _onGameOver: (score: number) => void

  private _lastTime = performance.now()

  private _objects: AbstractGameObject[] = []

  private _bgObjects: AbstractGameObject[] = []

  private _objectsClass: typeof AbstractGameObject[] = []

  private _debug: boolean

  // private _keyDownHandlerWithContext: (e: KeyboardEvent) => void

  // private _keyUpHandlerWithContext: (e: KeyboardEvent) => void

  constructor({
    ctx,
    ref,
    debug,
    onScoreUpdate,
    onGameOver,
  }: TGameEngineOptions) {
    this._ctx = ctx
    this._ref = ref
    this._debug = debug ?? false

    ctx.canvas.width = GameEngine.gameAreaWidth
    ctx.canvas.height = GameEngine.gameAreaHeight

    this._onScoreUpdate = onScoreUpdate ?? noop
    this._onGameOver = onGameOver ?? noop

    // this._keyDownHandlerWithContext = this._keyDownHandler.bind(this)
    // this._keyUpHandlerWithContext = this._keyUpHandler.bind(this)
  }

  /**
   * Запускает и перезапускает игру
   */
  public start() {
    const run = () => {
      this._gameState = GameState.run

      // Запускаем основной цикл игры
      this._lastTime = performance.now()
      requestAnimationFrame(this._gameLoop.bind(this))
    }

    if (this._gameState === GameState.ready) {
      // Первый запуск
      run()
    } /*if (this._gameState === GameState.gameOver)*/ else {
      // Перезапуск
      this.emergencyStop()
      this._objects = []
      this._bgObjects = []
      this._score = 0
      this.init().then(run)
    }
    // Пусть при повторном старте происходит перезапуск, а не ошибка
    // else {
    //   throw new Error(
    //     `Ошибка старта игры, неверное состояние ${this._gameState}`
    //   )
    // }
  }

  /**
   * Остановка игры
   */
  public stop() {
    // window.removeEventListener('keydown', this._keyDownHandlerWithContext)
    // window.removeEventListener('keyup', this._keyUpHandlerWithContext)
    // Устраняет залипание клавиш, если были нажаты в момент остановки
    // this._playerAction.fire = false
    // this._playerAction.left = false
    // this._playerAction.right = false
  }

  /**
   * Экстренное завершение игры
   */
  public emergencyStop() {
    this.stop()
    this._gameState = GameState.gameOver
  }

  /**
   * Добавляет очки
   *
   * @param score - Добавляемое количество очков
   */
  public addScore(score: number) {
    this._score += score
    this._onScoreUpdate(this._score)
  }

  /**
   * Регистрирует конструкторы возможных объектов
   *
   * @param objectClass - Конструктор игрового объекта или массив конструкторов
   */
  public registerObject(
    objectClass: typeof AbstractGameObject | typeof AbstractGameObject[]
  ): void {
    if (Array.isArray(objectClass)) {
      this._objectsClass.push(...objectClass)
    } else {
      this._objectsClass.push(objectClass)
    }
  }

  /**
   * Инициализация всех игровых объектов.
   *
   * @returns Возвращает true при удачной инициализации игровых объектов
   */
  public async init() {
    this._clear()
    this.registerObject([ChessBoard, Checkers])
    const { x: canvX, y: canvY } = this._ref.getBoundingClientRect()
    this._bgObjects.push(
      new ChessBoard({
        ctx: this._ctx,
        debug: false,
        x: BEGIN_COORD_X,
        y: BEGIN_COORD_Y,
        // Чтобы не падал TS
        vx: 0,
        vy: 0,
        width: CHESSBOARD_WIDTH,
        height: CHESSBOARD_HEIGHT,
      })
    )
    this._bgObjects.push(
      new Checkers({
        ctx: this._ctx,
        debug: false,
        x: canvX,
        y: canvY,
        // Чтобы не падал TS
        vx: 0,
        vy: 0,
        width: 0,
        height: 0,
      })
    )

    // Инициализация объектов, подгрузка спрайтов и тд.
    const objectInit = this._objects.map(object =>
      object.init().catch(error => console.error(error))
    )
    const bgObjectInit = this._bgObjects.map(bgObject =>
      bgObject.init().catch(error => console.error(error))
    )

    const initResult = await Promise.all(objectInit.concat(bgObjectInit))
    if (!initResult.every(res => res)) {
      throw new Error('Init objects failure')
    }

    this._gameState = GameState.ready
    return true
  }

  // /**
  //  * Обработчики нажатия клавиши
  //  *
  //  * @param param0 - Событие клавиатуры
  //  */
  // private _keyDownHandler({ code }: KeyboardEvent) {
  //   switch (code) {
  //     case 'ArrowLeft':
  //     case 'KeyA':
  //       this._playerAction.left = true
  //       break
  //     case 'ArrowRight':
  //     case 'KeyD':
  //       this._playerAction.right = true
  //       break
  //     case 'Space':
  //       this._playerAction.fire = true
  //       break
  //     default:
  //       break
  //   }
  // }

  // /**
  //  * Обработчики отпускания клавиши
  //  *
  //  * @param param0 - Событие клавиатуры
  //  */
  // private _keyUpHandler({ code }: KeyboardEvent) {
  //   switch (code) {
  //     case 'ArrowLeft':
  //     case 'KeyA':
  //       this._playerAction.left = false
  //       break
  //     case 'ArrowRight':
  //     case 'KeyD':
  //       this._playerAction.right = false
  //       break
  //     case 'Space':
  //       this._playerAction.fire = false
  //       break
  //     default:
  //       break
  //   }
  // }

  /**
   * Главный игровой цикл.
   *
   * @param nowTime - Время в мсек прошедшее с последнего вызова
   */
  private _gameLoop(nowTime: DOMHighResTimeStamp) {
    const dt = nowTime - this._lastTime
    this._lastTime = nowTime

    this._clear()
    this._garbageCollector()

    // const isGameOver = true
    // const hasPlayers = true

    for (let i = 0; i < this._bgObjects.length; i += 1) {
      this._bgObjects[i].update(dt)
    }

    // const isGameStateRun = this._gameState === GameState.run

    // if (hasPlayers && hasSwarm && isGameStateRun) {
    requestAnimationFrame(this._gameLoop.bind(this))
    // } else {
    //   this._gameState = GameState.gameOver
    //   this._onGameOver(this._score)
    // }
    // if (isGameOver) {
    //   this.stop()
    // }
  }

  /**
   * Удаляет игровые объекта помеченные на удаление
   */
  private _garbageCollector() {
    // let objectCount = this._objects.length
    // let deleteObjectCount = 0
    // for (let i = 0; i < objectCount; i += 1) {
    //   const object = this._objects[i]
    //   if (object instanceof Swarm) {
    //     // Если объект рой, запускаем внутренний garbageCollector
    //     object.garbageCollector()
    //   }
    //   if (object.hasDelete) {
    //     this._objects.push(...this._objects.splice(i, 1))
    //     objectCount -= 1
    //     deleteObjectCount += 1
    //   }
    // }
    // this._objects.splice(objectCount, deleteObjectCount)
  }

  // /**
  //  * Проверяет объект на нахождение в границах игрового поля
  //  *
  //  * @param position - Позиция проверяемого объекта
  //  * @param width - Ширина проверяемого объекта
  //  * @param height - Высота проверяемого объекта
  //  * @returns Возражает true если объект находится за границами игрового поля
  //  */
  // private _outOfBoundary(position: Vector, width: number, height: number) {
  //   if (position.y + height <= 0 || position.y >= GameEngine.gameAreaHeight) {
  //     return true
  //   }
  //   if (position.x + width <= 0 || position.x >= GameEngine.gameAreaWidth) {
  //     return true
  //   }
  //   return false
  // }

  /**
   * Очистка игрового поля
   */
  private _clear() {
    this._ctx.fillStyle = BG_COLOR
    this._ctx.fillRect(
      0,
      0,
      GameEngine.gameAreaWidth,
      GameEngine.gameAreaHeight
    )
  }
}
