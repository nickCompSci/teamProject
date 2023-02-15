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

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'Please send the code below to your friend:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        let joinCode = Math.random().toString(36).substring(2, 8);

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.50, `Join code: ${joinCode}`, {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5);

        // Submit button
        let lobbyButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 230, 'Join Lobby', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

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
        lobbyButton.setInteractive();

        lobbyButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = lobbyButton.x - lobbyButton.width + 130;
            arrowSprite.y = lobbyButton.y + lobbyButton.height / 4;
        })

        lobbyButton.on("pointerup", ()=>{
            // Networking!
            // Submit username to the database
            // I'm not sure when join code will be generated
            // Move to the lobby scene
            this.scene.start(CST.SCENES.LOBBY);
        })
    }
}

