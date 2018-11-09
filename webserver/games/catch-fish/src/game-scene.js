import Scene from './../../render/scene'
import GameLayer from './game-layer'
class GameScene extends Scene {
    constructor() {
        super();


    }
    onLoad() {
        //初始化游戏层
        let layer = new GameLayer();
        this.addChild(layer);
    }
}
export default GameScene;