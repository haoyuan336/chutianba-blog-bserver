---
layout: post
title: 基于pixi.js+nodejs+socket.io实现的在线五子棋-终章
date: 2018-12-07 14:49:49
tags:
---
这一篇是[基于pixi.js+nodejs+socket.io实现的在线五子棋-进化](/2018/12/07/基于pixi-js-nodejs-socket-io实现的在线五子棋-进化/)的后续，不明白的小伙伴可以先去看这一篇。
下面我们来看服务端代码，我们在下载好的项目的根目录里面找到了这个目录**wuziqi-online-server** 没错，这个目录里面放的就是五子棋的服务端代码。
### 首先来看看入口程序 **wuziqi-index.js**
```js
const IO = require('socket.io')(3001);
const App = require('./app');
let app = new App();
IO.on('connection', (socket)=>{
    console.log('a user connection');
    app.createPlayer(socket);
});
console.log('启动成功');
```
这里我们引入了**socket.io**这个包，下载这个包，我们需要在当前目录运行一下npm install这个命令，关于nodejs的包管理工具npm的了解，可以传送至[如何快速的启动一个本地的web服务-nodejs+express](/2018/12/02/如何快速的启动一个本地的web服务-nodejs-express/)了解详情。
这个脚本里面代码行数很少，但是却很关键，这里引入了socket.io这个包，并且监听了**3001**这个端口,然后我们继续监听了**connection**这个消息，就是说一旦有客户端连接上这台服务器的3001端口，我们的程序就可以立刻知道。然后我们告诉app创建一个玩家，下面就是app.js的代码
```js
const Player = require('./player');
const Room = require('./room');
class IDCreate {
    constructor() {
        this._id = '100000';
        this._idMap = {};
    }
    getNextID() {
        let find = false
        let nextId = '';
        while (!find) {
            let id = '1';
            for (let i = 0; i < 5; i++) {
                id += Math.floor(Math.random() * 10) + '';
            }
            nextId = id;
            if (!this._idMap[id]) {
                this._idMap[id] = true;
                find = true;
            }
        }
        return nextId;
    }
    removeID(id) {
        delete this._idMap[id];
    }
}
class App {
    constructor() {
        this._idCreate = new IDCreate();
        this._playerMap = {};
        this._roomMap = {};
        this._unFullRoomList = []; //不满的房间的房间列表
    }
    createPlayer(socket) {
        let id = this._idCreate.getNextID();
        console.log('创建玩家 =', id);
        let player = new Player(socket, id, this);
        this._playerMap[id] = player;
        this.assignRoom(player);
        this.syncGameData();
       
    }
    createRoom() {
        let id = this._idCreate.getNextID();
        let room = new Room(id, this);
        this._roomMap[id] = room;
        return room;

    }
    assignRoom(player) {
        //给新加进来的玩家分配房间
        let room = undefined;
        if (this._unFullRoomList.length !== 0) {
            room = this._unFullRoomList.pop();
            console.log('取出未满的房间');
        } else {
            room = this.createRoom();
            this._unFullRoomList.push(room);
        }
        if (room) {
            player.assignRoom(room);

        } else {
            console.warn('未找到房间');
        }
        return room;
    }
    pushUnFullRoom(room){
        this._unFullRoomList.push(room);
        this.syncGameData();
    }
    removePlayer(id){
        delete this._playerMap[id];
        this.syncGameData();
    }
    removeRoom(room){
        console.log("删除空房间");
        //把房间从房间map里面删掉
        delete this._roomMap[room.id];
        //从不满房间的列表里面 把房间删掉
        for (let i = 0 ; i < this._unFullRoomList.length ; i ++){
            if (this._unFullRoomList[i].id == room.id){
                this._unFullRoomList.splice(i, 1);
            }
        }
        this.syncGameData();
    }
    syncGameData(){
        let gameData = {
            room_count: Object.keys(this._roomMap).length,
            unfull_room_count: this._unFullRoomList.length,
            online_player_count: Object.keys(this._playerMap).length,
        }
        for(let i in this._playerMap){
            this._playerMap[i].referGameData(gameData);
        }
    }

}
module.exports = App;
```
这个app.js相当于游戏的控制器，负责创建玩家创建房间，删除玩家删除房间，给玩家分配房间等等，这里先分析一下给玩家分配房间，
```js
assignRoom(player) {
        //给新加进来的玩家分配房间
        let room = undefined;
        if (this._unFullRoomList.length !== 0) {
            room = this._unFullRoomList.pop();
            console.log('取出未满的房间');
        } else {
            room = this.createRoom();
            this._unFullRoomList.push(room);
        }
        if (room) {
            player.assignRoom(room);

        } else {
            console.warn('未找到房间');
        }
        return room;
    }
```
因为是五子棋的游戏，每个房间里面只能最多有两个玩家，所以这里用了一个不满的房间列表来储存不满2人的房间，当有玩家连上服务器的时候，首先从不满房间列表取出一个房间出来，然后将新玩加进去，注意这里用的是pop，就是说取出列表的最后一个元素，并且从列表中删除此元素，然后我们只要一旦有了，不满的房间就将他push进这个列表，分配房间的操作就是这么简单。如果列表为空，那么就说明，目前没有空房间，那么就创建一个房间，并且将他push进不满房间列表中，注意：这个是不满房间列表，不是空房间列表。
我们再看**player.js**的代码
```js
class Player {
    constructor(socket, id, controller) {
        this.id = id;
        this._socket = socket;
        this._room = undefined;
        this._controller = controller;
        this._socket.emit('login-success', this.id);
        this._color = Math.random() * 10 > 5 ? 'black' : 'white';
        this._socket.on('disconnect', () => {
            this._room.removePlayer(this.id);
            this._controller.removePlayer(this.id);
        });
        this._socket.on('choose-board', (index)=>{
            if (this._room){
                this._room.playerChooseBoard(this, index);
            }
        });
    }
    assignRoom(room) {
        this._room = room;
        room.assignPlayer(this);
    }
    referGameData(data) {
        data.room_id = this._room.id;
        data.room_player_count = this._room.getPlayerCount();
        this._socket.emit('refer-game-data', data);
    }
    getColor() {
        return this._color;
    }
    setPieceColor(value) {
        // this._socket.emit('set-color', value);
        this._color = value;
    }
    syncCurrentColor(color){
        this._socket.emit('sync-current-color', color);
    }
    syncBoardData(data){
        this._socket.emit('sync-board-data', data);
    }
    sendGameWinMsg(color){
        this._socket.emit('game-win', color);
    }
}
module.exports = Player;
```
这个类没什么好说的，就是收发消息，储存当前棋子的颜色等。
还有room.js类
```js
const GameLogic = require('./game-logic')
class Room {
    constructor(id, controller) {
        this._playerList = [];
        this.id = id;
        this._controller = controller;
        this._gameLogic = new GameLogic();
        this._currentColor = Math.random() * 10 > 5 ? "black" : "white";
    }
    getPlayerCount() {
        return this._playerList.length;
    }
    assignPlayer(player) {
        this._playerList.push(player);

        if (this._playerList.length == 2) {
            player.setPieceColor(this._playerList[0].getColor() == 'black' ? 'white' : 'black');
        }
        this.syncCurrentColor();
        this.syncBoardData();
    }
    syncCurrentColor() {
        for (let i = 0; i < this._playerList.length; i++) {
            this._playerList[i].syncCurrentColor(this._currentColor);
        }
    }

    removePlayer(playerId) {
        for (let i = 0; i < this._playerList.length; i++) {
            if (this._playerList[i].id == playerId) {
                this._playerList.splice(i, 1);
            }
        }
        if (this._playerList.length == 1) {
            this._controller.pushUnFullRoom(this);
        } else if (this._playerList.length == 0) {
            this._controller.removeRoom(this);
        }
    }
    playerChooseBoard(player, index) {
        console.log('current color = ', this._currentColor);
        console.log('player color', player.getColor());
        if (this._currentColor == player.getColor()) {
            console.log('是你在玩游戏');
            if (this._gameLogic.movePiece(index, player.getColor())) {
                this.syncBoardData();
                //如果下子成功了
                //切换棋子的颜色
                if (this._gameLogic.checkWin(index, this._currentColor)) {
                    console.log(this._currentColor, 'win');
                    //如果胜利了 ，就不允许任何人下子了
                    this.sendGameWinMsg(this._currentColor);
                    this._currentColor = 'none';
                } else {
                    this._currentColor = this._currentColor == 'black' ? 'white' : 'black';
                }
                //如果没有胜利 就进行下一步
                this.syncCurrentColor();

            }
        }
    }
    syncBoardData() {
        let boardData = this._gameLogic.getBoardData();
        for (let i = 0; i < this._playerList.length; i++) {
            this._playerList[i].syncBoardData(boardData);
        }
    }
    sendGameWinMsg(color) {
        //下发游戏胜利的消息
        for (let i = 0; i < this._playerList.length; i++) {
            this._playerList[i].sendGameWinMsg(color);
        }
        //等两秒钟，继续下发该谁游戏的消息
        setTimeout(() => {
            this._currentColor = color == 'black' ? 'white' : 'black';
            this.syncCurrentColor();
            this._gameLogic.clearGameData();
        }, 2000);

    }
}
module.exports = Room;
```
这个类也比较简单，主要讲两个地方，一个是给玩家分配颜色
```js
assignPlayer(player) {
        this._playerList.push(player);

        if (this._playerList.length == 2) {
            player.setPieceColor(this._playerList[0].getColor() == 'black' ? 'white' : 'black');
        }
        this.syncCurrentColor();
        this.syncBoardData();
    }
```
当玩家进入这个房间后，如果房间不是空的，说明已经有一个玩家在房间里面了，并且他的棋子颜色已经确定了，那么后进入的玩家，只能选择另一种颜色的棋子了，所以重新设置了一下新进来的玩家的棋子。
还有一个地方是，玩家下子
```js
playerChooseBoard(player, index) {
        console.log('current color = ', this._currentColor);
        console.log('player color', player.getColor());
        if (this._currentColor == player.getColor()) {
            console.log('是你在玩游戏');
            if (this._gameLogic.movePiece(index, player.getColor())) {
                this.syncBoardData();
                //如果下子成功了
                //切换棋子的颜色
                if (this._gameLogic.checkWin(index, this._currentColor)) {
                    console.log(this._currentColor, 'win');
                    //如果胜利了 ，就不允许任何人下子了
                    this.sendGameWinMsg(this._currentColor);
                    this._currentColor = 'none';
                } else {
                    this._currentColor = this._currentColor == 'black' ? 'white' : 'black';
                }
                //如果没有胜利 就进行下一步
                this.syncCurrentColor();

            }
        }
    }
```
这里是当我们收到玩家发来的下子的消息后，首先检测是不是允许这个玩家游戏，允许的情况下，再去给他下子，就是检测这个index上是不是存在棋子，这时候同步棋盘信息给所有玩家，之后就是胜利检测了，这个逻辑放到了game-logic.js这个类里面，下面请看代码
```js
class GameLogic {
    constructor() {
        this._pieceMap = {};
    }
    movePiece(index, color) {

        if (!this._pieceMap[index]) {
            this._pieceMap[index] = color;
            return true;
        } else {
            return false;
        }
    }
    checkWin(index, color) {
        let countMap = [0, 0, 0, 0];
        for (let j = 0; j < countMap.length; j++) {
            countMap[j] = 0;
            let value = 1;
            if (j == 1) {
                value = 15;
            }
            if (j == 2) {
                value = 16;
            }
            if (j == 3) {
                value = 14;
            }
            for (let i = -4; i < 5; i++) {
                let startIndex = index + i * value;
                if (this._pieceMap[startIndex] && this._pieceMap[startIndex] == color) {
                    countMap[j]++;
                } else {
                    countMap[j] = 0;
                }
                if (countMap[j] == 5) {
                    return true;
                }
            }
        }

        return false;
    }
    getBoardData() {
        return this._pieceMap;
    }
    clearGameData() {
        this._pieceMap = {};
    }
}
module.exports = GameLogic
```
这个类主要处理了游戏逻辑相关的操作，首先是movePiece这个方法，这里判断棋盘上的index这个位置存在不存在棋子，如果不存在的话，就返回真，并且保存上这个位置的颜色，否则就返回false，说明是下子失败。
再看checkWin，就是胜利检测的算法，也算是五子棋游戏的核心吧，其实很简单，根据最后一子进行判断四个方向，横，竖，左斜，右斜，是不是存在连续的5个相同颜色的子。首先我们找到当前子之前的第四个子作为起点，分别向右，向下，向右斜下，向右斜上四个方向遍历，只要找到相同颜色的棋子，我们的计数器就加一，一旦出现不同颜色的棋子或者没找到棋子，那么计数器就归0，最后，出现计数器等于5的时候，说明当前子胜利了。是不是很简单。
### **总结**
到这个时候在线五子棋的开发工作就结束了，这个项目目的是为了让大家知道开发网络游戏也并不是很难的事情，有不明白的小伙伴可以加我的个人qq 328387458 于我直接进行交流 或者是进入我的技术交流群 319058222 于小伙伴们一起讨论。 最后心里话送给大家：**不积跬步无以至千里，不积小流无以成江海！**

最后个大家推荐一个公众号，我的博客一旦有更新了，会在公众号里面进行通知，方便小伙伴们迅速了解更新动态。公众号里面还有大量的视频教程跟源码哦！

![erweima](/img/dingyuehao-erweima.jpg)
