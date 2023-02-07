/** @type {import("../typings/*")} */
import {BattleScene} from "/src/scenes/BattleScene.js";

// Fading animation - https://labs.phaser.io/edit.html?src=src/display/alpha/tween%20alpha.js&v=3.55.2

export var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 800,
    scene: [
        BattleScene
    ]
};

let game = new Phaser.Game(config);

