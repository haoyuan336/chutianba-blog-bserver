---
title: 创建简单的pixi.js项目-----初出茅庐
date: 2018-12-04 10:36:28
tags:
---
pixi.js是一款短小精悍的H5渲染引擎，是基于webGL实现的，所以性能非常的高，pixi.js可以用来制作H5特效，H5动画等等，被广泛应用于广告，游戏等行业，下面我就介绍一下，如何用pixi.js创建一个简单的H5游戏项目。
### **第一步:准备工作**
首先要保证电脑安装了nodejs。打开终端输入 
```
npm -v
```
如果显示的是
```
6.4.1
```
说明本地存在nodejs 并且npm版本是 6.4.1(npm是nodejs的包管理工具)如果你本地没有安装nodejs，那么点击[这里](https://nodejs.org)去下载安装.
我们还需要一个工具，可以迅速启动一个webserver的工具live-server，在终端运行
```
npm install -g live-server
```
安装好之后，备用。
### **第二步:创建目录**
还是刚才的终端，进入一个合适的目录(任意目录) ，然后敲入下列命令并回车
```
mkdir app //名字任选，不要跟次目录里面其他文件重名
```
这句的意思是，创建一个以app为名称的目录,继续
```
cd app //进入刚刚创建好的目录
```
```
npm init //运行npm的初始化工具
```
这时候我们一路回车，其实这里是让你填写一下初始化信息，这些都是可以修改的，所以都选择默认值。
接下来运行命令,
**linux下**
```
ls
```
**window下**
```
dir
```
小伙伴们根据自己的系统选择命令,我们看到此目录多了一个文件
```
package.json
```
我们用编辑器(推荐是用vscode)打开app这个目录，看一下这个.json文件里面都有些什么
```
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```
看到这里我们发现有点眼熟，这些就是刚刚创建的时候，需要我们填写的内容，不过我们都选择了默认值，这里别的不讲，着重讲一个scripts，这个意思是说，可以使用npm命令直接运行的脚本命令，打开编辑器的终端工具(vscode是点击Terminal->new Terminal), 然后敲入命令
```
npm test
```
是不是神奇的事情发生了，终端打印出来下面的内容
```
> app@1.0.0 test /Users/workspace/app
> echo "Error: no test specified" && exit 1

Error: no test specified
npm ERR! Test failed.  See above for more details.
```
我们把scripts里面加一个字段试试，将package.json改成下面的内容

```
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"，
    "start": "echo \"Hello World""
  },
  "author": "",
  "license": "ISC"
}

```
然后终端里面敲入下面命令
```
npm start
```
终端里面打印出来了下面的字段
```
> app@1.0.0 start /Users/workspace/app
> echo "Hello World"

Hello World
```
到这里我们就学会了如何写脚本命令了，那么下一步我们用vscode新建一个文件index.html, 并且把下面的代码拷贝进去
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
<h1>Hello World</h1>
</body>

</html>
```
这时候我们在终端里面敲入下面的命令，也就用到了上面安装的live-server工具
```
live-server
```
是不是神奇的事情发生了，我们的电脑自动打开了一个浏览器页面，并且里面赫然写着几个大字，Hello World
这一期的内容就是这些了，想要继续学习，点击下一篇[创建简单的pixi.js项目-----渐入佳境](/2018/12/04/创建简单的pixi-js项目-渐入佳境/)