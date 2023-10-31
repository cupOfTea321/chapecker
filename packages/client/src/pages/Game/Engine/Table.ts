import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject'

type TPlayerOptions = TGameObjectOptions & {
  onFire: (p: AbstractGameObject) => void
}

export class Table extends AbstractGameObject {
  static type = GameObjectType.Table

  constructor(options: TPlayerOptions) {
    super(options)
  }

  public async init(): Promise<boolean> {
    return true
  }

  public update(dt: number): void {
    this.draw()
  }

  protected draw(): void {
    super.debugDraw('green')
  }
}
