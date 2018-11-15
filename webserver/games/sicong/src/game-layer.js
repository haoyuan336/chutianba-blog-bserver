import { Layer, Sprite, director } from './../../../util/import'
import global from './../../global'
import resources from './../resources'
import SiCong from './sicong'
class GameLayer extends Layer {
    constructor() {
        super();
        this._bgList = [];
        for (let i = 0; i < 2; i++) {
            let bg = new Sprite(global.resource[resources.bg].texture);
            bg.position = {
                x: director.designSize.width * 0.5 + bg.width * i,
                y: director.designSize.height * 0.5
            }
            this.addChild(bg);
            this._bgList.push(bg);
        }
        this._siCong = new SiCong();
        this.addChild(this._siCong);
        this._siCong.position.y = director.designSize.height * 0.5;
        this._siCong.position.x = this._siCong.width * 0.5;

        

    }
    update(dt) {
        for (let i = 0 ; i < this._bgList.length ; i ++){
            let bg = this._bgList[i];
            bg.position.x -= dt * 0.04;
            if ((bg.position.x + bg.width * 0.5) < 0){
                bg.position.x = this._bgList[i?1:0].position.x + bg.width * 2;
            }
        }
    }
    onTouchStart(){

    }
}
export default GameLayer;