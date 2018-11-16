# 基于pixi.js引擎开发的h5游戏，持续更新
## 线上预览地址 http://chutianba.xyz/games/index.html
## 欢迎进群交流 319058222
## 或者加个人qq 328387458 直接进行交流

# 游戏
## 目前完成的游戏有切水果，正在做的游戏有捕鱼达人 ，将来打算做的游戏有斗地主，扔飞镖，五子棋等。

# 路径结构
```
|-chutianbawebserver
   |-server
   |-webserver
     |-games
       |-bezier-editor
       |-catch-fish
       |-cut-fruit
         |-images
         |-src
           |-fruit.js
           |-game-layer.js
           |-ready-layer.js
           |-game-scene.js
         |-resources.js
       |-.....
       |-game-content.js
       |-global.js
       |-resources-manager.js
     |-tools
       |-plist-to-resource-map.js
       |-plist2json.js
       |-resources-gen.js
       |-server-build.js
     |-util
       |-common
         |-state.js
       |-math
         |-bezier.js
         |-rect.js
         |-vec2.js
       |-render
         |-animate.js
         |-button.js
         |-director.js
         |-graphics.js
         |-label.js
         |-layer.js
         |-scene.js
         |-sprite.js
       |-import.js
     |-index.css
     |-index.js
     |-index.html
     |-package.json
```

# 命令

## 1.git clone https://github.com/haoyuan336/chutianbawebserver.git
## 2.cd webserver
## 3.npm install
## 4.npm run build
## 5.npm start
## 6 打开浏览器输入 localhost:8000


# tool 工具说明
## 1资源整合工具  路径 ./tool/resources-gen.js
   ### 说明
   #### 将相应的路径的资源包括图片资源 json资源等，按照文件名对应目录的形式写入一个js文件，方便游戏开发中对文件资源的引用
   ### 命令
   #### node ./tool/resources-gen.js ./game/cut-fruit/   (前者为脚本目录，后者为游戏目录)
   
   
## 2plist转换js工具 路径 ./tool/plist-to-resource-map.js
   ### 说明
   #### 将相应目录里面的plist文件,也就是合图的配置文件，转成成 文件名 + source + map.js 文件，文件里面为合图的资源名称，方便游戏开发中对资源的使用。
   ### 命令
   #### node ./tool/plist-to-resource-map.js ./game/cut-fruit/   (前者为脚本目录，后者为游戏目录)
   
   
## 3plist转换json工具 路径 ./tool/plist2json.js
   ### 说明
   #### 将相应目录里面的plist文件 ，也就是合图的配置文件 转换成json文件
   ### 命令
   #### node ./tool/plist2json.js ./game/cut-fruit/   (前者为脚本目录，后者为游戏目录)


