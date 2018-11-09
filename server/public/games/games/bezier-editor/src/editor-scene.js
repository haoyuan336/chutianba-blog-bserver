import Scene from './../../render/scene'
import EditorLayer from './editor-layer'
class BezierScene extends Scene{
    constructor(){
        super();
        console.log('初始化贝塞尔曲线编辑器');
        this.setDesignSize(1440, 810);
    }
    onLoad(){   
        let layer = new EditorLayer();
        this.addLayer(layer);
    }
}
export default BezierScene;