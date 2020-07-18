import { Engine } from 'babylonjs';
import { CanvasAdapter } from './canvas.adapter';

export class EngineAdapter {
  private engine: Engine;
  constructor(private canvasAdapter: CanvasAdapter) {
    this.engine = new Engine(canvasAdapter.getCanvas());
  }

  public getEngine(): Engine {
    return this.engine;
  }

  public runRenderLoop(rendererLoopCallback: () => void) {
    this.engine.runRenderLoop(rendererLoopCallback);
  }

  public resize() {
    this.engine.resize();
  }
}
