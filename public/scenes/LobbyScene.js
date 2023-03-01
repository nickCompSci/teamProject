/**
This file is used to create the lobby scene.
*/
import { CST } from "../CST.js";
export class LobbyScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOBBY
        })
    }

    init(data){
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    init(data){
        this.network = data.networkObj;
    }

    // Creates any images, text, etc.
    create(){

        function addJoinCodeToUserNode(joinCode, callback){
            // data to be sent to the server route
            var data = {
                refreshToken: getCookie('refreshJwt'),
                joinCode : joinCode,
            }
            $.ajax({
                type: 'POST',
                url: '/joinCodeRelationship',
                data,
                success: callback,
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                    window.location.replace('/game.html');
                }
            });
        }

        function addJoinCodeToUserNodeCallback(result){
            // no need to do anything here for now
        }
        function deleteJoinCodeRelationship(joinCode,callback){
            // data to be sent to the server route
            var data = {
                refreshToken: getCookie('refreshJwt'),
                joinCode : joinCode,
            }
            $.ajax({
                type: 'POST',
                url: '/deleteJoinRelationship',
                data,
                success: callback,
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                    window.location.replace('/game.html');
                }
            });
        }

        function deleteJoinCodeRelationshipCallback(result){
            // no need to do anything here for now
        }

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Lobby', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let joinCode = this.network.peer.id;
        // send the joinCode to a function to send POST request to create a relationship
        addJoinCodeToUserNode(joinCode, addJoinCodeToUserNodeCallback);

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "Join Code: " + joinCode, {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        // Networking!
        // PLACEHOLDER - Lists current players connected to game
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, joinCode, {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)

        let startGameButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.80, 'Start Game', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', {fontFamily: 'font1', fill: '#ffffff', fontSize: '60px'}).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        // Start Game Button
        startGameButton.setInteractive();

        startGameButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = startGameButton.x - startGameButton.width + 130;
            arrowSprite.y = startGameButton.y + startGameButton.height / 4;
        })

        startGameButton.on("pointerup", ()=>{
            // Moves to the game scene when the start game button is clicked
            this.scene.start(CST.SCENES.MAP, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", ()=>{
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
        })

        backButton.on("pointerup", ()=>{
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
        })
    }
}