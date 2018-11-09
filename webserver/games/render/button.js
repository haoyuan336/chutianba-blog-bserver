import Sprite from './sprite'
import Layer from './layer'
class Button extends Layer{
    constructor(spec, cb){
        super();
        this.normalSprite = new Sprite(spec);
        this.addChild(this.normalSprite);
        // .on('pointerdown', onDragStart)
        // .on('pointerup', onDragEnd)
        // .on('pointerupoutside', onDragEnd)
        // .on('pointermove', onDragMove);
        this.interactive = true;
        this.clickCb = ()=>{};
        if (cb){
            console.log('有回调');
            this.clickCb = cb;
        }else{
            console.log('无回调');
        }
        this.on('pointerdown', this.touchStart.bind(this));
        this.on('pointerup', this.touchEnd.bind(this));
        this.on('pointerupoutside', this.touchOut.bind(this));
        
    }
    touchStart(){
        this.normalSprite.alpha = 0.5;
    }
    touchMove(){

    }
    touchOut(){
        this.normalSprite.alpha = 1;
    }
    touchEnd(){
        if (this.clickCb){
            this.clickCb();
        }
        this.normalSprite.alpha = 1;
    }
}
export default Button;