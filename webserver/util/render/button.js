import Sprite from './sprite'
import Layer from './layer'
import Label from './label'
import { Graphics, Shape, Style, ShapeType } from './graphics'
const TouchType = {
    Sprite: 1,
    Scale: 2,
    Alpha: 3
}
class Button extends Layer {
    constructor(spec, cb) {
        super();

        this._buttonStyle = {
            text: '',
            touchType: TouchType.Scale,

            normalTexture: undefined,
            pressedTexture: undefined,

            normalScale: 1,
            pressedScale: 1.2,

            normalAlpha: 1,
            pressedAlpha: 0.5,
            touchCb: () => {

            }

        }

        if (spec) {
            for (let i in this._buttonStyle) {
                let key = i;
                this._buttonStyle[key] = spec[key] ? spec[key] : this._buttonStyle[key];
            }

        }

        if (this._buttonStyle.normalTexture) {
            this._sprite = new Sprite(this._buttonStyle.normalTexture);
            this.addChild(this._sprite);
        } else {
            // this._shape = new Shape(ShapeType.Rect, 0,0, 400,400);
            // this._graphics = new Graphics();
            // this.addChild(this._graphics);
            // this._graphics.addChild(this._shape);
            this._graphics = new Graphics();
            this.addChild(this._graphics);
            this._graphics.rectDraw(-50, - 30, 100, 60);
        }

        let label = new Label(this._buttonStyle.text, {
            fontSize: 30
        });
        label.anchor.set(0.5)
        this.addChild(label);

        this.interactive = true;
        this.buttonMode = true;

    }
    update() {
    }
    onTouchStart() {
        switch (this._buttonStyle.touchType) {
            case TouchType.Sprite:
                this._sprite.texture = this.pressedTexture;
                break;
            case TouchType.Scale:
                this.scale.set(this._buttonStyle.pressedScale);
                // if (this._sprite) {
                //     this._sprite.scale.set(this._buttonStyle.pressedScale);

                // }
                // if (this._graphics) {
                //     console.log('重画');
                //     this.                    
                // }
                break;
            case TouchType.Alpha:
                this._sprite.alpha = this.pressedAlpha;
                break;
            default:
                break;
        }
    }
    onTouchEnd() {
        switch (this._buttonStyle.touchType) {
            case TouchType.Sprite:
                this._sprite.texture = this.normalTexture;

                break;
            case TouchType.Scale:
                this.scale.set(this._buttonStyle.normalScale)
                break;
            case TouchType.Alpha:
                this.scale.set(this._buttonStyle.normalAlpha);
                break;
            default:
                break;
        }

        if (this._buttonStyle.touchCb) {
            this._buttonStyle.touchCb();
        }
    }
}
Button.TouchType = TouchType
export default Button;