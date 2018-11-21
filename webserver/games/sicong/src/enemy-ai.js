
import { director, State } from './../../../util/import'
const AiType = {
    'Line': 'Line'
}
class EnemyAi {
    constructor(node, type) {
        this._node = node;
        this._type = type;
        this._lifeTime = 0;
        switch (type) {
            case AiType.Line:
                break;
            default:
                break;
        }
        this._state = new State();
        this._node.position = {
            x: director.designSize.width,
            y: 0
        }
        this._state.setState('enter');
        // this._targetPos = 

    }
    enterEffect(dt) {
        // this._node.position.x -= dt;
        // this._node.position.y += dt;

    }
    update(dt) {
        if (this._state.getState() == 'enter') {
            //如果状态是正在进入那么
            switch (this._type) {
                case AiType.Line:
                    this.enterEffect(dt);
                    break;
                default:
                    break;
            }
        }
        // this._lifeTime += dt;

    }

}
EnemyAi.AiType = AiType;
export default EnemyAi;