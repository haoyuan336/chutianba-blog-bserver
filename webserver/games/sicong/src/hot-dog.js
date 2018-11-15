import { Sprite } from './../../../util/import'
import global from './../../global'
import resources from './../resources'
class HotDog extends Sprite {
    constructor() {
        super(global.resource[resources.hotdog].texture);

    }
}
export default HotDog;