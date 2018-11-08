import * as PIXI from 'pixi.js'
import global from './../global'
import director from '../render/director';
class LoadScene extends PIXI.Container {
    constructor(resources) {
        super();
        this.loader = new PIXI.loaders.Loader();
        let resList = [];
        for (let i in resources) {
            resList.push(resources[i]);
        }
        this._resList = resList;

        this._totalCount = this._resList.length;
        // this.graphics.lineStyle(2, 0xFF00FF, 1);
        // graphics.beginFill(0xFF00BB, 0.25);
        // graphics.drawRoundedRect(150, 450, 300, 100, 15);
        // graphics.endFill();
        // graphics.lineStyle(2, 0x0000FF, 1);
        // graphics.beginFill(0xFF700B, 1);
        // graphics.drawRect(50, 250, 120, 120); 
        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);
        this._text = new PIXI.Text('100%', {
            fill: '#ffffff',
            fontSize:'10px'
        });
      
        this.addChild(this._text)


    }
    _loadRes(loader, resList) {
        // console.log('res list = ' + JSON.stringify(resList));
        this.drawProgress((this._totalCount - this._resList.length) / this._totalCount);
        if (this._resList.length == 0) {
            if (this.loadAllCb) {
                this.loadAllCb();
            }
            return;
        }

        let url = resList.pop();
        if (global.resource && global.resource[url]) {
            console.log('存在的资源');
            this._loadRes(loader, resList);
        } else {
            loader.add(url)
            loader.load((load, resource) => {
                global.resource = resource;
                this._loadRes(loader, resList);
            });
        }

    }
    drawProgress(value){
        // console.log('进度 = ' + value);
        this._graphics.clear();
        this._graphics.lineStyle(2, 0x0000FF, 1);
        this._graphics.beginFill(0xffffff, 1);
        this._graphics.drawRect(director.width * 0.5 - 50, 250, 100 * value, 20);
        this._text.position = {
            x: director.width * 0.5 - 50 + 100 * value,
            y: 250 + 5
        }
        this._text.text = Math.round(value * 100) + '%';
    }
    load(cb) {
        this.loadAllCb = cb;
        this._loadRes(this.loader, this._resList)

    }
}
export default LoadScene;