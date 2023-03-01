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
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Adds the title image to the scene - (x, y, image), setDepth() is used to set the depth of the image (higher depth = higher priority)
        this.add.text(this.game.renderer.width / 2 - 330, this.game.renderer.height * 0.20, 'Dual Ascent', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)
        this.add.text(this.game.renderer.width / 2 + 300, this.game.renderer.height * 0.20, 'Tower of Cards', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Adds a button to the scene - (x, y, image)
        let createButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Create Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let joinButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 75, 'Join Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let profileButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150, 'Profile', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let optionsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 225, 'Options', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let creditsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Credits', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let friendsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 350, 'Friends', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let battleButton = this.add.text(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 + 350, 'Battle', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)
        let mapButton = this.add.text(this.game.renderer.width/ 2 + 400 , this.game.renderer.height / 2 + 350, 'Map', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Adds the hover arrow that will appear when hovering over a button
        let arrowSprite = this.add.sprite(100, 100, "arrow");

        // Sets the arrow to not be visible until hovering over a button
        arrowSprite.setVisible(false);

        // Fix music from repeating when moving from one scene to another and then back
        if (!this.isMusicPlaying) {
            this.isMusicPlaying = true;
            this.sound.pauseOnBlur = false;
            this.sound.play("soundtrack", { loop: true });
            this.sound.setVolume(0.5)
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
        createButton.setInteractive();

        // When the pointer is over the button, the arrow will appear
        createButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = createButton.x - createButton.width +150;
            arrowSprite.y = createButton.y + createButton.height / 4;
        })

        // Signals when the pointer is clicked and released
        createButton.on("pointerup", ()=>{
            this.scene.start(CST.SCENES.LOBBY, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        // Allows the start button to be interactive
        joinButton.setInteractive();

        // When the pointer is over the button, the arrow will appear
        joinButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = joinButton.x - joinButton.width +125;
            arrowSprite.y = joinButton.y + joinButton.height / 4;
        })

        // Signals when the pointer is clicked and released
        joinButton.on("pointerup", ()=>{
            this.scene.start(CST.SCENES.JOIN);
            console.log("click")
        })

        // Profile Button
        profileButton.setInteractive();

        profileButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = profileButton.x - profileButton.width +100;
            arrowSprite.y = profileButton.y + profileButton.height / 4;
        })

        profileButton.on("pointerup", ()=>{
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
            this.scene.start(CST.SCENES.OPTIONS, {networkObj: this.network, playerUsername: this.playerUsername });
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

        // Friends Button
        friendsButton.setInteractive();

        friendsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = friendsButton.x - friendsButton.width +100;
            arrowSprite.y = friendsButton.y + friendsButton.height / 4;
        })

        friendsButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.scene.start(CST.SCENES.FRIENDS, {networkObj:this.network ,theirUsername: this.playerUsername})
            console.log("click")
        })

        battleButton.setInteractive();

        battleButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = battleButton.x - battleButton.width +100;
            arrowSprite.y = battleButton.y + battleButton.height / 4;
        })

        battleButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.scene.start(CST.SCENES.BATTLE_LOAD);
            console.log("click")
        })

        // Map Button
        mapButton.setInteractive();

        mapButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = mapButton.x - mapButton.width +50;
            arrowSprite.y = mapButton.y + mapButton.height / 4 ;
        })

        mapButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.scene.start(CST.SCENES.MAP)
            console.log("click")
        })
    }

}