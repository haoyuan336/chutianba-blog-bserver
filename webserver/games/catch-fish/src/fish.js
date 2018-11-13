import Animate from './../../../util/render/animate'
import global from './../../global'
import sourcesMap from './../texturepacker-source-map'
import TextureInfo from './../../common/texture-info'
import resources from './../resources'
import * as PIXI from 'pixi.js'
import State from './../../common/state'
class Fish extends Animate {
    constructor(fishName) {

        //首先取出来鱼跑的动画 跟鱼死的 动画
        let runTextureName = [];
        let deadTextureName = [];
        for (let i = 0; i < 10; i++) {
            let runName = 'fish_' + fishName + '_run' + '_' + i;
            let deadName = 'fish_' + fishName + '_dead' + '_' + i;
            if (sourcesMap[runName]) {
                runTextureName.push(sourcesMap[runName]);
            }
            if (sourcesMap[deadName]) {
                deadTextureName.push(sourcesMap[deadName]);
            }
        }


        //取出来所有的纹理
        let textureNameList = runTextureName.concat(deadTextureName);
        let textureList = [];
        for (let i = 0; i < textureNameList.length; i++) {
            // let texture = new text
            let textureInfo = new TextureInfo(resources.json_texturepacker, textureNameList[i]);
            let texture = new PIXI.Texture(global.resource[resources.texturespack].texture, textureInfo.frame, undefined, undefined, textureInfo.rotate);
            textureList.push(texture);
        }
        //收集到所有的纹理后来创建动画 
        super(textureList);
        this.loop = false;
        this.animationSpeed = 0.1;
        this.animateFrameNum = {
            run: {
                start: 0,
                length: runTextureName.length
            },
            dead: {
                start: runTextureName.length,
                length: deadTextureName.length
            }
        }

        this._state = new State();
        this._state.addState('run', () => {
            console.log('run');
            this.play();

        })
        this._state.addState('dead', ()=>{
            this.gotoAndPlay(this.animateFrameNum.dead.start);
        });

        this._state.setState('run');

    }

    fishUpdate(dt) {
        if (this._state.getState() === 'run') {
            if(this.currentFrame === this.animateFrameNum.run.length - 1){
                this.gotoAndPlay(0);
            }
        }

    }
}
export default Fish;