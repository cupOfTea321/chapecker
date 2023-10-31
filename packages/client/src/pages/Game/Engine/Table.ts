import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject'
import { soundMap, spriteMap } from './assets'

type TPlayerOptions = TGameObjectOptions & {
  onFire: (p: AbstractGameObject) => void
}

export class Table extends AbstractGameObject {
  static type = GameObjectType.Table

  private _ctx: CanvasRenderingContext2D

  constructor(options: TPlayerOptions) {
    const { onFire, ...superOptions } = options
    super(superOptions)
  }

  public async init(): Promise<boolean> {
    await soundMap.init()
    await spriteMap.init()

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
