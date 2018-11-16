import { Layer, Sprite, director, State } from './../../../util/import'
import global from './../../global'
import resources from './../resources'
import SiCong from './sicong'
import HotDog from './hot-dog'
import Enemy from './enemy'
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
        // this._state.setState('run');
        this._weaponList = [];
        // this.addBullt();

        //取出游戏数据
        this._gameConfig = global.resource[resources["json_game-config"]].data;
        console.log('game config ', this._gameConfig);
        this._currentLevelNum = 0;
        this._currentwaveNum = 0;
        this._enemyCount = 0;
        this._enemyTypeNum = 0;
        this._addEnemyTime = 0;


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
        // for (let i = 0; i < this.children.length; i++) {
        //     this.children[i].update(dt);
        // }
        if (this._state.getState() == 'run') {
            this.addEnemy(dt);
        }
    }
    addEnemy(dt) {
        if (!this._waveConfig) {
            this._waveConfig = this.getWaveConfig();
        }
        if (this._waveConfig == 'game-end') {
        }

        let currentEnemeyConfig = undefined;
        if (this._waveConfig && this._waveConfig !== 'game-end') {
            // console.log('wave config = ' , this._waveConfig);
            if (this._enemyTypeNum < this._waveConfig.length) {
                currentEnemeyConfig = this._waveConfig[this._enemyTypeNum];

            } else {
                this._currentwaveNum++;
                this._enemyTypeNum = 0;
                this._waveConfig = undefined;
            }
        }

        if (currentEnemeyConfig) {
            let type = currentEnemeyConfig.type;
            let count = currentEnemeyConfig.count;
            let duraction = currentEnemeyConfig.duraction;
            if (this._addEnemyTime > duraction) {
                this._addEnemyTime = 0;
                if (this._enemyCount < count) {
                    this._enemyCount++;
                    this.addOneEnemy(type);
                } else {
                    this._enemyCount = 0;
                    this._enemyTypeNum++;
                }
            } else {
                this._addEnemyTime += dt;
            }

        }

    }

    addOneEnemy(type) {
        let enemy = new Enemy(type, this);
        this.addChild(enemy);
    }
    getWaveConfig() {
        if (this._currentLevelNum < Object.keys(this._gameConfig).length) {
            let levelConfig = this._gameConfig['level_' + this._currentLevelNum];
            if (this._currentwaveNum < levelConfig.length) {

                return levelConfig[this._currentwaveNum];
            } else {
                this._currentwaveNum = 0;
                this._currentLevelNum++;
            }
        } else {
            return 'game-end';
        }
    }


    shootBullet() {
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
    startGame() {
        this._siCong.startGame();
        this._state.setState('run');
    }

}
export default GameLayer;