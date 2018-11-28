import { Layer, Animate, Button, SpriteFrame } from './../../../util/import'
import resources from './../resources'
import global from './../../global'
import texturePackerSourceMap from './../texturepacker-source-map'
import PackageTexture from './common/package-texture'
class Gun extends Layer {
    constructor(texture) {
        super(texture);
        // let addButton = new Button({
        //     normalTexture: PackageTexture(texturePackerSourceMap.cannonMinus)
        // });
        // this.addChild(addButton);
    }



}
export default Gun;