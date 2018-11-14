import Vec2 from "./vec2";

class Rect {
    constructor(){
        if (arguments.length >= 4){

        }
        this.x = arguments[0];
        this.y = arguments[1];
        this.width = arguments[2];
        this.height = arguments[3];
    }
    isContain(){
        let x,y;
        if (arguments.length >=2){
            x = arguments[0];
            y = arguments[1];
        }else{
            x = arguments[0].x;
            y = arguments[1].y;
        }

        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height){
            return true;
        }
        return false;
    }
};
export default Rect;