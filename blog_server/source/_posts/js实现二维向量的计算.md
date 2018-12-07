---
layout: post
title: js实现二维向量的计算
date: 2018-12-07 16:13:43
tags:
---
我们在做游戏开发的时候，经常遇到坐标的操作，比如说旋转的，位置移动什么的，新入行的小伙伴对这些坐标计算总是被整的焦头烂额，如果我们学会了向量计算，那么一切就都会变得非常简单，废话不多说，直接看代码
```js
class Vec2 {
  constructor() {
    this.x = 0
    this.y = 0
    if (arguments.length === 2) {
      this.x = arguments[0]
      this.y = arguments[1]
    }
  }
  set() {
    if (arguments.length === 0) {
      return
    }
    if (arguments.length === 1) {
      this.x = arguments[0]
      this.y = arguments[0]
    } else {
      this.x = arguments[0]
      this.y = arguments[1]
    }
  }
  sub() {
    let v = new Vec2(this.x, this.y)
    if (arguments.length === 1) {
      v.x -= arguments[0].x,
        v.y -= arguments[0].y
    } else {
      v.x -= arguments[0];
      v.y -= arguments[1];
    }
    return v
  }
  add() {
    let v = new Vec2(this.x, this.y)

    if (arguments.length === 1) {
      v.x += arguments[0].x;
      v.y += arguments[0].y;
    } else {
      v.x += arguments[0];
      v.y += arguments[1];
    }


    return v
  }
  isZero() {
    if (this.x === 0 && this.y === 0) {
      return true
    }
    return false
  }
  rotation(object, angle) {
    // 向量转一个角度
    let sinAngle = Math.sin(angle)
    let cosAngle = Math.cos(angle)
    let x = 0
    let y = 0
    if (object.isZero()) {
      // console.log('旋转点是0');
      let tempX = this.x * cosAngle - this.y * sinAngle
      y = this.y * cosAngle + this.x * sinAngle
      x = tempX
    } else {
      let tempX = this.x - object.x
      let tempY = this.y - object.y
      x = tempX * cosAngle - tempY * sinAngle + this.x
      y = tempY * cosAngle + tempX * sinAngle + this.y
    }

    return new Vec2(x, y)
  };
  getNormal() {
    let n = this.x * this.x + this.y * this.y
    if (n === 1) {
      return this
    }
    n = Math.sqrt(n)
    if (n < Number.MIN_VALUE) {
      return this
    }
    n = 1 / n
    let x = this.x * n
    let y = this.y * n
    return new Vec2(x, y)
  }
  multi(value) {
    return new Vec2(value * this.x, value * this.y)
  }
  distance() {
    // let l = this.x * this.x +
    let object = undefined;
    if (arguments.length == 1) {
      object = arguments[0];
    } else {
      object = {
        x: arguments[0],
        y: arguments[1]
      }
    }
    let a = (this.x - object.x) * (this.x - object.x) + (this.y - object.y) * (this.y - object.y)
    let l = Math.sqrt(a)
    let w = parseInt(l)
    if (l - w < 0.00001) {
      return w
    }

    return l
  }

  cross() {
    //向量积
    let object = undefined;
    if (arguments.length == 1) {
      object = {
        x: arguments[0].x,
        y: arguments[0].y
      }
    } else {
      object = {
        x: arguments[0],
        y: arguments[1]
      }
    }
    return this.x * object.y - this.y * object.x;
  }
  dot() {
    //点积
    let object = undefined;
    if (arguments.length == 1) {
      object = {
        x: arguments[0].x,
        y: arguments[0].y
      }
    } else {
      object = {
        x: arguments[0],
        y: arguments[1]
      }
    }
    return this.x * object.x + this.y * object.y;
  }
  getRadians() {
    //得到向量弧度
    let object = undefined;
    if (arguments.length == 1) {
      object = {
        x: arguments[0].x,
        y: arguments[0].y
      }
    } else {
      object = {
        x: arguments[0],
        y: arguments[1]
      }
    }

    let v = new Vec2(object.x, object.y);
    let a = this.getNormal();
    let b = v.getNormal();

    let angle = Math.atan2(a.cross(b), a.dot(b));
    // console.log('angle = ' + angle);
    if (Math.abs(angle) < Number.MIN_VALUE) {
      return 0
    }
    return angle;
  };
}
export default Vec2

```
仔细看过代码后，使用起来也很简单，比如说求两点之间的距离就可以这样写
```js
let v1 = new Vec2(100,100);
let v2 = new Vec2(200,200);
let distance = v1.distance(v2);
```
是不是发现都是一些非常简单的操作，用到的基本上都是中学的时候学到的知识，比如说distance这个方法，求两点之间的距离，其实用到的就是勾股定理的知识。还有rotation方法，用的是三角函数相关的知识。最后心里话送给大家： **不以恶小而为之，不是善小而不为**