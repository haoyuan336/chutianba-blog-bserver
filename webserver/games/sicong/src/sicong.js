import {Sprite} from './../../../util/import'
import resources from './../resources'
import global from './../../global'
class SiCong extends Sprite{
    constructor(){
        super(global.resource[resources.sicong].texture);
        this.scale.set(0.5);
    }
}
export default SiCong;