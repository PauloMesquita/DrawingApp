export class Feature {
  constructor(canvas, feature) {
    this.feature = new feature(canvas);
    this.canvasObject = canvas;
    this.canvas = this.canvasObject.canvas;
    this.startDrawFunction = this.feature.startDraw.bind(this.feature);
    this.drawFunction = this.feature.draw.bind(this.feature);
    this.finishDrawFunction = () => {
      this.feature.finishDraw();
      this.canvasObject.addChange();
    };
  }

  start() {
    this.canvas.addEventListener("mousedown", this.startDrawFunction);
    this.canvas.addEventListener("mouseup", this.finishDrawFunction);
    this.canvas.addEventListener("mousemove", this.drawFunction);
  }

  stop() {
    this.canvas.removeEventListener("mousedown", this.startDrawFunction);
    this.canvas.removeEventListener("mouseup", this.finishDrawFunction);
    this.canvas.removeEventListener("mousemove", this.drawFunction);
  }
}
