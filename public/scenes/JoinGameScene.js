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

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Please enter a code below:', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        this.codeInput = this.add.dom(this.game.renderer.width / 2, this.game.renderer.height * 0.45).createFromCache("enterCodeForm");

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
            let code = this.codeInput.getChildByName("code");
            if (code.value != "") {
                // function to return true or false depending on if the code is valid or not
                if (isValidCode) {
                    console.log("Success: Valid code found");
                    // Make network connection
                    this.scene.start(CST.SCENES.LOBBY, {networkObj: this.network, playerUsername: this.playerUsername });
                } else {
                    // Code does not exist
                    alert("Code not found");
                }
            } else {
                // Code field is blank
                alert("Code can not be blank")
            }
        })
    }
}