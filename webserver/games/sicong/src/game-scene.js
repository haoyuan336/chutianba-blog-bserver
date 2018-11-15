import {Scene} from './../../../util/import'
import GameLayer from './game-layer'
class GameScene extends Scene{
    constructor(){
        super();
    }
    onLoad(){
        let gameLayer = new GameLayer();
        this.addLayer(gameLayer);
    }
}
export default GameScene;