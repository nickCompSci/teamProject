/**
This file is used to create the credits scene
*/
import { CST } from "../CST.js";
export class PlayGameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PLAYGAME
        })
    }

    init(data){
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Creates any images, text, etc.
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background')
            .setDisplaySize(this.game.renderer.width, this.game.renderer.height)
            .setDepth(0)

        // PLay game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Play Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Adds a button to the scene - (x, y, image)
        let createButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Create Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                createButton.setStyle({fill: '#fff'});
            })
            // Allows the start button to be interactive
            .setInteractive({useHandCursor: true})
            // When the pointer is over the button, the arrow will appear
            .on("pointerover", ()=>{
                arrowSprite.setVisible(true);
                arrowSprite.x = createButton.x - createButton.width +150;
                arrowSprite.y = createButton.y + createButton.height / 4;
                createButton.setStyle({fill: '#fd722a'});
                this.sound.play("menuButtonHover",{volume: 0.2});
            })
            // Signals when the pointer is clicked and released
            .on("pointerup", ()=>{
                this.sound.play("menuButtonPress",{volume: 0.4});
                this.scene.start(CST.SCENES.LOBBY, {networkObj: this.network, playerUsername: this.playerUsername });
            })

        let joinButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 110, 'Join Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                joinButton.setStyle({fill: '#fff'});
        })
        // Allows the start button to be interactive
        .setInteractive({useHandCursor: true})
        // When the pointer is over the button, the arrow will appear
        .on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = joinButton.x - joinButton.width +125;
            arrowSprite.y = joinButton.y + joinButton.height / 4;
            joinButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })
        // Signals when the pointer is clicked and released
        .on("pointerup", ()=>{
            this.scene.start(CST.SCENES.JOIN, {networkObj:this.network, playerUsername: this.playerUsername});
            this.sound.play("menuButtonPress",{volume: 0.4});
            console.log("click")
        })

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on("pointerover", ()=>{
                arrowSprite.setVisible(true);
                arrowSprite.x = backButton.x - backButton.width + 60;
                arrowSprite.y = backButton.y + backButton.height / 4;
                this.sound.play("menuButtonHover", {volume : 0.4});
                backButton.setStyle({fill: '#fd722a'});
            })
            .on("pointerout",() => backButton.setStyle({ fill: '#FFF' }))
            .on("pointerup", ()=>{
                // Moves back to the main menu when the back button is clicked
                this.sound.play("menuButtonPress", {volume : 0.2});
                this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
            })
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
            })
            
    }
}