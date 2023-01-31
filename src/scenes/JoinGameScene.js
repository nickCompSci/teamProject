/**
This file is used to create the options scene.
*/
import { CST } from "../CST";
export class JoinGameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.JOIN
        })
    }

    // Creates any images, text, etc.
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Join Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Please Enter a code to join:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Input code box
        let codeBox = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "Code", {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setOrigin(0.5, 0.5)

        codeBox.setInteractive()

        codeBox.on("pointerdown", ()=>{
            this.rexUI.edit(codeBox);
        })

        // Handle Enter key press
        this.input.keyboard.on("keydown", (event) => {
            if (event.keyCode === 13) {
                console.log("Code:", codeBox.text);
            }
        });

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