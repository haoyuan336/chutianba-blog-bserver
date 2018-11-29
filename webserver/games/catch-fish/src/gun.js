import { Layer, Animate, Button, SpriteFrame, Sprite } from './../../../util/import'
import texturePackerSourceMap from './../texturepacker-source-map'
import PackageTexture from './common/package-texture'
class Gun extends Layer {
    constructor(texture) {
        super(texture);


        //取出大炮的纹理

        this._level = 1;

        let textureList = this._getTextureList(this._level);

        this._animate = new Animate(textureList);
        this._animate.anchor = {
            x: 0.5,
            y: 1
        }
        this._animate.animationSpeed = 0.1;
        // this._animate.loop = false;
        this._animate.play();
        this.addChild(this._animate);

    }
    _getTexture(str) {
        console.log('str ', str);
        let texture = new PackageTexture(texturePackerSourceMap[str]);
        return texture;
    }
    _getTextureList(level) {
        let list = [];
        for (let i = 0; i < 5; i++) {
            let str = 'weapon_level_' + level + '_' + i;
            list.push(this._getTexture(str));
        }
        return list;
    }
    addLevel() {

    }
    subLevel() {

    }
}
export default Gun;