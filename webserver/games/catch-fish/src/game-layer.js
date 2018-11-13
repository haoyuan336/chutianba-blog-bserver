import Layer from './../../../util/render/layer'
import Sprite from './../../../util/render/sprite'
import resources from './../resources'
import global from './../../global'
import Fish from './fish'
class GameLayer extends Layer {
    constructor() {
        super();
        let bg = new Sprite(global.resource[resources.game_bg].texture);
        this.addChild(bg);
        bg.anchor.set(0);
        this._addFishTime = 0;
        this._fishMap = {};
        this._fishIdCount = 1;
        this.addFish();
    }
    update(dt){
        if (this._addFishTime > 100){
            // this._addFishTime = 0;
            // this.addFish();
        }else{
            this._addFishTime += dt;
        }
        for (let  i in this._fishMap){
            let fish = this._fishMap[i];
            fish.fishUpdate(dt);
        }
    }
    addFish(){
        let fish = new Fish('hailuoshuimu');
        this.addChild(fish);
        this._fishMap[this._fishIdCount] = fish;
        this._fishIdCount ++;
    }
}
export default GameLayer;