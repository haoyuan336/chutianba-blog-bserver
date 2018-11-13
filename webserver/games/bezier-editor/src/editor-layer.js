import {Layer} from './../../../util/import'
import { Graphics, Style, Shape, ShapeType } from './../../../util/render/graphics';
class EditorLayer extends Layer {
    constructor() {
        super();
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.interactive = true;

        // this.graphics.rectDraw(200,100, 1024,640, {
        //     fill: 0xFFFFFF,
        //     fillAlpha: 0.5,
        //     lineWidth: 3,
        //     lineColor: 0xFFFFFF
        // });

        // this.graphics.circleDraw(100,100, 10);


        let bgRect = new Shape(ShapeType.Rect, 0, 0, 1440, 900, new Style({
            fill: 0xFFFFFF,
            alpha: 0.4
        }));
        this.graphics.addChild(bgRect);

        let rect = new Shape(ShapeType.Rect, 200, 100, 1024, 640, new Style({
            fill: 0xFFFFFF,
            alpha: 0.5,
            lineWidth: 6,
            lineColor: 0xFFFFFF
        }));
        this.graphics.addChild(rect);

        this._pointList = [];
    }
    update(dt) {
        if (this.graphics) {
            this.graphics.update(dt);
        }
    }
    onTouchStart(event) {
        console.log('touch start');

        let data = event.data.getLocalPosition(this);
        // for (let i = 0; i < this._pointList.length; i++) {
        //     let point = this._pointList[i];
        //     if (point.isContain(data)) {

        //     }
        // }
        let circle = new Shape(ShapeType.Circle, data.x, data.y, 20);
        this.graphics.addChild(circle);
    }
    onTouchMove() {

    }
    onTouchEnd() {

    }


}
export default EditorLayer;