/**
This file is used to create the game and add any scenes.
*/

// Imports the scenes
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import {OptionsScene} from "./scenes/OptionsScene"
import {CreditsScene} from "./scenes/CreditsScene"

// Creates the game
let game = new Phaser.Game({
    width: 1000,
    height: 800,
    scene:[
        LoadScene, MenuScene, OptionsScene, CreditsScene
    ],
    render:{
        pixelArt: true
    }
});
