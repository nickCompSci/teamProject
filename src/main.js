import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import {OptionsScene} from "./scenes/OptionsScene"

let game = new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    scene:[
        LoadScene, MenuScene, OptionsScene
    ],
    render:{
        pixelArt: true
    }
});
