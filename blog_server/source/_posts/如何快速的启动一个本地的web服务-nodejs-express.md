---
title: 如何快速的启动一个本地的web服务-nodejs+express
date: 2018-12-02 00:22:23
tags:
---
实现web服务的方式有很多种，今天给大家介绍一种最简单的方式那就是express
### **1.安装[nodejs](https://nodejs.org)** (已经安装过的就略过，没有安装的点击查看详情)
### **2.安装express生成器**
打开终端，输入命令:
**npm install express-generator -g**
### **3.创建工程**
终端里面运行下面的命令:
**express  myapp**
### **4.安装依赖包**
还是刚才的终端云进行下面的命令:
**cd myapp**
**npm install**
等待安装完成
### **5.启动**
最后一步启动程序
**npm start**
然后打开浏览器，地址栏里面输入**localhost:3000**
这是看到的是express等的相关字样，这是express程序启动的默认页面，我们可以去public目录下面新建一个文件，命名为 index.html,然后将下面代码拷贝进去
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
hello world
</body>
</html>
```
 然后这时候刷新浏览器，是不是神奇的事情发生了。
 ### **总结**
 很简单的操作，没什么好说的，最后心里话送给大家，**每天进步一点点，早晚有一天梦想会实现！！！**