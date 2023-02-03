/**
This file is used to create the options scene.
*/
import { CST } from "../CST";
export class BattleScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.BATTLE
        })
    }

    // Creates any images, text, etc.
    create(){

        this.add.sprite(this.game.renderer.width / 2 -200, this.game.renderer.height / 2+70, 'player').setDepth(1).setScale(3);
        let player2 = this.add.sprite(this.game.renderer.width / 2 +200, this.game.renderer.height / 2+70, 'player2').setDepth(1).setScale(3);


        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2-120, 'background').setSize(50, 50).setDepth(0).setScale(0.7);

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
            console.log("hover")
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
            console.log("click")
        })

    }
}