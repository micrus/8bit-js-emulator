import {
  BG_COLOR,
  COLOR,
  DISPLAY_HEIGHT,
  DISPLAY_MULTIPLY,
  DISPLAY_WIDTH,
} from "./constants/displayConstants";

import {CHAR_SET_WIDTH} from "./constants/charSetConstants"

export class Display {
  constructor(memory) {
    console.log("Create new Display");
    this.memory = memory;
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
    console.log('resetting!');
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

  drawSprite(x, y, spriteLocation, spriteLen){
    let pixelCollision = 0;
    for(let h = 0; h<spriteLen; h++){
      const line = this.memory.memory[spriteLocation+h];
      for(let w=0; w<CHAR_SET_WIDTH; w++){
        const bitToCheck = (0b10000000 >> w);
        const value = line & bitToCheck;
        const ph = (h+y) % DISPLAY_HEIGHT;
        const pw = (x+w) % DISPLAY_WIDTH;
        if (value === 0){
          continue;
        }
        if (this.frameBuffer[ph][pw]===1){
          pixelCollision =1;
        }
        this.frameBuffer[ph][pw]^=1;
        //this.drawPixel(ph, pw, value);
      }
    }
    this.drawBuffer();
    return pixelCollision;
  }

}
