import { Feature } from "./features/Feature.js";
import { Pencil } from "./features/Pencil.js";
import { Line } from "./features/Line.js";
import { Eraser } from "./features/Eraser.js";

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
      line: new Feature(this, Line),
      eraser: new Feature(this, Eraser),
    };
  }

  run() {
    this.changeSelectedFeature("pencil");
    this.resizeCanvas();
    this.addInfo();
    this.runListeners();
  }

  // Features
  changeSelectedFeature(feature) {
    this.unselectedFeature();
    this.selectedFeature = feature;
    this.features[this.selectedFeature].start();
  }

  unselectedFeature() {
    if (this.selectedFeature) this.features[this.selectedFeature].stop();
  }

  //Info
  addInfo() {
    this.writeDelMessage();
  }

  deleteInfo() {
    this.deleteDelMessage();
  }

  reloadInfo() {
    this.deleteInfo();
    this.addInfo();
  }

  deleteDelMessage() {
    this.ctx.clearRect(
      this.canvas.width - 300,
      this.canvas.height - 40,
      400,
      40
    );
  }

  writeDelMessage() {
    this.write(
      `Press DEL to erase - ${this.selectedFeature}`,
      this.canvas.width - 250,
      this.canvas.height - 20,
      20,
      "Georgia"
    );
  }

  // Events
  runListeners() {
    window.addEventListener("resize", () => {
      this.deleteInfo();
      this.resizeCanvas();
      this.addInfo();
    });
    document.addEventListener("keydown", this.handleKeyStroke.bind(this));
  }

  handleKeyStroke(e) {
    const commands = {
      Delete: () => {
        this.clear();
        this.addInfo();
      },
      0: () => {
        this.unselectedFeature();
      },
      1: () => {
        this.changeSelectedFeature("pencil");
        this.reloadInfo();
      },
      2: () => {
        this.changeSelectedFeature("line");
        this.reloadInfo();
      },
      3: () => {
        this.changeSelectedFeature("eraser");
        this.reloadInfo();
      },
    };
    if (e.key in commands) commands[e.key]();
  }

  // Canvas draw actions
  write(text, positionX, positionY, fontSize, font) {
    this.ctx.font = `${fontSize}px ${font}`;
    this.ctx.fillText(text, positionX, positionY);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Canvas Utils
  createCanvasCopy() {
    const inMemoryCanvas = document.createElement("canvas");
    const inMomeryCtx = inMemoryCanvas.getContext("2d");
    inMemoryCanvas.width = this.canvas.width;
    inMemoryCanvas.height = this.canvas.height;
    inMomeryCtx.drawImage(this.canvas, 0, 0);
    return inMemoryCanvas;
  }

  resizeCanvas() {
    const canvasCopy = this.createCanvasCopy();

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.ctx.drawImage(canvasCopy, 0, 0);
  }
}
