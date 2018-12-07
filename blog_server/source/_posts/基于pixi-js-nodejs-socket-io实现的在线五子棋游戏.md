---
title: 基于pixi.js+nodejs+socket.io实现的在线五子棋-起源
date: 2018-12-06 16:32:49
tags:
---
#### **可以先体验一下， 点击下面的棋盘即可，房间里面没有人，把链接发给朋友试试，也许会进入同一个房间**
{% iframe http://chutianba.xyz:8000/?game-type=wuziqi-online 800 480 %}
### **前言**
五子棋是耳熟能详，老少皆宜的游戏，作为游戏开发程序员，怎么能不会开发在线五子棋呢，下面我就教大家，怎么一步步的实现在线多人五子棋游戏。
### **第一步：下载源码**
[前端源码:https://github.com/haoyuan336/all-game-h5/tree/master/games/wuziqi-online](https://github.com/haoyuan336/all-game-h5/tree/master/games/wuziqi-online)
[后端源码:https://github.com/haoyuan336/all-game-h5/tree/master/wuziqi-online-server](https://github.com/haoyuan336/all-game-h5/tree/master/wuziqi-online-server)
当然这个游戏也是之前制作的游戏合集之一，关于如何启动这个合集，我就不再赘述了，不了解的小伙伴可以传送至这里[下载预览H5游戏合集](/2018/12/02/如何本地启动天霸的所有H5游戏/);

### **第二步：创建项目**
源码下载下来之后，我们先看前端代码（用vscode打开目录all-game-h5），我们会发现一些规律，每一个游戏都独占一个目录在games目录里面。所以五子棋这个项目也是一样，我们在games目录里面新建一个目录起名字叫做wuziqi-online（下载好的源码已经存在了此目录了，最好删掉，或者用别的名称，删之前最好备份一下）,然后在这个目录里面创建一个images目录，主要放需要的美术资源，然后再创建一个src目录，主要是放代码脚本，聪明的小伙伴通过观察其他的游戏目录，是不是已经创建好了。目录都创建好了之后，我们把资源复制过来放到images目录下，然后打开终端,敲入下面的命令
```
node ./tool/resources-gen.js ./games/wuziqi-online/
```
等命令运行结束我们再看./games/wuziqi-online/这个目录，发现多了一个resource.js文件，打开文件观察一下，原来是生成了一个资源名为key，资源的路径为值的一个对象结构。具体是怎么实现的，小伙伴们可以仔细阅读./tool/resources-gen.js的源码，具体详情我就不多说了，不是今天的重点。
### **第三步：敲入代码** ###
然后我们继续，在src目录里面创建三个文件game-scene.js,game-layer.js,ui-layer.js,分别是游戏场景，游戏层，ui层。首先在game-scene.js文件里面敲入下面代码。我挑几行重点讲解一下。
```js
import { Scene, director } from './../../../util/import'
import GameLayer from './game-layer'
import UILayer from './ui-layer'
import Socket from 'socket.io-client'
import defines from './../../defines'
class GameScene extends Scene {
    constructor() {
        super();
        this.setDesignSize(800, 800 / director.sizeRate);

    }
    onLoad() {
        this._gameLayer = new GameLayer(this);
        this.addLayer(this._gameLayer);

        this._uiLayer = new UILayer();
        this.addLayer(this._uiLayer);
         //链接服务器
         let connect = Socket(defines.wuziqi_server_url);
         connect.on('login-success', (id)=>{
             console.log('login success', id);
             if (this._uiLayer){
                this._uiLayer.setPlayerId(id);
             }
         });
         connect.on('refer-game-data', (data)=>{
             console.log('refer game data', data);
            if (this._uiLayer){
                this._uiLayer.referGameData(data);
            }
        });
        connect.on('sync-current-color', (color)=>{
            console.log('同步当前的颜色', color);
            if (this._uiLayer){
                this._uiLayer.setCurrentColor(color);
            }
        });
        connect.on('sync-board-data', (data)=>{
            //同步棋盘的数据
            this._gameLayer.syncBoardData(data);
        });
        connect.on('game-win', (color)=>{
            console.log('游戏胜利', color);
            this._uiLayer.showGameWin(color);
        });
        this._connect = connect;
    }
    chooseBoard(index){ 
        if (this._connect){
            this._connect.emit('choose-board', index);
        }
    }
}
export default GameScene;
```
1行，引入Scene，与director类（注意这里的director是一个实例，所以首字母为小写，这个项目的命名习惯是，类的首字母大写，实例的首字母小写）。
2行，引入GameLayer类，这个后面会补充源码，主要是渲染棋子，棋盘等。
3行，引入UILayer类,主要是负责，渲染房间信息，展示游戏胜利界面。
4行，这一行，是引入长链接工具Socke.IO，我们使用这个工具实现长链接通讯。
然后我们实现了GameScene这个类，我们使用了js的es6 语法，直接使用class修饰符来创建类，并且集成自Scene，关于Scene的实现，直接去看源码吧，这里就不详细讲解了。
9行，是设置一下场景的设计尺寸，为了方便屏幕适配，
再看下面，我们创建了GameLayer的实例，还有UILayer的实例,并且把他们作为属性挂在了this上，就是当前的这个类，看命名方式是不是有点奇怪，这是为了区分私有变量，因为js是没有私有变量这个概念的，所以我们在命名的时候首字母加一个下横线，代表私有变量，虽然这个变量在外部也是可以访问到的，但是我们在写代码的时候，见到这个变量就尽量不去访问，算是一种约定俗成的规定吧。
19行，我们创建了一个Socket的实例，尝试去链接长链接服务器，这时候是连不上服务器的，因为我们还没有写服务器的代码。
后面几行我们监听了几个长链接消息分别是:

**login-success** 登录成功的消息,在这个消息里面我们拿到了玩家的id，我们告诉ui层，显示玩家的id
**refer-game-data** 刷新游戏数据，这个消息里面我们拿到了一些数据，包括房间信息，房间人数，空房间的个数，玩游戏的总人数等等，把这个数据告诉ui层，让他分别把这些信息显示出来。
**sync-current-color**同步当前下子的颜色，就是说该谁下子了，也是让ui层来显示的，我们这里是用大小来区分的，收到消息后，相同颜色的棋子会变大，这样来区分该那个颜色的棋子下了。
**sync-board-data** 同步当前棋盘的信息，这个消息，我们拿到的数据是，当前下的棋子的map，key为棋盘的index，value是棋子的颜色。这个index的定义，先简单介绍一个，棋牌室**15x15**个格子，从第一个格子开始算起是0 ，第二个格子是1，那么第i行 第j个格子的index就是 **ix15+j**，这里说的格子是线与线的交叉点包括边角。
**game-win** 游戏胜利的消息，这个消息，我们拿到了数据是，胜利的颜色。这个是让ui层去显示游戏胜利的界面的。
以上消息都是监听的消息，也就是说需要收到服务器的消息，下面一条，也是唯一一条是客户端发给服务器的消息，也就是玩家点击屏幕的下子的消息。
**choose-board**
这个消息里面包含了下子的index。
### **总结**
这一篇主要讲了，GameScene的实现，因为做教程的原因，我一股脑把代码都贴在这里，再实际游戏开发的过程中肯定不是这样的，是服务端代码跟客户端代码同时进行开发的，每一个接口都是一边调试一边开发的，所以这里请大家谅解。最后心里话送给大家,**我们总在质疑做游戏能挣钱么，我可以明确的告诉你不做肯定不挣钱。** 更多内容请看下一篇[基于pixi.js+nodejs+socket.io实现的在线五子棋-进化](/2018/12/07/基于pixi-js-nodejs-socket-io实现的在线五子棋-进化/)