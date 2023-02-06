// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    BATTLE: "BATTLE"
  }
};
exports.CST = CST;
},{}],"src/helpers/font.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFont = loadFont;
function loadFont(name, url) {
  var newFont = new FontFace(name, 'url(${url})');
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}
},{}],"src/helpers/classes/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _font = require("../font");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
// loadFont("font1", "./assets/PixelboyFont.ttf");
var Button = /*#__PURE__*/function (_Phaser$GameObjects$T) {
  _inherits(Button, _Phaser$GameObjects$T);
  var _super = _createSuper(Button);
  function Button(x, y, label, scene, callback, bgColour) {
    var _this;
    _classCallCheck(this, Button);
    // const button = scene.add.text(x, y, label)
    //     .setOrigin(0, 0)
    //     .setPadding(8, 15)
    //     .setStyle({ backgroundColor: '#202529'})
    //     .setInteractive({ useHandCursor: true })
    //     .on('pointerdown', () => callback())
    _this = _super.call(this, scene, x, y, label);
    _this.padding = {
      x: 8,
      y: 15
    };
    _this.setOrigin(1, 0.5);
    _this.setPadding(_this.padding.x, _this.padding.y);
    _this.setStyle({
      backgroundColor: bgColour
    });
    _this.on('pointerdown', function () {
      return callback();
    });
    scene.add.existing(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Button, [{
    key: "changeCursor",
    value: function changeCursor() {
      this.setInteractive({
        useHandCursor: true
      });
    }
  }, {
    key: "changePadding",
    value: function changePadding(newX, newY) {
      this.padding = {
        x: newX,
        y: newY
      };
      this.setPadding(this.padding.x, this.padding.y);
    }
  }, {
    key: "changeOrigin",
    value: function changeOrigin(newX, newY) {
      if (0 <= newX <= 1 && 0 <= newY <= 1) {
        this.setOrigin(newX, newY);
      }
    }
  }]);
  return Button;
}(Phaser.GameObjects.Text);
exports.default = Button;
},{"../font":"src/helpers/font.js"}],"src/helpers/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOptions = exports.cardBackDimensions = void 0;
var gameOptions = {
  deck: 6,
  startCards: 5,
  cardWidth: 260,
  cardHeight: 410,
  cardDistance: 100,
  cardAngle: 3,
  cardYOffset: 10
};
exports.gameOptions = gameOptions;
var cardBackDimensions = {
  backWidth: 130,
  backHeight: 205
};
exports.cardBackDimensions = cardBackDimensions;
},{}],"src/helpers/classes/VisualCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../config.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var VisualCard = /*#__PURE__*/function (_Phaser$GameObjects$S) {
  _inherits(VisualCard, _Phaser$GameObjects$S);
  var _super = _createSuper(VisualCard);
  function VisualCard(x, y, scene, sprite, frame, id, cost) {
    var _this;
    _classCallCheck(this, VisualCard);
    _this = _super.call(this, scene, x, y, sprite, frame);
    _this.id = id;
    _this.cost = cost;
    scene.add.existing(_assertThisInitialized(_this));
    _this.cardInHand(scene);
    return _this;
  }
  _createClass(VisualCard, [{
    key: "cardInHand",
    value: function cardInHand(scene) {
      this.visible = !this.visible;
      this.setInteractive();
      scene.input.setDraggable(this);
      this.setOrigin(0.5, 1);

      // Minimises the cards initial display size
      this.displayWidth = _config.gameOptions.cardWidth / 2;
      this.displayHeight = _config.gameOptions.cardHeight / 2;
    }
  }]);
  return VisualCard;
}(Phaser.GameObjects.Sprite);
exports.default = VisualCard;
},{"../config.js":"src/helpers/config.js"}],"src/helpers/classes/Zone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Zone = /*#__PURE__*/function (_Phaser$GameObjects$Z) {
  _inherits(Zone, _Phaser$GameObjects$Z);
  var _super = _createSuper(Zone);
  function Zone(scene, width, height, x, y) {
    var _this;
    _classCallCheck(this, Zone);
    (_this = _super.call(this, scene, x, y, width, height)).setRectangleDropZone(x, y);
    scene.add.existing(_assertThisInitialized(_this));
    _this.normalZone = 0xffff00; // yellow
    _this.activeZone = 0x00ffff; // lightblue / turquoise 

    _this.zoneOutline = scene.add.graphics();
    _this.renderNormalOutline(scene);

    // scene.input.on('dragenter', function(pointer, gameObject, dropZone) {
    //     console.log(this);
    //     this.renderActiveOutline();
    // });

    // scene.input.on('dragleave', function(pointer, gameObject, dropZone) {
    //     this.renderNormalOutline();
    // }); 
    return _this;
  }
  _createClass(Zone, [{
    key: "renderNormalOutline",
    value: function renderNormalOutline() {
      this.zoneOutline.clear();
      this.zoneOutline.lineStyle(2, this.normalZone);
      this.zoneOutline.strokeRect(this.x - this.input.hitArea.width / 2, this.y - this.input.hitArea.height / 2, this.input.hitArea.width, this.input.hitArea.height);
    }
  }, {
    key: "renderActiveOutline",
    value: function renderActiveOutline() {
      this.zoneOutline.clear();
      this.zoneOutline.lineStyle(2, this.activeZone);
      this.zoneOutline.strokeRect(this.x - this.input.hitArea.width / 2, this.y - this.input.hitArea.height / 2, this.input.hitArea.width, this.input.hitArea.height);
    }
  }]);
  return Zone;
}(Phaser.GameObjects.Zone);
exports.default = Zone;
},{}],"src/helpers/classes/characters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Character = /*#__PURE__*/function (_Phaser$GameObjects$S) {
  _inherits(Character, _Phaser$GameObjects$S);
  var _super = _createSuper(Character);
  function Character(scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, Character);
    _this = _super.call(this, scene, x, y, sprite);
    _this.health = 50;
    return _this;
  }
  return _createClass(Character);
}(Phaser.GameObjects.Sprite);
exports.default = Character;
},{}],"src/helpers/classes/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _characters = _interopRequireDefault(require("./characters"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Player = /*#__PURE__*/function (_Character) {
  _inherits(Player, _Character);
  var _super = _createSuper(Player);
  function Player(scene, x, y, sprite, deck) {
    var _this;
    _classCallCheck(this, Player);
    _this = _super.call(this, scene, x, y, sprite);
    _this.actionPoints = 6;
    _this.deck = deck;
    scene.add.existing(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Player, [{
    key: "getHealth",
    value: function getHealth() {
      return this.health;
    }
  }, {
    key: "setHealth",
    value: function setHealth(health) {
      this.health = health;
    }
  }, {
    key: "getActionPoints",
    value: function getActionPoints() {
      return this.actionPoints;
    }
  }, {
    key: "setActionPoints",
    value: function setActionPoints(actionPoints) {
      this.actionPoints = actionPoints;
    }
  }, {
    key: "getDeck",
    value: function getDeck() {
      return this.deck;
    }
  }]);
  return Player;
}(_characters.default);
exports.default = Player;
},{"./characters":"src/helpers/classes/characters.js"}],"src/helpers/classes/deck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deckArray = void 0;
exports.deckSetUp = deckSetUp;
exports.handArray = exports.graveYardArray = exports.deckTrackerArray = void 0;
exports.shuffle = shuffle;
var _config = require("../config.js");
var handArray = [];
exports.handArray = handArray;
var deckArray = [];
exports.deckArray = deckArray;
var deckTrackerArray = [];
exports.deckTrackerArray = deckTrackerArray;
var graveYardArray = [];
exports.graveYardArray = graveYardArray;
function deckSetUp(scene, array, arrayTracker) {
  var x = scene.game.config.width / 25;
  var y = scene.game.config.height / 1.24;
  for (var i = 0; i < array.length; i++) {
    var cardBack = scene.add.sprite(x, y, 'cardBack');
    cardBack.setOrigin(0.5, 1);
    cardBack.displayWidth = _config.cardBackDimensions.backWidth / 2;
    cardBack.displayHeight = _config.cardBackDimensions.backHeight / 2;
    arrayTracker.push(cardBack);
    x += 4;
  }
}

// implementing Durstenfeld shffle, an optimised version of Fisher-Yates
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}
},{"../config.js":"src/helpers/config.js"}],"src/scenes/BattleScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScene = void 0;
var _CST = require("../CST.js");
var _button = _interopRequireDefault(require("../helpers/classes/button.js"));
var _VisualCard = _interopRequireDefault(require("../helpers/classes/VisualCard.js"));
var _config = require("../helpers/config.js");
var _Zone = _interopRequireDefault(require("../helpers/classes/Zone.js"));
var _player = _interopRequireDefault(require("../helpers/classes/player.js"));
var _deck = require("../helpers/classes/deck.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var BattleScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(BattleScene, _Phaser$Scene);
  var _super = _createSuper(BattleScene);
  function BattleScene() {
    _classCallCheck(this, BattleScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.BATTLE
    });
  }
  _createClass(BattleScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("HUD", "./assets/hud_bg.png");
      this.load.image("background", "./assets/background.png");
      this.load.image("card_holder", "./assets/card_holder.jpg");
      this.load.image("guy", "./assets/sprites/player_green_glasses.png");
      this.load.image("heart", "./assets/sprites/heart.png");
      this.load.spritesheet("cards", "./assets/sprites/spritesheet.png", {
        frameWidth: _config.gameOptions.cardWidth,
        frameHeight: _config.gameOptions.cardHeight
      });
      this.load.image("cardBack", "./assets/sprites/cardBack.png");
      this.load.image("sword", "./assets/sprites/sword.png");
    }
  }, {
    key: "create",
    value: function create() {
      var gameWidth = this.game.config.width;
      var gameHeight = this.game.config.height;
      var hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
      var card_bg = this.add.image(0, 0, "card_holder");
      var bg = this.add.sprite(0, 0, "background");
      hud_bg.setScale(2);
      card_bg.setPosition(gameWidth / 2, gameHeight);
      card_bg.setScale(0.325);
      bg.setPosition(gameWidth / 2, gameHeight / 2.6);
      bg.setScale(0.65);
      var player = new _player.default(this, 0, 0, "guy", _deck.handArray);
      player.setPosition(gameWidth / 4, gameHeight / 1.65);
      player.setScale(3);
      var heart = this.add.image(0, 0, "heart");
      var heartext = this.add.text(0, 0, player.getHealth(), {
        color: "black",
        fontSize: "30px"
      });
      heart.setScale(4);
      heartext.setPosition(-18, -18);
      var health = this.add.container(0, 0, [heart, heartext]);
      health.setPosition(gameWidth / 20, gameHeight / 2.2);
      var chamber = this.add.circle(0, 0, 30, 0xffcc00);
      var actiontext = this.add.text(0, 0, player.getActionPoints(), {
        color: "black",
        fontSize: "30px"
      });
      actiontext.setPosition(-10, -18);
      var actions = this.add.container(0, 0, [chamber, actiontext]);
      actions.setPosition(gameWidth / 20, gameHeight / 1.75);
      for (var i = 0; i < _config.gameOptions.startCards; i++) {
        // creates cards from spritesheet and makes them draggable
        var card = new _VisualCard.default(this.game.config.width / 2 - _config.gameOptions.cardDistance, this.game.config.height, this, 'cards', i, i, 2);
        _deck.deckArray.push(card);
      }
      var card1 = new _VisualCard.default(this.game.config.width / 2 - _config.gameOptions.cardDistance, this.game.config.height, this, 'cards', 0, 6, 2);
      _deck.deckArray.push(card1);

      // Button to end turn
      var endTurnButton = new _button.default(gameWidth, gameHeight / 2, 'End Turn', this, this.endTurn.bind(this), '#202529');
      endTurnButton.changeCursor();

      // zone where cards can be dropped and activated
      var dropZone = new _Zone.default(this, 500, 300, 300, 300);
      (0, _deck.shuffle)(_deck.deckArray);
      (0, _deck.deckSetUp)(this, _deck.deckArray, _deck.deckTrackerArray);
      this.input.on('dragstart', function (pointer, gameObject) {
        this.tweens.add({
          targets: gameObject,
          angle: 0,
          x: pointer.x,
          y: pointer.y,
          duration: 50
        });
        this.tweens.add({
          targets: this.background,
          alpha: 0.3,
          duration: 50
        });
        var index = _deck.handArray.indexOf(gameObject);
        if (index !== -1) {
          _deck.handArray.splice(index, 1);
        }
        this.arrangeCardsInCenter(_deck.handArray);
      }, this);
      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      // hover over listener
      this.input.on('gameobjectover', function (pointer, gameObject) {
        if (gameObject.type === "Sprite" && _deck.handArray.includes(gameObject)) {
          this.tweens.add({
            targets: gameObject,
            angle: 0,
            displayWidth: _config.gameOptions.cardWidth,
            displayHeight: _config.gameOptions.cardHeight,
            depth: 100,
            duration: 10
          });
        }
      }, this);

      // hover out listener
      this.input.on('gameobjectout', function (pointer, gameObject) {
        if (gameObject.type === "Sprite" && _deck.handArray.includes(gameObject)) {
          this.tweens.add({
            targets: gameObject,
            angle: gameObject.startPosition.angle,
            displayWidth: _config.gameOptions.cardWidth / 2,
            displayHeight: _config.gameOptions.cardHeight / 2,
            depth: gameObject.startPosition.depth,
            duration: 10
          });
        }
      }, this);
      this.input.on('dragenter', function (pointer, gameObject, dropZone) {
        dropZone.renderActiveOutline();
      });
      this.input.on('dragleave', function (pointer, gameObject, dropZone) {
        dropZone.renderNormalOutline();
      });
      this.input.on('drop', function (pointer, gameObject, dropZone) {
        gameObject.input.enabled = false;

        // setting card in the middle 
        gameObject.displayWidth = _config.gameOptions.cardWidth / 2;
        gameObject.displayHeight = _config.gameOptions.cardHeight / 2;
        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y + dropZone.y / 3;
        _deck.graveYardArray.push(gameObject);

        // remove the card from the scene after 500ms
        setTimeout(function () {
          gameObject.destroy();
        }, 500);
        dropZone.renderNormalOutline(this);
        this.cameras.main.shake(100, 0.02);
      });
      this.input.on("dragend", function (pointer, gameObject, dropped) {
        if (!dropped) {
          _deck.handArray.push(gameObject);
          gameObject.displayHeight = _config.gameOptions.cardHeight / 2;
          gameObject.displayWidth = _config.gameOptions.cardWidth / 2;
          this.arrangeCardsInCenter(_deck.handArray);
        }
      }, this);
    }
  }, {
    key: "arrangeCardsInCenter",
    value: function arrangeCardsInCenter(handArray) {
      var bottomOfScreen = this.game.config.height;
      var screenCenterX = this.game.config.width / 2;
      var yDelta = _config.gameOptions.cardYOffset * Math.floor(handArray.length / 2);
      for (var i = 0; i < handArray.length; i++) {
        var card = handArray[i];
        var cardX = screenCenterX + (i - (handArray.length - 1) / 2) * _config.gameOptions.cardDistance;
        var cardAngle = (i - (handArray.length - 1) / 2) * _config.gameOptions.cardAngle;
        card.x = cardX;
        card.y = bottomOfScreen + yDelta;
        card.angle = cardAngle;
        if (i > handArray.length / 2 - 1) {
          yDelta += _config.gameOptions.cardYOffset;
        } else {
          yDelta -= _config.gameOptions.cardYOffset;
        }
        card.startPosition = {
          angle: card.angle,
          depth: card.depth
        };

        // sets card to the right in front
        card.setDepth(i);
      }
    }

    // simulate a drawing feature
  }, {
    key: "endTurn",
    value: function endTurn() {
      if (_deck.deckArray.length > 0) {
        var lastCard = _deck.deckTrackerArray.pop();
        lastCard.destroy();
        var drawCard = _deck.deckArray.pop();
        _deck.handArray.push(drawCard);
        drawCard.cardInHand(this);
        this.arrangeCardsInCenter(_deck.handArray);
      }
    }
  }]);
  return BattleScene;
}(Phaser.Scene);
exports.BattleScene = BattleScene;
},{"../CST.js":"src/CST.js","../helpers/classes/button.js":"src/helpers/classes/button.js","../helpers/classes/VisualCard.js":"src/helpers/classes/VisualCard.js","../helpers/config.js":"src/helpers/config.js","../helpers/classes/Zone.js":"src/helpers/classes/Zone.js","../helpers/classes/player.js":"src/helpers/classes/player.js","../helpers/classes/deck.js":"src/helpers/classes/deck.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _BattleScene = require("/src/scenes/BattleScene.js");
/** @type {import("../typings/*")} */

// Fading animation - https://labs.phaser.io/edit.html?src=src/display/alpha/tween%20alpha.js&v=3.55.2

var config = {
  type: Phaser.AUTO,
  width: 850,
  height: 800,
  scene: [_BattleScene.BattleScene]
};
var game = new Phaser.Game(config);
},{"/src/scenes/BattleScene.js":"src/scenes/BattleScene.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55150" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map