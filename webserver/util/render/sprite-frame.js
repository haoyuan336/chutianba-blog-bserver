import * as PIXI from 'pixi.js'
class SpriteFrame extends PIXI.Texture {
    constructor(packageTexture, textureInfo) {
        // let textureInfo = new TextureInfo(resources.json_texturepacker, textureNameList[i]);
        super(packageTexture, textureInfo.frame, undefined, undefined, textureInfo.rotate);
        this.textureInfo = textureInfo;
    }
}
export default SpriteFrame;