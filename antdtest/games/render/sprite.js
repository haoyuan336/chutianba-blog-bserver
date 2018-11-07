import * as PIXI from 'pixi.js'
class Sprite extends PIXI.Sprite{
    constructor(texture){
        super(texture);
        this.anchor.set(0.5);
    }
}
export default Sprite;