/** @type {import("../typings/*")} */
import {BattleScene} from "/src/scenes/BattleScene.js";

// Fading animation - https://labs.phaser.io/edit.html?src=src/display/alpha/tween%20alpha.js&v=3.55.2

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 740,
    scene: [
        BattleScene
    ]
};

let game = new Phaser.Game(config);
console.log(5/2);

