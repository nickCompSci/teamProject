/**
This file is used to create the credits scene
*/
import { CST } from "../CST.js";
export class CreditsScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.CREDITS
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

        // Credits title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Credits', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Credits start here
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Team Lead', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.35, '-----------------', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'Nick Shapovalov', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.50, 'Game-Design Team', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.55, '-----------------', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.60, 'Kevin Jones Saleh', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.65, 'Eoin Schuch', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 - 300, this.game.renderer.height * 0.70, 'Zhi Jie Chen', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.50, 'Network Team', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.55, '-----------------', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.60, 'Nick Shapovalov', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.65, 'James Kirkby', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.70, 'Jack O\'Meara', {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Back Button
        backButton.setInteractive({useHandCursor: true});

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
            this.sound.play("menuButtonHover", {volume : 0.4});
            backButton.setStyle({fill: '#fd722a'});
        })
        backButton.on("pointerout",() => backButton.setStyle({ fill: '#FFF' }))
        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.sound.play("menuButtonPress", {volume : 0.2});
            this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        backButton.on("pointerout", () => {
            arrowSprite.setVisible(false);
        })
    }
}