import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { EngineService } from '../engine/engine.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {

  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) {}

  public ngOnInit(): void {
    this.engServ.init(this.rendererCanvas);
    this.engServ.animate();
  }
}
