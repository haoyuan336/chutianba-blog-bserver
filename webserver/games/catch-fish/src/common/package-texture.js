import {SpriteFrame} from './../../../../util/import'
import global from './../../../global'
import resources from './../../resources'
import TextureInfo from './../../../common/texture-info'
class PackageTexture extends SpriteFrame{
    constructor(textureName){
        let textureInfo = new TextureInfo(resources.json_texturepacker, textureName);
        console.log('texture info ', textureInfo);
        super(global.resource[resources.texturespack].texture, textureInfo);
    }
}
export default PackageTexture;