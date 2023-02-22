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
    BATTLE: "BATTLE",
    MAP: "MAP"
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
},{"../CST":"src/CST.js"}],"src/scenes/BattleScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScene = void 0;
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
var BattleScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(BattleScene, _Phaser$Scene);
  var _super = _createSuper(BattleScene);
  function BattleScene() {
    _classCallCheck(this, BattleScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.BATTLE
    });
  }

  // Creates any images, text, etc.
  _createClass(BattleScene, [{
    key: "create",
    value: function create() {
      var _this = this;
      // adds player sprites
      this.add.sprite(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2 + 70, 'player').setDepth(1).setScale(3);
      var player2 = this.add.sprite(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 + 70, 'player2').setDepth(1).setScale(3);

      // adds background
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 120, 'background').setSize(50, 50).setDepth(0).setScale(0.7);

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
  return BattleScene;
}(Phaser.Scene);
exports.BattleScene = BattleScene;
},{"../CST":"src/CST.js"}],"src/classes/shuffle.js":[function(require,module,exports) {
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
},{}],"src/classes/door.js":[function(require,module,exports) {
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
},{"./shuffle":"src/classes/shuffle.js"}],"src/classes/room.js":[function(require,module,exports) {
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
},{}],"src/classes/map.js":[function(require,module,exports) {
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
    this._current_room = startEnd[0];
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
    this._rooms.push(new _room.default(0, startEnd[0], true));
    this._rooms.push(new _room.default(11, startEnd[1]));
    this.setAdjacent();
  }
  _createClass(Map, [{
    key: "playerLocation",
    value: function playerLocation(room) {
      this._current_location = room.getNumber();
      this._current_room = room.getEncounter();
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
      this._current_location = 0;
      this._current_room = startEnd[0];
      (0, _shuffle.default)(this._encounters);
      this.assignLocations(this._encounters, this._positions);
      for (var i = 0; i < this._doors.length; i++) {
        this._doors[i].randomizePosition();
      }
      this.setAdjacent();
    }

    // for assigning the positions (x, y) to the icons/images.
  }, {
    key: "assignLocations",
    value: function assignLocations(icon, locations) {
      this._rooms = [];
      for (var i = 0; i < icon.length; i++) {
        console.log(icon[i]);
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
},{"./shuffle":"src/classes/shuffle.js","./door":"src/classes/door.js","./room":"src/classes/room.js"}],"src/scenes/MapScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapScene = void 0;
var _map = _interopRequireDefault(require("../classes/map"));
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

      //  ** BEGINS HERE ** 

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
      var level = this.add.text(220, 100, map._level.toString(), {
        fontFamily: 'font1',
        fill: '#ffffff',
        fontSize: '60px'
      }).setDepth(1).setOrigin(0.5);
      encountersInteractive(this);
      var next_floor = this.add.image(205, 435, "up").setDepth(2).setInteractive();
      /*.on("pointerup", ()=>{
          // Moves back to the main menu when the back button is clicked
          this.scene.start(CST.SCENES.MAP);
      })*/

      next_floor.on("pointerover", function () {
        pointer.x = next_floor.x + 60;
        pointer.y = next_floor.y - 30;
        encountersInteractive(_this);
      });
      var player = this.add.image(map._current_room.x, map._current_room.y, 'player_map').setDepth(4);
      function encountersInteractive(scene) {
        var adjacent = map.adjacent;
        var _loop = function _loop(i) {
          adjacent[i].getEncounter().setInteractive();
          adjacent[i].getEncounter().on("pointerup", function () {
            // Moves back to the main menu when the back button is clicked
            map.playerLocation(adjacent[i]);
            player.x = map._current_room.x;
            player.y = map._current_room.y;
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
            map.setAdjacent();
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
},{"../classes/map":"src/classes/map.js","../CST":"src/CST.js"}],"src/scenes/LoadScene.js":[function(require,module,exports) {
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
},{"../CST":"src/CST.js","./MenuScene":"src/scenes/MenuScene.js","./OptionsScene":"src/scenes/OptionsScene.js","./CreditsScene":"src/scenes/CreditsScene.js","./BattleScene":"src/scenes/BattleScene.js","./MapScene":"src/scenes/MapScene.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");
var _MenuScene = require("./scenes/MenuScene");
var _OptionsScene = require("./scenes/OptionsScene");
var _CreditsScene = require("./scenes/CreditsScene");
var _BattleScene = require("./scenes/BattleScene");
var _MapScene = require("./scenes/MapScene");
/**
This file is used to create the game and add any scenes.
*/

// Imports the scenes

// Creates the game
var game = new Phaser.Game({
  width: 1000,
  height: 800,
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _OptionsScene.OptionsScene, _CreditsScene.CreditsScene, _BattleScene.BattleScene, _MapScene.MapScene],
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
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/OptionsScene":"src/scenes/OptionsScene.js","./scenes/CreditsScene":"src/scenes/CreditsScene.js","./scenes/BattleScene":"src/scenes/BattleScene.js","./scenes/MapScene":"src/scenes/MapScene.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62321" + '/');
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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map