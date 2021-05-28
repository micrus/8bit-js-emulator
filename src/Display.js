import {
  BG_COLOR,
  COLOR,
  DISPLAY_HEIGHT,
  DISPLAY_MULTIPLY,
  DISPLAY_WIDTH,
} from "./constants/displayContants";

export class Display {
  constructor() {
    console.log("Create a new Display");
    this.screen = document.querySelector("canvas");
    this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLY;
    this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLY;
    this.context = this.screen.getContext("2d");
    this.context.fillStyle = BG_COLOR;
    this.frameBuffer = [];
    this.reset();
    this.drawBuffer();
  }

  reset() {
    for (let i = 0; i < DISPLAY_HEIGHT; i++) {
      this.frameBuffer.push([]);
      for (let j = 0; j < DISPLAY_WIDTH; j++) {
        this.frameBuffer[i].push(0);
      }
    }
    this.context.fillRect(0, 0, this.screen.width, this.screen.height);
  }

  drawBuffer() {
    for (let h = 0; h < DISPLAY_HEIGHT; h++) {
      for (let w = 0; w < DISPLAY_WIDTH; w++) {
        this.drawPixel(h, w, this.frameBuffer[h][w]);
      }
    }
  }

  drawPixel(h, w, value) {
    if (value) {
      this.context.fillStyle = COLOR;
    } else {
      this.context.fillStyle = BG_COLOR;
    }
    this.context.fillRect(
      w * DISPLAY_MULTIPLY,
      h * DISPLAY_MULTIPLY,
      DISPLAY_MULTIPLY,
      DISPLAY_MULTIPLY
    );
  }
}
