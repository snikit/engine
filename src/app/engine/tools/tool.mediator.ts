import { Injectable } from '@angular/core';
import { Tool, ToolAbilities } from './tool';

@Injectable({ providedIn: 'root' })
export class ToolMediator implements ToolAbilities {
  private activeTool: Tool;

  constructor() {
    // this.activeTool(defaultTool);
  }
  onMouseMove(event: MouseEvent) {
    this.activeTool.onMouseMove(event);
  }
  onMouseDown(event: MouseEvent) {
    this.activeTool.onMouseDown(event);
  }

  onMouseUp(event: MouseEvent) {
    this.activeTool.onMouseUp(event);
    this.activeTool.reset();
  }

  activate(tool: Tool) {
    this.activeTool = tool;
  }

  deactivate() {
    this.activeTool = undefined;
  }
}
