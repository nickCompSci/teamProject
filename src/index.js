/** @type {import("../typings/*")} */
import { DiscardPileScene } from "./scenes/discardPileScene";
import { LoadScene } from "./scenes/loadScene";
import {BattleScene} from "/src/scenes/battleScene.js";

// Fading animation - https://labs.phaser.io/edit.html?src=src/display/alpha/tween%20alpha.js&v=3.55.2

export var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    scale: { parent: 'phaser-container', mode:Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [
        LoadScene,
        BattleScene,
        DiscardPileScene
    ]
};

let game = new Phaser.Game(config);