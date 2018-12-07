---
layout: post
title: 基于pixi.js+nodejs+socket.io实现的在线五子棋-进化
date: 2018-12-07 14:49:37
tags:
---
在[基于pixi.js+nodejs+socket.io实现的在线五子棋-起源](/2018/12/06/基于pixi-js-nodejs-socket-io实现的在线五子棋游戏/)这一篇我们初步了解了一下项目结构，并且熟悉了GameScene.js的代码内容。下面我将继续讲解如何实现在线五子棋游戏，首先请再次体验五子棋游戏。
{% iframe http://chutianba.xyz:8000/?game-type=wuziqi-online 800 480 %}
我们继续补充完**game-layer.js**的代码以及**ui-layer.js**的代码,
#### **game-layer.js**
```js
import { Layer, Sprite, director, Vec2 } from './../../../util/import'
import resources from './../resources'
import global from './../../global'
class GameLayer extends Layer {
    constructor(controller) {
        super();
        //初始化背景
        this._controller = controller;
        let bg = new Sprite(global.resource[resources.chessboard].texture);
        this.addChild(bg);
        bg.position = {
            x: director.designSize.width * 0.5,
            y: director.designSize.height * 0.5
        }
        this._boardList = [];
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let pos = {
                    x: 75 + j * 30,
                    y: 65 + i * 30
                }
                this._boardList.push({
                    pos: pos
                });
            }
        }
        this._boardMap = {}; //存放当前的棋子


        this.interactive = true;
        global.event.on('re-start', ()=>{
            console.log('清除棋盘里面的内容');
            for (let i in this._boardMap){
                this.removeChild(this._boardMap[i]);
            }
            this._boardMap = {};
        });
    }
    syncBoardData(data) {
        console.log('同步棋牌数据', data);
        for (let i in data) {
            let color = data[i];
            let index = i;
            if (!this._boardMap[index]) {
                let piece = new Sprite(global.resource[color == "black" ? resources.black : resources.white].texture);
                this.addChild(piece);
                piece.position = this._boardList[index].pos;
                this._boardMap[index] = piece;
            }
        }
    }
    onTouchStart(event) {
        let data = event.data.getLocalPosition(this);
        let v1 = new Vec2(data.x, data.y);
        let chooseBoardIndex = undefined;
        for (let i = 0; i < this._boardList.length; i++) {
            let v2 = new Vec2(this._boardList[i].pos.x, this._boardList[i].pos.y);
            let dis = v1.distance(v2);
            if (dis < 15) {
                chooseBoardIndex = i;
            }
        }
        if (chooseBoardIndex) {
            this._controller.chooseBoard(chooseBoardIndex);
        }
    }
};
export default GameLayer;
```
关于import的内容就不多说了，主要讲一下交互的地方，首先的通过两个循环嵌套，给**this._boardList** push进去了 一个对象，这个对象是每一个格子的位置坐标信息。
```js
 this._boardList = [];
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let pos = {
                    x: 75 + j * 30,
                    y: 65 + i * 30
                }
                this._boardList.push({
                    pos: pos
                });
            }
        }
```
然后是同步棋盘数据的方法
```js
 syncBoardData(data) {
        console.log('同步棋牌数据', data);
        for (let i in data) {
            let color = data[i];
            let index = i;
            if (!this._boardMap[index]) {
                let piece = new Sprite(global.resource[color == "black" ? resources.black : resources.white].texture);
                this.addChild(piece);
                piece.position = this._boardList[index].pos;
                this._boardMap[index] = piece;
            }
        }
    }
```
这个方法是上节课讲到**sync-board-data**这个消息的时候，我们拿到服务器发来的数据，然后game-scene.js告诉game-layer.js去显示这个数据，首先遍历这个数，因为拿到的是对象，所以用**for in**去遍历，key就是i 也就是index，value就是color，然后去**this._boardMap**这个对象里面查找有没有index相对应的这个对象，没有的话我们就创建一个精灵，精灵就是棋子，我们根据color的值用？：表达式的方式，传给他不同的texture参数。创建好精灵后，给他设置位置，位置就是**this._boardList**储存的pos，最后将这个棋子放进**this._boardMap**里面，这样可以防止重复创建精灵。
最后我们看这个**game-layer.js**的交互部分，看下面代码
```js
onTouchStart(event) {
        let data = event.data.getLocalPosition(this);
        let v1 = new Vec2(data.x, data.y);
        let chooseBoardIndex = undefined;
        for (let i = 0; i < this._boardList.length; i++) {
            let v2 = new Vec2(this._boardList[i].pos.x, this._boardList[i].pos.y);
            let dis = v1.distance(v2);
            if (dis < 15) {
                chooseBoardIndex = i;
            }
        }
        if (chooseBoardIndex) {
            this._controller.chooseBoard(chooseBoardIndex);
        }
    }

```
这里首先取出触摸点的坐标，然后创建一个Vec2的实例，Vec2是二维向量，具体的实现请传送至这里[js实现二维向量的计算](/2018/12/07/js实现二维向量的计算/)，然后遍历**this.boardList**这个列表。这样找到，距离点击的点小雨15的pos，然后这个index就是i，我们把找到的这个index发给服务器。这里是通过**this._controller**的chooseBoard方法，聪明的小伙伴应该已经发现了，这个**this._controller**其实就是game-scene.js创建的实例，观察game-scene.js会发现，创建game-layer.js的实例的时候，会把this当做参数传进来。
### 再来看**ui-layer.js**
```js
import { Layer, Label, Sprite, director } from './../../../util/import'
import global from './../../global'
import resources from './../resources'
import { Graphics, Shape, ShapeType, Style } from './../../../util/render/graphics'
class UILayer extends Layer {
    constructor() {
        super();
        this._playerIdLabel = new Label('hello world');
        this.addChild(this._playerIdLabel);
        this._playerIdLabel.position = {
            x: 0,
            y: 0
        }
        this._roomCountLabel = new Label('room count:');
        this.addChild(this._roomCountLabel);
        this._roomCountLabel.position = {
            x: 200,
            y: 0
        }


        this._unfullRoomCountLabel = new Label("unfull room count:");
        this.addChild(this._unfullRoomCountLabel);
        this._unfullRoomCountLabel.position = {
            x: 400,
            y: 0
        }

        this._roomIdLabel = new Label("room id:");
        this.addChild(this._roomIdLabel);
        this._roomIdLabel.position = {
            x: 600,
            y: 0
        }
        this._roomPlayerCountLabel = new Label('room player count:');
        this.addChild(this._roomPlayerCountLabel);
        this._roomPlayerCountLabel.position = {
            x: 0,
            y: 20
        }
        this._allPlayerCountLabel = new Label('all player count:');
        this.addChild(this._allPlayerCountLabel);
        this._allPlayerCountLabel.position = {
            x: 200,
            y: 20
        }
        this._pieceList = [];
        for (let i = 0; i < 2; i++) {
            let piece = new Sprite(global.resource[i ? resources.black : resources.white].texture);
            piece.pieceColor = i ? "black" : 'white';
            this.addChild(piece);
            this._pieceList.push(piece);
            piece.position = {
                x: 20,
                y: 80 + i * 40
            }
        }
        this._graphics = new Graphics();
        this.addChild(this._graphics);
    }
    setPlayerId(id) {
        console.log('刷新玩家id', id);
        this._playerIdLabel.text = 'player id:' + id;
    }
    referGameData(data) {
        console.log('refer game data ', data);
        this._roomCountLabel.text = 'room count:' + data.room_count;
        this._unfullRoomCountLabel.text = 'unfull room count:' + data.unfull_room_count;
        this._roomIdLabel.text = "room id:" + data.room_id;
        this._roomPlayerCountLabel.text = "room player count:" + data.room_player_count;
        this._allPlayerCountLabel.text = "all player count:" + data.online_player_count;
    }
    setCurrentColor(color) {
        console.log('设置当前棋子的颜色', color);
        for (let i = 0; i < this._pieceList.length; i++) {
            this._pieceList[i].scale.set(1);
            if (this._pieceList[i].pieceColor == color) {
                this._pieceList[i].scale.set(1.2);
            }
        }
    }
    showGameWin(color) {
        console.log('显示游戏胜利的界面', color);
        this.interactive = true;
        let rect = new Shape(ShapeType.Rect, 0, 0, director.designSize.width, director.designSize.height, new Style({ fill: 0x222222, fillAlpha: 0.8 }));
        this._graphics.addChild(rect);
        let piece = new Sprite(global.resource[color == 'black' ? resources.black : resources.white].texture);
        this.addChild(piece);
        piece.position = {
            x: director.designSize.width * 0.5,
            y: director.designSize.height * 0.5 - 100
        }
        let winLabel = new Label('WIN', { fontSize: 100, fill: 0xffffff });
        this.addChild(winLabel);
        winLabel.anchor = {
            x: 0.5,
            y: 0.5
        }
        winLabel.position = {
            x: director.designSize.width * 0.5,
            y: director.designSize.height * 0.5
        }
        this.winLabel = winLabel;
        this.winPiece = piece;
    }
    onTouchStart() {
        this.interactive = false;
        this._graphics.removeAllChild();
        this.removeChild(this.winLabel);
        this.removeChild(this.winPiece);
        global.event.fire('re-start');
    }
}
export default UILayer;
```
这个类主要实现了以下功能，创建了几个标签，分别取显示，玩家的id，房间的个数，不满的房间的个数，房间的id，房间里面玩家的个数，所有的玩家的个数。然后是**referGameData**这个方法，这个方法主要是接受到服务器发来的消息后，将前面创建的那些label的值更新一下。
最后我们看一下这个方法
```js
 setCurrentColor(color) {
        console.log('设置当前棋子的颜色', color);
        for (let i = 0; i < this._pieceList.length; i++) {
            this._pieceList[i].scale.set(1);
            if (this._pieceList[i].pieceColor == color) {
                this._pieceList[i].scale.set(1.2);
            }
        }
    }
```
当我们收到服务器发来的改变下棋颜色的时候，我们遍历了一下**this._pieceList**这个列表，这里列表里面储存了两个棋子精灵，分别是黑白两个，就是游戏左上位置的那两个棋子，在遍历的时候会根据每个棋子所代表的颜色与传进来的颜色进行比较，如果相等，那么就给他放大1.2倍，是不是很机智。最后心里话送给大家：**你的命运谁来操盘？答：我操！** 后续内容请传送至[基于pixi.js+nodejs+socket.io实现的在线五子棋-进化](/2018/12/07/基于pixi-js-nodejs-socket-io实现的在线五子棋-进化/)