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

        let playGameButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 -90, 'Play Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                createButton.setStyle({fill: '#fff'});
            })
            .setInteractive({useHandCursor: true})
            .on("pointerover", ()=>{
                arrowSprite.setVisible(true);
                arrowSprite.x = playGameButton.x - playGameButton.width +100;
                arrowSprite.y = playGameButton.y + playGameButton.height / 4;
                playGameButton.setStyle({fill: '#fd722a'});
                this.sound.play("menuButtonHover",{volume: 0.2});
            })
            .on("pointerup", ()=>{
                // Moves to options menu when clicked
                this.sound.play("menuButtonPress",{volume: 0.4});
                this.scene.start(CST.SCENES.PLAYGAME, {networkObj: this.network, playerUsername: this.playerUsername });
            })

        let profileButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150, 'Profile', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            profileButton.setStyle({fill: '#fff'});
        })

        let optionsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 225, 'Options', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            optionsButton.setStyle({fill: '#fff'});
        })

        let creditsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Credits', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            creditsButton.setStyle({fill: '#fff'});
        })

        let friendsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 350, 'Friends', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            friendsButton.setStyle({fill: '#fff'});
        })

        let battleButton = this.add.text(this.game.renderer.width / 2 + 200, this.game.renderer.height / 2 + 350, 'Battle', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            battleButton.setStyle({fill: '#fff'});
        })

        let mapButton = this.add.text(this.game.renderer.width/ 2 + 400 , this.game.renderer.height / 2 + 350, 'Map', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
        .setDepth(1)
        .setOrigin(0.5)
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            mapButton.setStyle({fill: '#fff'});
        })

        // Adds the hover arrow that will appear when hovering over a button
        let arrowSprite = this.add.sprite(100, 100, "arrow");

        // Sets the arrow to not be visible until hovering over a button
        arrowSprite.setVisible(false);

        // Fix music from repeating when moving from one scene to another and then back
        if (!this.isMusicPlaying) {
            this.isMusicPlaying = true;
            this.sound.pauseOnBlur = false;
            this.sound.play("soundtrack", { loop: true });
            this.sound.setVolume(0.2)
        }

        // Profile Button
        profileButton.setInteractive({useHandCursor: true})

        profileButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = profileButton.x - profileButton.width +100;
            arrowSprite.y = profileButton.y + profileButton.height / 4;
            profileButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })

        profileButton.on("pointerup", ()=>{
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.PROFILE, {networkObj:this.network, playerUsername: this.playerUsername});
        })

        // Options Button
        optionsButton.setInteractive({useHandCursor: true})

        optionsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = optionsButton.x - optionsButton.width +100;
            arrowSprite.y = optionsButton.y + optionsButton.height / 4;
            optionsButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })

        optionsButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.OPTIONS, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        // Credits Button
        creditsButton.setInteractive({useHandCursor: true})

        creditsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = creditsButton.x - creditsButton.width +100;
            arrowSprite.y = creditsButton.y + creditsButton.height / 4;
            creditsButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })

        creditsButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.CREDITS, {networkObj:this.network, playerUsername: this.playerUsername})

        })

        // Friends Button
        friendsButton.setInteractive({useHandCursor: true})

        friendsButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = friendsButton.x - friendsButton.width +100;
            arrowSprite.y = friendsButton.y + friendsButton.height / 4;
            friendsButton.setStyle({fill: '#fd722a'});
            this.sound.play("menuButtonHover",{volume: 0.2});
        })

        friendsButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.sound.play("menuButtonPress",{volume: 0.4});
            this.scene.start(CST.SCENES.FRIENDS, {networkObj:this.network ,playerUsername: this.playerUsername})
        })

        battleButton.setInteractive({useHandCursor: true})

        battleButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = battleButton.x - battleButton.width +100;
            arrowSprite.y = battleButton.y + battleButton.height / 4;
        })

        battleButton.on("pointerup", ()=>{
            // Moves to options menu when clicked
            this.scene.start(CST.SCENES.BATTLE_LOAD);
        })

        // Map Button
        mapButton.setInteractive({useHandCursor: true})

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