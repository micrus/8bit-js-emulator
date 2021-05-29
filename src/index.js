import {Chip8} from "./Chip8"

const chip8 = new Chip8();
runChip8();

async function runChip8(){
    chip8.display.drawSprite(1,1,0,5); 
}
