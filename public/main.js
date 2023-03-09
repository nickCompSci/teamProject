/**
This file is used to create the game and add any scenes.
*/

// Imports the scenes
import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {OptionsScene} from "./scenes/OptionsScene.js";
import {CreditsScene} from "./scenes/CreditsScene.js";
import {JoinGameScene} from "./scenes/JoinGameScene.js";
// import {CreateGameScene} from "./scenes/CreateGameScene.js";
import {LobbyScene} from "./scenes/LobbyScene.js";
import {friendScene} from "./scenes/FriendScene.js";
import {MapScene} from "./scenes/MapScene.js";
import {BattleScene} from "./scenes/BattleScene.js";
import {DiscardPileScene} from "./scenes/DiscardPileScene.js"
import { ProfileScene } from "./scenes/ProfileScene.js";
import {ExtraScene} from "./scenes/ExtraScene.js";
import { PlayGameScene } from "./scenes/PlayGameScene.js";
import { initiatePVPScene } from "./scenes/InitiatePVPScene.js";
import { PVPScene } from "./scenes/PVPScene.js";
import { LastScene } from "./scenes/LastScene.js";

// import RexUIPlugin from  "../node_modules/phaser3-rex-plugins/templates/ui/ui-plugin"

// Creates the game
let game = new Phaser.Game({
    width: 1000,
    height: 800,
    scale: { parent: 'phaser-container', mode: Phaser.Scale.NONE, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene:[
        LoadScene, MenuScene, OptionsScene, CreditsScene, JoinGameScene, LobbyScene, friendScene, MapScene, BattleScene, DiscardPileScene, ExtraScene, ProfileScene, PlayGameScene, initiatePVPScene, PVPScene, LastScene
    ],
    render:{
        pixelArt: true
    },
    parent: "phaser-container",
    dom: {
        createContainer: true
    },
    // plugins: {
    //     scene: [
    //         {
    //             key: "rexUI",
    //             plugin: RexUIPlugin,
    //             mapping: "rexUI"
    //         }
    //     ]
    // }
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

loadFont("font1", "../assets/resources//PixelboyFont.ttf");

//NOTES
// Remove username field from create game scene and join game scene
// Update loading screen
