/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chip8": () => (/* binding */ Chip8)
/* harmony export */ });
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _Disassembler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
/* harmony import */ var _SoundCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);











class Chip8{
    constructor(romBuffer){
        console.log("Create a new Chip8");
        this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_8__.Registers();
        this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_7__.Memory();
        this.loadCharSet();
        this.loadRom(romBuffer);
        this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_6__.Keyboard();
        this.display = new _Display__WEBPACK_IMPORTED_MODULE_5__.Display(this.memory);
        this.soundCard = new _SoundCard__WEBPACK_IMPORTED_MODULE_9__.SoundCard();
        this.disassembler = new _Disassembler__WEBPACK_IMPORTED_MODULE_4__.Disassembler();

    }

    loadCharSet(){
        this.memory.memory.set(_constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET,_constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.CHAR_SET_ADDRESS);
    }

    loadRom(romBuffer){
        console.assert(romBuffer.length + _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.LOAD_PROGRAM_ADDRESS<=_constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.MEMORY_SIZE, "This rom is too large")
        this.memory.memory.set(romBuffer, _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.LOAD_PROGRAM_ADDRESS);
        this.registers.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.LOAD_PROGRAM_ADDRESS;
    }

    async execute(opcode){
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
            case 'SE_VX_KK':
                if(this.registers.V[args[0]] === args[1]){
                    this.registers.PC += 2;
                }
                break;
            case 'SNE_VX_KK':
                if(this.registers.V[args[0]] !== args[1]){
                    this.registers.PC += 2;
                }
                break;
            case 'SE_VX_VY':
                if(this.registers.V[args[0]] === this.registers.V[args[1]]){
                    this.registers.PC += 2;
                }
                break;
            case 'LD_VX_KK':
                this.registers.V[args[0]]=args[1];
                break;
            case 'ADD_VX_KK':
                this.registers.V[args[0]] += args[1];
                break;
            case 'LD_VX_VY':
                this.registers.V[args[0]] = this.registers.V[args[1]];
                break;
            case 'OR_VX_VY':
                this.registers.V[args[0]] |= this.registers.V[args[1]]; 
                break;
            case 'AND_VX_VY':
                this.registers.V[args[0]] &= this.registers.V[args[1]]; 
                break;            
            case 'XOR_VX_VY':
                this.registers.V[args[0]] ^= this.registers.V[args[1]]; 
                break;              
            case 'ADD_VX_VY':
                this.registers.V[0x0f] = (this.registers.V[args[0]]+this.registers.V[args[1]]>0xff)?1:0;
                this.registers.V[args[0]]+=this.registers.V[args[1]];
                break;              
            case 'SUB_VX_VY':
                this.registers.V[0x0f] = (this.registers.V[args[0]]>this.registers.V[args[1]])?1:0;
                this.registers.V[args[0]]-=this.registers.V[args[1]];
                break; 
            case 'SHR_VX_VY':
                this.registers.V[0x0f] = (this.registers.V[args[0]] & 0x01);
                this.registers.V[args[0]] >>= 1;
                break;
            case 'SUBN_VX_VY':
                this.registers.V[0x0f] = (this.registers.V[args[1]]+this.registers.V[args[0]]>0xff)?1:0;
                this.registers.V[args[0]] = this.registers.V[args[1]]-this.registers.V[args[0]];
                break;
            case 'SHL_VX_VY':
                this.registers.V[0x0f] = Boolean(this.registers.V[args[0]] & 0x80);
                this.registers.V[args[0]] <<= 1;
                break;   
            case 'SNE_VX_VY':
                if(this.registers.V[args[0]] !== this.registers.V[args[1]]){this.registers.PC += 2;}
                break;               
            case 'LD_I_ADDR':
                this.registers.I = args[0];
                break;     
            case 'JP_V0_ADDR':
                this.registers.PC = this.registers.V[0]+args[0];
                break; 
            case 'RND_VX_KK':
                const random = Math.floor(Math.random() * 0xff);
                this.registers.V[args[0]] = args[1] & random;
                break;     
            case 'DRW_VX_VY_N':
                const collision = this.display.drawSprite(
                    this.registers.V[args[1]],
                    this.registers.V[args[0]],
                    this.registers.I,
                    args[2]
                );
                this.registers.V[0x0f] = collision;
                break;    
            case 'SKP_VX':
                if(this.keyboard.isKeyDown(this.registers.V[args[0]])){
                    this.registers.PC += 2;
                }
                break; 
            case 'SKNP_VX':
                if(!this.keyboard.isKeyDown(this.registers.V[args[0]])){
                    this.registers.PC += 2;
                }
                break; 
            case 'LD_VX_DT':
                this.registers.V[args[0]]=this.registers.DT;
                break;
            case 'LD_VX_K':
                let keyPressed = this.keyboard.hasKeyDown();
                while(keyPressed===-1){
                    keyPressed = this.keyboard.hasKeyDown();
                    await this.sleep();
                }
                this.registers.V[args[0]] = keyPressed;
                break;
            case 'LD_DT_VX':
                this.registers.DT = this.registers.V[args[0]];
                break;
            case 'LD_ST_VX':
                this.registers.ST = this.registers.V[args[0]];
                break;
            case 'ADD_I_VX':
                this.registers.I += this.registers.V[args[0]];
                break;
            case 'LD_F_VX':
                this.registers.I = this.registers.V[args[0]] * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.SPRITE_HEIGHT;
                break;
            case 'LD_B_VX':
                let x = this.registers.V[args[0]];
                const hundreds = Math.floor(x/100);
                x = x - hundreds * 100;
                const tens = Math.floor(x/10);
                const ones = x - tens * 10;
                this.memory.memory[this.registers.I] = hundreds;
                this.memory.memory[this.registers.I+1] = tens;
                this.memory.memory[this.registers.I+2] = ones;
                break;
            case 'LD_I_VX':
                for(let i = 0; i <= args[0]; i++){
                    this.memory.memory[this.registers.I + i] = this.registers.V[i];
                }
                break;
            case 'LD_VX_I':
                for(let i = 0; i<= args[0]; i++){
                    this.registers.V[i] = this.memory.memory[this.registers.I + i];
                }
                break;
            default:
                console.error(`Instuction with ${id} not found.`,instruction,args);
        }
    }


    async sleep(ms = _constants_registersConstants__WEBPACK_IMPORTED_MODULE_3__.TIMER_60_HZ){
        return new Promise((resolve)=> setTimeout(resolve,ms));
    }
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHAR_SET_WIDTH": () => (/* binding */ CHAR_SET_WIDTH),
/* harmony export */   "CHAR_SET": () => (/* binding */ CHAR_SET)
/* harmony export */ });
const CHAR_SET_WIDTH = 8;
const CHAR_SET = [
    0xF0, 0x90, 0x90, 0x90, 0xF0,		// 0
	0x20, 0x60, 0x20, 0x20, 0x70,		// 1
	0xF0, 0x10, 0xF0, 0x80, 0xF0,		// 2
	0xF0, 0x10, 0xF0, 0x10, 0xF0,		// 3
	0x90, 0x90, 0xF0, 0x10, 0x10,		// 4
	0xF0, 0x80, 0xF0, 0x10, 0xF0,		// 5
	0xF0, 0x80, 0xF0, 0x90, 0xF0,		// 6
	0xF0, 0x10, 0x20, 0x40, 0x40,		// 7
	0xF0, 0x90, 0xF0, 0x90, 0xF0,		// 8
	0xF0, 0x90, 0xF0, 0x10, 0xF0,		// 9
	0xF0, 0x90, 0xF0, 0x90, 0x90,		// A
	0xE0, 0x90, 0xE0, 0x90, 0xE0,		// B
	0xF0, 0x80, 0x80, 0x80, 0xF0,		// C
	0xE0, 0x90, 0x90, 0x90, 0xE0,		// D
	0xF0, 0x80, 0xF0, 0x80, 0xF0,		// E
	0xF0, 0x80, 0xF0, 0x80, 0x80        // F
];

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISPLAY_WIDTH": () => (/* binding */ DISPLAY_WIDTH),
/* harmony export */   "DISPLAY_HEIGHT": () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   "DISPLAY_MULTIPLY": () => (/* binding */ DISPLAY_MULTIPLY),
/* harmony export */   "BG_COLOR": () => (/* binding */ BG_COLOR),
/* harmony export */   "COLOR": () => (/* binding */ COLOR),
/* harmony export */   "SPRITE_HEIGHT": () => (/* binding */ SPRITE_HEIGHT)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const DISPLAY_MULTIPLY = 10;
const BG_COLOR = '#000';
const COLOR = '#3f6';
const SPRITE_HEIGHT = 5;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEMORY_SIZE": () => (/* binding */ MEMORY_SIZE),
/* harmony export */   "LOAD_PROGRAM_ADDRESS": () => (/* binding */ LOAD_PROGRAM_ADDRESS),
/* harmony export */   "CHAR_SET_ADDRESS": () => (/* binding */ CHAR_SET_ADDRESS)
/* harmony export */ });
const MEMORY_SIZE = 4095;
const LOAD_PROGRAM_ADDRESS = 0x200;
const CHAR_SET_ADDRESS = 0x000;

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUMBER_OF_REGISTERS": () => (/* binding */ NUMBER_OF_REGISTERS),
/* harmony export */   "STACK_SIZE": () => (/* binding */ STACK_SIZE),
/* harmony export */   "TIMER_60_HZ": () => (/* binding */ TIMER_60_HZ)
/* harmony export */ });
const NUMBER_OF_REGISTERS = 16;
const STACK_SIZE = 16;
const TIMER_60_HZ = 1000 / 16;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Disassembler": () => (/* binding */ Disassembler)
/* harmony export */ });
/* harmony import */ var _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


class Disassembler{
    constructor(){
        console.log('Create new Disassembler');
    }
    
    disassemble(opcode){
        const instruction = _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__.INSTRUCTION_SET.find(instruction => (opcode & instruction.mask) === instruction.pattern);
        const args = instruction.args.map(arg => (opcode & arg.mask)>>arg.shift);
        return {instruction, args};
    }
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MASK_NNN": () => (/* binding */ MASK_NNN),
/* harmony export */   "MASK_X": () => (/* binding */ MASK_X),
/* harmony export */   "MASK_KK": () => (/* binding */ MASK_KK),
/* harmony export */   "MASK_Y": () => (/* binding */ MASK_Y),
/* harmony export */   "MASK_N": () => (/* binding */ MASK_N),
/* harmony export */   "MASK_HIGHEST_BYTE": () => (/* binding */ MASK_HIGHEST_BYTE),
/* harmony export */   "MASK_HIGHEST_AND_LOWEST_BYTE": () => (/* binding */ MASK_HIGHEST_AND_LOWEST_BYTE),
/* harmony export */   "INSTRUCTION_SET": () => (/* binding */ INSTRUCTION_SET)
/* harmony export */ });
const MASK_NNN = {mask: 0x0fff};
const MASK_X = {mask: 0x0f00, shift:8};
const MASK_KK = {mask: 0x00ff};
const MASK_Y = {mask:0x00f0, shift:4};
const MASK_N = {mask:0x000f};


const MASK_HIGHEST_BYTE = 0xf000;
const MASK_HIGHEST_AND_LOWEST_BYTE = 0xf00f;


const INSTRUCTION_SET = [
    {
        key: 1,
        id: 'CLS',
        name: 'CLS',
        mask: 0xffff,
        pattern: 0x00e0,
        args : []
    },
    {
        key: 2,
        id: 'RET',
        name: 'RET',
        mask: 0xffff,
        pattern: 0x00ee,
        args : []
    },
    {
        key: 3,
        id: 'JP_ADDR',
        name: 'JP',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x1000,
        args : [MASK_NNN]
    },
    {
        key: 4,
        id: 'CALL_ADDR',
        name: 'CALL',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x2000,
        args : [MASK_NNN]
    },
    {
        key: 5,
        id: 'SE_VX_KK',
        name: 'SE',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x3000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 6,
        id: 'SNE_VX_KK',
        name: 'SNE',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x4000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 7,
        id: 'SE_VX_VY',
        name: 'SE',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x5000,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 8,
        id: 'LD_VX_KK',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x6000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 9,
        id: 'ADD_VX_KK',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x7000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 10,
        id: 'LD_VX_VY',
        name: 'LD',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8000,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 11,
        id: 'OR_VX_VY',
        name: 'OR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8001,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 12,
        id: 'AND_VX_VY',
        name: 'AND',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8002,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 13,
        id: 'XOR_VX_VY',
        name: 'XOR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8003,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 14,
        id: 'ADD_VX_VY',
        name: 'ADD',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8004,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 15,
        id: 'SUB_VX_VY',
        name: 'SUB',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8005,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 16,
        id: 'SHR_VX_VY',
        name: 'SHR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8006,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 17,
        id: 'SUBN_VX_VY',
        name: 'SUBN',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8007,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 18,
        id: 'SHL_VX_VY',
        name: 'SHL',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x800e,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 19,
        id: 'SNE_VX_VY',
        name: 'SNE',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x9000,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 20,
        id: 'LD_I_ADDR',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xa000,
        args : [MASK_NNN]
    },
    {
        key: 21,
        id: 'JP_V0_ADDR',
        name: 'JP',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xb000,
        args : [MASK_NNN]
    },
    {
        key: 22,
        id: 'RND_VX_KK',
        name: 'RND',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xc000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 23,
        id: 'DRW_VX_VY_N',
        name: 'DRW',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xd000,
        args : [MASK_X,MASK_Y,MASK_N]
    },
    {
        key: 24,
        id: 'SKP_VX',
        name: 'SKP',
        mask: 0xf0ff,
        pattern: 0xe09e,
        args : [MASK_X]
    },
    {
        key: 25,
        id: 'SKNP_VX',
        name: 'SKNP',
        mask: 0xf0ff,
        pattern: 0xe0a1,
        args : [MASK_X]
    },
    {
        key: 26,
        id: 'LD_VX_DT',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf007,
        args : [MASK_X]
    },
    {
        key: 27,
        id: 'LD_VX_K',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf00a,
        args : [MASK_X]
    },
    {
        key: 28,
        id: 'LD_DT_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf015,
        args : [MASK_X]
    }, 
    {
        key: 29,
        id: 'LD_ST_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf018,
        args : [MASK_X]
    }, 
    {
        key: 30,
        id: 'ADD_I_VX',
        name: 'ADD',
        mask: 0xf0ff,
        pattern: 0xf01e,
        args : [MASK_X]
    }, 
    {
        key: 31,
        id: 'LD_F_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf029,
        args : [MASK_X]
    }, 
    {
        key: 32,
        id: 'LD_B_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf033,
        args : [MASK_X]
    }, 
    {
        key: 33,
        id: 'LD_I_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf055,
        args : [MASK_X]
    }, 
    {
        key: 34,
        id: 'LD_VX_I',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf065,
        args : [MASK_X]
    }, 

];

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);




class Display {
  constructor(memory) {
    console.log("Create new Display");
    this.memory = memory;
    this.screen = document.querySelector("canvas");
    this.screen.width = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLY;
    this.screen.height = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLY;
    this.context = this.screen.getContext("2d");
    this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.BG_COLOR;
    this.frameBuffer = [];
    this.reset();
    this.drawBuffer();
  }

  reset() {
    console.log('resetting!');
    for (let i = 0; i < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT; i++) {
      this.frameBuffer.push([]);
      for (let j = 0; j < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH; j++) {
        this.frameBuffer[i].push(0);
      }
    }
    this.context.fillRect(0, 0, this.screen.width, this.screen.height);
  }

  drawBuffer() {
    for (let h = 0; h < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT; h++) {
      for (let w = 0; w < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH; w++) {
        this.drawPixel(h, w, this.frameBuffer[h][w]);
      }
    }
  }

  drawPixel(h, w, value) {
    if (value) {
      this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.COLOR;
    } else {
      this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.BG_COLOR;
    }
    this.context.fillRect(
      w * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLY,
      h * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLY,
      _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLY,
      _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLY
    );
  }

  drawSprite(x, y, spriteLocation, spriteLen){
    let pixelCollision = 0;
    for(let h = 0; h<spriteLen; h++){
      const line = this.memory.memory[spriteLocation+h];
      for(let w=0; w<_constants_charSetConstants__WEBPACK_IMPORTED_MODULE_1__.CHAR_SET_WIDTH; w++){
        const bitToCheck = (0b10000000 >> w);
        const value = line & bitToCheck;
        const ph = (h+y) % _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT;
        const pw = (x+w) % _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH;
        if (value === 0){
          continue;
        }
        if (this.frameBuffer[ph][pw]===1){
          pixelCollision =1;
        }
        this.frameBuffer[ph][pw]^=1;
        //this.drawPixel(ph, pw, value);
      }
    }
    this.drawBuffer();
    return pixelCollision;
  }

}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class Keyboard{
    constructor(){
        console.log("Create new Keyboard");
        this.keys = new Array(_constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_OF_KEYS).fill(false);
        document.addEventListener('keydown', (event)=>this.keydown(event.key));
        document.addEventListener('keyup', (event)=>this.keyup(event.key));

    }

    keydown(key){
        const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.KEYMAP.findIndex((mapKey)=> mapKey === key.toLowerCase());
        if (keyIndex>-1){
            this.keys[keyIndex] = true;
        }
    }

    keyup(key){
        const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.KEYMAP.findIndex((mapKey)=> mapKey === key.toLowerCase());
        if (keyIndex>-1){
            this.keys[keyIndex] = false;
        }
    }

    isKeyDown(index){
        return this.keys[index];
    }

    hasKeyDown(){
        return this.keys.findIndex((keyValue)=>keyValue);
    }
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUMBER_OF_KEYS": () => (/* binding */ NUMBER_OF_KEYS),
/* harmony export */   "KEYMAP": () => (/* binding */ KEYMAP)
/* harmony export */ });
const NUMBER_OF_KEYS = 16;
const KEYMAP = ['1','2','3','q','w','e','a','s','d','x','z','c','4','r','f','v'];

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


class Memory{
    constructor(){
        console.log("Create new Memory");
        this.memory = new Uint8Array(_constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE);
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
        console.assert(index >= 0 && index < _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE, `Error trying to access memory out of bounds at index ${index}`);
    }

    getOpcode(index){
        const highByte = this.getMemory(index);
        const lowByte = this.getMemory(index + 1);
        return (highByte << 8) | lowByte;
    }
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



class Registers{
    constructor(){
        console.log("Create new Registers");
        this.V = new Uint8Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_OF_REGISTERS);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS;
        this.stack = new Uint16Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_SIZE);
        this.SP = -1;
        this.reset();
    }

    reset(){
        this.V.fill(0);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS;
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
        console.assert(this.SP < _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_SIZE, `Error stack Overflow`);
    }
}

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SoundCard": () => (/* binding */ SoundCard)
/* harmony export */ });
/* harmony import */ var _constants_soudcardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


class SoundCard {
  constructor() {
    console.log("Crete new Soundcard")
    this.soundEnabled = false;
    if ("AudioContext" in window || "webkitAudioContext" in window) {
      const audioContext = new (AudioContext || webkitAudioContext)();
      const masterGain = new GainNode(audioContext);
      masterGain.gain.value = _constants_soudcardConstants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_VOLUME;
      masterGain.connect(audioContext.destination);
      let soundEnabled = false;
      let oscillator;

      Object.defineProperties(this, {
        soundEnabled: {
          get: function () {
            return soundEnabled;
          },
          set: function (value) {
            if (value === soundEnabled) {
              return;
            }
            soundEnabled = value;
            if (soundEnabled) {
              oscillator = new OscillatorNode(audioContext, { type: "square" });
              oscillator.connect(masterGain);
              oscillator.start();
            } else {
              oscillator.stop();
            }
          },
        },
      });
    }
  }

  enableSound() {
    this.soundEnabled = true;
  }

  disableSound() {
    this.soundEnabled = false;
  }
}


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INITIAL_VOLUME": () => (/* binding */ INITIAL_VOLUME)
/* harmony export */ });
const INITIAL_VOLUME = 0.3;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chip8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);



runChip8();




async function runChip8() {

const rom = await fetch('./roms/test_opcode.ch8');
const arrayBuffer = await rom.arrayBuffer();
const romBuffer = new Uint8Array(arrayBuffer);
const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8(romBuffer);
chip8.registers.PC = 0x010;
chip8.registers.DT = 0x0;
chip8.registers.I= 0x100;
chip8.registers.V[0] = 7; // Asse delle X
chip8.registers.V[1] = 2; // Asse delle X
chip8.registers.V[2] = 3; // Asse delle X
chip8.registers.V[3] = 0xf; // Asse delle X


chip8.registers.V[5] = 0x10; // Y
chip8.registers.V[8] = 0x10; // Y

chip8.execute(0xf455);
chip8.registers.V[0] = 0; // Asse delle X
chip8.registers.V[1] = 0; // Asse delle X
chip8.registers.V[2] = 0; // Asse delle X
chip8.registers.V[3] = 0; // Asse delle X
chip8.execute(0xf465);

console.log(chip8.registers.V[0]);
console.log(chip8.registers.V[1]);
console.log(chip8.registers.V[2]);
console.log(chip8.registers.V[3]);













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

})();

/******/ })()
;