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
        var toolTip; 
        var toolTipText;
        
        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Profile title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.10, this.playerUsername, {fontFamily: 'font1', fill: '#ffffff', fontSize: '80px'}).setDepth(1).setOrigin(0.5)
        let logoutButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, "Logout") 
            .setStyle({fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'})
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => $.ajax({
                type: 'POST',
                url: "/logout",
                // callback function
                success: () =>  {
                    // make the pending requests update to reflect changes to the user
                    // a form of "refreshing"
                    window.location.replace('/index.html');
                },
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                }
            }))
            .on("pointerover",() => logoutButton.setStyle({ fill: '#f39c12' }))
            .on("pointerout",() => logoutButton.setStyle({ fill: '#FFF' }))
// ________________________________________________________________________________________________________
            
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
            console.log("hover")
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
            console.log("click")
        })

        backButton.on("pointerout", () => {
            arrowSprite.setVisible(false);
        })
    }
}