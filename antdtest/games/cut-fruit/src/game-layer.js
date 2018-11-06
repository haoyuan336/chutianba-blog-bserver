import * as PIXI from 'pixi.js'
import global from './../../global'
import resources from './../resources'
class GameLayer extends PIXI.Container{
    constructor(){
        super();
        // let sp = new PIXI.Sprite
        let sp = new PIXI.Sprite(global.resource[resources.bj].texture);
        this.addChild(sp);
    }
}
export default GameLayer;