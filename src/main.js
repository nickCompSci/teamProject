import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import {OptionsScene} from "./scenes/OptionsScene"

let game = new Phaser.Game({
    width: 1000,
    height: 800,
    scene:[
        LoadScene, MenuScene, OptionsScene
    ],
    render:{
        pixelArt: true
    }
});
