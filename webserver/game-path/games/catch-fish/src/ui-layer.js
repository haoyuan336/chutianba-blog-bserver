import { Layer, Sprite, director } from './../../../util/import'
import global from './../../global'
import resource from './../resources'
import texturespackInfo from './../texturepacker-source-map'
import TextureInfo from './../../common/texture-info'
class UILayer extends Layer {
    constructor(controller) {
        super();
        this._controller = controller;

        //首先放一个炮台的背景
        let bg = new Sprite(
            global.resource[resource.texturespack].texture,
            new TextureInfo(resource.json_texturepacker, texturespackInfo.bottomBar)
        );
        this.addChild(bg);
        bg.position.x = director.designSize.width * 0.5;
        bg.position.y = director.designSize.height - 65;
    }
}
export default UILayer;