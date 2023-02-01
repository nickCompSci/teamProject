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

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Please enter your username:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Input name box
        let nameBox = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "Name", {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setOrigin(0.5, 0.5)

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.50, 'Please enter a join code:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Input code box
        let codeBox = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.60, "Code", {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setOrigin(0.5, 0.5)

        // Code box
        codeBox.setInteractive();

        codeBox.on("pointerdown", ()=>{
            this.rexUI.edit(codeBox);
        });

        /** codeBox.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = codeBox.x - codeBox.width + 40;
            arrowSprite.y = codeBox.y + codeBox.height / 4;
            console.log("hover")
        }); */

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
            console.log("hover")
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
            console.log("click")
        })

        // Submit Button
        submitButton.setInteractive();

        submitButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = submitButton.x - submitButton.width + 60;
            arrowSprite.y = submitButton.y + submitButton.height / 4;
            console.log("hover")
        })

        submitButton.on("pointerup", ()=>{
            // Submit username and code
            console.log("Username:", nameBox.text);
            console.log("Join Code:", codeBox.text);
            console.log("click")
        })
    }
}