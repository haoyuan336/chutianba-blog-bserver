import * as PIXI from 'pixi.js'
import CutFruit from './cut-fruit/src/game-scene'
import director from './render/director'
import LoadScene from './common/load-scene'
import resources from './cut-fruit/resources'
class GameContent {
    constructor() {

        // this.app = new PIXI.Application({width: 800, height: 480, backgroundColor: "#fff000"});
        // // create a new Sprite from an image path

        // // center the sprite's anchor point
        // bunny.anchor.set(0.5);

        // // move the sprite to the center of the screen
        // bunny.x = app.screen.width / 2;
        // bunny.y = app.screen.height / 2;

        // app.stage.addChild(bunny);

        // // Listen for animate update
        // app.ticker.add(function (delta) {
        //     // just for fun, let's rotate mr rabbit a little
        //     // delta is 1 if running at 100% performance
        //     // creates frame-independent transformation
        //     bunny.rotation += 0.1 * delta;
        // });
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

        let gameScene = new CutFruit();
        let loadScene = new LoadScene(resources);
        director.startScene(loadScene,gameScene);
        

    }
}
export default new GameContent();