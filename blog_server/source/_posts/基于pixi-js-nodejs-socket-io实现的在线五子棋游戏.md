---
title: 基于pixi.js+nodejs+socket.io实现的在线五子棋游戏
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
等命令运行结束我们再看./games/wuziqi-online/这个目录，发现多了一个resource.js文件，打开文件观察一下，原来是生成了一个资源名为key，资源的路径为值的一个对象结构。具体是怎么实现的，小伙伴们可以仔细阅读./tool/resources-gen.js的源码，具体详情我就不多说了，不是今天的重点。然后我们继续，在src目录里面创建三个文件game-scene.js,game-layer.js,ui-layer.js,分别是游戏场景，游戏层，ui层。