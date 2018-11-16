import CutFruit from './cut-fruit/src/game-scene'
import CatchFish from './catch-fish/src/game-scene'
import LoadScene from './common/load-scene'
import SiCong from './sicong/src/game-scene'

import CutFruitResources from './cut-fruit/resources'
import CatchFishResources from './catch-fish/resources'
import SiCongResources from './sicong/resources'
import BezierEditor from './bezier-editor/src/editor-scene'

import {director} from './../util/import'

class GameContent {
    constructor() {

        director.init(800, 480);
    }
    showApp(){
        director.showApp(document.getElementById('game-div'));
    }
    showGame(key) {
        console.log('展示游戏' + key);
        // if (this.app){
        //     document.getElementById('game-div').appendChild(this.app.view);
        // }

        let gameMap = {
            'cut-fruit': CutFruit,
            'catch-fish': CatchFish,
            'bezier-editor': BezierEditor,
            'sicong': SiCong
        }
        let resourceMap = {
            'cut-fruit': CutFruitResources,
            'catch-fish': CatchFishResources,
            'sicong': SiCongResources,
            'bezier-editor': {}
        }

        if (gameMap[key]){
            let gameScene = new gameMap[key];
            let loadScene = new LoadScene(resourceMap[key]);
            director.startScene(loadScene,gameScene);
        }
        
      
    }
}
export default new GameContent();