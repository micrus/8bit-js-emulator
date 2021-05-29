import {Chip8} from "./Chip8"

const chip8 = new Chip8();
runChip8();

async function runChip8(){
   console.log(chip8.memory.getMemory(0).toString(16));
   console.log(chip8.memory.getMemory(1).toString(16));
   console.log(chip8.memory.getMemory(2).toString(16));
   console.log(chip8.memory.getMemory(3).toString(16));
   console.log(chip8.memory.getMemory(4).toString(16));
}
