import Scene from './../../render/scene'
import GameLayer from './game-layer'
import director from './../../render/director'
class GameScene extends Scene {
    constructor() {
        super();
        console.log('进入')
        this.setDesignSize(1024, 640);
    }
   
    onLoad() {
        //初始化游戏层
        let layer = new GameLayer();
        this.addLayer(layer);
    }
}
export default GameScene;