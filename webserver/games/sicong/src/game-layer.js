import { Layer, Sprite, director, State } from './../../../util/import'
import global from './../../global'
import resources from './../resources'
import SiCong from './sicong'
import HotDog from './hot-dog'
class GameLayer extends Layer {
    constructor() {
        super();
        this._bgList = [];
        for (let i = 0; i < 2; i++) {
            let bg = new Sprite(global.resource[resources.bg].texture);
            bg.position = {
                x: director.designSize.width * 0.5 + bg.width * i,
                y: director.designSize.height * 0.5
            }
            this.addChild(bg);
            this._bgList.push(bg);
        }
        this._siCong = new SiCong(this);
        this.addChild(this._siCong);
        this._siCong.position.y = director.designSize.height * 0.5;
        this._siCong.position.x = this._siCong.width * 0.5;
        this._bullet = undefined;
        this._state = new State();
        this._state.setState('run');
        this._weaponList = [];
        // this.addBullt();

    }
    addBullt() {
        let bullet = new HotDog();
        bullet.position = {
            x: this._siCong.position.x + 5,
            y: this._siCong.position.y - 6
        }
        this._weaponList.push(bullet);
        this.addChild(bullet);

        return bullet;
    }
    update(dt) {
        for (let i = 0; i < this._bgList.length; i++) {
            let bg = this._bgList[i];
            bg.position.x -= dt * 0.04;
            if ((bg.position.x + bg.width * 0.5) < 0) {
                bg.position.x = this._bgList[i ? 1 : 0].position.x + bg.width * 2;
            }
        }
       
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update(dt);
        }
    }
    shootBullet() {

        // if (this._weaponList.length == 0) {
        //     this.addBullt();
        // }
        let bullet = this.addBullt();
        bullet.fire(() => {
            for (let i = 0; i < this._weaponList.length; i++) {
                if (this._weaponList[i] == bullet) {
                    this._weaponList.splice(i, 1);
                }
            }
            this.removeChild(bullet);
        });
    }
 
   startGame(){
       this._siCong.startGame();
   }

}
export default GameLayer;