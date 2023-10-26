import Sound from './Sound'
import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject'
import { soundMap, SoundType, spriteMap, SpriteType } from './assets'
import {
  BEGIN_COORD_X,
  BEGIN_COORD_Y,
  DARK_CHECKER_COLOR,
  LIGHT_CHECKER_COLOR,
  PLAYER_FIRE_RATE,
  RADIUS,
  RADIUS_CHECKER,
} from './const'
import { createPlayerProjectile } from './Projectile'
import Sprite from './Sprite'
import { Vector } from './Vector'
import { Checker } from './Checker'

type TPlayerOptions = TGameObjectOptions & {
  onFire: (p: AbstractGameObject) => void
}

export class Checkers extends AbstractGameObject {
  static type = GameObjectType.Player

  private _onFire: (p: AbstractGameObject) => void

  private _elapsedTimeOnFile = 0

  private _idleSprite: Sprite | null = null

  private _fireSound: Sound | null = null

  private _killSound: Sound | null = null

  private _explosionSprite: Sprite | null = null

  private _dead = false

  private checkersPlayer = []
  private checkersEnemy = []

  constructor(options: TPlayerOptions) {
    const { onFire, ...superOptions } = options
    super(superOptions)
  }

  public async init(): Promise<boolean> {
    await soundMap.init()
    await spriteMap.init()

    // for (let i = 0; i <= 7; i++) {
    //   this.checkersEnemy.push({
    //     x: x + step / 2 + step * i,
    //     y: y + step / 2
    //   })
    // }
    // this._fireSound = soundMap.getSoundByName(SoundType.fire)
    // this._killSound = soundMap.getSoundByName(SoundType.kill)

    // this._idleSprite = await spriteMap.getSpriteByName(SpriteType.player)
    // this._explosionSprite = await spriteMap.getSpriteByName(
    //   SpriteType.playerExplosion
    // )
    return true
  }

  private _drawCheckers(ctx, x, y, step, color) {
    for (let i = 0; i <= 7; i++) {
      new Checker({
        ctx: this.ctx,
        x: x + step / 2 + step * i,
        y: y + step / 2,
        radius: RADIUS_CHECKER,
        startAngle: 0,
        endAngle: Math.PI * 2,
        color: color,
      }).init()
    }
  }

  public update(dt: number): void {
    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }

    const step = 75
    this._drawCheckers(
      this.ctx,
      BEGIN_COORD_X,
      BEGIN_COORD_Y,
      step,
      DARK_CHECKER_COLOR
    )
    this._drawCheckers(
      this.ctx,
      BEGIN_COORD_X,
      BEGIN_COORD_Y + step * 7,
      step,
      LIGHT_CHECKER_COLOR
    )

    this.draw()
  }

  public override delete() {
    this._killSound?.play()
    this._dead = true
  }

  protected draw(): void {
    super.debugDraw('green')
  }
}
