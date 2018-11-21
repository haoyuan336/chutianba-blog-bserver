
import { director, State, Vec2 } from './../../../util/import'
import resources from './../resources'
import global from './../../global'
const PathMap = {
    "path_0": resources.json_path_0,
    "path_1": resources.json_path_1,
    "path_2": resources.json_path_2,
    "path_3": resources.json_path_3,
    "path_4": resources.json_path_4,
    "path_5": resources.json_path_5,
    "path_6": resources.json_path_6,
    "path_7": resources.json_path_7
}

class EnemyAi {
    constructor(node, ) {
        this._node = node;
        this._state = new State();
        this._node.position = {
            x: director.designSize.width,
            y: 0
        }
        this._state.setState('enter');
        // this._targetPos = 
        //随机宇哥path map 

        let randomIndex = Math.round(Math.random() * (Object.keys().length - 1));
        console.log('random index ', randomIndex);
        let key = Object.key(PathMap)[randomIndex];
        console.log('key', key);
        this._controllerPath = global.resource[PathMap[key]].data;
        this._controllerIndex = 0;
        this._pathList = undefined;
        this._pathIndex = 0;
        this._currentPoint = undefined;
    }
    enterEffect(dt) {
        // this._node.position.x -= dt;
        // this._node.position.y += dt;

    }
    update(dt) {

        if (this._pathList == undefined) {
            //取出路径点
            if (this._controllerIndex < this._controllerPath.length - 1) {
                let v1 = new Vec2(
                    this._controllerPath[this._controllerIndex].x,
                    this._controllerPath[this._controllerIndex].y
                );
                let v2 = new Vec2(
                    this._controllerPath[this._controllerIndex + 1].x,
                    this._controllerPath[this._controllerIndex + 1].y
                );
                let distance = v1.getDistance(v2);
                let count = Math.floor(distance / 20);
                let currentDis = distance / count;
                let direction = v2.sub(v1).getNormal();
                this._pathList = [v1];
                for (let i = 1; i < count - 1; i++) {
                    let disP = direction.multi(currentDis);
                    let endP = this._pathList[i].add(disP.x, disP.y);
                    this._pathList.push(endP);
                }
            }
        }else{

            if (this._currentPoint == undefined){
                if (this._pathIndex < this._pathList.length){
                    this._currentPoint = this._pathList[this._pathIndex];
                    this._pathIndex ++;
                }else{
                    this._pathIndex = 0;
                    this._controllerIndex ++;
                    this._pathList = undefined;

                }
            }
        }

        if (this._currentPoint){
            let v1 = new Vec2(this.position.x, this.position.y);
            let direction = this._currentPoint.sub(v1).getNormal();
            if (this._node){
                this._node.position = {
                    x: this._node.position.x + direction.x,
                    y: this._node.position.y + direction.y
                }
            }
        }

        // if (this._state.getState() == 'enter') {
        //     //如果状态是正在进入那么
        //     switch (this._type) {
        //         case AiType.Line:
        //             this.enterEffect(dt);
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // // this._lifeTime += dt;

    }

}
export default EnemyAi;