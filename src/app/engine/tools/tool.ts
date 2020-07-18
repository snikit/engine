export interface ToolAbilities {
  onMouseMove(event: MouseEvent);
  onMouseDown(event: MouseEvent);
  onMouseUp(event: MouseEvent);
}

export interface Tool extends ToolAbilities {
  type: string;
  reset();
}
