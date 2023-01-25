import { CST } from "../CST";
import { MenuScene } from "./MenuScene";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }
    preload(){

        this.load.image("logo", "./assets/logo.png");
        this.load.image("options", "./assets/options.png");
        this.load.image("start", "./assets/start.png");
        this.load.image("credits", "./assets/credits.png");
        this.load.image("minigun-golden-3d-model-low-poly-obj-fbx-blend", "./assets/minigun-golden-3d-model-low-poly-obj-fbx-blend.jpg");

        this.load.audio("soundtrack", "./assets/draw.mp3");

        let loadingBar = this.add.graphics({
            fillStyle: {
                colour: 0xffffff
            }
        })

        /*
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        // Simulate load times
        for(let i = 0; i < 100; i++){
            this.load.image("minigun-golden-3d-model-low-poly-obj-fbx-blend" + i, "./assets/minigun-golden-3d-model-low-poly-obj-fbx-blend.jpg");
        }

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
            })

        this.load.on("complete", ()=>{
            // this.scene.start(CST.SCENES.MENU, "Hello from load scene");
        })
    }
    create(){
        this.scene.start(CST.SCENES.MENU, "Hello from load scene");
    }

}