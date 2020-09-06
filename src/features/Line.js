export class Line {
  constructor(canvasObject) {
    this.canvasObject = canvasObject;
    this.ctx = canvasObject.ctx;
  }

  startDraw(e) {
    this.canvasBeforeDraw = this.canvasObject.createCanvasCopy();
    this.painting = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.draw(e);
  }

  finishDraw() {
    this.painting = false;
    this.canvasBeforeDraw = this.canvasObject.createCanvasCopy();
    this.ctx.beginPath();
  }

  draw(e) {
    if (this.painting) {
      this.canvasObject.clear();
      this.ctx.drawImage(this.canvasBeforeDraw, 0, 0);
      // Line Configs
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.canvasObject.color;
      // Draw
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
    }
  }
}
