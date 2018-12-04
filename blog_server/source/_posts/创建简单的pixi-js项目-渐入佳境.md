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