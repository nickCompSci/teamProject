/**
This file is used to load all the assets for the game.
*/
import { CST } from "../CST";
import { MenuScene } from "./MenuScene";
import { OptionsScene } from "./OptionsScene";
import { CreditsScene } from "./CreditsScene";

// Creates the LoadScene class
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }

    // Used to initialize variables (currently not used)
    init(){
    }

    // Used to load all the assets
    preload(){

        // Load images
        this.load.image("background", "./assets/background.jpg");
        this.load.image("arrow", "./assets/arrow.png")

        // Load audio
        this.load.audio("soundtrack", "./assets/soundtrack.mp3");

        // Progress Bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                colour: 0xffffff
            }
        })

        /*
        The following code is used to add functionality to the progress bar (will add a more complex progress bar later)
        Loader Events:
            complete - when everything is loaded
            progress - when something is loading
        */

        // Simulate load times (for testing)
        for(let i = 0; i < 100; i++){
            this.load.image("background" + i, "./assets/background");
        }

        // Used to create the progress bar
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
            })

        // Loads menu when everything is loaded
        this.load.on("complete", ()=>{
            this.scene.start(CST.SCENES.MENU);
        })
    }
}