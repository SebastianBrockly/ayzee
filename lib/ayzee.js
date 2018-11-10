(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ayzee", [], factory);
	else if(typeof exports === 'object')
		exports["ayzee"] = factory();
	else
		root["ayzee"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RegistryElement = function RegistryElement(target, subscriptions) {
  var _this = this;

  _classCallCheck(this, RegistryElement);

  this.on = function (type, handler) {
    _this.subscriptions.push({
      type: type,
      handler: handler
    });
  };

  this.off = function (type, handler) {
    _this.subscriptions = _this.subscriptions.filter(function (s) {
      return !(s.handler === handler && s.type === type);
    });
  };

  this.setVisible = function (visible) {
    _this.visible = visible;
  };

  this.check = function (isIntersecting) {
    _this.subscriptions.forEach(function (_ref) {
      var type = _ref.type,
          handler = _ref.handler;

      if (isIntersecting) {
        if (type === 'enter' && !_this.visible) {
          handler(_this.target);
        }
      }

      if (!isIntersecting) {
        if (type === 'exit' && _this.visible) {
          handler(_this.target);
        }
      }
    });

    _this.setVisible(isIntersecting);
  };

  this.target = target;
  this.subscriptions = this.subscriptions || [];
  this.visible = false;
};

var ObserverRegistry =
/*#__PURE__*/
function () {
  function ObserverRegistry(options) {
    var _this2 = this;

    _classCallCheck(this, ObserverRegistry);

    this.callback = function (observables) {
      observables.forEach(function (observable) {
        var registryElement = _this2.registry.find(function (reg) {
          return reg.target === observable.target;
        });

        if (!registryElement) {
          return;
        }

        registryElement.check(observable.isIntersecting);
      });
    };

    this.registry = [];
    this.options = options || {};
    this.observer = new IntersectionObserver(this.callback, this.options);
  }

  _createClass(ObserverRegistry, [{
    key: "add",
    value: function add(el) {
      var _this3 = this;

      var registryElement = new RegistryElement(el);
      this.registry.push(registryElement);
      this.observer.observe(el);
      return {
        on: registryElement.on,
        off: function off() {
          _this3.observer.unobserve(el);

          return registryElement.off;
        }
      };
    }
  }, {
    key: "remove",
    value: function remove(el) {
      this.registry = this.registry.filter(function (r) {
        return r.target !== el;
      });
      this.observer.unobserve(el);
    }
  }]);

  return ObserverRegistry;
}();

var _default = ObserverRegistry;
exports.default = _default;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=ayzee.js.map