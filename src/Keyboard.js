import { KEYMAP, NUMBER_OF_KEYS } from "./constants/keyboardConstants";

export class Keyboard{
    constructor(){
        console.log("Create new Keyboard");
        this.keys = new Array(NUMBER_OF_KEYS).fill(false);
        document.addEventListener('keydown', (event)=>this.keydown(event.key));
        document.addEventListener('keyup', (event)=>this.keyup(event.key));

    }

    keydown(key){
        const keyIndex = KEYMAP.findIndex((mapKey)=> mapKey === key.toLowerCase());
        if (keyIndex>-1){
            this.keys[keyIndex] = true;
        }
    }

    keyup(key){
        const keyIndex = KEYMAP.findIndex((mapKey)=> mapKey === key.toLowerCase());
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