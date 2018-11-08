import Sprite from './sprite'
class Button extends Sprite{
    constructor(spec, cb){
        super(spec);
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
        this.alpha = 0.5;
    }
    touchMove(){

    }
    touchOut(){
        this.alpha = 1;
    }
    touchEnd(){
        if (this.clickCb){
            this.clickCb();
        }
        this.alpha = 1;
    }
}
export default Button;