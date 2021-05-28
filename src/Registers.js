import { LOAD_PROGRAM_ADDRESS } from "./constants/memoryConstants";
import { NUMBER_OF_REGISTERS, STACK_SIZE } from "./constants/registersConstants";

export class Registers{
    constructor(){
        this.V = new Int8Array(NUMBER_OF_REGISTERS);
        this.I = 0;
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.PC = LOAD_PROGRAM_ADDRESS;
        this.stack = new Int16Array(STACK_SIZE);
        this.SP = -1;
        this.reset();
    }

    reset(){
        this.V.fill(0);
        this.I = 0;
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.PC = LOAD_PROGRAM_ADDRESS;
        this.stack.fill(0);
        this.SP = -1;
    }
}