import { AbstractGameObject, TGameObjectOptions } from './AbstractGameObject'
import {
  CHECKER_SHADOW_COLOR,
  FRICTION_COEFFICIENT,
  MAXSPEED,
  MAXSPEED_DISTANCE,
  RADIUS_CHECKER,
} from './const'

/**
 * Определяет расстояние между двумя точками
 */
function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

/**
 * Определяет длину вектора
 */
function vlength(x: number, y: number) {
  return dist(0, 0, x, y)
}

type TCheckerOptions = TGameObjectOptions & {
  radius: number
  color: string
}

export class Checker extends AbstractGameObject {
  private _active = false

  private _radius = 30

  private _color = 'gray'

  constructor(options: TCheckerOptions) {
    const { radius, color } = options
    super(options)
    this._radius = radius
    // this._counterClockwise = counterClockwise
    this._color = color
  }

  public async init(): Promise<boolean> {
    this.draw()

    // this._idleSprite = await spriteMap.getSpriteByName(SpriteType.player)
    // this._explosionSprite = await spriteMap.getSpriteByName(
    //   SpriteType.playerExplosion
    // )
    return true
  }

  public makeActive() {
    this._active = true
  }

  public makeInactive() {
    this._active = false
  }

  public update(dt: number): void {
    if (this.vy !== 0 || this.vx !== 0) {
      this.x += (this.vx * dt) / 1000
      this.y += (this.vy * dt) / 1000
      this.vx -= (FRICTION_COEFFICIENT * this.vx * dt) / 1000
      this.vy -= (FRICTION_COEFFICIENT * this.vy * dt) / 1000
      if (Math.abs(this.vx) < 5) this.vx = 0
      if (Math.abs(this.vy) < 5) this.vy = 0
    }

    // if (!this._idleSprite || !this._explosionSprite) {
    //   throw new Error('Не задан спрайт для бездействия игрока')
    // }
    // this.ctx.beginPath()
    // this.ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2)
    // this.ctx.fill()

    this.draw()
  }

  public override delete() {
    // Завершающие действия
  }

  protected draw(): void {
    // super.debugDraw('green')

    this.ctx.shadowColor = CHECKER_SHADOW_COLOR
    if (this._active) {
      this.ctx.lineWidth = 5
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, MAXSPEED_DISTANCE, 0, Math.PI * 2)
      this.ctx.stroke()
      this.ctx.lineWidth = 1
      this.ctx.shadowBlur = 10
    }
    this.ctx.fillStyle = this._color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this._radius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.shadowBlur = 0
  }

  /**
   * Определяет, лежит ли поданная на вход
   * точка на шашке в текущем положении
   */
  public pointFromHere(x: number, y: number) {
    return dist(this.x, this.y, x, y) < this._radius
  }

  public throw(x: number, y: number) {
    this.vx = x - this.x
    this.vy = y - this.y
    const len = vlength(this.vx, this.vy)

    const distToThrowPoint = Math.min(
      MAXSPEED_DISTANCE,
      dist(this.x, this.y, x, y)
    )

    this.vx =
      ((this.vx / len) * MAXSPEED * distToThrowPoint) / MAXSPEED_DISTANCE
    this.vy =
      ((this.vy / len) * MAXSPEED * distToThrowPoint) / MAXSPEED_DISTANCE
  }

  public isCollision(other: Checker) {
    // большое расстояние
    if (dist(this.x, this.y, other.x, other.y) < 2 * RADIUS_CHECKER) {
      return true
    }
    return false
    // движутся в разных направлениях
    if (this.x !== other.x) {
      if (this.x > other.x) {
        if (this.vx < 0) return true
      } else {
        if (this.vx > 0) return true
      }
    }
    if (this.y !== other.y) {
      if (this.y > other.y) {
        if (this.vy < 0) return true
      } else {
        if (this.vy > 0) return true
      }
    }
    console.log('dg')
    console.log(this, other)
    console.log(this.x !== other.x, this.x > other.x, this.vx < 0)
    console.log(this.y !== other.y, this.y > other.y, this.vy < 0)
    return false
  }

  public collide(other: Checker) {
    // Переходим в систему координат относительно центра other
    let curvx = this.vx - other.vx,
      curvy = this.vy - other.vy

    if ((!curvx && !curvy) || !this.isCollision(other)) return // соударение, только если this движется

    const ex = other.x - this.x,
      ey = other.y - this.y,
      elen = vlength(ex, ey),
      elen2 = elen * elen
    const scalar = curvx * ex + curvy * ey
    if (scalar < 0) return

    const other_vx = (ex * scalar) / elen2
    const other_vy = (ey * scalar) / elen2
    curvx = curvx - other_vx
    curvy = curvy - other_vy

    this.vx = other.vx + curvx
    this.vy = other.vy + curvy
    other.vx += other_vx
    other.vy += other_vy
  }
}
