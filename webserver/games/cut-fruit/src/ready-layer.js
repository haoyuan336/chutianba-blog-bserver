import Layer from './../../../util/render/layer'
import global from './../../global'
import resources from './../resources'
import Button from './../../../util/render/button'
import Sprite from './../../../util/render/sprite'
import director from './../../../util/render/director'
import TWEEN from 'tween.js'
class ReadyLayer extends Layer {
    constructor(readyCb) {
        super();
        // let sp = new PIXI.Sprite
      
        let logo = new Sprite(global.resource[resources.logo].texture);
        this.addChild(logo);
        logo.position = {
            x: director.width * 0.5,
            y: director.height * 0.45
        }
        //放一个按钮
        let button = new Button(global.resource[resources.icon_start].texture, () => {
            console.log('start button click');

            clickCb();

        });
        this.addChild(button)
        button.position = {
            x: director.width * 0.5,
            y: director.height * 0.8
        }


        function clickCb() {
            let action = new TWEEN.Tween(logo.position)
            .to({x: director.width * 0.5, y: -100}, 600)
            .onComplete(()=>{
            })
            // action.easing(TWEEN.Easing.Quadratic)
            action.start();


            let action1 = new TWEEN.Tween(button.position)
            .to({x: director.width * 0.5, y: 600}, 400)
            .onComplete(()=>{
                if (readyCb){
                    readyCb();
                }
            });
            action1.delay(200);
            action1.start();
        }
    }
}
export default ReadyLayer;