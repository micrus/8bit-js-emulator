import { Chip8 } from "./Chip8";


runChip8();




async function runChip8() {

const rom = await fetch('./roms/test_opcode.ch8');
const arrayBuffer = await rom.arrayBuffer();
const romBuffer = new Uint8Array(arrayBuffer);
const chip8 = new Chip8(romBuffer);
console.log(romBuffer);
console.log(chip8.memory.getOpcode(0x200).toString(16));
console.log(chip8.memory.getOpcode(0x202).toString(16));









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
