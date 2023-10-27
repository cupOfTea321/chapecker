import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject'
import { spriteMap } from './assets'

type TPlayerOptions = TGameObjectOptions & {
  onFire: (p: AbstractGameObject) => void
}

export class Table extends AbstractGameObject {
  static type = GameObjectType.Table

  private _ctx: CanvasRenderingContext2D

  constructor(options: TPlayerOptions) {
    super(options)
  }

  public async init(): Promise<boolean> {
    await spriteMap.init()

    // this._fireSound = soundMap.getSoundByName(SoundType.fire)
    // this._killSound = soundMap.getSoundByName(SoundType.kill)

    // this._idleSprite = await spriteMap.getSpriteByName(SpriteType.player)
    // this._explosionSprite = await spriteMap.getSpriteByName(
    //   SpriteType.playerExplosion
    // )
    return true
  }

  public update(dt: number): void {
    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }

    this.draw()
  }

  public override delete() {
    // this._killSound?.play()
    // this._dead = true
  }

  protected draw(): void {
    super.debugDraw('green')
  }
}
