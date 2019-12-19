import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Howl, Howler } from 'howler';

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

/**
 * 获得一个canvas对象
 *
 * @param {String} key 特殊模版标识
 *
 * 打包模式为web时
 * key取main则该canvas将上屏
 */
function Canvas(key) {
  if (key && Canvas[key]) return Canvas[key];
  var canvas = document.createElement('canvas');
  if (key == 'main') document.body.appendChild(canvas);
  return key ? Canvas[key] = canvas : canvas;
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

function GetTouchEvent(dom, MouseEvent) {
  return {
    identifier: 0,
    changedTouches: [{
      clientX: MouseEvent.clientX - dom.offsetLeft,
      clientY: MouseEvent.clientY - dom.offsetTop
    }]
  };
}

function MouseListen(dom, Touch) {
  var DownState = false;
  dom.addEventListener('mousedown', function (e) {
    return DownState = true, Touch.onTouchStart(GetTouchEvent(dom, e));
  }, {
    passive: true
  });
  dom.addEventListener('mousemove', function (e) {
    return DownState && Touch.onTouchMove(GetTouchEvent(dom, e));
  }, {
    passive: true
  });
  dom.addEventListener('mouseup', function (e) {
    return DownState && (DownState = false, Touch.onTouchEnd(GetTouchEvent(dom, e)));
  }, {
    passive: true
  });
  dom.addEventListener('mouseout', function (e) {
    return DownState && (DownState = false, Touch.onTouchEnd(GetTouchEvent(dom, e)));
  }, {
    passive: true
  });
}
/**
 * 将dom元素触摸事件和Touch类进行关联
 * @param {HTMLElement} dom
 * @param {ICanvas.UtilTouch} Touch
 */


function TouchListen(dom, Touch) {
  if (!('ontouchstart' in window)) return MouseListen(dom, Touch);
  dom.addEventListener('touchstart', function (e) {
    return Touch.onTouchStart(e);
  }, {
    passive: true
  });
  dom.addEventListener('touchmove', function (e) {
    return Touch.onTouchMove(e);
  }, {
    passive: true
  });
  dom.addEventListener('touchend', function (e) {
    return Touch.onTouchEnd(e);
  }, {
    passive: true
  });
  dom.addEventListener('touchcancel', function (e) {
    return Touch.onTouchEnd(e);
  }, {
    passive: true
  });
}

export { Canvas as ApiCanvas, loadFont as ApiFont, System as ApiSystem, TouchListen as ApiTouch, AudioControlFactory as ResourceAudio, ImageControlFactory as ResourceImage };
