import { Animate, Bezier, Vec2 } from './../../../util/import'
import global from './../../global'
import sourcesMap from './../texturepacker-source-map'
import TextureInfo from './../../common/texture-info'
import resources from './../resources'
import State from './../../common/state'
import { FishPath } from './fish-type'
class Fish extends Animate {
    constructor(spec) {
        let fishName = spec.fishName;
        let controller = spec.controller;
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
        let textureInfoList = [];
        for (let i = 0; i < textureNameList.length; i++) {
            // let texture = new text
            let textureInfo = new TextureInfo(resources.json_texturepacker, textureNameList[i]);
            let texture = new PIXI.Texture(global.resource[resources.texturespack].texture, textureInfo.frame, undefined, undefined, textureInfo.rotate);

            textureList.push(texture);
            textureInfoList.push(
                {
                    texture: texture,
                    textureInfo: textureInfo
                }
            )
        }
        //收集到所有的纹理后来创建动画 
        super(textureList);
        this._index = index;
        this._controller = controller;
        this._index = spec.index; 

        this._textureInfoList = textureInfoList;
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
            this.play();
        })
        this._state.addState('dead', () => {
            this.gotoAndPlay(this.animateFrameNum.dead.start);
        });

        this._state.addState('run-end', ()=>{
            //游动结束了 
            controller.fishOver('run-end', this._index);
        })
        this._state.setState('run');
        //随机一条鱼的路径
        let keys = Object.keys(FishPath);
        let index = keys[Math.round(Math.random() * (keys.length - 1))];
        let value = FishPath[index];
        let bezierController = global.resource[value].data;
        this._pathPointList = Bezier(bezierController, 0, 100).getPoints(100);
        this.position = this._pathPointList[0];
        this.anchor.set(0.5);
    }
    onFrameChange() {


    }
    fishUpdate(dt) {
        if (this._state.getState() === 'run') {
            let textureInfo = this._textureInfoList[this.currentFrame];
            this.width = textureInfo.texture.width;
            this.height = textureInfo.texture.height;
            if (textureInfo.textureInfo.rotate == 2) {
                this.width = textureInfo.texture.height;
                this.height = textureInfo.texture.width;
            }
            if (this.currentFrame === this.animateFrameNum.run.length) {
                this.gotoAndPlay(0);
            }
            if (this._pathPointList.length !== 0) {
                //取出来第一个点
                if (this._currentTargetPoint == undefined) {
                    let point = this._pathPointList.shift();
                    this._currentTargetPoint = new Vec2(point.x, point.y);


                }
                if (this._currentTargetPoint) {
                    let dis = this._currentTargetPoint.distance(this.position);
                    if (dis > 5) {
                        let direction = this._currentTargetPoint.sub(this.position).getNormal();
                        this.position = {
                            x: this.position.x + direction.x * dt / 10,
                            y: this.position.y + direction.y * dt / 10
                        }
                        let angle = new Vec2(0, 1).getRadians(direction);
                        // let angle = direction.getAngle(new Vec2(0, 1));
                        // console.log('angle = ', angle);
                        let disAngle = angle + Math.PI * 0.5 - this.rotation  ;
                        // this.rotation = angle + Math.PI * 0.5;

                        this.rotation += Math.abs(disAngle * 0.1) *  (disAngle / Math.abs(disAngle));

                    } else {
                        let point = this._pathPointList.shift();
                        this._currentTargetPoint = new Vec2(point.x, point.y);
                    }
                }
            }else{
                this._state.setState('run-end');
            }
        }
    }
}
export default Fish;