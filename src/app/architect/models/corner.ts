import { Vector3 } from 'babylonjs';

export class Corner {
  public data: Vector3;

  constructor(x: number, y: number) {
    this.data = new Vector3(x, 0, y);
  }
}
