/**
This file is used to create the options scene.
*/
import { CST } from "../CST";
export class OptionsScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.OPTIONS
        })
    }

    // Creates any images, text, etc.
    create(){

        // Options title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Options', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Disable music button
        let disableMusicButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'Disable Music', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

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

        // Disable Music Button
        disableMusicButton.setInteractive();

        disableMusicButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = disableMusicButton.x - disableMusicButton.width + 120;
            arrowSprite.y = disableMusicButton.y + disableMusicButton.height / 4;
            console.log("hover")
        })

        // When clicked, music will be disabled
        // When clicked again, music will be enabled
        let musicEnabled = true;

        disableMusicButton.on("pointerup", () => {
            if (musicEnabled) {
                this.sound.stopAll();
                musicEnabled = false;
                console.log("Music disabled");
            } else {
                this.sound.play("soundtrack", {loop: true});
                musicEnabled = true;
                console.log("Music enabled");
            }
        })
    }
}