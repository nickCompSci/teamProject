/**
This file is used to create the create game scene.
*/
import { CST } from "../CST.js";
export class JoinGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.JOIN
        })
    }

    init(data) {
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;
    }

    // Creates any images, text, etc.
    create() {
        let thisScene = this;
        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Join Game', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' }).setDepth(1).setOrigin(0.5)

        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'Please enter a code below:', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' }).setDepth(1).setOrigin(0.5)

        this.codeInput = this.add.dom(this.game.renderer.width / 2, this.game.renderer.height * 0.45).createFromCache("enterCodeForm");

        // Submit button


        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => {
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
            backButton.setStyle({ fill: '#fd722a' });
            this.sound.play("menuButtonHover", { volume: 0.2 });
        })
        .on("pointerup", () => {
            this.scene.start(CST.SCENES.MENU, { networkObj: this.network, playerUsername: this.playerUsername });
        })

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);



        let otherUsername;

        let lobbyButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 230, 'Join Lobby', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerout", () => lobbyButton.setStyle({ fill: '#FFF' }))
            .on("pointerover", () => {
                arrowSprite.setVisible(true);
                arrowSprite.x = lobbyButton.x - lobbyButton.width + 130;
                arrowSprite.y = lobbyButton.y + lobbyButton.height / 4;
                lobbyButton.setStyle({ fill: '#fd722a' });
                this.sound.play("menuButtonHover", { volume: 0.2 });
            })

            .on("pointerout", () => {
                arrowSprite.setVisible(false);
            })
            .on("pointerup", () => {
                this.sound.play("menuButtonPress", { volume: 0.4 });
                let code = this.codeInput.getChildByName("code");

                if (code.value != "") {
                    // function to return true or false depending on if the code is valid or not

                    var data = {
                        otherUser: code.value
                    };
                    $.ajax({
                        type: 'POST',
                        url: '/getOtherPlayersUsername',
                        data,
                        // on success call the callback function
                        success: function (result) {
                            otherUsername = result.otherUserName;
                            // /searchForValidUsername
                            console.log(`${result.otherUserName} haaaaaaaaaaaaaaaaaaaaaaa`)
                            var data = {
                                username: otherUsername
                            };
                            $.ajax({
                                type: 'POST',
                                url: '/searchForValidUsername',
                                data,
                                // on success call the callback function
                                success: function (result) {
                                    console.log(result.found)
                                    if (result.found != "None") {

                                        if (confirm(`Are you sure you want to join ${otherUsername} via code.`) == true) {
                                            var data = {
                                                username: thisScene.playerUsername,
                                                otherUser: otherUsername
                                            };
                                            $.ajax({
                                                type: 'POST',
                                                url: '/doubleCheckEmptyFromJoinGameScene',
                                                data,
                                                // on success call the callback function
                                                success: function (result) {
                                                    console.log(result.isLobbyStillEmpty);
                                                    if (result.isLobbyStillEmpty == "true") {

                                                        thisScene.network.connect(code.value);
                                                        thisScene.scene.start(CST.SCENES.LOBBY, { networkObj: thisScene.network, playerUsername: thisScene.playerUsername, joinee: "joinee", playerToJoin: otherUsername });
                                                    }
                                                    else {
                                                        alert("lobby is full!")
                                                    }
                                                },
                                                error: function (xhr) {
                                                    window.alert(JSON.stringify(xhr));
                                                    window.location.replace('/');
                                                }
                                            })
                                        }

                                    } else {
                                        alert("Invalid username!");
                                    }

                                },
                                error: function (xhr) {
                                    window.alert(JSON.stringify(xhr));
                                    window.location.replace('/');
                                }
                            })
                        }
                    })

                } else {
                    // Code field is blank
                    alert("Code can not be blank")
                }
            })
    }
}