import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import { Howl, Howler } from 'howler';

/**
 * 获得一个canvas对象
 *
 * @param {String} key 特殊模版标识
 *
 * 打包模式为web时
 * key取main则该canvas将上屏
 */
function Canvas(width, height) {
  if (!Canvas.main) document.body.appendChild(Canvas.main = document.createElement('canvas'));
  if (width == 'main') return Canvas.main;
  var canvas = document.createElement('canvas');
  if (width > 0) canvas.width = width;
  if (height > 0) canvas.height = height;
  return canvas;
}

function loadFont(url) {
  var key = 'Font' + Date.now();
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = "\n            @font-face {\n                font-family: '".concat(key, "';\n                src: url('").concat(url, "'); \n            }\n            body {\n                font-family: '").concat(key, "';\n            }\n        ");
  document.body.appendChild(style);
  return key;
}

/**
 * 获取系统参数
 * pixel 屏幕与设备像素比
 * width 屏幕宽度
 * height 屏幕高度
 * ratio 宽高比
 */
function System() {
  System.pixel = window.devicePixelRatio || 2;
  System.width = document.body.clientWidth;
  System.height = document.body.clientHeight;
  System.ratio = System.width / System.height;
  return System;
}

function GetTouchEvent(MouseEvent) {
  return {
    identifier: 0,
    changedTouches: [{
      clientX: MouseEvent.clientX,
      clientY: MouseEvent.clientY
    }]
  };
}

function MouseListen() {
  return function (event) {
    var DownState = false;
    window.document.body.addEventListener('mousedown', function (e) {
      return DownState = true, event.start(GetTouchEvent(e));
    }, {
      passive: true
    });
    window.document.body.addEventListener('mousemove', function (e) {
      return DownState && event.move(GetTouchEvent(e));
    }, {
      passive: true
    });
    window.document.body.addEventListener('mouseup', function (e) {
      return DownState && (DownState = false, event.end(GetTouchEvent(e)));
    }, {
      passive: true
    });
    window.document.body.addEventListener('mouseout', function (e) {
      return DownState && (DownState = false, event.end(GetTouchEvent(e)));
    }, {
      passive: true
    });
  };
}
/**
 * 将dom元素触摸事件和Touch类进行关联
 * @param {HTMLElement} dom
 * @param {ICanvas.UtilTouch} Touch
 */


function TouchListen(useMouse) {
  if (useMouse) return MouseListen();
  return function (event) {
    window.document.body.addEventListener('touchstart', function (e) {
      return event.start(e);
    }, {
      passive: true
    });
    window.document.body.addEventListener('touchmove', function (e) {
      return event.move(e);
    }, {
      passive: true
    });
    window.document.body.addEventListener('touchend', function (e) {
      return event.end(e);
    }, {
      passive: true
    });
    window.document.body.addEventListener('touchcancel', function (e) {
      return event.end(e);
    }, {
      passive: true
    });
  };
}

var Image =
/*#__PURE__*/
function () {
  function Image() {
    _classCallCheck(this, Image);
  }

  _createClass(Image, [{
    key: "load",
    value: function load(url) {
      return new Promise(function (resolve, reject) {
        var image = new window.Image();

        image.onload = function () {
          resolve(image);
        };

        image.onerror = function (e) {
          reject(e);
        };

        image.key = image.src = url;
      });
    }
  }]);

  return Image;
}();

var Audio =
/*#__PURE__*/
function () {
  function Audio() {
    _classCallCheck(this, Audio);
  }

  _createClass(Audio, [{
    key: "load",
    value: function load(url) {
      return new Promise(function (resolve, reject) {
        var audio = new Howl({
          src: url,
          loop: false,
          autoplay: false
        });
        audio.once('load', function () {
          audio.key = url;
          resolve(audio);
        });
      });
    }
  }, {
    key: "mute",
    value: function mute(_mute) {
      return Howler.mute(_mute);
    }
  }, {
    key: "volume",
    value: function volume(v) {
      return Howler.volume(v);
    }
  }]);

  return Audio;
}();

function GetMainCanvasOffset(canvas, realWidth, realHeight) {
  var offsetWidth = realWidth;
  var offsetLeft = 0;
  var offsetHeight = realHeight;
  var offsetTop = 0;
  var ratio = realWidth / realHeight;

  if (ratio < 0.4) {
    offsetHeight = realWidth / 750 * 1334;
    offsetTop = (realHeight - offsetHeight) / 2;
    ratio = 750 / 1334;
  } else if (ratio > 0.8) {
    offsetWidth = realHeight / 1334 * 750;
    offsetLeft = (realWidth - offsetWidth) / 2;
    ratio = 750 / 1334;
  }

  canvas.style.position = 'absolute';
  canvas.style.top = offsetTop + 'px';
  canvas.style.left = offsetLeft + 'px';
  canvas.style.width = offsetWidth + 'px';
  canvas.style.height = offsetHeight + 'px';
  return {
    x: offsetLeft,
    y: offsetTop,
    width: offsetWidth,
    height: offsetHeight,
    ratio: ratio
  };
}

export { Audio, Canvas, loadFont as Font, GetMainCanvasOffset, Image, System, TouchListen as Touch };
