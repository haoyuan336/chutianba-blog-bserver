import {Sprite} from './../../../util/import'
import resources from './../resources'
import global from './../../global'
const EnemyType = {
    'check_0': 'check_0',
    'check_1': 'check_1'
}
class Enemy extends Sprite{
    constructor(type){
        super(global.resource[resources[type]].texture);
        this.scale.set(0.5);
    }
}

export default Enemy;