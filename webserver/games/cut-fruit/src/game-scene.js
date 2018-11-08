import * as PIXI from 'pixi.js'
import GameLayer from './game-layer'
import Scene from './../../render/scene'
class GameScene extends Scene{
    constructor(){
        super();
      console.log("显示切水果游戏");

    }
    onLoad(){
        let _gameLayer = new GameLayer();
        this.addChild(_gameLayer);
    }
    
}
export default GameScene;