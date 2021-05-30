import { LOAD_PROGRAM_ADDRESS } from "./constants/memoryConstants";
import { NUMBER_OF_REGISTERS, STACK_SIZE } from "./constants/registersConstants";

export class Registers{
    constructor(){
        console.log("Create new Registers");
        this.V = new Int8Array(NUMBER_OF_REGISTERS);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = LOAD_PROGRAM_ADDRESS;
        this.stack = new Int16Array(STACK_SIZE);
        this.SP = -1;
        this.reset();
    }

    reset(){
        this.V.fill(0);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = LOAD_PROGRAM_ADDRESS;
        this.stack.fill(0);
        this.SP = -1;
    }

    stackPush(value){
        this.SP++;
        this.assertStackOverflow();
        this.stack[this.SP] = value;
    }

    stackPop(){
        const value = this.stack[this.SP];
        this.SP--;
        this.assertStackUnderflow();
        return value;
    }

    assertStackUnderflow(){
        console.assert(this.SP>= -1, `Error stack Underflow`);
    }

    assertStackOverflow(){
        console.assert(this.SP < STACK_SIZE, `Error stack Overflow`);
    }
}