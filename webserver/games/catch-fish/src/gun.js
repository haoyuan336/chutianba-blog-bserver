import { Layer, Animate, Button, SpriteFrame, Sprite } from './../../../util/import'
import resources from './../resources'
import global from './../../global'
import texturePackerSourceMap from './../texturepacker-source-map'
import PackageTexture from './common/package-texture'
class Gun extends Layer {
    constructor(texture) {
        super(texture);

        let nT = new PackageTexture(texturePackerSourceMap.goldnum_0);
        let sp = new Sprite(nT);
        this.addChild(sp);
        sp.position = {
            x: 100,
            y: 100
        }
        // let addButton = new Button({
        //     normalTexture: PackageTexture(texturePackerSourceMap.cannonMinus)
        // });
        // this.addChild(addButton);
    }
}
export default Gun;