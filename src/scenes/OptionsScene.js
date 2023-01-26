import { CST } from "../CST";
export class OptionsScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.OPTIONS
        })
    }
    create(){

        // Music, Controls,
        // Add custom fonts so don't have to add sprites everytime
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "options").setDepth(1)

        let backButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 200, "back").setDepth(2)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Credits Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width +100;
            arrowSprite.y = backButton.y;
        })
        backButton.on("pointerout", ()=>{
            console.log("no hover")
        })
        backButton.on("pointerup", ()=>{
            this.scene.start(CST.SCENES.MENU);
            console.log("click")
        })
    }
}