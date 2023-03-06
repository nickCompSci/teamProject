/**
This file is used to create the lobby scene.
*/
import { CST } from "../CST.js";
export class LobbyScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOBBY
        })
    }

    init(data) {
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
        console.log(this.network);
        console.log(this.network.peer._connections.size)
        console.log(this.network.peer._connections);
        if (this.network.peer._connections.size > 0) {
            this.network.send("i have joined the lobby, sending you hello!");

        }
    }

    // Creates any images, text, etc.
    create() {



        function addJoinCodeToUserNode(joinCode, callback) {
            // data to be sent to the server route
            var data = {
                refreshToken: getCookie('refreshJwt'),
                joinCode: joinCode,
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

        function addJoinCodeToUserNodeCallback(result) {
            // no need to do anything here for now
        }
        function deleteJoinCodeRelationship(joinCode, callback) {
            // data to be sent to the server route
            var data = {
                refreshToken: getCookie('refreshJwt'),
                joinCode: joinCode,
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

        function deleteJoinCodeRelationshipCallback(result) {
            // no need to do anything here for now
        }
        
        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background')
            .setDisplaySize(this.game.renderer.width, this.game.renderer.height)
            .setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Lobby', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)

        let joinCode = this.network.peer.id;
        // send the joinCode to a function to send POST request to create a relationship
        // this will be queried by friends of this player
        addJoinCodeToUserNode(joinCode, addJoinCodeToUserNodeCallback);

        let joinCodeText = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, "Join Code: " + joinCode, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            // Add event listener to enable copying of the text
            .on('pointerdown', function (pointer) {
                if (pointer.leftButtonDown()) {
                    var joinCode = joinCodeText.text.split(':')[1].trim(); // extract the join code
                    navigator.clipboard.writeText(joinCode); // copy the join code to clipboard
                    window.alert("Join code copied to clipboard!");
                }
            });

        // Networking!
        // PLACEHOLDER - Lists current players connected to game
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, this.playerUsername, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
            .setDepth(1)
            .setOrigin(0.5)

        let startGameButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.80, 'Start Game', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => {
                arrowSprite.setVisible(true);
                arrowSprite.x = startGameButton.x - startGameButton.width + 130;
                arrowSprite.y = startGameButton.y + startGameButton.height / 4;
            })
            .on("pointerup", () => {
                // Moves to the game scene when the start game button is clicked
                // clearInterval(interval);
                this.scene.start(CST.SCENES.MAP, { networkObj: this.network, playerUsername: this.playerUsername });
            })



        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => {
                backButton.setStyle({fill: '#fd722a'});
                this.sound.play("menuButtonHover",{volume: 0.2});
                arrowSprite.setVisible(true);
                arrowSprite.x = backButton.x - backButton.width + 60;
                arrowSprite.y = backButton.y + backButton.height / 4;
                
            })
            .on("pointerup", () => {
                // clearInterval(interval);
                // console.log(this.network.peer._connections.size);
                this.sound.play("menuButtonPress",{volume: 0.4});
                if (this.network.peer._connections.size > 0) {
                    try {
                        this.network.peer.destroy();
                        console.log("terminated connection");
                        window.location.replace('/game.html');

                    } catch {
                        console.log("failed");
                    } finally {
                        deleteJoinCodeRelationship(this.network.peer.id);
                    }

                }
                else {
                    deleteJoinCodeRelationship(this.network.peer.id);
                    this.scene.start(CST.SCENES.MENU, { networkObj: this.network, playerUsername: this.playerUsername });
                }
            })

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);
    }
}

// let test = this;
        // let inLobby = false;
        // let updateNeo = false;
        // const interval = setInterval(function () {
        //     if (test.network.peer._connections.size > 0) {
        //         if (inLobby == false) {
        //             inLobby = true;
        //             var data = {
        //                 otherUser: test.network.peer.conn.peer
        //             }
        //             $.ajax({
        //                 type: 'POST',
        //                 url: '/getOtherPlayersId',
        //                 data,
        //                 success: function (result) {
        //                     console.log(result.otherUserName);
        //                     test.add.text(test.game.renderer.width / 2, test.game.renderer.height * 0.50, result.otherUserName, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' }).setDepth(1).setOrigin(0.5)
        //                 },
        //                 error: function (xhr) {
        //                     window.alert(JSON.stringify(xhr));
        //                     window.location.replace('/game.html');
        //                 }
        //             });
        //         }
        //         if(updateNeo == false){
        //             updateNeo = true;
        //             var data = {
        //                 refreshToken: getCookie('refreshJwt'),
        //             }
        //             $.ajax({
        //                 type: 'POST',
        //                 url: '/updateNeo',
        //                 data,
        //                 success: function (result) {
        //                     console.log(1)
        //                 },
        //                 error: function (xhr) {
        //                     window.alert(JSON.stringify(xhr));
        //                     window.location.replace('/game.html');
        //                 }
        //             });
        //         }
        //         // test.add.text(test.game.renderer.width / 2, test.game.renderer.height * 0.50, test.network.peer.conn.peer, {fontFamily: 'font1', fill: '#ffffff', fontSize: '40px'}).setDepth(1).setOrigin(0.5)
        //         clearInterval(interval);
        //     }
        //     console.log("got here")

        // }, 1000);
