import * as PIXI from 'pixi.js'
class Sprite extends PIXI.Sprite{
    constructor(texture, textureInfo){
        // console.log('texture info =' , textureInfo);
        let frame = {
            x: 0,
            y: 0,
            width: texture.width,
            height: texture.height
        }
        if (textureInfo){
            frame = textureInfo? textureInfo.frame: frame;
        }
        super(new PIXI.Texture(texture, frame));
        this.anchor.set(0.5);
    }
}
export default Sprite;