// import * as PIXI from 'pixi.js'
// import resources from './../resources'
// import LoadLayer from '../../common/load-scene'
// class GameScene{
//     constructor(){
//         this.loader = new PIXI.loaders.Loader();
//         let resList = [];
//         for (let i in resources){
//             resList.push(resources[i]);
//         }
//         this.loadRes(this.loader, resList)
//     }
//     loadRes(loader,resList){
//         // console.log('res list = ' + JSON.stringify(resList));
//         if (resList.length == 0){
//             return;
//         }
//         loader.add(resList.pop())
//         loader.load(()=>{
//             this.loadRes(loader, resList);
//         });
//     }
// }
// export default GameScene;