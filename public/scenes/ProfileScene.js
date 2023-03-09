/**
This file is used to create the options scene.
*/
import { CST } from "../CST.js";
export class ProfileScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PROFILE
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

        let profile = this.add.image(this.game.renderer.width/2 - 200, this.game.renderer.height * 0.25, "profile");
        let name = this.add.text(profile.x, profile.y + profile.height/2, this.playerUsername, {fontFamily: 'font1', fill: "#FD722A", fontSize: "60px"});
        name.x -= name.width / 2;

        let biography = this.add.text(profile.x + profile.width/2, profile.y - profile.height /2 + 12, "Biography", {fontFamily: 'font1', fill: '#FD722a', fontSize: "60px"});

        let allFacts = [
            "Says lad far too much.",
            "Will throw hands",
            "Minigun their beloved",
            "Scarfed behaviour",
            "Looks nicer than they are",
            "CHEESE"
        ]

        let chosenFacts = this.getRandomBiography(allFacts);
        let factYOffset = 20;
        for (let i=0; i < chosenFacts.length; i++) {
            let bulletPoint = this.add.image(biography.x, biography.y + biography.height + factYOffset, "bulletpoint");
            bulletPoint.x += bulletPoint.width/2;
            bulletPoint.y += bulletPoint.height/2;
            let profileFacts = this.add.text(bulletPoint.x + 20, biography.y + biography.height + factYOffset, chosenFacts[i], {fontFamily: 'font1', fill: "#FFFFFF", fontSize: "35px"});
            factYOffset += 50;
        }


        let logoutButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "Logout") 
            .setStyle({fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.sound.play("menuButtonPress",{volume : 0.4});
                $.ajax({
                type: 'POST',
                url: "/logout",
                // callback function
                success: () =>  {
                    window.location.replace('/index.html');
                },
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                }
            })})
            .on("pointerover",() => {
                logoutButton.setStyle({ fill: '#fd722a' })
                arrowSprite.setVisible(true);
                arrowSprite.x = logoutButton.x - logoutButton.width + 90;
                arrowSprite.y = logoutButton.y + logoutButton.height / 4;
                this.sound.play("menuButtonHover",{volume : 0.2});
            })
            .on("pointerout",() => {
                logoutButton.setStyle({ fill: '#FFF' })
                arrowSprite.setVisible(false)
            })

            let friendsButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "Friends") 
                .setStyle({fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
                .setDepth(1)
                .setOrigin(0.5)
                .setInteractive({useHandCursor: true})
                .on("pointerup", () => {
                    this.sound.play("menuButtonPress",{volume : 0.4});
                    this.scene.start(CST.SCENES.FRIENDS, {networkObj: this.network, playerUsername: this.playerUsername })})
                .on("pointerover",() =>{
                    friendsButton.setStyle({ fill: '#fd722a' });
                    arrowSprite.setVisible(true);
                    arrowSprite.x = friendsButton.x - friendsButton.width + 110;
                    arrowSprite.y = friendsButton.y + friendsButton.height / 4;
                    this.sound.play("menuButtonHover",{volume : 0.2});
                })
                
                .on("pointerout",() => {
                    friendsButton.setStyle({ fill: '#FFF' })
                    arrowSprite.setVisible(false);
                })
            
        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on("pointerout",() => backButton.setStyle({ fill: '#FFF' }))
            .on("pointerover", ()=>{
                arrowSprite.setVisible(true);
                arrowSprite.x = backButton.x - backButton.width + 60;
                arrowSprite.y = backButton.y + backButton.height / 4;
                backButton.setStyle({fill: '#fd722a'});
                this.sound.play("menuButtonHover", {volume : 0.2});
            })
            .on("pointerup", ()=>{
                this.sound.play("menuButtonPress", {volume : 0.4});
                // Moves back to the main menu when the back button is clicked
                this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
            })
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
            })

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

    }

    getRandomBiography(list) {
        return [...list].sort(() => Math.random > 0.5 ? 1 : -1).slice(0, 3);
    }
}