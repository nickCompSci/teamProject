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
        } else if (data.joinee) {
            this.joinee = true;
            this.otherPlayerName = data.playerToJoin;
            this.readyToStart = true;
        }
        window.network = this.network;
        if (this.network.peer._connections.size > 0) {
            this.network.send("i have joined the lobby, sending you hello!");
        }
    }

    // Creates any images, text, etc.
    create() {

        let scene = this;

        function tempAlert(message, duration) {
            var tmpElement = document.createElement("div");
            tmpElement.setAttribute("style", "position:absolute;top:10%;left:15%;background-color:white;");
            tmpElement.innerHTML = message;
            tmpElement.style.color = "white"
            tmpElement.style.backgroundColor = "black"
            tmpElement.style.padding = "5%"
            tmpElement.style.fontSize = "25px"
            setTimeout(function () {
                tmpElement.parentNode.removeChild(tmpElement);
                window.location.replace('/game.html');
            }, duration);
            document.body.appendChild(tmpElement);
        }

        function tempAlert2(message, duration) {
            var tmpElement = document.createElement("div");
            tmpElement.setAttribute("style", "position:absolute;top:10%;left:30%;background-color:white;");
            tmpElement.innerHTML = message;
            tmpElement.style.color = "white"
            tmpElement.style.backgroundColor = "black"
            tmpElement.style.padding = "5%"
            tmpElement.style.fontSize = "25px"
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

        let joineeDidLeave = false;
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
            if (this.readyToStart == true && this.host && joineeDidLeave == false) {
                scene.network.send("I have pressed start");
                tempAlert2("You have started the game!",3000);
                this.sound.play("beginGame",{volume: 1});
                this.scene.start(CST.SCENES.MAP, { networkObj: this.network, playerUsername: this.playerUsername, host: "host" });
            }else if(this.joinee){
                tempAlert2("Only host can start the game!",2000);
            }
        })
        .on("pointerout", () => {
            arrowSprite.setVisible(false);
            startGameButton.setStyle({ fill: '#fff' });
        })
            // if detects an increase in connections
        scene.network.peer.on('connection', function(conn){
            var data = {
                otherUser: scene.network.peer.conn.peer
            }
            $.ajax({
                type: 'POST',
                url: '/getOtherPlayersUsername',
                data,
                success: function (result) {
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
        });


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

            let joinCodeText = this.make.text({
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height * 0.30,
                text: `Join Code: **********`,
                origin: { x: 0.5, y: 0.5 },
                style: {
                    fontFamily: 'font1',
                    fontSize: '40px',
                    fill: 'white',
                    wordWrap: { width: 800, useAdvancedWrap: true }
                }
            })    
            .on("pointerout",() => joinCodeText.setStyle({ fill: '#FFF' }))
            .on("pointerover", ()=>{
                joinCodeText.setStyle({fill: '#fd722a'});
                scene.sound.play("menuButtonHover", {volume : 0.2});
            })     
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            // Add event listener to enable copying of the text
            .on('pointerdown', function (pointer) {
                if (pointer.leftButtonDown()) {
                    scene.sound.play("menuButtonPress", {volume : 0.4});
                    // var joinCode = joinCodeText.text.split(':')[1].trim(); // extract the join code
                    navigator.clipboard.writeText(joinCode).then(function(x){
                        alert("Join code copied to clipboard!")
                    }); // copy the join code to clipboard
                    // window.alert("Join code copied to clipboard!");
                }
            });

            // let joinCodeText = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.30, `Join Code: ${joinCode}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px', align: 'left', wordWrap: true, wordWrapWidth: 50 })
        }

        // KEVIN AND ZHI: sprite management
        if (this.joinee == true) {
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.50, `Player 2: ${this.playerUsername}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
                .setDepth(1)
                .setOrigin(0.5)
            this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.40, `Host: ${this.otherPlayerName}`, { fontFamily: 'font1', fill: '#ffffff', fontSize: '40px' })
                .setDepth(1)
                .setOrigin(0.5)
        }

       

        if (this.joinee) {
            scene.network.peer.conn.on('data', function(data) {
                if (data === "I have pressed start") {
                    tempAlert2("Host has started the game!",3000);
                    scene.sound.play("beginGame",{volume: 1});
                    scene.scene.start(CST.SCENES.MAP, { networkObj: scene.network, playerUsername: scene.playerUsername });
                }
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
                            window.location.replace('/game.html');
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
                            window.location.replace('/game.html');
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
                        window.location.replace('/game.html');

                    } catch {
                    }
                }
                else {
                    // this.scene.start(CST.SCENES.MENU, { networkObj: this.network, playerUsername: this.playerUsername });
                    window.location.replace('/game.html');
                }
            })

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);
    }
}
