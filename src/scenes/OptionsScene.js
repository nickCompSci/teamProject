import { CST } from "../CST";
export class OptionsScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.OPTIONS
        })
    }
    create(){

        // Music, Controls, Back
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "options").setDepth(1)
    }
}