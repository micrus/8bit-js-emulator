import {Chip8} from "./Chip8"

const chip8 = new Chip8();
runChip8();
async function runChip8(){
    while(1){
        let hkd = chip8.keyboard.hasKeyDown();
        let ikd =chip8.keyboard.isKeyDown(0);
        console.log('haskeydown',hkd,'iskeydown',ikd);
        await chip8.sleep();
    }
}
