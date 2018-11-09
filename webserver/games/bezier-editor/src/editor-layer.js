import Layer from './../../render/layer'
import Graphics from './../../render/graphics'
class EditorLayer extends Layer{
    constructor(){
        super();
        let graphics = new Graphics();
        this.addChild(graphics);
        graphics.rectDraw(200,100, 1024,640);
    }
}
export default EditorLayer;