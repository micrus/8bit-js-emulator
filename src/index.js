import { Chip8 } from "./Chip8";


runChip8();




async function runChip8() {

const rom = await fetch('./roms/test_opcode.ch8');
const arrayBuffer = await rom.arrayBuffer();
const romBuffer = new Uint8Array(arrayBuffer);
const chip8 = new Chip8(romBuffer);


chip8.execute(0x21aa);
console.log('pc', chip8.registers.PC, 'sp', chip8.registers.SP);









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
