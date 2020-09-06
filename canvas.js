window.addEventListener("load", () => {
  const canvas = new Canvas();
  canvas.run();
});

class Canvas {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.painting = false;
    this.color = "black";
  }

  run() {
    this.resizeCanvas();
    this.addInfo();
    this.runListeners();
  }

  addInfo() {
    this.writeDelMessage();
  }

  runListeners() {
    window.addEventListener("resize", () => this.resizeCanvas());
    document.addEventListener("keydown", this.handleKeyStroke.bind(this));
    this.canvas.addEventListener("mousedown", this.startDraw.bind(this));
    this.canvas.addEventListener("mouseup", this.finishDraw.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));
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
    if (e.key in commands) commands[e.key]();
  }

  startDraw(e) {
    this.painting = true;
    this.draw(e);
  }

  finishDraw(e) {
    this.painting = false;
    // Reset pencil position
    this.ctx.beginPath();
  }

  draw(e) {
    if (this.painting) {
      // Line Configs
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.color;
      // Draw
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      // Make less pixelated lines
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY);
    }
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
