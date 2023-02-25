/**
This file is used to create the credits scene
*/
import { CST } from "../CST.js";
export class friendScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.FRIENDS
        })
    }

    // Creates any images, text, etc.
    create(){

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Friends title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Friends', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        this.nameInput = this.add.dom(200,400).createFromCache("friendsForm");
        this.friendsAndPending = this.add.dom(825,500).createFromCache("friendsList");

        const scene = this;
        showFriends(); // on load call the friends function to load in the friends list

        // button = this.add.button(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'button', this.req(friendUsername));
        const searchButton = this.add.text(100,525, "Search", { fontFamily: 'font1',fill: '#fff',fontSize: '60px'});
        const confirmButton = this.add.text(50,525, "", { fontFamily: 'font1',fill: '#fff',fontSize: '60px'});
        searchButton.setInteractive();

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.returnKey.on("down", event => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            // check if anything was inputted into the input box
            if(friendUsername.value != "") {
                // when success is called in the ajax, it will pass the response to
                // myCallBack function
                req(friendUsername.value, myCallBack);
            }
        });

        searchButton.on("pointerdown", () => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            if(friendUsername.value != "") {
            // when success is called in the ajax, it will pass the response to
            // myCallBack function
            req(friendUsername.value, myCallBack);
        }
        });

        searchButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = searchButton.x;
            arrowSprite.y = searchButton.y + searchButton.height-15;
        })
        searchButton.on("pointerout", ()=>{
            arrowSprite.setVisible(false);
        })

        confirmButton.on("pointerdown", () => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            if(friendUsername.value != "") {
            // when success is called in the ajax, it will pass the response to
            // myCallBack function
            console.log("sending the friend request now");
            sendFriendRequest(friendUsername.value, myOtherBack);
        }
        });
                
        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
            console.log("hover")
        })

        backButton.on("pointerout", ()=>{
            arrowSprite.setVisible(false);
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
        })
    }
}