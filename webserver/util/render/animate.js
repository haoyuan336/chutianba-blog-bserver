import * as PIXI from 'pixi.js'
class Animate extends PIXI.extras.AnimatedSprite{
    constructor(textureList){
        super(textureList);
        this.ClassType = 'animate';
    }
   
}
export default Animate;