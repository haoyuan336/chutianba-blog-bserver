import * as PIXI from 'pixi.js'
class Sprite extends PIXI.Sprite{
    constructor(texture, textureInfo){
        let frame = {
            x: 0,
            y: 0,
            width: texture.width,
            height: texture.height
        }
        let rotate = 0;
        if (textureInfo){
            frame = textureInfo.frame ? textureInfo.frame: frame;
            rotate = textureInfo.rotate ? textureInfo.rotate: rotate;
        }
        let spriteFrame = new PIXI.Texture(texture, frame, undefined, undefined, rotate);
        texture.rotation = Math.PI;
        super(spriteFrame);
        this.width = rotate?frame.height: frame.width;
        this.height = rotate?frame.width: frame.height;
        this.anchor.set(0.5);

        this.on('pointerdown', this.onTouchStart.bind(this))
            .on('pointerup', this.onTouchEnd.bind(this))
            .on('pointerupoutside', this.onTouchEnd.bind(this))
            .on('pointermove', this.onTouchMove.bind(this));
    }
    update(dt){

    }
    onTouchStart(){

    }
    onTouchMove(){

    }
    onTouchEnd(){
        
    }
}
export default Sprite;