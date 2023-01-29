/**
This file is used to create the main menu scene.
*/
import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }

    // Used to create our buttons, images, and text
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)


        // Adds the title image to the scene - (x, y, image), setDepth() is used to set the depth of the image (higher depth = higher priority)
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Dual Ascent: Tower of Cards', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Adds a button to the scene - (x, y, image)
        let startButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Start Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let profileButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'Profile', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let optionsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, 'Options', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let creditsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Credits', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Adds the hover arrow that will appear when hovering over a button
        let arrowSprite = this.add.sprite(100, 100, "arrow");

        // Sets the arrow to not be visible until hovering over a button
        arrowSprite.setVisible(false);

        // Fix music from repeating when moving from one scene to another and then back
        if (!this.isMusicPlaying) {
            this.isMusicPlaying = true;
            this.sound.pauseOnBlur = false;
            this.sound.play("soundtrack", { loop: true });
        }

        /*
        The following code is used to make the buttons interactive
        Pointer Events:
            pointerover - hovering
            pointerout - not hovering
            pointerup - click and release
            pointerdown - just click
        */

        // Allows the start button to be interactive
        startButton.setInteractive();

        // When the pointer is over the button, the arrow will appear
        startButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = startButton.x - startButton.width +135;
            arrowSprite.y = startButton.y + startButton.height / 4;
        })

        // Signals when the pointer is clicked and released
        startButton.on("pointerup", ()=>{
            console.log("click")
        })

        // Profile Button
        profileButton.setInteractive();

        profileButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = profileButton.x - profileButton.width +100;
            arrowSprite.y = profileButton.y + profileButton.height / 4;
        })

        startButton.on("pointerup", ()=>{
            console.log("click")
        })

        // Options Button
        optionsButton.setInteractive();

        optionsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = optionsButton.x - optionsButton.width +100;
            arrowSprite.y = optionsButton.y + optionsButton.height / 4;
        })

        optionsButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.scene.start(CST.SCENES.OPTIONS);
            console.log("click")
        })

        // Credits Button
        creditsButton.setInteractive();

        creditsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = creditsButton.x - creditsButton.width +100;
            arrowSprite.y = creditsButton.y + creditsButton.height / 4;
        })

        creditsButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.scene.start(CST.SCENES.CREDITS)
            console.log("click")
        })
    }
}