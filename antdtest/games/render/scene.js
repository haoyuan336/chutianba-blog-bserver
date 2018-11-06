import * as PIXI from 'pixi.js'
class Scene extends PIXI.Container{
    constructor(){
        super()
    }
    onLoad(){
        console.log('进入')
    }
}
export default Scene;