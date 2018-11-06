import * as PIXI from 'pixi.js'
class LoadScene extends PIXI.Container{
    constructor(resources){
        super();
        this.loader = new PIXI.loaders.Loader();
        let resList = [];
        for (let i in resources){
            resList.push(resources[i]);
        }
        this._resList = resList;
    }
    _loadRes(loader,resList){
        // console.log('res list = ' + JSON.stringify(resList));
        if (this._resList.length == 0){
            if (this.loadAllCb){
                this.loadAllCb();
            }
            return;
        }
        loader.add(this._resList.pop())
        loader.load(()=>{
            this._loadRes(loader, this._resList);
        });
    }
    load(cb){
        this.loadAllCb = cb;
        this._loadRes(this.loader, this._resList)
        
    }
}
export default LoadScene;