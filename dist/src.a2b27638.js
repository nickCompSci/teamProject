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
    LOAD: "LOAD",
    BATTLE: "BATTLE",
    DISCARD_PILE: "DISCARD_PILE"
  }
};
exports.CST = CST;
},{}],"src/helpers/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOptions = exports.enemySprite = exports.cardBackDimensions = void 0;
var gameOptions = {
  deck: 6,
  startCards: 5,
  cardWidth: 130,
  cardHeight: 205,
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
var enemySprite = {
  spriteWidth: 73.3,
  spriteHeight: 103,
  numberOfSprites: 3
};
exports.enemySprite = enemySprite;
},{}],"src/scenes/discardPileScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscardPileScene = void 0;
var _CST = require("../CST");
var _config = require("../helpers/config");
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
var graveYardArray;
var DiscardPileScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(DiscardPileScene, _Phaser$Scene);
  var _super = _createSuper(DiscardPileScene);
  function DiscardPileScene() {
    _classCallCheck(this, DiscardPileScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.DISCARD_PILE
    });
  }
  _createClass(DiscardPileScene, [{
    key: "init",
    value: function init(data) {
      graveYardArray = data;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.spritesheet("cards", "./assets/sprites/spritesheet.png", {
        frameWidth: _config.gameOptions.cardWidth,
        frameHeight: _config.gameOptions.cardHeight
      });
      this.load.image("background", "./assets/background.png");
    }
  }, {
    key: "create",
    value: function create() {
      var bg = this.add.sprite(-110, 0, "background").setOrigin(0, 0);
      bg.setScale(1);
      bg.alpha = 0.3;
      var startX = 0;
      var startY = 0;
      if (graveYardArray.length == 0) {
        console.log("You have no discarded or used cards.");
      } else {
        for (var i = 0; i < graveYardArray.length; i++) {
          graveYardArray[i].setVisible(true);
          var discardCard = this.add.existing(graveYardArray[i]);
          discardCard.x = startX + i * 150;
          discardCard.y = startY;
          discardCard.setOrigin(0, 0);
          discardCard.displayWidth = _config.gameOptions.cardWidth;
          discardCard.displayHeight = _config.gameOptions.cardHeight;
        }
      }
      this.input.once("pointerdown", function () {
        this.scene.start(_CST.CST.SCENES.BATTLE);
      }, this);
    }
  }]);
  return DiscardPileScene;
}(Phaser.Scene);
exports.DiscardPileScene = DiscardPileScene;
},{"../CST":"src/CST.js","../helpers/config":"src/helpers/config.js"}],"src/helpers/classes/cards/HandCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../../config");
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
var HandCard = /*#__PURE__*/function (_Phaser$GameObjects$S) {
  _inherits(HandCard, _Phaser$GameObjects$S);
  var _super = _createSuper(HandCard);
  function HandCard(name, cost, effect, cardType, scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, HandCard);
    _this = _super.call(this, scene, x, y, sprite);
    _this.name = name;
    _this.cost = cost;
    _this.effect = effect;
    _this.cardType = cardType;
    scene.add.existing(_assertThisInitialized(_this));
    _this.cardInHand(scene);
    return _this;
  }
  _createClass(HandCard, [{
    key: "cardInHand",
    value: function cardInHand(scene) {
      this.visible = !this.visible;
      this.setInteractive();
      scene.input.setDraggable(this);
      this.setOrigin(0.5, 1);

      // Minimises the cards initial display size
      this.displayWidth = _config.gameOptions.cardWidth;
      this.displayHeight = _config.gameOptions.cardHeight;
    }
  }, {
    key: "activateCard",
    value: function activateCard() {}
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getCost",
    value: function getCost() {
      return this.cost;
    }
  }, {
    key: "getEffect",
    value: function getEffect() {
      return this.effect;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.cardType;
    }
  }, {
    key: "setCost",
    value: function setCost(cost) {
      this.cost = cost;
    }
  }]);
  return HandCard;
}(Phaser.GameObjects.Sprite);
exports.default = HandCard;
},{"../../config":"src/helpers/config.js"}],"src/helpers/font.js":[function(require,module,exports) {
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
},{}],"src/helpers/classes/Button.js":[function(require,module,exports) {
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
},{"../font":"src/helpers/font.js"}],"src/helpers/classes/Deck.js":[function(require,module,exports) {
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
},{"../config.js":"src/helpers/config.js"}],"src/helpers/classes/Zone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Deck = require("./Deck");
var _config = require("../config");
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
  function Zone(scene, x, y, width, height) {
    var _this;
    _classCallCheck(this, Zone);
    (_this = _super.call(this, scene, x, y, width, height)).setRectangleDropZone(x, y);
    _this.setOrigin(0, 0);
    scene.add.existing(_assertThisInitialized(_this));
    _this.normalZone = 0xffff00; // yellow
    _this.activeZone = 0x00ffff; // lightblue / turquoise 

    _this.zoneOutline = scene.add.graphics();
    _this.renderNormalOutline(scene);
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
},{"./Deck":"src/helpers/classes/Deck.js","../config":"src/helpers/config.js"}],"src/helpers/classes/Characters.js":[function(require,module,exports) {
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
  function Character(scene, x, y, sprite, frame) {
    var _this;
    _classCallCheck(this, Character);
    _this = _super.call(this, scene, x, y, sprite, frame);
    _this.health = 50;
    return _this;
  }
  return _createClass(Character);
}(Phaser.GameObjects.Sprite);
exports.default = Character;
},{}],"src/helpers/classes/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Characters = _interopRequireDefault(require("./Characters"));
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
}(_Characters.default);
exports.default = Player;
},{"./Characters":"src/helpers/classes/Characters.js"}],"src/helpers/classes/Enemy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Characters = _interopRequireDefault(require("./Characters"));
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
var Enemy = /*#__PURE__*/function (_Character) {
  _inherits(Enemy, _Character);
  var _super = _createSuper(Enemy);
  function Enemy(scene, x, y, sprite, frame) {
    var _this;
    _classCallCheck(this, Enemy);
    _this = _super.call(this, scene, x, y, sprite, frame);
    _this.setScale(2);
    _this.health = _this.getRandomHealth(50, 70);
    _this.heartText = scene.add.text(scene.game.config.width - 20, 0, _this.health, {
      color: "red",
      fontSize: "45px"
    });
    _this.heartText.setOrigin(1, 0);
    scene.add.existing(_assertThisInitialized(_this));
    _this.setEnemyCoordinates(scene);
    _this.enemySpawn();

    // this.heart = scene.add.image(0, 0, "heart");
    return _this;
  }

  // generates a random number between min and max parameters
  // min and max included
  _createClass(Enemy, [{
    key: "getRandomHealth",
    value: function getRandomHealth(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "setEnemyCoordinates",
    value: function setEnemyCoordinates(scene) {
      this.y = scene.game.config.height * 0.6;
      this.x = scene.game.config.width * 0.6;
    }
  }, {
    key: "enemySpawn",
    value: function enemySpawn() {
      this.visible = !this.visible;
      this.heartText.visible = !this.heartText.visible;
    }
  }]);
  return Enemy;
}(_Characters.default);
exports.default = Enemy;
},{"./Characters":"src/helpers/classes/Characters.js"}],"src/helpers/classes/InteractHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Deck = require("./Deck");
var _config = require("../config");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var InteractHandler = /*#__PURE__*/_createClass(function InteractHandler(scene) {
  _classCallCheck(this, InteractHandler);
  scene.input.on('dragstart', function (pointer, gameObject) {
    scene.tweens.add({
      targets: gameObject,
      angle: 0,
      x: pointer.x,
      y: pointer.y,
      duration: 50
    });
    scene.tweens.add({
      targets: scene.background,
      alpha: 0.3,
      duration: 50
    });
    var index = _Deck.handArray.indexOf(gameObject);
    if (index !== -1) {
      _Deck.handArray.splice(index, 1);
    }
    scene.arrangeCardsInCenter(_Deck.handArray);
  }, scene);
  scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  // hover over listener
  scene.input.on('gameobjectover', function (pointer, gameObject) {
    if (gameObject.type === "Sprite" && _Deck.handArray.includes(gameObject)) {
      scene.tweens.add({
        targets: gameObject,
        angle: 0,
        displayWidth: _config.gameOptions.cardWidth * 2,
        displayHeight: _config.gameOptions.cardHeight * 2,
        depth: 100,
        duration: 10
      });
    }
  }, scene);

  // hover out listener
  scene.input.on('gameobjectout', function (pointer, gameObject) {
    if (gameObject.type === "Sprite" && _Deck.handArray.includes(gameObject)) {
      scene.tweens.add({
        targets: gameObject,
        angle: gameObject.startPosition.angle,
        displayWidth: _config.gameOptions.cardWidth,
        displayHeight: _config.gameOptions.cardHeight,
        depth: gameObject.startPosition.depth,
        duration: 10
      });
    }
  }, scene);
  scene.input.on('dragenter', function (pointer, gameObject, dropZone) {
    dropZone.renderActiveOutline();
  });
  scene.input.on('dragleave', function (pointer, gameObject, dropZone) {
    dropZone.renderNormalOutline();
  });
  scene.input.on('drop', function (pointer, gameObject, dropZone) {
    gameObject.input.enabled = false;

    // setting card in the middle 
    gameObject.displayHeight = _config.gameOptions.cardHeight;
    gameObject.displayWidth = _config.gameOptions.cardWidth;
    gameObject.x = dropZone.x;
    gameObject.y = dropZone.y + dropZone.y / 3;
    _Deck.graveYardArray.push(gameObject);

    // remove the card from the scene after 500ms
    setTimeout(function () {
      gameObject.setActive(false).setVisible(false);
    }, 500);
    dropZone.renderNormalOutline(scene);
    scene.cameras.main.shake(100, 0.02);
  });
  scene.input.on("dragend", function (pointer, gameObject, dropped) {
    if (!dropped) {
      _Deck.handArray.push(gameObject);
      gameObject.displayHeight = _config.gameOptions.cardHeight;
      gameObject.displayWidth = _config.gameOptions.cardWidth;
      scene.arrangeCardsInCenter(_Deck.handArray);
    }
  }, scene);
});
exports.default = InteractHandler;
},{"./Deck":"src/helpers/classes/Deck.js","../config":"src/helpers/config.js"}],"src/scenes/BattleScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScene = void 0;
var _CST = require("../CST.js");
var _Button = _interopRequireDefault(require("../helpers/classes/Button.js"));
var _HandCard = _interopRequireDefault(require("../helpers/classes/cards/HandCard"));
var _config = require("../helpers/config.js");
var _Zone = _interopRequireDefault(require("../helpers/classes/Zone.js"));
var _Player = _interopRequireDefault(require("../helpers/classes/Player.js"));
var _Enemy = _interopRequireDefault(require("../helpers/classes/Enemy.js"));
var _Deck = require("../helpers/classes/Deck.js");
var _InteractHandler = _interopRequireDefault(require("../helpers/classes/InteractHandler.js"));
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
var enemyArray = [];
var cards;
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
    key: "init",
    value: function init(data) {
      var cards = data;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.image("HUD", "./assets/hud_bg.png");
      this.load.image("background", "./assets/background.png");
      this.load.image("card_holder", "./assets/card_holder.jpg");
      this.load.image("guy", "./assets/sprites/player_green_glasses.png");
      this.load.image("heart", "./assets/sprites/heart.png");
      this.load.image("cardBack", "./assets/sprites/cardBack.png");
      this.load.image("discardPile", "./assets/sprites/discardPile.png");
      this.load.spritesheet("enemy", "./assets/sprites/enemySpritesheet.png", {
        frameWidth: _config.enemySprite.spriteWidth,
        frameHeight: _config.enemySprite.spriteHeight
      });
    }
  }, {
    key: "create",
    value: function create() {
      var gameWidth = this.game.config.width;
      var gameHeight = this.game.config.height;
      var interactiveHandler = new _InteractHandler.default(this);
      var hud_bg = this.add.tileSprite(0, 0, gameWidth, gameHeight, "HUD");
      var card_bg = this.add.image(0, 0, "card_holder");
      var bg = this.add.sprite(0, 0, "background");
      hud_bg.setScale(2);
      card_bg.setPosition(gameWidth / 2, gameHeight);
      card_bg.setScale(0.325);
      bg.setPosition(gameWidth / 2, gameHeight / 2.6);
      bg.setScale(0.65);
      var player = new _Player.default(this, 0, 0, "guy", _Deck.handArray);
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
      var discardPile = this.add.sprite(-35, gameHeight, "discardPile").setOrigin(0, 1);
      discardPile.setScale(1.5).setInteractive({
        useHandCursor: true
      });
      discardPile.on('pointerdown', function (event) {
        this.scene.start(_CST.CST.SCENES.DISCARD_PILE, _Deck.graveYardArray);
      }, this);
      this.loadCards(this);

      // Button to end turn
      var endTurnButton = new _Button.default(gameWidth, gameHeight / 2, 'End Turn', this, this.endTurn.bind(this), '#202529');
      endTurnButton.changeCursor();

      // zone where cards can be dropped and activated
      var dropZone = new _Zone.default(this, 500, 400, 300, 600);
      (0, _Deck.shuffle)(_Deck.deckArray);
      (0, _Deck.deckSetUp)(this, _Deck.deckArray, _Deck.deckTrackerArray);
      for (var i = 0; i < _config.enemySprite.numberOfSprites; i++) {
        var enemy = new _Enemy.default(this, 0, 0, 'enemy', i);
        enemyArray.push(enemy);
      }
      this.spawnEnemyOnScene();
    }
  }, {
    key: "loadCards",
    value: function loadCards() {
      var cannon = new _HandCard.default("cannon", 2, "damage", {
        damage: 3,
        target: "all"
      }, this, 0, 0, "cannon");
      var grenade = new _HandCard.default("grenade", 2, "damage", {
        damage: 6,
        target: "single"
      }, this, 0, 0, "grenade");

      // combo cards
      var headshot = new _HandCard.default("headshot", 1, "combo", {
        target: "damage",
        effect: "doubles"
      }, this, 0, 0, "headshot");

      // reload cards
      var reload = new _HandCard.default("reload", 0, "reload", {
        amount: 2,
        sideEffects: null
      }, this, 0, 0, "reload");
      var overload = new _HandCard.default("overload", 0, "reload", {
        amount: 4,
        sideEffects: -1
      }, this, 0, 0, "overload");

      // healing cards
      var medkit = new _HandCard.default("medkit", 1, "healing", {
        target: "health",
        amount: 3
      }, this, 0, 0, "medkit");
      var kevlar = new _HandCard.default("kevlar", 2, "healing", {
        target: "armour",
        amount: 6
      }, this, 0, 0, "kevlar");
      _Deck.deckArray.push(cannon);
      _Deck.deckArray.push(grenade);
      _Deck.deckArray.push(headshot);
      _Deck.deckArray.push(reload);
      _Deck.deckArray.push(overload);
      _Deck.deckArray.push(medkit);
      _Deck.deckArray.push(kevlar);
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
        card.setDepth(50);
      }
    }

    // simulate a drawing feature
  }, {
    key: "endTurn",
    value: function endTurn() {
      if (_Deck.deckArray.length > 0) {
        var lastCard = _Deck.deckTrackerArray.pop();
        lastCard.destroy();
        var drawCard = _Deck.deckArray.pop();
        _Deck.handArray.push(drawCard);
        drawCard.cardInHand(this);
        this.arrangeCardsInCenter(_Deck.handArray);
        console.log(_Deck.handArray);
      }
    }

    // spawning in enemies and their life
  }, {
    key: "spawnEnemyOnScene",
    value: function spawnEnemyOnScene() {
      var minEnemies = 1;
      var maxEnemies = 2;
      var numberOfEnemies = Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies;
      var spawnEnemyDistanceX = 0;
      var spawnHeartDistanceY = 0;
      for (var i = 0; i < numberOfEnemies; i++) {
        var randomEnemy = enemyArray[Math.floor(Math.random() * enemyArray.length)];

        // For some reason, enemies spawn invisible, no clue.
        randomEnemy.enemySpawn();
        randomEnemy.x += spawnEnemyDistanceX;
        randomEnemy.heartText.y += spawnHeartDistanceY;
        spawnEnemyDistanceX += 150;
        spawnHeartDistanceY += 100;
      }
    }
  }]);
  return BattleScene;
}(Phaser.Scene);
exports.BattleScene = BattleScene;
},{"../CST.js":"src/CST.js","../helpers/classes/Button.js":"src/helpers/classes/Button.js","../helpers/classes/cards/HandCard":"src/helpers/classes/cards/HandCard.js","../helpers/config.js":"src/helpers/config.js","../helpers/classes/Zone.js":"src/helpers/classes/Zone.js","../helpers/classes/Player.js":"src/helpers/classes/Player.js","../helpers/classes/Enemy.js":"src/helpers/classes/Enemy.js","../helpers/classes/Deck.js":"src/helpers/classes/Deck.js","../helpers/classes/InteractHandler.js":"src/helpers/classes/InteractHandler.js"}],"src/scenes/loadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;
var _CST = require("../CST");
var _HandCard = _interopRequireDefault(require("../helpers/classes/cards/HandCard"));
var _BattleScene = require("./BattleScene");
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
var LoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);
  var _super = _createSuper(LoadScene);
  function LoadScene() {
    _classCallCheck(this, LoadScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.LOAD
    });
  }
  _createClass(LoadScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("cannon", "./assets/cards/Cannon.png");
      this.load.image("grenade", "./assets/cards/Grenade.png");
      this.load.image("headshot", "./assets/cards/Headshot.png");
      this.load.image("kevlar", "./assets/cards/Kevlar.png");
      this.load.image("medkit", "./assets/cards/Medkit.png");
      this.load.image("overload", "./assets/cards/overload.png");
      this.load.image("reload", "./assets/cards/reload.png");
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.add(_CST.CST.SCENES.BATTLE, _BattleScene.BattleScene, false);
      this.scene.start(_CST.CST.SCENES.BATTLE);
    }
  }]);
  return LoadScene;
}(Phaser.Scene);
exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js","../helpers/classes/cards/HandCard":"src/helpers/classes/cards/HandCard.js","./BattleScene":"src/scenes/BattleScene.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var _discardPileScene = require("./scenes/discardPileScene");
var _loadScene = require("./scenes/loadScene");
var _BattleScene = require("/src/scenes/BattleScene.js");
/** @type {import("../typings/*")} */

// Fading animation - https://labs.phaser.io/edit.html?src=src/display/alpha/tween%20alpha.js&v=3.55.2

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  scale: {
    parent: 'phaser-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [_loadScene.LoadScene, _discardPileScene.DiscardPileScene]
};
exports.config = config;
var game = new Phaser.Game(config);
},{"./scenes/discardPileScene":"src/scenes/discardPileScene.js","./scenes/loadScene":"src/scenes/loadScene.js","/src/scenes/BattleScene.js":"src/scenes/BattleScene.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50061" + '/');
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