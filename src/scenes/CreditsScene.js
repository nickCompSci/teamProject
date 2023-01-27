/**
This file is used to create the credits scene
*/
import { CST } from "../CST";
export class CreditsScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.CREDITS
        })
    }

    // Creates any images, text, etc.
    create(){

        // Credits title
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "credits").setDepth(1)

        // Back Button for navigating back to the main menu
        let backButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2 + 300, "back").setDepth(2)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y;
            console.log("hover")
        })
        backButton.on("pointerout", ()=>{
            console.log("no hover")
        })
        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
            console.log("click")
        })
    }
}