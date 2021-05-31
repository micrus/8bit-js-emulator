import { Chip8 } from "./Chip8";

const chip8 = new Chip8();

runChip8();




async function runChip8() {
chip8.disassembler.disassemble(0x2f00);





  /* 
    chip8.registers.ST = 10;
    while (1) {
    await chip8.sleep(200);
    if (chip8.registers.DT > 0) {
      await chip8.sleep();
      chip8.registers.DT--;
    }
    if (chip8.registers.ST > 0) {
      chip8.soundCard.enableSound();
      await chip8.sleep();
      chip8.registers.ST--;
    }
    if (chip8.registers.ST === 0) {
      chip8.soundCard.disableSound();
    }
  } */
}
