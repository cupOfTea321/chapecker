import { AbstractGameObject } from './AbstractGameObject'
import { soundMap, spriteMap } from './assets'

type TPlayerOptions = {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number
  color: string
}

export class Checker extends AbstractGameObject {
  private _ctx: CanvasRenderingContext2D

  private _x = 0

  private _y = 0

  private _radius = 30

  private _startAngle = 0

  private _endAngle = 0

  private _color = 'gray'

  private _mousePosition: any

  constructor(options: TPlayerOptions) {
    const { ctx, x, y, radius, startAngle, endAngle, color } = options
    super(options)
    this._ctx = ctx
    this._x = x
    this._y = y
    this._radius = radius
    this._startAngle = startAngle
    this._endAngle = endAngle
    // this._counterClockwise = counterClockwise
    this._color = color
    this._mousePosition = this._oMousePos.bind(this)
  }

  private _oMousePos(canvas, evt) {
    const ClientRect = canvas.getBoundingClientRect()
    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    }
  }

  public async init(): Promise<boolean> {
    await soundMap.init()
    await spriteMap.init()

    this._ctx.fillStyle = this._color
    this._ctx.beginPath()
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2)
    this._ctx.fill()

    this._ctx.canvas.addEventListener(
      'click',
      function (event) {
        console.log('here')
      },
      false
    )

    return true
  }

  public update(dt: number): void {
    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }

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
