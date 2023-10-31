import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject'
import {
  BEGIN_COORD_X,
  BEGIN_COORD_Y,
  DARK_CHECKER_COLOR,
  LIGHT_CHECKER_COLOR,
  RADIUS_CHECKER,
} from './const'
// import { Vector } from './Vector'
import { Checker } from './Checker'

type TPlayerOptions = TGameObjectOptions

// В Checkers.x, Checkers.y хранится положение канвы

export class Checkers extends AbstractGameObject {
  static type = GameObjectType.Player

  private checkersPlayer: Checker[] = []
  private checkersEnemy: Checker[] = []

  private selectedChecker: Checker | null = null

  constructor(options: TPlayerOptions) {
    super(options)
  }

  public async init(): Promise<boolean> {
    this.ctx.canvas.onclick = this._userClickHandler.bind(this)
    this.ctx.canvas.oncontextmenu = this._userRightClickHandler.bind(this)

    return true
  }

  private _createAndDrawCheckers(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    step: number,
    color: string,
    ours: boolean
  ) {
    for (let i = 0; i <= 7; i++) {
      const checker = new Checker({
        ctx: this.ctx,
        x: x + step / 2 + step * i,
        y: y + step / 2,
        vx: 0,
        vy: 0,
        radius: RADIUS_CHECKER,
        color: color,

        width: 0,
        height: 0,
      })
      checker.init()
      if (ours) this.checkersPlayer.push(checker)
      else this.checkersEnemy.push(checker)
    }
  }

  private _userRightClickHandler(e: MouseEvent): void {
    e.preventDefault()
    this.selectedChecker?.makeInactive()
    this.selectedChecker = null
  }

  private _userClickHandler(e: MouseEvent): void {
    const x = e.clientX - this.x
    const y = e.clientY - this.y
    this.selectedChecker?.makeInactive()

    const newChecker = this._findCheckerByCords(x, y)
    if (newChecker && this.checkersPlayer.indexOf(newChecker) !== -1) {
      this.selectedChecker = newChecker
      newChecker.makeActive()
    } else if (this.selectedChecker) {
      this.selectedChecker.throw(x, y)
      this.selectedChecker = null
    }
  }

  private _findCheckerByCords(x: number, y: number): Checker | null {
    for (const checker of this.checkersEnemy) {
      if (checker.pointFromHere(x, y)) return checker
    }
    for (const checker of this.checkersPlayer) {
      if (checker.pointFromHere(x, y)) return checker
    }
    return null
  }

  public update(dt: number): void {
    const step = 75 // Размер одной клетки
    if (this.checkersEnemy.length === 0) {
      console.log('Creating checkers!')
      this._createAndDrawCheckers(
        this.ctx,
        BEGIN_COORD_X,
        BEGIN_COORD_Y,
        step,
        DARK_CHECKER_COLOR,
        false
      )
      this._createAndDrawCheckers(
        this.ctx,
        BEGIN_COORD_X,
        BEGIN_COORD_Y + step * 7,
        step,
        LIGHT_CHECKER_COLOR,
        true
      )
    } else {
      for (const checker of this.checkersEnemy) checker.update(dt)
      for (const checker of this.checkersPlayer) checker.update(dt)

      // Проверка на соударения
      for (let i = 0; i < this.checkersPlayer.length; i++) {
        for (let j = 0; j < this.checkersPlayer.length; j++) {
          if (i == j) continue
          this.checkersPlayer[i].collide(this.checkersPlayer[j])
        }
        for (let j = 0; j < this.checkersEnemy.length; j++) {
          this.checkersPlayer[i].collide(this.checkersEnemy[j])
        }
      }
      for (let i = 0; i < this.checkersEnemy.length; i++) {
        for (let j = 0; j < this.checkersEnemy.length; j++) {
          if (i == j) continue
          this.checkersEnemy[i].collide(this.checkersEnemy[j])
        }
        for (let j = 0; j < this.checkersEnemy.length; j++) {
          this.checkersEnemy[i].collide(this.checkersPlayer[j])
        }
      }
    }

    this.draw()
  }

  public override delete() {
    // Завершающие действия
  }

  protected draw(): void {
    // super.debugDraw('green')
  }
}
