/**
This file is used to create the main menu scene.
*/
import { CST } from "../CST.js";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }

    init(data){
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Used to create our buttons, images, and text
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0);
        
        // logo
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, "logo").setDepth(1);

        let playGameButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 , 'Play Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                playGameButton.setStyle({fill: '#fff'});
            })
            .setInteractive({useHandCursor: true})
            .on("pointerover", ()=>{
                arrowSprite.setVisible(true);
                arrowSprite.x = playGameButton.x - playGameButton.width +120;
                arrowSprite.y = playGameButton.y + playGameButton.height / 4;
                playGameButton.setStyle({fill: '#fd722a'});
                this.sound.play("menuButtonHover",{volume: 0.2});
            })
            .on("pointerup", ()=>{
                // Moves to options menu when clicked
                this.sound.play("menuButtonPress",{volume: 0.4});
                this.scene.start(CST.SCENES.PLAYGAME, {networkObj: this.network, playerUsername: this.playerUsername });
            })

        let profileButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'Profile', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            profileButton.setStyle({fill: '#fff'});
        })
        .setInteractive({useHandCursor: true})
        .on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = profileButton.x - profileButton.width +100;
            arrowSprite.y = profileButton.y + profileButton.height / 4;
            profileButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })
        .on("pointerup", ()=>{
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.PROFILE, {networkObj:this.network, playerUsername: this.playerUsername});
        })


        let optionsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, 'Options', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            optionsButton.setStyle({fill: '#fff'});
        })
        .setInteractive({useHandCursor: true})
        .on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = optionsButton.x - optionsButton.width +100;
            arrowSprite.y = optionsButton.y + optionsButton.height / 4;
            optionsButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })
        .on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.OPTIONS, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        let creditsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Credits', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            creditsButton.setStyle({fill: '#fff'});
        })
        .setInteractive({useHandCursor: true})
        .on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = creditsButton.x - creditsButton.width +100;
            arrowSprite.y = creditsButton.y + creditsButton.height / 4;
            creditsButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })
        .on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.CREDITS, {networkObj:this.network, playerUsername: this.playerUsername})
        })

       

        // Adds the hover arrow that will appear when hovering over a button
        let arrowSprite = this.add.sprite(100, 100, "arrow");

        // Sets the arrow to not be visible until hovering over a button
        arrowSprite.setVisible(false);

        // Fix music from repeating when moving from one scene to another and then back
        if (!this.isMusicPlaying) {
            this.isMusicPlaying = true;
            this.sound.pauseOnBlur = false;
            this.sound.play("menuMusic", { loop: true });
            this.sound.setVolume(0.2);
        }


    }

}