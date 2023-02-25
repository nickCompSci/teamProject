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
/**
This file contains all the constants and keys used in the game.
*/
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    OPTIONS: "OPTIONS",
    CREDITS: "CREDITS",
    BATTLE_LOAD: "BATTLE_LOAD",
    BATTLE: "BATTLE",
    MAP: "MAP",
    DISCARD_PILE: "DISCARD_PILE"
  }
};
exports.CST = CST;
},{}],"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;
var _CST = require("../CST");
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
var MenuScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);
  var _super = _createSuper(MenuScene);
  function MenuScene() {
    _classCallCheck(this, MenuScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.MENU
    });
  }

  // Used to create our buttons, images, and text
  _createClass(MenuScene, [{
    key: "create",
    value: function create() {
      var _this = this;
      // Adds background image to the scene - (x, y, image)
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'tower').setSize(this.game.renderer.width, this.game.renderer.height).setDepth(0);

      // Adds the title image to the scene - (x, y, image), setDepth() is used to set the depth of the image (higher depth = higher priority)
      this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Dual Ascent: Tower of Cards', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);

      // Adds a button to the scene - (x, y, image)
      var startButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Start Game', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var profileButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'Profile', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var optionsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, 'Options', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var creditsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Credits', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var battleButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 350, 'Battle', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var mapButton = this.add.text(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 + 350, 'Map', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);

      // Adds the hover arrow that will appear when hovering over a button
      var arrowSprite = this.add.sprite(100, 100, "arrow");

      // Sets the arrow to not be visible until hovering over a button
      arrowSprite.setVisible(false);

      // Fix music from repeating when moving from one scene to another and then back
      if (!this.isMusicPlaying) {
        this.isMusicPlaying = true;
        this.sound.pauseOnBlur = false;
        this.sound.play("soundtrack", {
          loop: true
        });
      }

      /*
      The following code is used to make the buttons interactive
      Pointer Events:
          pointerover - hovering
          pointerout - not hovering
          pointerup - click and release
          pointerdown - just click
      */

      // Allows the start button to be interactive
      startButton.setInteractive();

      // When the pointer is over the button, the arrow will appear
      startButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = startButton.x - startButton.width + 135;
        arrowSprite.y = startButton.y + startButton.height / 4;
      });

      // Signals when the pointer is clicked and released
      startButton.on("pointerup", function () {
        console.log("click");
      });

      // Profile Button
      profileButton.setInteractive();
      profileButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = profileButton.x - profileButton.width + 100;
        arrowSprite.y = profileButton.y + profileButton.height / 4;
      });
      startButton.on("pointerup", function () {
        console.log("click");
      });

      // Options Button
      optionsButton.setInteractive();
      optionsButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = optionsButton.x - optionsButton.width + 100;
        arrowSprite.y = optionsButton.y + optionsButton.height / 4;
      });
      optionsButton.on("pointerup", function () {
        // Moves to options menu when clicked
        _this.scene.start(_CST.CST.SCENES.OPTIONS);
        console.log("click");
      });

      // Credits Button
      creditsButton.setInteractive();
      creditsButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = creditsButton.x - creditsButton.width + 100;
        arrowSprite.y = creditsButton.y + creditsButton.height / 4;
      });
      creditsButton.on("pointerup", function () {
        // Moves to options menu when clicked
        _this.scene.start(_CST.CST.SCENES.CREDITS);
        console.log("click");
      });

      // Battle Button
      battleButton.setInteractive();
      battleButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = battleButton.x - battleButton.width + 100;
        arrowSprite.y = battleButton.y + battleButton.height / 4;
      });
      battleButton.on("pointerup", function () {
        // Moves to options menu when clicked
        _this.scene.start(_CST.CST.SCENES.BATTLE);
        console.log("click");
      });

      // Map Button
      mapButton.setInteractive();
      mapButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = mapButton.x - mapButton.width + 50;
        arrowSprite.y = mapButton.y + mapButton.height / 4;
      });
      mapButton.on("pointerup", function () {
        // Moves to options menu when clicked
        _this.scene.start(_CST.CST.SCENES.MAP);
        console.log("click");
      });
    }
  }]);
  return MenuScene;
}(Phaser.Scene);
exports.MenuScene = MenuScene;
},{"../CST":"src/CST.js"}],"src/scenes/OptionsScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsScene = void 0;
var _CST = require("../CST");
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
var OptionsScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(OptionsScene, _Phaser$Scene);
  var _super = _createSuper(OptionsScene);
  function OptionsScene() {
    _classCallCheck(this, OptionsScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.OPTIONS
    });
  }

  // Creates any images, text, etc.
  _createClass(OptionsScene, [{
    key: "create",
    value: function create() {
      var _this = this;
      // Options title
      this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Options', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);

      // Disable music button
      var disableMusicButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'Disable Music', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);

      // Back Button for navigating back to the main menu
      var backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var arrowSprite = this.add.sprite(100, 100, "arrow");
      arrowSprite.setVisible(false);

      // Back Button
      backButton.setInteractive();
      backButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = backButton.x - backButton.width + 60;
        arrowSprite.y = backButton.y + backButton.height / 4;
        console.log("hover");
      });
      backButton.on("pointerup", function () {
        // Moves back to the main menu when the back button is clicked
        _this.scene.start(_CST.CST.SCENES.MENU);
        console.log("click");
      });

      // Disable Music Button
      disableMusicButton.setInteractive();
      disableMusicButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = disableMusicButton.x - disableMusicButton.width + 120;
        arrowSprite.y = disableMusicButton.y + disableMusicButton.height / 4;
        console.log("hover");
      });

      // When clicked, music will be disabled
      // When clicked again, music will be enabled
      var musicEnabled = true;
      disableMusicButton.on("pointerup", function () {
        if (musicEnabled) {
          _this.sound.stopAll();
          musicEnabled = false;
          console.log("Music disabled");
        } else {
          _this.sound.play("soundtrack", {
            loop: true
          });
          musicEnabled = true;
          console.log("Music enabled");
        }
      });
    }
  }]);
  return OptionsScene;
}(Phaser.Scene);
exports.OptionsScene = OptionsScene;
},{"../CST":"src/CST.js"}],"src/scenes/CreditsScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreditsScene = void 0;
var _CST = require("../CST");
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
var CreditsScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(CreditsScene, _Phaser$Scene);
  var _super = _createSuper(CreditsScene);
  function CreditsScene() {
    _classCallCheck(this, CreditsScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.CREDITS
    });
  }

  // Creates any images, text, etc.
  _createClass(CreditsScene, [{
    key: "create",
    value: function create() {
      var _this = this;
      // Credits title
      this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Credits', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);

      // Credits start here
      this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Team Lead', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.35, '-----------------', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'Nick Shapovalov', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.50, 'Game Mechanics Team', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.55, '-----------------', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.60, 'Kevin Jones Saleh', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.65, 'Eoin Schuch', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.70, 'Zhi Jie Chen', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.50, 'Design Team', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.55, '-----------------', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.60, 'Nick Shapovalov', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.65, 'James Kirkby', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);
      this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.70, 'Jack O\'Meara', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '40px'
      }).setDepth(1).setOrigin(0.5);

      // Back Button for navigating back to the main menu
      var backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var arrowSprite = this.add.sprite(100, 100, "arrow");
      arrowSprite.setVisible(false);

      // Back Button
      backButton.setInteractive();
      backButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = backButton.x - backButton.width + 60;
        arrowSprite.y = backButton.y + backButton.height / 4;
        console.log("hover");
      });
      backButton.on("pointerup", function () {
        // Moves back to the main menu when the back button is clicked
        _this.scene.start(_CST.CST.SCENES.MENU);
        console.log("click");
      });
    }
  }]);
  return CreditsScene;
}(Phaser.Scene);
exports.CreditsScene = CreditsScene;
},{"../CST":"src/CST.js"}],"src/helpers/classes/button.js":[function(require,module,exports) {
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
// import { loadFont } from "../font"
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
    _this.setInteractive({
      useHandCursor: true
    });
    _this.on('pointerdown', function () {
      return callback();
    });
    scene.add.existing(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Button, [{
    key: "setFontColour",
    value: function setFontColour(fontColour) {
      this.setStyle({
        color: "#202529"
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
},{}],"src/helpers/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOptions = exports.enemy = exports.cardBackDimensions = void 0;
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
var enemy = {
  spriteWidth: 73.3,
  spriteHeight: 103,
  numberOfSprites: 3,
  enemyList: [],
  enemyOnScene: []
};
exports.enemy = enemy;
},{}],"src/helpers/classes/zone.js":[function(require,module,exports) {
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
  function Zone(scene, x, y, width, height) {
    var _this;
    _classCallCheck(this, Zone);
    (_this = _super.call(this, scene, x, y, width, height)).setRectangleDropZone(width, height);
    scene.add.existing(_assertThisInitialized(_this));
    _this.normalZone = 0xffff00; // yellow
    _this.activeZone = 0x00ffff; // lightblue / turquoise 

    _this.zoneOutline = scene.add.graphics();
    ;
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
},{}],"src/helpers/classes/healthBar.js":[function(require,module,exports) {
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
var HealthBar = /*#__PURE__*/function () {
  function HealthBar(scene, x, y, maxHealth, health) {
    _classCallCheck(this, HealthBar);
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.maxHealth = maxHealth;
    this.health = health;
    this.show_health();
    scene.add.existing(this.bar);
  }
  _createClass(HealthBar, [{
    key: "show_health",
    value: function show_health() {
      this.bar.clear();

      //  BG
      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x, this.y, 104, 16);

      //  Health
      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x + 2, this.y + 2, 100, 12);
      var percentage = 100 * (this.health / this.maxHealth);
      this.bar.fillStyle(0xff0000);
      this.bar.fillRect(this.x + 2, this.y + 2, percentage, 12);
    }
  }]);
  return HealthBar;
}();
exports.default = HealthBar;
},{}],"src/helpers/classes/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../config.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
var Player = /*#__PURE__*/function (_Phaser$GameObjects$S) {
  _inherits(Player, _Phaser$GameObjects$S);
  var _super = _createSuper(Player);
  function Player(scene, x, y, sprite, frame) {
    var _this;
    _classCallCheck(this, Player);
    _this = _super.call(this, scene, x, y, sprite, frame);
    _this.maxHealth = 50;
    _this.health = _this.maxHealth;
    _this.maxActionPoints = 6;
    _this.actionPoints = _this.maxActionPoints;
    _this.handArray = [];
    _this.deckArray = [];
    _this.deckTrackerArray = [];
    _this.graveYardArray = [];
    _this.spriteType = "player";
    _this.keepCards = [];
    _this.keepCardsLimit = 2;
    scene.add.existing(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Player, [{
    key: "selectCardInHand",
    value: function selectCardInHand(player) {
      // disable drag first on all cards
      this.disableDragOnCards();
      var _iterator = _createForOfIteratorHelper(this.handArray),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cards = _step.value;
          cards.on("pointerdown", function (pointer) {
            // this is referring to the clicked object rather than player now
            if (player.keepCards.includes(this)) {
              // removes the card from list 
              player.keepCards.splice(player.keepCards.indexOf(this), 1);
              this.clearTint();
            } else {
              if (player.keepCards.length < player.keepCardsLimit) {
                player.keepCards.push(this);
                // add a visual effect when clicked
                this.setTint(0x999999);
              }
            }
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "moveCardsBackInDeck",
    value: function moveCardsBackInDeck(scene) {
      // get indexes of cards not in this.keepCards List
      var indexList = [];
      var _iterator2 = _createForOfIteratorHelper(this.handArray),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var cards = _step2.value;
          if (!this.keepCards.includes(cards)) {
            var _index = this.handArray.indexOf(cards);
            indexList.push(_index);
          }
        }

        // remove the indexes in reverse order not to mess up the loop
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      for (var index = indexList.length - 1; index >= 0; index--) {
        this.deckArray.push(this.handArray[indexList[index]]);
        this.handArray[indexList[index]].setActive(false).setVisible(false);
        this.handArray.splice(indexList[index], 1);
      }

      // remove tint of cards remaining in hand
      var _iterator3 = _createForOfIteratorHelper(this.handArray),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _cards = _step3.value;
          _cards.clearTint();
        }

        // set up the deck sprites and deckArray and organise the cards on screen
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.shuffle();
      this.deckSetUp(scene);
      scene.arrangeCardsInCenter(this.handArray);
      this.enableDragOnCards();
    }

    // draw an amount of cards
  }, {
    key: "drawCard",
    value: function drawCard(amountOfCards, scene) {
      for (var i = 0; i < amountOfCards; i++) {
        var lastCard = this.deckTrackerArray.pop();
        lastCard.setActive(false).setVisible(false);
        var drawCard = this.deckArray.pop();
        this.handArray.push(drawCard);
        drawCard.cardInHand(scene);
        scene.arrangeCardsInCenter(this.handArray);
      }
    }
  }, {
    key: "disableDragOnCards",
    value: function disableDragOnCards() {
      for (var i = 0; i < this.handArray.length; i++) {
        this.handArray[i].input.draggable = false;
      }
    }
  }, {
    key: "enableDragOnCards",
    value: function enableDragOnCards() {
      for (var i = 0; i < this.handArray.length; i++) {
        this.handArray[i].input.draggable = true;
      }
    }
  }, {
    key: "deckSetUp",
    value: function deckSetUp(scene) {
      var x = scene.game.config.width / 25;
      var y = scene.game.config.height / 1.24;

      // need to remove all sprites currently active
      if (this.deckTrackerArray.length > 0) {
        for (var j = 0; j < this.deckTrackerArray.length; j++) {
          this.deckTrackerArray[j].destroy();
        }
      }
      for (var i = 0; i < this.deckArray.length; i++) {
        var cardBack = scene.add.sprite(x, y, 'cardBack');
        cardBack.setOrigin(0.5, 1);
        cardBack.displayWidth = _config.cardBackDimensions.backWidth / 2;
        cardBack.displayHeight = _config.cardBackDimensions.backHeight / 2;
        this.deckTrackerArray.push(cardBack);
        x += 3;
      }
    }

    // implementing Durstenfeld shffle, an optimised version of Fisher-Yates
  }, {
    key: "shuffle",
    value: function shuffle() {
      for (var i = this.deckArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [this.deckArray[j], this.deckArray[i]];
        this.deckArray[i] = _ref[0];
        this.deckArray[j] = _ref[1];
      }
    }
  }, {
    key: "resetDeck",
    value: function resetDeck(scene) {
      if (this.deckArray.length <= 0) {
        // push all the cards in graveYard array back to the deck
        for (var i = this.graveYardArray.length; i > 0; i--) {
          var card = this.graveYardArray.shift();
          this.deckArray.push(card);
        }
        this.shuffle();
        this.deckSetUp(scene);
      }
    }
  }, {
    key: "getHealth",
    value: function getHealth() {
      return this.health;
    }
  }, {
    key: "setHealth",
    value: function setHealth(health) {
      this.health += health;

      // setting it back to max health if going over
      if (this.health > this.maxHealth) {
        this.health = this.maxHealth;
      }
    }
  }, {
    key: "getActionPoints",
    value: function getActionPoints() {
      return this.actionPoints;
    }
  }, {
    key: "setActionPoints",
    value: function setActionPoints(actionPoints) {
      this.actionPoints += actionPoints;

      // setting it back to max AP if going over
      if (this.actionPoints > this.maxActionPoints) {
        this.actionPoints = this.maxActionPoints;
      }
    }
  }, {
    key: "getSpriteType",
    value: function getSpriteType() {
      return this.spriteType;
    }
  }]);
  return Player;
}(Phaser.GameObjects.Sprite);
exports.default = Player;
},{"../config.js":"src/helpers/config.js"}],"src/helpers/classes/enemy.js":[function(require,module,exports) {
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
var Enemy = /*#__PURE__*/function (_Phaser$GameObjects$S) {
  _inherits(Enemy, _Phaser$GameObjects$S);
  var _super = _createSuper(Enemy);
  function Enemy(scene, x, y, sprite, frame) {
    var _this;
    _classCallCheck(this, Enemy);
    _this = _super.call(this, scene, x, y, sprite, frame);
    _this.setScale(2);
    _this.health = _this.getRandomHealth(10, 30);
    _this.spriteType = "enemy";
    _this.setInteractive();
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
    key: "action",
    value: function action() {
      return Math.floor(Math.random() * 10);
    }
  }, {
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
  }, {
    key: "getSpriteType",
    value: function getSpriteType() {
      return this.spriteType;
    }
  }, {
    key: "getHealth",
    value: function getHealth() {
      return this.health;
    }
  }, {
    key: "setHealth",
    value: function setHealth(health) {
      this.health = health;
    }
  }]);
  return Enemy;
}(Phaser.GameObjects.Sprite);
exports.default = Enemy;
},{}],"src/helpers/classes/cards/handCard.js":[function(require,module,exports) {
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
// Cards that appear in the player's hand
var HandCard = /*#__PURE__*/function (_Phaser$GameObjects$S) {
  _inherits(HandCard, _Phaser$GameObjects$S);
  var _super = _createSuper(HandCard);
  function HandCard(name, cost, cardType, effect, scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, HandCard);
    _this = _super.call(this, scene, x, y, sprite);
    _this.name = name;
    _this.cost = cost;
    _this.effect = effect;
    _this.cardType = cardType;
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
},{"../../config":"src/helpers/config.js"}],"src/helpers/classes/cards/toolTip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;
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
var Tooltip = /*#__PURE__*/function (_Phaser$GameObjects$T) {
  _inherits(Tooltip, _Phaser$GameObjects$T);
  var _super = _createSuper(Tooltip);
  function Tooltip(scene, x, y, label) {
    var _this;
    _classCallCheck(this, Tooltip);
    _this = _super.call(this, scene, x, y, label);
    _this.padding = {
      x: 20,
      y: 20
    };
    _this.setPadding(_this.padding.x, _this.padding.y);
    _this.setStyle({
      backgroundColor: "#202529",
      color: "#ffffff",
      wordWrap: {
        width: 150
      }
    });
    scene.add.existing(_assertThisInitialized(_this));
    _this.visible = false;
    _this.setDepth(2);
    return _this;
  }
  _createClass(Tooltip, [{
    key: "showTooltip",
    value: function showTooltip() {
      this.visible = true;
    }
  }, {
    key: "removeTooltip",
    value: function removeTooltip() {
      this.visible = false;
    }
  }, {
    key: "setLabelCoordinates",
    value: function setLabelCoordinates(x, y) {
      this.x = x;
      this.y = y;
    }
  }]);
  return Tooltip;
}(Phaser.GameObjects.Text);
exports.Tooltip = Tooltip;
},{}],"src/helpers/classes/cards/damageCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../../config");
var _handCard = _interopRequireDefault(require("./handCard"));
var _toolTip = require("./toolTip");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var DamageCard = /*#__PURE__*/function (_HandCard) {
  _inherits(DamageCard, _HandCard);
  var _super = _createSuper(DamageCard);
  function DamageCard(name, cost, cardType, effect, scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, DamageCard);
    _this = _super.call(this, name, cost, cardType, effect, scene, x, y, sprite);
    _this.tooltip = new _toolTip.Tooltip(scene, x + _this.displayWidth, y, _this.getLabel());
    scene.add.existing(_assertThisInitialized(_this));
    _this.cardInHand(scene);
    return _this;
  }
  _createClass(DamageCard, [{
    key: "cardInHand",
    value: function cardInHand(scene) {
      _get(_getPrototypeOf(DamageCard.prototype), "cardInHand", this).call(this, scene);
    }
  }, {
    key: "activateCard",
    value: function activateCard(scene) {
      var card = this;
      if (this.effect.target == "single") {
        for (var i = 0; i < _config.enemy.enemyOnScene.length; i++) {
          _config.enemy.enemyOnScene[i].once("pointerdown", function (pointer) {
            this.setHealth(this.getHealth() - card.effect.damage);
            this.heartText.setText(this.getHealth());
            for (var j = 0; j < _config.enemy.enemyOnScene.length; j++) {
              _config.enemy.enemyOnScene[j].input.enabled = false;
            }
          });
        }
      } else if (this.effect.target == "all") {
        for (var _i = 0; _i < _config.enemy.enemyOnScene.length; _i++) {
          _config.enemy.enemyOnScene[_i].setHealth(_config.enemy.enemyOnScene[_i].getHealth() - card.effect.damage);
          _config.enemy.enemyOnScene[_i].heartText.setText(_config.enemy.enemyOnScene[_i].getHealth());
        }
      }
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return "Damage: Inflicted damage is on the enemy's health.";
    }
  }]);
  return DamageCard;
}(_handCard.default);
exports.default = DamageCard;
},{"../../config":"src/helpers/config.js","./handCard":"src/helpers/classes/cards/handCard.js","./toolTip":"src/helpers/classes/cards/toolTip.js"}],"src/helpers/classes/cards/comboCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../../config");
var _handCard = _interopRequireDefault(require("./handCard"));
var _toolTip = require("./toolTip");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ComboCard = /*#__PURE__*/function (_HandCard) {
  _inherits(ComboCard, _HandCard);
  var _super = _createSuper(ComboCard);
  function ComboCard(name, cost, cardType, effect, scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, ComboCard);
    _this = _super.call(this, name, cost, cardType, effect, scene, x, y, sprite);
    _this.tooltip = new _toolTip.Tooltip(scene, x + _this.displayWidth, y, _this.getLabel());
    scene.add.existing(_assertThisInitialized(_this));
    _this.cardInHand(scene);
    return _this;
  }
  _createClass(ComboCard, [{
    key: "cardInHand",
    value: function cardInHand(scene) {
      _get(_getPrototypeOf(ComboCard.prototype), "cardInHand", this).call(this, scene);
    }
  }, {
    key: "activateCard",
    value: function activateCard(scene) {
      var card = this;
      console.log(this);
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return "Combo: \nAffects the next card played through amplifying the effect.";
    }
  }]);
  return ComboCard;
}(_handCard.default);
exports.default = ComboCard;
},{"../../config":"src/helpers/config.js","./handCard":"src/helpers/classes/cards/handCard.js","./toolTip":"src/helpers/classes/cards/toolTip.js"}],"src/helpers/classes/cards/reloadCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../../config");
var _handCard = _interopRequireDefault(require("./handCard"));
var _toolTip = require("./toolTip");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ReloadCard = /*#__PURE__*/function (_HandCard) {
  _inherits(ReloadCard, _HandCard);
  var _super = _createSuper(ReloadCard);
  function ReloadCard(name, cost, cardType, effect, scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, ReloadCard);
    _this = _super.call(this, name, cost, cardType, effect, scene, x, y, sprite);
    _this.tooltip = new _toolTip.Tooltip(scene, x + _this.displayWidth, y, _this.getLabel());
    scene.add.existing(_assertThisInitialized(_this));
    _this.cardInHand(scene);
    return _this;
  }
  _createClass(ReloadCard, [{
    key: "cardInHand",
    value: function cardInHand(scene) {
      _get(_getPrototypeOf(ReloadCard.prototype), "cardInHand", this).call(this, scene);
    }

    // nned to account for next turn side effects
    // such as losing action points next turn
  }, {
    key: "activateCard",
    value: function activateCard(scene) {
      if (this.effect.sideEffects !== null) {
        // removing health if its overloading card
        scene.player.setHealth(this.effect.sideEffects);
        scene.heartext.setText(scene.player.health);
        // add function here to kill the player if health goes to 0
      }

      scene.player.setActionPoints(this.effect.amount);
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return "AP: \nAction Points are used when activating a card.";
    }
  }]);
  return ReloadCard;
}(_handCard.default);
exports.default = ReloadCard;
},{"../../config":"src/helpers/config.js","./handCard":"src/helpers/classes/cards/handCard.js","./toolTip":"src/helpers/classes/cards/toolTip.js"}],"src/helpers/classes/cards/healingCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../../config");
var _handCard = _interopRequireDefault(require("./handCard"));
var _toolTip = require("./toolTip");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var HealingCard = /*#__PURE__*/function (_HandCard) {
  _inherits(HealingCard, _HandCard);
  var _super = _createSuper(HealingCard);
  function HealingCard(name, cost, cardType, effect, scene, x, y, sprite) {
    var _this;
    _classCallCheck(this, HealingCard);
    _this = _super.call(this, name, cost, cardType, effect, scene, x, y, sprite);
    _this.tooltip = new _toolTip.Tooltip(scene, x + _this.displayWidth, y, _this.getLabel());
    scene.add.existing(_assertThisInitialized(_this));
    _this.cardInHand(scene);
    return _this;
  }
  _createClass(HealingCard, [{
    key: "cardInHand",
    value: function cardInHand(scene) {
      _get(_getPrototypeOf(HealingCard.prototype), "cardInHand", this).call(this, scene);
    }
  }, {
    key: "activateCard",
    value: function activateCard(scene) {
      if (this.effect.target == "health") {
        scene.player.setHealth(this.effect.amount);
        scene.heartext.setText(scene.player.health);
      }
      // include bottom when armour is introduced
      // } else (this.effect.target == "armour") {
      //     scene.player.setArmour(this.effect.amount);
      //     scene.armourText.setText(scene.player.armour);
      // }
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      if (this.effect.target == "armour") {
        return "Armour: \nRemoved before health when receiving damage.";
      } else if (this.effect.target == "health") {
        return "Health: \nIf this reaches zero, you die.";
      }
    }
  }]);
  return HealingCard;
}(_handCard.default);
exports.default = HealingCard;
},{"../../config":"src/helpers/config.js","./handCard":"src/helpers/classes/cards/handCard.js","./toolTip":"src/helpers/classes/cards/toolTip.js"}],"src/scenes/BattleScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScene = void 0;
var _CST = require("../CST.js");
var _button = _interopRequireDefault(require("../helpers/classes/button.js"));
var _config = require("../helpers/config.js");
var _zone = _interopRequireDefault(require("../helpers/classes/zone.js"));
var _healthBar = _interopRequireDefault(require("../helpers/classes/healthBar.js"));
var _player = _interopRequireDefault(require("../helpers/classes/player.js"));
var _enemy = _interopRequireDefault(require("../helpers/classes/enemy.js"));
var _damageCard = _interopRequireDefault(require("../helpers/classes/cards/damageCard.js"));
var _comboCard = _interopRequireDefault(require("../helpers/classes/cards/comboCard.js"));
var _reloadCard = _interopRequireDefault(require("../helpers/classes/cards/reloadCard.js"));
var _healingCard = _interopRequireDefault(require("../helpers/classes/cards/healingCard.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
    key: "init",
    value: function init(data) {
      // data returns a list of preloaded cards
      var cards = data;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.image("HUD", "./assets/hud_bg.png");
      this.load.image("background", "./assets/background.png");
      this.load.image("card_holder", "./assets/card_holder.jpg");
      this.load.image("guy", "./assets/sprites/player_green_glasses.png");
      //this.load.image("heart", "./assets/sprites/heart.png");
      this.load.image("cardBack", "./assets/sprites/cardBack.png");
      this.load.image("discardPile", "./assets/sprites/discardPile.png");
      this.load.spritesheet("enemy", "./assets/sprites/enemySpritesheet.png", {
        frameWidth: _config.enemy.spriteWidth,
        frameHeight: _config.enemy.spriteHeight
      });
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
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
      this.player = new _player.default(this, 0, 0, "guy");
      this.player.setPosition(gameWidth / 3.5, gameHeight / 1.7);
      this.player.setScale(3);

      //let heart = this.add.image(0, 0, "heart");
      //this.heartext = this.add.text(0,0, this.player.getHealth(), {color: "black", fontSize: "30px"});
      //heart.setScale(4);
      //this.heartext.setPosition(-18, -18);
      //let health = this.add.container(0, 0, [heart, this.heartext]);
      //health.setPosition(gameWidth/20, gameHeight/2.2);
      this.playerHealth = new _healthBar.default(this, this.player.x - 40, this.player.y + 100, this.player.maxHealth, this.player.health);
      var chamber = this.add.circle(0, 0, 30, 0xffcc00);
      this.actiontext = this.add.text(0, 0, this.player.getActionPoints(), {
        color: "black",
        fontSize: "30px"
      });
      this.actiontext.setPosition(-10, -18);
      var actions = this.add.container(0, 0, [chamber, this.actiontext]);
      actions.setPosition(gameWidth / 20, gameHeight / 1.75);

      // launch the discard pile scene in parallel
      var discardPile = this.add.sprite(-35, gameHeight, "discardPile").setOrigin(0, 1);
      discardPile.setScale(1.5).setInteractive({
        useHandCursor: true
      });
      discardPile.on('pointerdown', function (event) {
        _this.scene.launch(_CST.CST.SCENES.DISCARD_PILE, _this.player.graveYardArray);
      }, this);

      // loads all the different types of cards
      this.loadCards();
      this.endTurnButton = new _button.default(gameWidth, gameHeight / 2, "End Turn", this, this.endTurn.bind(this, this.player, this.endTurnButton), '#202529');
      this.keepCardButton = new _button.default(gameWidth, gameHeight / 2, "Keep Cards", this, this.keepCard.bind(this, this.player, this.keepCardButton), '#202529');

      // zone where cards can be dropped and activated
      //let dropZone = new Zone(this, 500, 250, 665, 665);
      var dropZone = this.add.zone(500, 250, 665, 665).setRectangleDropZone(665, 665);

      // shuffles the deck and sets up the visual for the deck cards
      this.player.shuffle();
      this.player.deckSetUp(this);
      this.player.drawCard(_config.gameOptions.startCards, this);

      // spawning enemies according to spritesheet randomly
      for (var i = 0; i < _config.enemy.numberOfSprites; i++) {
        var enemySprite = new _enemy.default(this, 0, 0, 'enemy', i);
        _config.enemy.enemyList.push(enemySprite);
      }
      this.spawnEnemyOnScene();

      // card event listeners for pointer interactions
      this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.tooltip.removeTooltip();
        _this.tweens.add({
          targets: gameObject,
          angle: 0,
          x: pointer.x,
          y: pointer.y,
          duration: 50
        });
        _this.tweens.add({
          targets: _this.background,
          alpha: 0.3,
          duration: 50
        });
        var index = _this.player.handArray.indexOf(gameObject);
        if (index !== -1) {
          _this.player.handArray.splice(index, 1);
        }
        _this.arrangeCardsInCenter(_this.player.handArray);
      }, this);
      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      // hover over listener
      this.input.on('gameobjectover', function (pointer, gameObject) {
        if (gameObject.type === "Sprite" && _this.player.handArray.includes(gameObject)) {
          var yOffSet = 50;
          _this.tweens.add({
            targets: gameObject,
            angle: 0,
            y: gameObject.startPosition.y - yOffSet,
            displayWidth: _config.gameOptions.cardWidth * 2,
            displayHeight: _config.gameOptions.cardHeight * 2,
            depth: 100,
            duration: 10
          });
          gameObject.tooltip.showTooltip();
          gameObject.tooltip.setLabelCoordinates(gameObject.x + _config.gameOptions.cardWidth, gameObject.y - _config.gameOptions.cardHeight * 2 - yOffSet + 10);
        }
      }, this);

      // hover out listener
      this.input.on('gameobjectout', function (pointer, gameObject) {
        if (gameObject.type === "Sprite" && _this.player.handArray.includes(gameObject)) {
          _this.tweens.add({
            targets: gameObject,
            y: gameObject.startPosition.y,
            angle: gameObject.startPosition.angle,
            displayWidth: _config.gameOptions.cardWidth,
            displayHeight: _config.gameOptions.cardHeight,
            depth: gameObject.startPosition.depth,
            duration: 10
          });
          gameObject.tooltip.removeTooltip();
        }
      }, this);
      this.input.on('dragenter', function (pointer, gameObject, dropZone) {
        //dropZone.renderActiveOutline();
        gameObject.setTint(0xffa500);
      });
      this.input.on('dragleave', function (pointer, gameObject, dropZone) {
        //dropZone.renderNormalOutline();
        gameObject.clearTint();
        if (gameObject.cost > _this.player.actionPoints) {
          gameObject.setTint(0xff0000);
        }
      });
      this.input.on('drop', function (pointer, gameObject, dropZone) {
        if (_this.player.getActionPoints() >= gameObject.getCost()) {
          gameObject.input.enabled = false;
          gameObject.tooltip.removeTooltip();
          gameObject.clearTint();

          // setting card in the middle 
          gameObject.displayHeight = _config.gameOptions.cardHeight;
          gameObject.displayWidth = _config.gameOptions.cardWidth;
          gameObject.x = dropZone.x;
          gameObject.y = dropZone.y + dropZone.y / 3;
          _this.player.graveYardArray.push(gameObject);
          gameObject.activateCard(_this);

          // remove the card from the scene after 500ms
          setTimeout(function () {
            gameObject.setActive(false).setVisible(false);
          }, 500);
          _this.player.actionPoints = _this.player.getActionPoints() - gameObject.getCost();
          _this.actiontext.text = _this.player.getActionPoints();
          //dropZone.renderNormalOutline(this);

          _this.cameras.main.shake(100, 0.02);
          var _iterator = _createForOfIteratorHelper(_this.player.handArray),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var card = _step.value;
              if (card.cost > _this.player.actionPoints) {
                card.setTint(0xff0000);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          gameObject.setTint(0xff0000);
          _this.dragend(pointer, gameObject, false);
        }
      });
      this.input.on("dragend", this.dragend, this);
    }
  }, {
    key: "dragend",
    value: function dragend(pointer, gameObject, dropped) {
      if (!dropped) {
        this.player.handArray.push(gameObject);
        gameObject.displayHeight = _config.gameOptions.cardHeight;
        gameObject.displayWidth = _config.gameOptions.cardWidth;
        this.arrangeCardsInCenter(this.player.handArray);
      }
    }
  }, {
    key: "damage_calculation",
    value: function damage_calculation(character, damage, modifiers) {
      var _iterator2 = _createForOfIteratorHelper(modifiers),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var modifier = _step2.value;
          damage = damage * modifier;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      console.log(damage);
      character.health = character.health - damage;
      character.setTint(0xff0000);
      var damage_num = this.add.text(0, 0, "-" + damage, {
        color: "red",
        fontSize: "30px"
      });
      damage_num.setPosition(character.x + 40, character.y - 80);
      this.time.delayedCall(450, this.damage_event, [character, damage_num], this);
    }
  }, {
    key: "damage_event",
    value: function damage_event(character, damage_num) {
      character.clearTint();
      damage_num.destroy();
    }
  }, {
    key: "loadCards",
    value: function loadCards() {
      // damage cards
      var cannon = new _damageCard.default("cannon", 1, "damage", {
        damage: 3,
        target: "all"
      }, this, 0, 0, "cannon");
      var grenade = new _damageCard.default("grenade", 2, "damage", {
        damage: 6,
        target: "single"
      }, this, 0, 0, "grenade");

      // combo cards
      var headshot = new _comboCard.default("headshot", 1, "combo", {
        target: "damage",
        effect: "doubles"
      }, this, 0, 0, "headshot");

      // reload cards
      var reload = new _reloadCard.default("reload", 0, "reload", {
        amount: 2,
        sideEffects: null
      }, this, 0, 0, "reload");
      var overload = new _reloadCard.default("overload", 0, "reload", {
        amount: 4,
        sideEffects: -15
      }, this, 0, 0, "overload");

      // healing cards
      var medkit = new _healingCard.default("medkit", 0, "healing", {
        target: "health",
        amount: 3
      }, this, 0, 0, "medkit");
      var kevlar = new _healingCard.default("kevlar", 1, "healing", {
        target: "armour",
        amount: 6
      }, this, 0, 0, "kevlar");
      this.player.deckArray.push(cannon);
      this.player.deckArray.push(grenade);
      this.player.deckArray.push(headshot);
      this.player.deckArray.push(reload);
      this.player.deckArray.push(overload);
      this.player.deckArray.push(medkit);
      this.player.deckArray.push(kevlar);
    }
  }, {
    key: "arrangeCardsInCenter",
    value: function arrangeCardsInCenter(handArray) {
      // arranges for the cards to be organised around the bottom middle of the screen
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

        // cards remember their original coordinates for events that make the cards leave and renter the hand
        card.startPosition = {
          x: card.x,
          y: card.y,
          angle: card.angle,
          depth: card.depth
        };

        // sets card to the right in front
        card.setDepth(2);
      }
    }

    // start keep cards and make keep cards button appear
  }, {
    key: "keepCard",
    value: function keepCard(player) {
      this.keepCardButton.visible = false;
      this.endTurnButton.visible = true;
      var _iterator3 = _createForOfIteratorHelper(this.player.handArray),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var card = _step3.value;
          card.clearTint();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.player.selectCardInHand(player);
    }

    // ends the player's turn
  }, {
    key: "endTurn",
    value: function endTurn() {
      this.keepCardButton.visible = true;
      this.endTurnButton.visible = false;
      this.player.moveCardsBackInDeck(this);

      // simulate enemies attacking
      for (var i = 0; i < _config.enemy.enemyOnScene.length; i++) {
        var base_damage = _config.enemy.enemyOnScene[i].action();
        this.damage_calculation(this.player, base_damage, [1]);
      }
      this.playerHealth.health = this.player.health;
      this.playerHealth.show_health();

      // automatic drawing goes here and checking if needing to reshuffle the deck
      this.player.drawCard(5 - this.player.handArray.length, this);
      this.player.resetDeck(this);
      var _iterator4 = _createForOfIteratorHelper(this.player.handArray),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var card = _step4.value;
          if (card.cost > this.player.actionPoints) {
            card.setTint(0xff0000);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
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
        var randomEnemy = _config.enemy.enemyList[Math.floor(Math.random() * _config.enemy.enemyList.length)];

        // For some reason, enemies spawn invisible, no clue.
        randomEnemy.enemySpawn();
        randomEnemy.x += spawnEnemyDistanceX;
        randomEnemy.heartText.y += spawnHeartDistanceY;
        spawnEnemyDistanceX += 150;
        spawnHeartDistanceY += 100;
        randomEnemy.setDepth(1);
        _config.enemy.enemyOnScene.push(randomEnemy);
      }
    }
  }]);
  return BattleScene;
}(Phaser.Scene);
exports.BattleScene = BattleScene;
},{"../CST.js":"src/CST.js","../helpers/classes/button.js":"src/helpers/classes/button.js","../helpers/config.js":"src/helpers/config.js","../helpers/classes/zone.js":"src/helpers/classes/zone.js","../helpers/classes/healthBar.js":"src/helpers/classes/healthBar.js","../helpers/classes/player.js":"src/helpers/classes/player.js","../helpers/classes/enemy.js":"src/helpers/classes/enemy.js","../helpers/classes/cards/damageCard.js":"src/helpers/classes/cards/damageCard.js","../helpers/classes/cards/comboCard.js":"src/helpers/classes/cards/comboCard.js","../helpers/classes/cards/reloadCard.js":"src/helpers/classes/cards/reloadCard.js","../helpers/classes/cards/healingCard.js":"src/helpers/classes/cards/healingCard.js"}],"src/helpers/classes/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuffle;
// function for randomly shuffling an array - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }
  return array;
}
},{}],"src/helpers/classes/door.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shuffle = _interopRequireDefault(require("./shuffle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Door = /*#__PURE__*/function () {
  /*
  Positions should be a list of positions.
  Position should include x, y, l and r.
  l and r are left and right or up and down respectively depending on where the door is situated.
  */

  function Door(image, positions) {
    _classCallCheck(this, Door);
    this._image = image;
    this._positions = positions;
    this._position = (0, _shuffle.default)(positions)[0];
    this._image.x = this._position.x;
    this._image.y = this._position.y;
    this._room = this._position.room;
    this._adjacent = this._position.adjacent;
  }

  // Used to randomize the doors position (if door has multiple positions).
  _createClass(Door, [{
    key: "randomizePosition",
    value: function randomizePosition() {
      this._position = (0, _shuffle.default)(this._positions)[0];
      this._image.x = this._position.x;
      this._image.y = this._position.y;
      this._adjacent = this._position.adjacent;
      this._room = this._position.room;
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    }
  }, {
    key: "adjacent",
    get: function get() {
      return this._adjacent;
    }
  }, {
    key: "room",
    get: function get() {
      return this._room;
    }
  }]);
  return Door;
}();
exports.default = Door;
},{"./shuffle":"src/helpers/classes/shuffle.js"}],"src/helpers/classes/room.js":[function(require,module,exports) {
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
var Room = /*#__PURE__*/function () {
  function Room(number, encounter) {
    var visited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _classCallCheck(this, Room);
    this._number = number;
    this._encounter = encounter;
    this._visited = visited;
  }
  _createClass(Room, [{
    key: "setVisited",
    value: function setVisited() {
      this._visited = true;
      this._encounter.setDepth(-1);
    }
  }, {
    key: "getNumber",
    value: function getNumber() {
      return this._number;
    }
  }, {
    key: "getEncounter",
    value: function getEncounter() {
      return this._encounter;
    }
  }, {
    key: "getVisited",
    value: function getVisited() {
      return this._visited;
    }
  }]);
  return Room;
}();
exports.default = Room;
},{}],"src/helpers/classes/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _shuffle = _interopRequireDefault(require("./shuffle"));
var _door = _interopRequireDefault(require("./door"));
var _room = _interopRequireDefault(require("./room"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
    When constructing a map:

        - All 11 doors are initialized 
            (the randomization of door positions are handled by the door class itself).
        
        - Player's location and current room is set to the starting room.

        - Encounters are shuffled and assigned a random location from the list of positions.
            (Rooms are created for each)

        - The start and end rooms are initialized separately as they are always set.

        - Rooms that are adjacent to the player are then set.

*/
var Map = /*#__PURE__*/function () {
  function Map(encounters, positions, doors, door_positions, startEnd) {
    _classCallCheck(this, Map);
    this._encounters = encounters;
    this._positions = positions;
    this._doors = doors;
    this._doors_temp = [];
    this._start = startEnd[0];
    this._end = startEnd[1];
    this._current_room = this._start;
    for (var i = 0; i < doors.length; i++) {
      this._doors_temp.push(new _door.default(doors[i], door_positions[i]));
    }
    this._doors = this._doors_temp;
    this._level = 0;
    this._current_location = 0;
    this._adjacent = [];
    this._rooms = [];
    (0, _shuffle.default)(encounters);
    this.assignLocations(encounters, positions);
    this._rooms.push(new _room.default(0, this._start, true));
    this._rooms.push(new _room.default(11, this._end));
    this.setAdjacent();
  }
  _createClass(Map, [{
    key: "playerLocation",
    value: function playerLocation(room) {
      this._current_location = room.getNumber();
      this._current_room = room.getEncounter();
      this.setAdjacent();
    }
  }, {
    key: "level",
    get: function get() {
      return this._level;
    }
  }, {
    key: "currentLocation",
    get: function get() {
      return this._current_location;
    },
    set: function set(encounter) {
      this._current_location = encounter;
    }
  }, {
    key: "adjacent",
    get: function get() {
      return this._adjacent;
    }

    // Sets the rooms adjacent to the players current location.
  }, {
    key: "setAdjacent",
    value: function setAdjacent() {
      this._adjacent = [];
      var room = 0;
      var door = 0;
      for (var i = 0; i < this._doors.length; i++) {
        door = this._doors[i];
        if (door._room == this._current_location) {
          room = door._adjacent;
          this._adjacent.push(room);
        }
        if (door._adjacent == this._current_location) {
          room = door._room;
          this._adjacent.push(room);
        }
      }
      var adjacent_temp = [];
      for (var _i = 0; _i < this._adjacent.length; _i++) {
        for (var j = 0; j < this._rooms.length; j++) {
          if (this._adjacent[_i] == this._rooms[j].getNumber()) {
            adjacent_temp.push(this._rooms[j]);
          }
        }
      }
      this._adjacent = adjacent_temp;
    }

    // For incrementing the level and randomizing a new floor.
  }, {
    key: "levelInc",
    value: function levelInc() {
      this._level++;
      this.playerLocation(new _room.default(0, this._start, true));
      (0, _shuffle.default)(this._encounters);
      this.assignLocations(this._encounters, this._positions);
      this._rooms.push(new _room.default(0, this._start, true));
      this._rooms.push(new _room.default(11, this._end));
      for (var i = 0; i < this._doors.length; i++) {
        this._doors[i].randomizePosition();
      }
      this.setAdjacent();
      console.log(this._current_location, this._adjacent);
    }

    // for assigning the positions (x, y) to the icons/images.
  }, {
    key: "assignLocations",
    value: function assignLocations(icon, locations) {
      this._rooms = [];
      for (var i = 0; i < icon.length; i++) {
        icon[i].x = locations[i].x;
        icon[i].y = locations[i].y;
        icon[i].setDepth(1);
        this._rooms.push(new _room.default(locations[i].room, icon[i]));
      }
    }
  }, {
    key: "randomizePlayerLocation",
    value: function randomizePlayerLocation() {
      this._current_location = Math.floor(Math.random() * 12);
    }
  }]);
  return Map;
}();
exports.default = Map;
},{"./shuffle":"src/helpers/classes/shuffle.js","./door":"src/helpers/classes/door.js","./room":"src/helpers/classes/room.js"}],"src/scenes/MapScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapScene = void 0;
var _map = _interopRequireDefault(require("../helpers/classes/map"));
var _CST = require("../CST");
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
var MapScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MapScene, _Phaser$Scene);
  var _super = _createSuper(MapScene);
  function MapScene() {
    _classCallCheck(this, MapScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.MAP
    });
  }

  // Creates any images, text, etc.
  _createClass(MapScene, [{
    key: "create",
    value: function create() {
      var _this = this;
      // Loads background
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'map').setSize(this.game.renderer.width, this.game.renderer.height).setDepth(0);

      // Back Button for navigating back to the main menu
      var backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      var arrowSprite = this.add.sprite(100, 100, "arrow");
      arrowSprite.setVisible(false);
      var pointer = this.add.sprite(100, 100, "pointer");
      pointer.setVisible(false);

      // Back Button
      backButton.setInteractive();
      backButton.on("pointerover", function () {
        arrowSprite.setVisible(true);
        arrowSprite.x = backButton.x - backButton.width + 60;
        arrowSprite.y = backButton.y + backButton.height / 4;
      });
      backButton.on("pointerup", function () {
        // Moves back to the main menu when the back button is clicked
        _this.scene.start(_CST.CST.SCENES.MENU);
      });

      // adds icons for map
      var battle = this.add.image(0, 0, 'cards').setDepth(2);
      var shop = this.add.image(0, 0, 'shop').setDepth(2);
      var random = this.add.image(0, 0, 'random').setDepth(2);
      var random2 = this.add.image(0, 0, 'random').setDepth(2);
      var battle2 = this.add.image(0, 0, 'cards').setDepth(2);
      var battle3 = this.add.image(0, 0, 'cards').setDepth(2);
      var battle4 = this.add.image(0, 0, 'cards').setDepth(2);
      var battle5 = this.add.image(0, 0, 'cards').setDepth(2);
      var battle6 = this.add.image(0, 0, 'cards').setDepth(2);
      var battle7 = this.add.image(0, 0, 'cards').setDepth(2);
      var start = this.add.image(740, 490, 'door').setDepth(2);
      var end = this.add.image(270, 460, 'door').setDepth(2);
      var encounters = [battle, battle2, battle3, battle4, battle5, battle6, battle7, shop, random, random2];
      var startEnd = [start, end];

      //Door images and their respective set of positions
      var door1 = this.add.image(0, 0, "door");
      var door_pos1 = [{
        x: 280,
        y: 383,
        room: 9,
        adjacent: 11
      }, {
        x: 320,
        y: 335,
        room: 9,
        adjacent: 7
      }, {
        x: 320,
        y: 240,
        room: 9,
        adjacent: 8
      }];
      var door2 = this.add.image(0, 0, "door");
      var door_pos2 = [{
        x: 320,
        y: 417,
        room: 11,
        adjacent: 7
      }, {
        x: 320,
        y: 483,
        room: 11,
        adjacent: 6
      }];
      var door3 = this.add.image(0, 0, "door");
      var door_pos3 = [{
        x: 280,
        y: 518,
        room: 10,
        adjacent: 11
      }, {
        x: 320,
        y: 560,
        room: 10,
        adjacent: 6
      }];
      var door4 = this.add.image(0, 0, "door");
      var door_pos4 = [{
        x: 400,
        y: 288,
        room: 8,
        adjacent: 7
      }];
      var door5 = this.add.image(0, 0, "door");
      var door_pos5 = [{
        x: 450,
        y: 450,
        room: 7,
        adjacent: 6
      }];
      var door6 = this.add.image(0, 0, "door");
      var door_pos6 = [{
        x: 503,
        y: 240,
        room: 8,
        adjacent: 4
      }, {
        x: 503,
        y: 335,
        room: 7,
        adjacent: 5
      }, {
        x: 503,
        y: 505,
        room: 6,
        adjacent: 2
      }, {
        x: 503,
        y: 610,
        room: 6,
        adjacent: 3
      }];
      var door7 = this.add.image(0, 0, "door");
      var door_pos7 = [{
        x: 566,
        y: 288,
        room: 4,
        adjacent: 5
      }, {
        x: 670,
        y: 288,
        room: 4,
        adjacent: 1
      }];
      var door8 = this.add.image(0, 0, "door");
      var door_pos8 = [{
        x: 618,
        y: 335,
        room: 5,
        adjacent: 1
      }];
      var door9 = this.add.image(0, 0, "door");
      var door_pos9 = [{
        x: 566,
        y: 450,
        room: 5,
        adjacent: 2
      }];
      var door10 = this.add.image(0, 0, "door");
      var door_pos10 = [{
        x: 566,
        y: 560,
        room: 3,
        adjacent: 2
      }, {
        x: 730,
        y: 560,
        room: 3,
        adjacent: 0
      }];
      var door11 = this.add.image(0, 0, "door");
      var door_pos11 = [{
        x: 730,
        y: 382,
        room: 0,
        adjacent: 1
      }, {
        x: 680,
        y: 500,
        room: 0,
        adjacent: 2
      }];
      var doors = [door1, door2, door3, door4, door5, door6, door7, door8, door9, door10, door11];
      var door_positions = [door_pos1, door_pos2, door_pos3, door_pos4, door_pos5, door_pos6, door_pos7, door_pos8, door_pos9, door_pos10, door_pos11];

      // room positions for encounter icons
      var positions = [{
        x: this.game.renderer.width / 2 - 225,
        y: this.game.renderer.height / 2 - 70,
        room: 9
      }, {
        x: this.game.renderer.width / 2 - 75,
        y: this.game.renderer.height / 2 - 170,
        room: 8
      }, {
        x: this.game.renderer.width / 2 - 75,
        y: this.game.renderer.height / 2 - 20,
        room: 7
      }, {
        x: this.game.renderer.width / 2 + 80,
        y: this.game.renderer.height / 2 + 110,
        room: 2
      }, {
        x: this.game.renderer.width / 2 + 60,
        y: this.game.renderer.height / 2 - 20,
        room: 5
      }, {
        x: this.game.renderer.width / 2 + 90,
        y: this.game.renderer.height / 2 - 165,
        room: 4
      }, {
        x: this.game.renderer.width / 2 - 75,
        y: this.game.renderer.height / 2 + 130,
        room: 6
      }, {
        x: this.game.renderer.width / 2 - 225,
        y: this.game.renderer.height / 2 + 170,
        room: 10
      }, {
        x: this.game.renderer.width / 2 + 120,
        y: this.game.renderer.height / 2 + 230,
        room: 3
      }, {
        x: this.game.renderer.width / 2 + 200,
        y: this.game.renderer.height / 2 - 60,
        room: 1
      }];
      var map = new _map.default(encounters, positions, doors, door_positions, startEnd);

      // level counter top in the left
      var level = this.add.text(220, 100, map._level.toString(), {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);

      // N.B. *** VERY IMPORTANT FUNCTION *** 
      encountersInteractive(this);

      // for moving to next level (only works when in final room)
      var next_floor = this.add.image(205, 435, "up").setDepth(2).setInteractive().on("pointerup", function () {
        if (map.currentLocation == 11) {
          for (var i = 0; i < map.adjacent.length; i++) {
            map.adjacent[i].getEncounter().disableInteractive();
          }
          map.levelInc();
          level.text = map._level.toString();
          encountersInteractive(_this);
          player.x = map._current_room.x;
          player.y = map._current_room.y;
        }
      });

      /* 
      N.B. *** IMPORTANT AGAIN KEVIN ***
      This up arrow needs to be hovered over when moving to a new room.
       THIS SIMULATES RETURNING TO THE MAP SCREEN FROM THE BATTLE SCENE CURRENTLY.
       */

      next_floor.on("pointerover", function () {
        pointer.x = next_floor.x + 60;
        pointer.y = next_floor.y - 30;
        encountersInteractive(_this);
      });

      // player icon on the map
      var player = this.add.image(map._current_room.x, map._current_room.y, 'player_map').setDepth(4);

      /*
      THIS IS WHERE THE INTERACTIVITY FOR THE ENCOUNTERS SHOULD BE DONE.
       DECIDING ON THE SCENE DEPENDING ON THE ENCOUNTER SHOULD BE DONE HERE.
       HANDLES ALL OF THE REASSIGNING OF THE ADJACENT ROOMS AND THE CURRENT LOCATION OF THE PLAYER.
       ALSO LOGS THE ROOMS THAT HAVE BEEN VISITED.
      */

      function encountersInteractive(scene) {
        var adjacent = map.adjacent;
        var _loop = function _loop(i) {
          adjacent[i].getEncounter().setInteractive();
          adjacent[i].getEncounter().on("pointerup", function () {
            // Moves back to the main menu when the back button is clicked
            map.playerLocation(adjacent[i]);
            player.x = map._current_room.x;
            player.y = map._current_room.y;
            scene.scene.start(_CST.CST.SCENES.BATTLE_LOAD);
            for (var _i = 0; _i < adjacent.length; _i++) {
              adjacent[_i].getEncounter().disableInteractive();
            }
            map.setAdjacent();
            adjacent[i].setVisited();
          });
          adjacent[i].getEncounter().on("pointerover", function () {
            pointer.setVisible(true).setDepth(3);
            pointer.x = adjacent[i].getEncounter().x + 60;
            pointer.y = adjacent[i].getEncounter().y - 30;
          });
        };
        for (var i = 0; i < adjacent.length; i++) {
          _loop(i);
        }
      }
    }
  }]);
  return MapScene;
}(Phaser.Scene);
exports.MapScene = MapScene;
},{"../helpers/classes/map":"src/helpers/classes/map.js","../CST":"src/CST.js"}],"src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;
var _CST = require("../CST");
var _MenuScene = require("./MenuScene");
var _OptionsScene = require("./OptionsScene");
var _CreditsScene = require("./CreditsScene");
var _BattleScene = require("./BattleScene");
var _MapScene = require("./MapScene");
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
// Creates the LoadScene class
var LoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);
  var _super = _createSuper(LoadScene);
  function LoadScene() {
    _classCallCheck(this, LoadScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.LOAD
    });
  }

  // Used to initialize variables (currently not used)
  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}

    // Used to load all the assets
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;
      // Load images
      this.load.image("tower", "./assets/tower2.jpg");
      this.load.image("arrow", "./assets/arrow.png");
      this.load.image("background", "./assets/background.png");
      this.load.image("player2", "./assets/player2.png");
      this.load.image("player", "./assets/player.png");
      this.load.image("player_map", "./assets/player_map.png");
      this.load.image("map", "./assets/tower_floor_map.png");
      this.load.image("shop", "./assets/shop.png");
      this.load.image("random", "./assets/random.png");
      this.load.image("cards", "./assets/cards_new.png");
      this.load.image("door", "./assets/doorway.png");
      this.load.image("up", "./assets/up_arrow.png");
      this.load.image("pointer", "./assets/pointer.png");

      // Load audio
      this.load.audio("soundtrack", "./assets/soundtrack.mp3");

      // Progress Bar
      var loadingBar = this.add.graphics({
        fillStyle: {
          colour: 0xffffff
        }
      });

      /*
      The following code is used to add functionality to the progress bar (will add a more complex progress bar later)
      Loader Events:
          complete - when everything is loaded
          progress - when something is loading
      */

      // Simulate load times (for testing)
      for (var i = 0; i < 100; i++) {
        this.load.image("background" + i, "./assets/background");
      }

      // Used to create the progress bar
      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
        console.log(percent);
      });

      // Loads menu when everything is loaded
      this.load.on("complete", function () {
        _this.scene.start(_CST.CST.SCENES.MENU);
      });
    }
  }]);
  return LoadScene;
}(Phaser.Scene);
exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js","./MenuScene":"src/scenes/MenuScene.js","./OptionsScene":"src/scenes/OptionsScene.js","./CreditsScene":"src/scenes/CreditsScene.js","./BattleScene":"src/scenes/BattleScene.js","./MapScene":"src/scenes/MapScene.js"}],"src/scenes/BattleLoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleLoadScene = void 0;
var _CST = require("../CST");
var _handCard = _interopRequireDefault(require("../helpers/classes/cards/handCard"));
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
var BattleLoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(BattleLoadScene, _Phaser$Scene);
  var _super = _createSuper(BattleLoadScene);
  function BattleLoadScene() {
    _classCallCheck(this, BattleLoadScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.BATTLE_LOAD
    });
  }
  _createClass(BattleLoadScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("cannon", "./assets/cards/Cannon.png");
      this.load.image("grenade", "./assets/cards/Grenade.png");
      this.load.image("headshot", "./assets/cards/Headshot.png");
      this.load.image("kevlar", "./assets/cards/Kevlar.png");
      this.load.image("medkit", "./assets/cards/Medkit.png");
      this.load.image("overload", "./assets/cards/Overload.png");
      this.load.image("reload", "./assets/cards/Reload.png");
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.start(_CST.CST.SCENES.BATTLE);
    }
  }]);
  return BattleLoadScene;
}(Phaser.Scene);
exports.BattleLoadScene = BattleLoadScene;
},{"../CST":"src/CST.js","../helpers/classes/cards/handCard":"src/helpers/classes/cards/handCard.js","./BattleScene":"src/scenes/BattleScene.js"}],"src/scenes/DiscardPileScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscardPileScene = void 0;
var _CST = require("../CST");
var _button = _interopRequireDefault(require("../helpers/classes/button"));
var _config = require("../helpers/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      this.graveYardArray = data;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.image("background", "./assets/background.png");
      this.load.image("reload", "./assets/cards/Reload.png");
    }
  }, {
    key: "create",
    value: function create() {
      var gameWidth = this.game.config.width;
      var gameHeight = this.game.config.height;
      var bg = this.add.image(-20, 0, "background").setOrigin(0, 0);
      bg.setScale(1);
      var title = this.add.text(gameWidth / 2, 5, "Discard Pile", {
        fontSize: "45px"
      });
      title.setOrigin(0.5, 0);
      var startX = 10;
      var startY = 50;
      var xOffset = _config.gameOptions.cardWidth + 50;
      var yOffSet = _config.gameOptions.cardHeight + 60;
      var xCounter = 0;
      var yCounter = 0;
      if (this.graveYardArray.length > 0) {
        var _iterator = _createForOfIteratorHelper(this.graveYardArray),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var cards = _step.value;
            cards.setVisible(true);
            var discardCard = this.add.existing(cards);
            discardCard.x = startX + xCounter * xOffset;
            discardCard.y = startY + yCounter * yOffSet;
            discardCard.setOrigin(0, 0);
            discardCard.displayWidth = _config.gameOptions.cardWidth * 1.3;
            discardCard.displayHeight = _config.gameOptions.cardHeight * 1.3;
            xCounter++;
            if (xCounter === 5) {
              xCounter = 0;
              yCounter++;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      this.input.on("pointerdown", function () {
        this.scene.stop(_CST.CST.SCENES.DISCARD_PILE);
      }, this);
    }
  }, {
    key: "damageCardFilter",
    value: function damageCardFilter() {
      console.log("Hello");
    }
  }]);
  return DiscardPileScene;
}(Phaser.Scene);
exports.DiscardPileScene = DiscardPileScene;
},{"../CST":"src/CST.js","../helpers/classes/button":"src/helpers/classes/button.js","../helpers/config":"src/helpers/config.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");
var _MenuScene = require("./scenes/MenuScene");
var _OptionsScene = require("./scenes/OptionsScene");
var _CreditsScene = require("./scenes/CreditsScene");
var _MapScene = require("./scenes/MapScene");
var _BattleScene = require("./scenes/BattleScene");
var _BattleLoadScene = require("./scenes/BattleLoadScene");
var _DiscardPileScene = require("./scenes/DiscardPileScene");
/**
This file is used to create the game and add any scenes.
*/

// Imports the scenes

// Creates the game
var game = new Phaser.Game({
  width: 1000,
  height: 800,
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _OptionsScene.OptionsScene, _CreditsScene.CreditsScene, _MapScene.MapScene, _BattleScene.BattleScene, _BattleLoadScene.BattleLoadScene, _DiscardPileScene.DiscardPileScene],
  render: {
    pixelArt: true
  },
  scale: {
    parent: 'phaser-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
});

// Function to load a font - https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
function loadFont(name, url) {
  var newFont = new FontFace(name, "url(".concat(url, ")"));
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}
loadFont("font1", "./assets/PixelboyFont.ttf");
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/OptionsScene":"src/scenes/OptionsScene.js","./scenes/CreditsScene":"src/scenes/CreditsScene.js","./scenes/MapScene":"src/scenes/MapScene.js","./scenes/BattleScene":"src/scenes/BattleScene.js","./scenes/BattleLoadScene":"src/scenes/BattleLoadScene.js","./scenes/DiscardPileScene":"src/scenes/DiscardPileScene.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43189" + '/');
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
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map