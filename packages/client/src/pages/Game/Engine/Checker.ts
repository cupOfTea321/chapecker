import { AbstractGameObject, TGameObjectOptions } from './AbstractGameObject'

/**
 * Определяет расстояние между двумя точками
 */
function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

type TCheckerOptions = TGameObjectOptions & {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  color: string
}

export class Checker extends AbstractGameObject {
  private _ctx: CanvasRenderingContext2D

  private _active = false

  private _radius = 30

  private _color = 'gray'

  constructor(options: TCheckerOptions) {
    const { ctx, radius, color } = options
    super(options)
    this._ctx = ctx
    this._radius = radius
    // this._counterClockwise = counterClockwise
    this._color = color
  }

  public async init(): Promise<boolean> {
    this.draw()

    return true
  }

  public makeActive() {
    this._active = true
  }

  public makeInactive() {
    this._active = false
  }

  public update(dt: number): void {
    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }

    this.draw()
  }

  public override delete() {
    // Завершающие действия
  }

  protected draw(): void {
    this._ctx.shadowColor = 'red'
    if (this._active) this._ctx.shadowBlur = 10
    this._ctx.fillStyle = this._color
    this._ctx.beginPath()
    this._ctx.arc(this.x, this.y, this._radius, 0, Math.PI * 2)
    this._ctx.fill()
    this._ctx.shadowBlur = 0
  }

  /**
   * Определяет, лежит ли поданная на вход
   * точка на шашке в текущем положении
   */
  public pointFromHere(x: number, y: number) {
    return dist(this.x, this.y, x, y) < this._radius
  }
}
