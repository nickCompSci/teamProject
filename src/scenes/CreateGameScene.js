/**
This file is used to create the create game scene.
*/
import { CST } from "../CST";
export class CreateGameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.CREATE
        })
    }

    // Creates any images, text, etc.
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Create Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Please enter your username:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Input name box
        let nameBox = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "Name", {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setOrigin(0.5, 0.5)

        nameBox.setInteractive();

        nameBox.on("pointerdown", ()=>{
            this.rexUI.edit(nameBox);
        });

        /** nameBox.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = nameBox.x - nameBox.width + 40;
            arrowSprite.y = nameBox.y + nameBox.height / 4;
            console.log("hover")
        }); */

        // Submit button
        let submitButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.70, 'Submit', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

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
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
        })

        // Submit Button
        submitButton.setInteractive();

        submitButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = submitButton.x - submitButton.width + 90;
            arrowSprite.y = submitButton.y + submitButton.height / 4;
        })

        submitButton.on("pointerup", ()=>{
            // Submit username and join code to the database

            // Move to the lobby scene
            // this.scene.start(CST.SCENES.LOBBY);
        })
    }
}