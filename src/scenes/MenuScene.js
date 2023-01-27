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

        // Adds the title image to the scene - (x, y, image), setDepth() is used to set the depth of the image (higher depth = higher priority)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1)

        //this.add.image(0,0, "background").setOrigin(0).setDepth(0);

        // Adds a button to the scene - (x, y, image)
        let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start").setDepth(2)

        let accountButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "account").setDepth(2)

        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "options").setDepth(3)

        let creditsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, "credits").setDepth(4)

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
            arrowSprite.y = startButton.y;
        })

        // Signals when the pointer is not hovering over the button
        startButton.on("pointerout", ()=>{
            console.log("no hover")
        })

        // Signals when the pointer is clicked and released
        startButton.on("pointerup", ()=>{
            console.log("click")
        })

        // Account Button
        accountButton.setInteractive();

        accountButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = accountButton.x - accountButton.width +100;
            arrowSprite.y = accountButton.y;
        })

        startButton.on("pointerout", ()=>{
            console.log("no hover")
        })

        startButton.on("pointerup", ()=>{
            console.log("click")
        })

        // Options Button
        optionsButton.setInteractive();

        optionsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = optionsButton.x - optionsButton.width +100;
            arrowSprite.y = optionsButton.y;
        })
        optionsButton.on("pointerout", ()=>{
            console.log("no hover")
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
            arrowSprite.y = creditsButton.y;
        })
        creditsButton.on("pointerout", ()=>{
            console.log("no hover")
        })
        creditsButton.on("pointerup", ()=>{
            console.log("click")
        })
    }
}