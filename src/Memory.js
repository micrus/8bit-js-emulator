import { MEMORY_SIZE } from "./constants/memoryConstants";

export class Memory{
    constructor(){
        console.log("Create new Memory");
        this.memory = new Uint8Array(MEMORY_SIZE);
        this.reset();
    }

    reset(){
        this.memory.fill(0);
    }

    getMemory(index){
        this.assertMemory(index);
        return this.memory[index];
    }

    setMemory(index, value){
        this.assertMemory(index);
        this.memory[index]= value;
    }

    assertMemory(index){
        console.assert(index >= 0 && index < MEMORY_SIZE, `Error trying to access memory out of bounds at index ${index}`);
    }

    getOpcode(index){
        const highByte = this.getMemory(index);
        const lowByte = this.getMemory(index + 1);
        return (highByte << 8) | lowByte;
    }
}