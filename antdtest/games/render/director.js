import * as PIXI from 'pixi.js'
import TWEEN from 'tween.js'
class Director{
    init(width, height){
        this.width = width;
        this.height = height;
        this.runningScene = undefined;
        this.root = new PIXI.Application({width: width, height: height});
        this.root.ticker.add((delta)=>{
            TWEEN.update();
        })
    }
    reSetSize(width, height){
        console.log('重新设置尺寸?')
    }
    startScene(loadScene,scene){
        // this.runningScene = scene;

        loadScene.load(()=>{
            console.log('资源加载完毕');
            this.root.stage.addChild(scene);
            this.root.stage.removeChild(loadScene);
            this.runningScene = scene;
            this.runningScene.onLoad();
        });

        this.root.stage.addChild(loadScene);
    }
    showApp(element){
        element.appendChild(this.root.view);
    }
}
let director = new Director();
export default director;
