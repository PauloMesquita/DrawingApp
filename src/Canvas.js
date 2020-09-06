import { Feature } from "./features/Feature.js";
import { Pencil } from "./features/Pencil.js";

window.addEventListener("load", () => {
  const canvas = new Canvas(document.querySelector("#canvas"));
  canvas.run();
});

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.color = "black";
    this.features = {
      pencil: new Feature(this, Pencil),
    };
  }

  run() {
    this.resizeCanvas();
    this.addInfo();
    this.runListeners();
    this.changeSelectedFeature("pencil");
  }

  changeSelectedFeature(feature) {
    this.stopAllFeatures();
    this.features[feature].start();
  }

  stopAllFeatures() {
    Object.keys(this.features).forEach((key) => {
      this.features[key].stop();
    });
  }

  addInfo() {
    this.writeDelMessage();
  }

  runListeners() {
    window.addEventListener("resize", () => this.resizeCanvas());
    document.addEventListener("keydown", this.handleKeyStroke.bind(this));
  }

  deleteDelMessage() {
    this.ctx.clearRect(
      this.canvas.width - 250,
      this.canvas.height - 40,
      250,
      40
    );
  }

  writeDelMessage() {
    this.write(
      "Press DEL to erase",
      this.canvas.width - 180,
      this.canvas.height - 20,
      20,
      "Georgia"
    );
  }

  handleKeyStroke(e) {
    const commands = {
      Delete: () => {
        this.clear();
      },
    };
    console.log(e.key);
    if (e.key in commands) commands[e.key]();
  }

  write(text, positionX, positionY, fontSize, font) {
    this.ctx.font = `${fontSize}px ${font}`;
    this.ctx.fillText(text, positionX, positionY);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addInfo();
  }

  createCanvasCopy() {
    const inMemoryCanvas = document.createElement("canvas");
    const inMomeryCtx = inMemoryCanvas.getContext("2d");
    inMemoryCanvas.width = this.canvas.width;
    inMemoryCanvas.height = this.canvas.height;
    inMomeryCtx.drawImage(this.canvas, 0, 0);
    return inMemoryCanvas;
  }

  resizeCanvas() {
    // Prevent erase when resizing
    this.deleteDelMessage();
    const canvasCopy = this.createCanvasCopy();

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.ctx.drawImage(canvasCopy, 0, 0);
    this.writeDelMessage();
  }
}
