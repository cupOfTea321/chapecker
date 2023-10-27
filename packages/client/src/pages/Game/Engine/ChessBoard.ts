import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject'

import { DARK_CELL_COLOR, LIGHT_CELL_COLOR, CHESSBOARD_WIDTH } from './const'

type TPlayerOptions = TGameObjectOptions

export class ChessBoard extends AbstractGameObject {
  static type = GameObjectType.Table

  // private _ctx: CanvasRenderingContext2D

  private symbolsArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  private delta = CHESSBOARD_WIDTH / 8

  constructor(options: TPlayerOptions) {
    super(options)
  }

  public async init(): Promise<boolean> {
    // await soundMap.init()  инициализатор звуков на будущее (если понадобится)
    // await spriteMap.init() инициализатор спрайтов

    return true
  }

  public update(/*dt: number*/): void {
    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }

    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        this.ctx.fillStyle =
          (i + j) % 2 == 0 ? LIGHT_CELL_COLOR : DARK_CELL_COLOR
        this.ctx.fillRect(
          this.x + this.delta * (i - 1),
          this.y + this.delta * (j - 1),
          this.delta,
          this.delta
        )
      }
    }

    this.symbolsArr.forEach((item, index) => {
      this.ctx.font = '24px serif'
      this.ctx.fillText(item, this.x + this.delta * index + 30, this.y - 20)
      this.ctx.fillText(
        String(8 - index),
        this.x - 40,
        this.y + this.delta * index + 45
      )
    })

    this.draw()
  }

  public override delete() {
    // завершающие действия (например, звук)
  }

  protected draw(): void {
    super.debugDraw('green')
  }
}
