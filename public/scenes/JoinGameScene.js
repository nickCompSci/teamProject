/**
This file is used to create the create game scene.
*/
import { CST } from "../CST.js";
export class JoinGameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.JOIN
        })
    }

    init(data){
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Creates any images, text, etc.
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Join Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'Please enter a join code:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Input code box
        let codeBox = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "Code", {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setOrigin(0.5, 0.5)

        // Code box
        codeBox.setInteractive();

        // codeBox.on("pointerdown", ()=>{
        //     this.rexUI.edit(codeBox);
        // });

        /** codeBox.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = codeBox.x - codeBox.width + 40;
            arrowSprite.y = codeBox.y + codeBox.height / 4;
            console.log("hover")
        }); */

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
            this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
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
            // Checks to see if code matches any existing games
            // If it does, then the scene is changed to a lobby scene that shows the other players in the game
            // If it doesn't, then an error message is displayed
            this.scene.start(CST.SCENES.LOBBY, {networkObj: this.network, playerUsername: this.playerUsername });
        })
    }
}