import Sound from './Sound'
import { AbstractGameObject, GameObjectType } from './AbstractGameObject'
import { soundMap, SoundType, spriteMap, SpriteType } from './assets'
import { PLAYER_FIRE_RATE } from './const'
import { createPlayerProjectile } from './Projectile'
import Sprite from './Sprite'
import { Vector } from './Vector'

type TPlayerOptions = {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number
  // counterClockwise: number
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
        // const mouse = this._mousePosition(this._ctx.canvas, event)
        // elements.forEach(function (element) {
        //   drawElement(element, context)
        //   if (context.isPointInPath(mouse.x, mouse.y)) {
        //     console.log(mouse)
        //   } else {
        //     console.log('not in path')
        //   }
        // })
      },
      false
    )

    // this._fireSound = soundMap.getSoundByName(SoundType.fire)
    // this._killSound = soundMap.getSoundByName(SoundType.kill)

    // this._idleSprite = await spriteMap.getSpriteByName(SpriteType.player)
    // this._explosionSprite = await spriteMap.getSpriteByName(
    //   SpriteType.playerExplosion
    // )
    return true
  }

  // private _drawCheckers(ctx, y, color, step) {
  //   ctx.fillStyle = color

  //   for (let i = y; i < 2 * step + y; i += step) {
  //     for (let j = step / 2; j < 8 * step; j += step) {
  //       // arc(x, y, radius, startAngle, endAngle, counterclockwise)
  //       ctx.beginPath()
  //       ctx.arc(
  //         this._x,
  //         this._y,
  //         this._startAngle,
  //         this._endAngle,
  //         this._counterClockwise
  //       )
  //       ctx.fill()
  //     }
  //   }
  // }

  public update(dt: number): void {
    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }
    // this._ctx.beginPath()
    // this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2)
    // this._ctx.fill()

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
