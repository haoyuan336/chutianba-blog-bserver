---
title: 创建简单的pixi.js项目-----渐入佳境
date: 2018-12-04 14:20:15
tags:
---
在[创建简单的pixi.js项目-----初出茅庐](/2018/12/04/创建简单的pixi-js项目/)这篇文章里面我讲到了如何创建一个本地的npm app 并且使用live-server工具在浏览器里面运行了起来。这一篇我们将继续学习，如何引入pixi.js的依赖包，并且创建pixi.js程序。
### **第一步: 下载pixi.js**
首先用编辑器(推荐使用vscode)打开我们创建好的目录也就是app目录,然后单机package.json,给这个json文件添加几个对象。
```js
"dependencies": {
    "pixi.js": "^4.6.1",
  }
```
最后的package.json是这样的
```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "echo \"Hello World\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pixi.js": "^4.6.1"
  }
}
```
新添加的这句代码的意思是，给项目添加一个依赖，依赖是pixi.js 版本是4.6.1，然后运行下面的命令在终端，
```
npm install
```
等待安装依赖包完毕后，打开之前新创建的文件index.html,添加下面的代码
```
<script src="./node_modules/pixi.js/dist/pixi.js"></script>
```
完整的index.html文件是这样的
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>学习React</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: transparent;
        }
    </style>
</head>

<body>
    <script src="./node_modules/pixi.js/dist/pixi.js"></script>
</body>

</html>
```
这时候运行live-server是没有效果的，这句代码的意思是，我们引入了pixi.js这个文件到我们的页面里面，下面我就可以用到这个文件去实现我们想要的效果了。继续敲入下面的代码在index.html文件里面
```html
<script>
var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
var bunny = PIXI.Sprite.fromImage('img/bunny.png')
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
app.stage.addChild(bunny);
app.ticker.add(function(delta) {
    bunny.rotation += 0.1 * delta;
});
</script>
```
完整的index.html文件是这样的
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>学习React</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: transparent;
        }
    </style>
</head>

<body>
    <script src="./node_modules/pixi.js/dist/pixi.js"></script>
    <script>
        var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
        document.body.appendChild(app.view);
        var bunny = PIXI.Sprite.fromImage('img/bunny.png')
        bunny.anchor.set(0.5);
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;
        app.stage.addChild(bunny);
        app.ticker.add(function(delta) {
            bunny.rotation += 0.1 * delta;
        });
        </script>
</body>

</html>
```
这时候我们去终端里面运行live-server发现页面并没有显示正常，打开控制台发现有一个资源没有找到，所以我们在app目录里面创建一个文件夹img，然后随便找一个png图片命名为bunny.png,然后重新运行live-server,是不是神奇的事情有发生了。我们下载的图片在浏览器里面疯狂的旋转着。
### **总结**
创建简单的pixi.js项目的教程到此就告一段落了，以后有了新的想法会及时更新的，下面奉上次教程的全部源码与资源地址
[https://github.com/haoyuan336/all-game-h5/tree/master/toturial/app](https://github.com/haoyuan336/all-game-h5/tree/master/toturial/app)
最后心里话献给大家：**挣钱像捡钱一样简单，只是我们懒得去捡！！！**