import * as PIXI from 'pixi.js'
class Graphics extends PIXI.Graphics{
    constructor(){
        super();
    
    }
    rectDraw(x, y, width, hieght, style){
        this.lineStyle(2, 0x0000FF, 1);
        this.beginFill(0xFF700B, 1);
        this.drawRect(x, y, width, hieght);
    }
}
export default Graphics;