import { Layer, Button, director, Vec2 } from './../../../util/import'
import { Graphics, Shape, ShapeType, Style } from './../../../util/render/graphics'
class EditorLayer extends Layer {
    constructor() {
        super();


        this.graphics = new Graphics();
        this.addChild(this.graphics);

        let bg = new Shape(ShapeType.Rect, 0, 0, 1920, 1280, new Style({
            fill: 0xFFFFFF,
            alpha: 0.3,
            lineWidth: 6,
            lineColor: 0xFFFFFF
        }));
        this.graphics.addChild(bg);


        let rect = new Shape(ShapeType.Rect, 1920 * 0.5 - 1024 * 0.5, 1280 * 0.5 - 660 * 0.5, 1024, 640, new Style({
            fill: 0xFFFFFF,
            alpha: 0.5,
            lineWidth: 6,
            lineColor: 0xFFFFFF
        }));
        this.graphics.addChild(rect);
        this.interactive = true;

        this._controllerPointList = [];
        this._currentPoint = undefined;

        this._drawPointList = [];
    }
    createCircle(pos) {
        let shape = new Shape(ShapeType.Circle, pos.x, pos.y, 20, { fill: 0xff00ff });
        this.graphics.addChild(shape);
        return shape;
    }
    onTouchStart(event) {
        let data = event.data.getLocalPosition(this);
        console.log('data ', data);
        for (let i = 0; i < this._controllerPointList.length; i++) {
            let point = this._controllerPointList[i];
            if (point.isContain(data)) {
                this._currentPoint = point;
            }
        }
        if (!this._currentPoint) {
            let shape = this.createCircle(data);
            this._currentPoint = shape;
            this._controllerPointList.push(shape);
            this.drawPath();

        }
    }
    drawPath() {



        if (this._controllerPointList.length < 2) {
            return;
        }
        for (let i = 0 ; i < this._drawPointList.length ; i ++){
            this.graphics.removeChild(this._drawPointList[i]);
        }
        this._drawPointList = [];
        //没添加一个控制点 都需要重新绘制路径
        // this._dra
        for (let i = 0; i < this._controllerPointList.length - 1; i++) {
            //
            let p1 = this._controllerPointList[i];
            let p2 = this._controllerPointList[i + 1];
            let dis = new Vec2(p1.x, p1.y).distance(p2.x, p2.y);
            let direction = new Vec2(p2.x - p1.x, p2.y - p2.y).getNormal();
            // let currentDis = dis / Math.floor(dis / 10);
            let count = Math.floor(dis / 10);
            let currentDis = dis / count;
            let list = [new Vec2(p1.x, p1.y)];
            for (let j = 1 ; j < count - 2; j ++ ){
                let p = list[j - 1].add(direction.multi(currentDis));
                list.push(p);

                let circle = new Shape(ShapeType.Circle, p.x, p.y, 5, {fill: 0x0000ff});
                this.graphics.addChild(circle);
                this._drawPointList.push(circle);
            }
        }
    }
    onTouchMove(event) {
        if (this._currentPoint) {
            console.log('包含');
            let data = event.data.getLocalPosition(this);
            this._currentPoint.x = data.x;
            this._currentPoint.y = data.y;
        }
    }
    onTouchEnd() {
        this._currentPoint = undefined;
    }

    clearCb() {
        console.log('clear');
        for (let i = 0; i < this._controllerPointList.length; i++) {
            this.graphics.removeChild(this._controllerPointList[i]);
        }
        this._controllerPointList = [];
    }
    exportCb() {
        console.log('export');
    }

}
export default EditorLayer;