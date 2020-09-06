export class Pencil {
  constructor(canvasObject) {
    this.canvasObject = canvasObject;
    this.ctx = canvasObject.ctx;
  }

  startDraw(e) {
    this.painting = true;
    this.draw(e);
  }

  finishDraw() {
    this.painting = false;
    // Reset pencil position
    this.ctx.beginPath();
  }

  draw(e) {
    if (this.painting) {
      // Line Configs
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.canvasObject.color;
      // Draw
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      // Make less pixelated lines
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY);
    }
  }
}
