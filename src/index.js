import { Chip8 } from "./Chip8";


runChip8();




async function runChip8() {

const rom = await fetch('./roms/test_opcode.ch8');
const arrayBuffer = await rom.arrayBuffer();
const romBuffer = new Uint8Array(arrayBuffer);
const chip8 = new Chip8(romBuffer);
chip8.registers.PC = 0x010;
chip8.registers.DT = 0x0;
chip8.registers.I= 0x02;
chip8.registers.V[0] = 0xff; // Asse delle X


chip8.registers.V[5] = 0x10; // Y
chip8.registers.V[8] = 0x10; // Y

chip8.execute(0xf029);
chip8.execute(0xd585);

console.log('I', chip8.registers.I.toString(16), 'V0', chip8.registers.V[0]);











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
