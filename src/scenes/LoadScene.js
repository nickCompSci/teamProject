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

    this.load.image("logo.png", "./assets/logo.png")
    this.load.image("options.png", "./assets/options.png")
    this.load.image("start.png", "./assets/start.png")
    this.load.image("credits.png", "./assets/credits.png")
    this.load.image("minigun-golden-3d-model-low-poly-obj-fbx-blend.jpg", "./assets/minigun-golden-3d-model-low-poly-obj-fbx-blend.jpg")

    }
    create(){
        this.scene.start(CST.SCENES.MENU, "Hello from load scene");
    }

}