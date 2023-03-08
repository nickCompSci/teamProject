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
        window.network = this.network;
        this.host = false;
        this.joinee = false;
        this.otherPlayerName;
        this.readyToStart = false;
        if (data.host) {
            this.host = true
            console.log(`${this.playerUsername} is the host`);
        } else if (data.joinee) {
            this.joinee = true;
            this.otherPlayerName = data.playerToJoin;
            this.readyToStart = true;
            // console.log("we have set start");
            console.log(`${this.playerUsername} is the joinee`);
        }
        console.log(this.network);
        console.log(this.network.peer._connections.size)
        console.log(this.network.peer._connections);
        if (this.network.peer._connections.size > 0) {
            this.network.send("i have joined the lobby, sending you hello!");

        }
    }

    // Creates any images, text, etc.
    create() {

        // this.peer.conn.on('data', function(data){
        //     console.log("this is the receiving function");
        //     // seems to be for JOINEES
        //     console.log("Data received: ", data);
        // })

        function tempAlert(message, duration) {
            var tmpElement = document.createElement("div");
            tmpElement.setAttribute("style", "position:absolute;top:10%;left:23%;background-color:white;");
            tmpElement.innerHTML = message;
            tmpElement.style.color = "white"
            tmpElement.style.backgroundColor = "black"
            tmpElement.style.padding = "5%"
            tmpElement.style.fontSize = "larger"
            setTimeout(function () {
                tmpElement.parentNode.removeChild(tmpElement);
                window.location.replace('/game.html');
            }, duration);
            document.body.appendChild(tmpElement);
        }

        function tempAlert2(message, duration) {
            var tmpElement = document.createElement("div");
            tmpElement.setAttribute("style", "position:absolute;top:10%;left:35%;background-color:white;");
            tmpElement.innerHTML = message;
            tmpElement.style.color = "white"
            tmpElement.style.backgroundColor = "black"
            tmpElement.style.padding = "5%"
            tmpElement.style.fontSize = "larger"
            setTimeout(function () {
                tmpElement.parentNode.removeChild(tmpElement);
            }, duration);
            document.body.appendChild(tmpElement);
        }

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


        let scene = this;

        // this interval must keep checking for a connection 
        // once detected it creates a neo4j IN_LOBBY_TOGETHER relationship
        // with the joinee
        if (this.host) {
            const waitingForJoineeInterval = setInterval(function () {
                // if detects an increase in connections
                if ((scene.network.peer._connections.size > 0 && scene.host == true)) {
                    clearInterval(waitingForJoineeInterval)
                    var data = {
                        otherUser: scene.network.peer.conn.peer
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/getOtherPlayersId',
                        data,
                        success: function (result) {
                            console.log(result.otherUserName);
                            scene.otherPlayerName = result.otherUserName;

                            var data = {
                                username: scene.playerUsername,
                                otherUser: scene.otherPlayerName,
                            }
                            $.ajax({
                                type: 'POST',
                                url: '/createLobby',
                                data,
                                success: function (result) {
                                    scene.add.text(scene.game.renderer.width / 2, scene.game.renderer.height * 0.50, `Player 2: ${scene.otherPlayerName}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
                                        .setDepth(1)
                                        .setOrigin(0.5)
                                    scene.readyToStart = true;
                                },
                                error: function (xhr) {
                                    window.alert(JSON.stringify(xhr));
                                    window.location.replace('/game.html');
                                }
                            });
                            // scene.add.text(test.game.renderer.width / 2, test.game.renderer.height * 0.50, result.otherUserName, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' }).setDepth(1).setOrigin(0.5)
                        },
                        error: function (xhr) {
                            window.alert(JSON.stringify(xhr));
                            window.location.replace('/game.html');
                        }
                    });
                }
            }, 100);
        }
        // a leaveGame detection interval
        // if the joinee leaves the game - he will peer.destroy and destroy his directional IN_LOBBY_TOGETHER
        // the host must detect this, peer.destroy himself, reallocate the peer to himself
        // and rebuild the JOIN_GAME relationship
        let detectingJoineeLeaveInterval;
        if (this.host) {
            detectingJoineeLeaveInterval = setInterval(function () {
                if (scene.otherPlayerName) {
                    var data = {
                        username: scene.playerUsername,
                        otherUser: scene.otherPlayerName,
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/checkIfHostLeft',
                        data,
                        success: function (result) {
                            if (result.hostLeft == "true") {
                                clearInterval(detectingJoineeLeaveInterval);
                                tempAlert("The Joinee has left the game! Sending you back to main menu", 1500);
                            }
                        },
                        error: function (xhr) {
                            window.alert(JSON.stringify(xhr));
                            window.location.replace('/game.html');
                        }
                    });
                }
            }, 1000);
        }

        // a leaveGame detection interval
        // if the host leaves the game - he will peer.destroy and leave
        // the joinee must detect this
        let detectingHostLeaveInterval
        if (this.joinee) {
            detectingHostLeaveInterval = setInterval(function () {
                var data = {
                    username: scene.playerUsername,
                    otherUser: scene.otherPlayerName,
                }
                $.ajax({
                    type: 'POST',
                    url: '/checkIfHostLeft',
                    data,
                    success: function (result) {
                        if (result.hostLeft == "true") {
                            clearInterval(detectingJoineeLeaveInterval);
                            tempAlert("The host has left the game! Sending you back to Main Menu", 1500)
                        }
                    },
                    error: function (xhr) {
                        window.alert(JSON.stringify(xhr));
                        window.location.replace('/game.html');
                    }
                });
            }, 1000);
        }

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background')
            .setDisplaySize(this.game.renderer.width, this.game.renderer.height)
            .setDepth(0)

        // Join Game title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Lobby', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)


        // send the joinCode to a function to send POST request to create a relationship
        // this will be queried by friends of this player
        if (this.host == true) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, `Host: ${this.playerUsername}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
                .setDepth(1)
                .setOrigin(0.5)
            let joinCode = this.network.peer.id;
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
        }

        if (this.joinee == true) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.50, `Player 2: ${this.playerUsername}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
                .setDepth(1)
                .setOrigin(0.5)
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, `Host: ${this.otherPlayerName}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
                .setDepth(1)
                .setOrigin(0.5)
        }

        let startGameButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.70, 'Start Game', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => {
                arrowSprite.setVisible(true);
                arrowSprite.x = startGameButton.x - startGameButton.width + 130;
                arrowSprite.y = startGameButton.y + startGameButton.height / 4;
                startGameButton.setStyle({ fill: '#fd722a' });
                this.sound.play("menuButtonHover", { volume: 0.2 });
            })
            .on("pointerup", () => {
                // Moves to the game scene when the start game button is clicked
                // clearInterval(interval);
                // if someone presses the start button
                if (this.readyToStart == true && this.host) {
                    scene.network.send("I have pressed start");
                    tempAlert2("You have started the game!",3000);
                    this.sound.play("beginGame",{volume: 1});
                    this.scene.start(CST.SCENES.MAP, { networkObj: this.network, playerUsername: this.playerUsername });
                }else if(this.joinee){
                    tempAlert2("Only host can start the game!",2000);
                }
            })
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                startGameButton.setStyle({ fill: '#fff' });
            })

        if (this.joinee) {
            scene.network.peer.conn.on('data', function(data) {
                if (data === "I have pressed start") {
                    tempAlert2("Host has started the game!",3000);
                    scene.sound.play("beginGame",{volume: 1});
                    scene.scene.start(CST.SCENES.MAP, { networkObj: scene.network, playerUsername: scene.playerUsername });
                }
                // if (scene.network.joineesReceiveMessage == "I have pressed start") {
                //     tempAlert2("Host has started the game!",3000);
                //     scene.sound.play("beginGame",{volume: 1});
                //     scene.scene.start(CST.SCENES.MAP, { networkObj: scene.network, playerUsername: scene.playerUsername });
                //     // console.log("host pressed start, we may begin");
                // }
            })
        }


        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerover", () => {
                backButton.setStyle({ fill: '#fd722a' });
                this.sound.play("menuButtonHover", { volume: 0.2 });
                arrowSprite.setVisible(true);
                arrowSprite.x = backButton.x - backButton.width + 60;
                arrowSprite.y = backButton.y + backButton.height / 4;

            })
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                backButton.setStyle({ fill: '#fff' });
            })
            .on("pointerup", () => {
                // clearInterval(interval);
                // console.log(this.network.peer._connections.size);
                if (this.host == true) {
                    deleteJoinCodeRelationship(this.network.peer.id);
                    // /deleteLobby
                    var data = {
                        username: scene.playerUsername
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/deleteLobby',
                        data,
                        success: function (result) {
                        },
                        error: function (xhr) {
                            window.alert(JSON.stringify(xhr));
                            window.location.replace('/game.html');
                        }
                    });
                }
                else if (this.joinee == true) {
                    var data = {
                        username: scene.playerUsername
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/joineeLeft',
                        data,
                        success: function (result) {
                        },
                        error: function (xhr) {
                            window.alert(JSON.stringify(xhr));
                            window.location.replace('/game.html');
                        }
                    });
                }
                this.sound.play("menuButtonPress", { volume: 0.4 });
                if (this.network.peer._connections.size > 0) {
                    try {
                        this.network.peer.destroy();
                        console.log("terminated connection");
                        window.location.replace('/game.html');

                    } catch {
                        console.log("failed");
                    }
                }
                else {
                    this.scene.start(CST.SCENES.MENU, { networkObj: this.network, playerUsername: this.playerUsername });
                }
            })

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);
    }
}
