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
      this.add.sprite(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2 + 70, 'player').setDepth(1).setScale(3);
      var player2 = this.add.sprite(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 + 70, 'player2').setDepth(1).setScale(3);
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
},{"../CST":"src/CST.js"}],"src/scenes/MapScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapScene = void 0;
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
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'map').setSize(this.game.renderer.width, this.game.renderer.height).setDepth(0);

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
      var battle = this.add.image(this.game.renderer.width / 2 - 215, this.game.renderer.height / 2 - 70, 'cards').setDepth(0);
      var shop = this.add.image(this.game.renderer.width / 2 - 55, this.game.renderer.height / 2 - 150, 'shop').setDepth(0);
      var random = this.add.image(this.game.renderer.width / 2 - 75, this.game.renderer.height / 2 - 20, 'random').setDepth(0);
      var random2 = this.add.image(this.game.renderer.width / 2 + 80, this.game.renderer.height / 2 + 110, 'random').setDepth(0);
      var battle2 = this.add.image(this.game.renderer.width / 2 + 60, this.game.renderer.height / 2 - 20, 'cards').setDepth(0);
      var battle3 = this.add.image(this.game.renderer.width / 2 + 90, this.game.renderer.height / 2 - 150, 'cards').setDepth(0);
      var battle4 = this.add.image(this.game.renderer.width / 2 - 85, this.game.renderer.height / 2 + 110, 'cards').setDepth(0);
      var battle5 = this.add.image(this.game.renderer.width / 2 - 215, this.game.renderer.height / 2 + 170, 'cards').setDepth(0);
      var battle6 = this.add.image(this.game.renderer.width / 2 + 120, this.game.renderer.height / 2 + 230, 'cards').setDepth(0);
      var battle7 = this.add.image(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 - 60, 'cards').setDepth(0);
      var encounters = [battle, battle2, battle3, battle4, battle5, battle6, battle7, shop, random, random2];
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
      shuffle(encounters);
      console.log(encounters);
      var positions = [{
        x: this.game.renderer.width / 2 - 215,
        y: this.game.renderer.height / 2 - 70
      }, {
        x: this.game.renderer.width / 2 - 55,
        y: this.game.renderer.height / 2 - 150
      }, {
        x: this.game.renderer.width / 2 - 75,
        y: this.game.renderer.height / 2 - 20
      }, {
        x: this.game.renderer.width / 2 + 80,
        y: this.game.renderer.height / 2 + 110
      }, {
        x: this.game.renderer.width / 2 + 60,
        y: this.game.renderer.height / 2 - 20
      }, {
        x: this.game.renderer.width / 2 + 90,
        y: this.game.renderer.height / 2 - 150
      }, {
        x: this.game.renderer.width / 2 - 85,
        y: this.game.renderer.height / 2 + 110
      }, {
        x: this.game.renderer.width / 2 - 215,
        y: this.game.renderer.height / 2 + 170
      }, {
        x: this.game.renderer.width / 2 + 120,
        y: this.game.renderer.height / 2 + 230
      }, {
        x: this.game.renderer.width / 2 + 200,
        y: this.game.renderer.height / 2 - 60
      }];
      for (var i = 0; i < encounters.length; i++) {
        console.log(positions[i].x);
        encounters[i].x = positions[i].x;
        encounters[i].y = positions[i].y;
      }
      battle.setInteractive();
      battle.on("pointerup", function () {
        // Moves back to the main menu when the back button is clicked
        _this.scene.start(_CST.CST.SCENES.BATTLE);
        console.log("click");
      });
    }
  }]);
  return MapScene;
}(Phaser.Scene);
exports.MapScene = MapScene;
},{"../CST":"src/CST.js"}],"src/scenes/LoadScene.js":[function(require,module,exports) {
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
      this.load.image("map", "./assets/tower_map_rooms.png");
      this.load.image("shop", "./assets/shop.png");
      this.load.image("random", "./assets/random.png");
      this.load.image("cards", "./assets/cards.png");

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55218" + '/');
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