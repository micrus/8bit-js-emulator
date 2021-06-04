import { Chip8 } from "./Chip8";


runChip8();




async function runChip8() {

const rom = await fetch('./roms/test_opcode.ch8');
//const rom = await fetch('./roms/SCTEST.ch8');
//const rom = await fetch('./roms/1dcell.ch8');

const arrayBuffer = await rom.arrayBuffer();
const romBuffer = new Uint8Array(arrayBuffer);
const chip8 = new Chip8(romBuffer);

while (1) {
await chip8.sleep();
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
let opcode = chip8.memory.getOpcode(chip8.registers.PC);
await chip8.execute(opcode);
chip8.registers.PC +=2;
}


}
