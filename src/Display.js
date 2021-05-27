import {BG_COLOR, DISPLAY_HEIGHT, DISPLAY_MULTIPLY, DISPLAY_WIDTH} from './constants/displayContants'

export class Display{
    constructor(){
        console.log("Create a new Display");
        this.screen = document.querySelector('canvas');
        this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLY;
        this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLY;
        this.context = this.screen.getContext('2d');
        this.context.fillStyle = BG_COLOR;
        this.context.fillRect(0,0, this.screen.width, this.screen.height);
    }
}