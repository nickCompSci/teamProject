/**
This file is used to create the game and add any scenes.
*/

// Imports the scenes
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import {OptionsScene} from "./scenes/OptionsScene";
import {CreditsScene} from "./scenes/CreditsScene";
import {MapScene} from "./scenes/MapScene";
import {BattleScene} from "./scenes/BattleScene";
import {BattleLoadScene} from "./scenes/BattleLoadScene"
import {DiscardPileScene} from "./scenes/DiscardPileScene"

// Creates the game
let game = new Phaser.Game({
    width: 1000,
    height: 800,
    scene:[
        LoadScene, MenuScene, OptionsScene, CreditsScene, MapScene, BattleScene, BattleLoadScene, DiscardPileScene
    ],
    render:{
        pixelArt: true
    }, 
    scale: { parent: 'phaser-container', mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }

});

// Function to load a font - https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

loadFont("font1", "./assets/PixelboyFont.ttf");