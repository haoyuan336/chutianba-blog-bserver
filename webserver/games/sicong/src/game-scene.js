import {Scene} from './../../../util/import'
import GameLayer from './game-layer'
import ReadyLayer from './ready-layer'
class GameScene extends Scene{
    constructor(){
        super();
        this.setDesignSize(800, 480);
    }
    onLoad(){
        let gameLayer = new GameLayer();
        this.addLayer(gameLayer);


        let readyLayer = new ReadyLayer(gameLayer);
        this.addLayer(readyLayer);
    }
    
}
export default GameScene;