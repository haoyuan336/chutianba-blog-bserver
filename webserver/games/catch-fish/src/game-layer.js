import Layer from './../../render/layer'
import Sprite from './../../render/sprite'
import resources from './../resources'
import global from './../../global'
import texturePackerResMap from './../texturepacker-source-map'
import director from './../../render/director'
import TextureInfo from './../../common/texture-info'
class GameLayer extends Layer {
    constructor() {
        super();
        console.log('贴一个背景');
        //第一步先放一个背景
        let bg = new Sprite(global.resource[resources.game_bg].texture);
        this.addChild(bg);
        bg.anchor.set(0);
        //放一个鱼元素
        let textInfo = new TextureInfo(resources.json_texturepacker, texturePackerResMap.bottomBar);
        // let sp = new Sprite(global.resource[resources.texturespack].texture, new TextureInfo(resources.json_texturepacker, texturePackerResMap.bottomBar));
        // sp.position = {
        //     x: director.width * 0.5,
        //     y: director.height * 0.5
        // }
        // this.addChild(sp);


        let sp1 = new Sprite(global.resource[resources.texturespack].texture, new TextureInfo(resources.json_texturepacker, texturePackerResMap['fish_jinshayu_run_' + 7]));
        sp1.position = {
            x: director.width * 0.5,
            y: 200
        }
        this.addChild(sp1);
    }
}
export default GameLayer;