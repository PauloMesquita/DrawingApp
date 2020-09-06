export class Circle {
  constructor(canvasObject) {
    this.canvasObject = canvasObject;
    this.ctx = canvasObject.ctx;
  }

  restoreCanvasBeforeLine() {
    this.canvasObject.clear();
    this.ctx.drawImage(this.canvasBeforeDraw, 0, 0);
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
      this.restoreCanvasBeforeLine();
      // Line Configs
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.canvasObject.color;
      // Draw
      this.ctx.beginPath();
      const xDifference = Math.abs(e.clientX - this.startX);
      const yDifference = Math.abs(e.clientY - this.startY);
      const radius = xDifference > yDifference ? xDifference : yDifference;
      this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  }
}
