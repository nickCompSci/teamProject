import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";

let game = new Phaser.Game({
    width: 100,
    height: 100,
    scene:[
        LoadScene, MenuScene
    ]
});
