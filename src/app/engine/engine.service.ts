import { ElementRef, Injectable, NgZone } from '@angular/core';
import { WindowRefService } from './../services/window-ref.service';
import { CanvasAdapter } from './canvas.adapter';
import { EngineAdapter } from './engine.adapter';
import { SceneAdapter } from './scene.adapter';

@Injectable({ providedIn: 'root' })
export class EngineService {
  private engineAdapter: EngineAdapter;
  private canvasAdapter: CanvasAdapter;
  private sceneAdapter: SceneAdapter;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) {}

  public init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvasAdapter = new CanvasAdapter(canvas.nativeElement);
    this.engineAdapter = new EngineAdapter(this.canvasAdapter);
    this.sceneAdapter = new SceneAdapter(this.engineAdapter)
      .setCamera()
      .addLight()
      .addGround()
      .addTestStuff();
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.sceneAdapter.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engineAdapter.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engineAdapter.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engineAdapter.resize();
      });
    });
  }
}
