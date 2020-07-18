import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, observable, Subscription } from 'rxjs';
import { ToolMediator } from './tool.mediator';

@Injectable({ providedIn: 'root' })
export class ToolController implements OnDestroy {
  private actionListener: HTMLDivElement;
  private subscriptions: Subscription;

  constructor(private toolMediator: ToolMediator) {}

  registerActionListener(actionListenerDiv: HTMLDivElement) {
    this.actionListener = actionListenerDiv;
    this.setupActionListener();
  }

  private setupActionListener() {
    const mousedown$ = fromEvent(this.actionListener, 'mousedown');
    const mousemove$ = fromEvent(this.actionListener, 'mousemove');
    const mouseup$ = fromEvent(this.actionListener, 'mouseup');

    this.subscriptions.add(
      mousedown$.subscribe((event: MouseEvent) => {
        this.toolMediator.onMouseDown(event);
      })
    );

    this.subscriptions.add(
      mousemove$.subscribe((event: MouseEvent) => {
        this.toolMediator.onMouseMove(event);
      })
    );

    this.subscriptions.add(
      mouseup$.subscribe((event: MouseEvent) => {
        this.toolMediator.onMouseUp(event);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
