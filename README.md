# **iCanvas-Web扩展**
![npm](https://img.shields.io/npm/dm/@icanvas/core-web) ![NPM](https://img.shields.io/npm/l/@icanvas/core-web) ![npm](https://img.shields.io/npm/v/@icanvas/core-web) ![npm bundle size](https://img.shields.io/bundlephobia/min/@icanvas/core-web)
## 安装
```bash
    npm install -s @icanvas/core-web
```
## 调用
### umd/es6
es6调用完整支持Tree Shake
```javascript
    import * as ICanvas from '@icanvas/core';
    import * as ICanvasWeb from '@icanvas/core-web';
    // OR
    const ICanvas = require('@icanvas/core');
    const ICanvasWeb = require('@icanvas/core-web');
```

## API列表

### 资源加载包
#### [浏览器图片资源管理器构造函数](src/resources/lib/image.js#L25)`ICanvasWeb.ResourceImage`
#### [浏览器音频资源管理器构造函数](src/resources/lib/audio.js#L70)`ICanvasWeb.ResourceAudio`

### 特性包
#### [浏览器生成Canvas方法](src/apis/wxgame/canvas.js)`ICanvasWeb.ApiCanvas`
#### [浏览器获取系统属性方法](src/apis/wxgame/system.js)`ICanvasWeb.ApiSystem`
#### [浏览器自定义字体加载函数](src/wxgame/font.js)`ICanvas.ApiFont`
#### [浏览器触摸监听传递](src/wxgame/touch.js)`ICanvas.ApiTouch`
