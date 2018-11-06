import * as PIXI from 'pixi.js'
import global from './../global'
class LoadScene extends PIXI.Container {
    constructor(resources) {
        super();
        this.loader = new PIXI.loaders.Loader();
        let resList = [];
        for (let i in resources) {
            resList.push(resources[i]);
        }
        this._resList = resList;
    }
    _loadRes(loader, resList) {
        // console.log('res list = ' + JSON.stringify(resList));
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
    load(cb) {
        this.loadAllCb = cb;
        this._loadRes(this.loader, this._resList)

    }
}
export default LoadScene;