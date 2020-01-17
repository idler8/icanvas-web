import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Howl, Howler } from 'howler';

function AudioControlFactory(Loader) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Loader) {
    _inherits(AudioControl, _Loader);

    function AudioControl() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, AudioControl);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AudioControl)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "_mute", false);

      return _this;
    }

    _createClass(AudioControl, [{
      key: "get",
      //获取音频
      value: function get(key) {
        return this.resources[key] || AudioControl.Error || (AudioControl.Error = new Howl({}));
      } //静音

    }, {
      key: "Set",
      //加载文件
      value: function Set(url) {
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
      get: function get() {
        return this._mute;
      },
      set: function set(mute) {
        this._mute = mute;
        Howler.mute(mute);
      } //设置音量

    }, {
      key: "volume",
      set: function set() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        Howler.volume(v);
      },
      get: function get() {
        return Howler.volume();
      }
    }]);

    return AudioControl;
  }(Loader), _temp;
}

function ImageControlFactory(Loader) {
  return (
    /*#__PURE__*/
    function (_Loader) {
      _inherits(ImageControl, _Loader);

      function ImageControl() {
        _classCallCheck(this, ImageControl);

        return _possibleConstructorReturn(this, _getPrototypeOf(ImageControl).apply(this, arguments));
      }

      _createClass(ImageControl, [{
        key: "Set",
        value: function Set(url) {
          return new Promise(function (resolve, reject) {
            var image = new Image();

            image.onload = function () {
              resolve(image);
            };

            image.onerror = function (e) {
              reject(e);
            };

            image.key = image.src = url;
          });
        }
      }, {
        key: "get",
        value: function get(key) {
          return this.resources[key] || ImageControl.Error || (ImageControl.Error = new Image());
        }
      }]);

      return ImageControl;
    }(Loader)
  );
}

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

export { AudioControlFactory, Canvas, loadFont as Font, ImageControlFactory, System, TouchListen as Touch };
