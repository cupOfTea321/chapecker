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

  // private _onFire: (p: AbstractGameObject) => void

  // private _elapsedTimeOnFile = 0

  // private _idleSprite: Sprite | null = null

  // private _explosionSprite: Sprite | null = null

  private checkersPlayer: Checker[] = []
  private checkersEnemy: Checker[] = []

  private selectedChecker: Checker | null = null

  constructor(options: TPlayerOptions) {
    super(options)
  }

  public async init(): Promise<boolean> {
    this.ctx.canvas.onclick = this._userClickHandler.bind(this)

    // for (let i = 0; i <= 7; i++) {
    //   this.checkersEnemy.push({
    //     x: x + step / 2 + step * i,
    //     y: y + step / 2
    //   })
    // }

    // this._idleSprite = await spriteMap.getSpriteByName(SpriteType.player)
    // this._explosionSprite = await spriteMap.getSpriteByName(
    //   SpriteType.playerExplosion
    // )
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

  private _userClickHandler(e: MouseEvent): void {
    const x = e.clientX - this.x
    const y = e.clientY - this.y
    this.selectedChecker?.makeInactive()

    this.selectedChecker = this._findCheckerByCords(x, y)
    // if (this.selectedChecker in this.checkersPlayer) {
    this.selectedChecker?.makeActive()
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
