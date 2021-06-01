import { CHAR_SET } from "./constants/charSetConstants";
import { CHAR_SET_ADDRESS, LOAD_PROGRAM_ADDRESS, MEMORY_SIZE } from "./constants/memoryConstants";
import { TIMER_60_HZ } from "./constants/registersConstants";
import { Disassembler } from "./Disassembler";
import {Display} from "./Display";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";
import { Registers } from "./Registers";
import { SoundCard } from "./SoundCard";

export class Chip8{
    constructor(romBuffer){
        console.log("Create a new Chip8");
        this.registers = new Registers();
        this.memory = new Memory();
        this.loadCharSet();
        this.loadRom(romBuffer);
        this.keyboard = new Keyboard();
        this.display = new Display(this.memory);
        this.soundCard = new SoundCard();
        this.disassembler = new Disassembler();

    }

    loadCharSet(){
        this.memory.memory.set(CHAR_SET,CHAR_SET_ADDRESS);
    }

    loadRom(romBuffer){
        console.assert(romBuffer.length + LOAD_PROGRAM_ADDRESS<=MEMORY_SIZE, "This rom is too large")
        this.memory.memory.set(romBuffer, LOAD_PROGRAM_ADDRESS);
        this.registers.PC = LOAD_PROGRAM_ADDRESS;
    }

    execute(opcode){
        const {instruction, args} = this.disassembler.disassemble(opcode);
        const {id} = instruction;
        console.log('i', instruction,'a',args,'id',id);

        switch (id) {
            case 'CLS':
                this.display.reset();
                break;
            case 'RET':
                this.registers.PC = this.registers.stackPop();
                break;
            case 'JP_ADDR':
                this.registers.PC = args[0];
                break;
            case 'CALL_ADDR':
                this.registers.stackPush(this.registers.PC);
                this.registers.PC = args[0];
                break;
    
            default:
                console.error(`Instuction with ${id} not found.`,instruction,args);
        }
    }


    async sleep(ms = TIMER_60_HZ){
        return new Promise((resolve)=> setTimeout(resolve,ms));
    }
}