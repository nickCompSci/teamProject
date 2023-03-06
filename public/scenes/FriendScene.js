/**
This file is used to create the credits scene
*/
import { CST } from "../CST.js";
export class friendScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.FRIENDS
        })
    }

    init(data) {
        this.network = data.networkObj;
        this.playerUsername = data.playerUsername;

    }
    // Creates any images, text, etc.
    create() {

        function tempAlert(message, duration) {
            var tmpElement = document.createElement("div");
            tmpElement.setAttribute("style", "position:absolute;top:10%;left:30%;background-color:white;");
            tmpElement.innerHTML = message;
            tmpElement.style.color = "white"
            tmpElement.style.backgroundColor = "black"
            tmpElement.style.padding = "1%"
            setTimeout(function () {
                tmpElement.parentNode.removeChild(tmpElement);
            }, duration);
            document.body.appendChild(tmpElement);
        }

        function searchForValidUsername(usernameToSearch, callback) {
            // data to send to the route
            var data = {
                username: usernameToSearch
            };
            $.ajax({
                type: 'POST',
                url: '/searchForValidUsername',
                data,
                // on success call the callback function
                success: callback,
                // on error return to game page 
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                    window.location.replace('/game.html');
                }
            });
        }

        function searchForValidUsernameCallback(result) {
            if (result.found == "None") {
                scene.sound.play("failedToSendFriendRequest");
                tempAlert(`Username: ${scene.nameInput.getChildByName("friendUsername").value} does not exist!`, 5000)
            } else {
                if (confirm("Player found! Are you sure you want to send them a friend request") == true) {
                    sendFriendRequest(scene.nameInput.getChildByName("friendUsername").value, sendFriendRequestCallback);
                }
            }
        }

        function sendFriendRequest(usernameToSendRequestTo, callback) {
            // data to send to the route
            var data = {
                username: usernameToSendRequestTo,
                refreshToken: getCookie('refreshJwt')
            };
            $.ajax({
                type: 'POST',
                url: '/sendFriendRequest',
                data,
                // callback function if successful
                success: callback,
                // on error return to game page 
                error: function (xhr) {
                    window.alert(JSON.stringify(xhr));
                    window.location.replace('/game.html');
                }
            });
        }

        function sendFriendRequestCallback(result) {
            if (result.found == "false") {
                scene.sound.play("failedToSendFriendRequest");
                alert("Invalid username, failed to send friend request");
            }
            else {
                scene.sound.play("sentFriendRequest");
                alert("Sent friend request!");
                showPending();
            }
        }

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Friends title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.10, 'Friends', { fontFamily: 'font1', fill: '#ffffff', fontSize: '80px' }).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        this.nameInput = this.add.dom(200, 350).createFromCache("searchFriendForm");
        this.friendsAndPending = this.add.dom(825, 500).createFromCache("pendingAndFriends");

        const scene = this;
        // this will refresh the friends tab every 15 seconds, only if the friends tab is currently
        // active
        const interval = setInterval(function () {
            if (window.getComputedStyle(document.getElementById('showUsersFriends'), null).display == "block") {
                showFriends()
            }
        }, 15000);

        showPending(); // call pending list to load in all the elements
        showFriends(); // on load call the friends function to load in the friends list

        const searchButton = this.add.text(100, 500, "Search", { fontFamily: 'font1', fill: '#fff', fontSize: '60px' })
            .setInteractive({ useHandCursor: true })
            .on("pointerup", () => {
                this.sound.play("menuButtonPress", { volume: 0.4 });
                // obtains the value the user entered in the username field
                let friendUsername = this.nameInput.getChildByName("friendUsername");
                // make sure that something was entered and not nothing
                if (friendUsername.value != "") {
                    if (friendUsername.value == this.playerUsername) {
                        scene.sound.play("failedToSendFriendRequest");
                        alert("You can not send request to yourself!");
                    }
                    // check if the player username entered is already a friend
                    else if (document.querySelector('#currentFriends #' + friendUsername.value)) {
                        scene.sound.play("failedToSendFriendRequest");
                        alert(`This player is already your friend!`);
                    }
                    // check if the entered username exists in the pending requests list
                    else if (document.querySelector('#showUsersPending #' + friendUsername.value)) {
                        scene.sound.play("failedToSendFriendRequest");
                        let element = document.querySelector('#pendingRequests #' + friendUsername.value)
                        if (element.matches(".fa-sharp.fa-solid.fa-square-xmark.red.once")) {
                            alert(`You already sent this player a friend request!`);
                        } else {
                            alert(`This player already sent you a friend request!`);
                        }
                    }
                    else {
                        searchForValidUsername(friendUsername.value, searchForValidUsernameCallback);
                    }
                }
            })
            .on("pointerover", () => {
                searchButton.setStyle({ fill: '#fd722a' })
                this.sound.play("menuButtonHover", { volume: 0.2 });
                arrowSprite.setVisible(true);
                arrowSprite.x = searchButton.x;
                arrowSprite.y = searchButton.y + searchButton.height - 15;
            })
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
                searchButton.setStyle({ fill: '#fff' });
            })

        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' })
            .setDepth(1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerout", () => backButton.setStyle({ fill: '#FFF' }))
            .on("pointerover", () => {
                arrowSprite.setVisible(true);
                arrowSprite.x = backButton.x - backButton.width + 60;
                arrowSprite.y = backButton.y + backButton.height / 4;
                backButton.setStyle({ fill: '#fd722a' });
                this.sound.play("menuButtonHover", { volume: 0.2 });
            })
            .on("pointerup", () => {
                this.sound.play("menuButtonPress", { volume: 0.4 });
                clearInterval(interval);
                this.scene.start(CST.SCENES.MENU, { networkObj: this.network, playerUsername: this.playerUsername });
                // Moves back to the main menu when the back button is clicked
            })
            .on("pointerout", () => {
                arrowSprite.setVisible(false);
            })

        // called whenever anywhere is clicked
        document.onclick = function (event) {
            if (event === undefined) event = window.event;
            let joining;
            let target = 'target' in event ? event.target : event.srcElement;
            // check if its the green join button that caused the click event
            if (target.className == "fa-sharp fa-solid fa-right-to-bracket green") {
                for (let index in inLobbyList) {
                    if (inLobbyList[index] == target.id) {
                        var data = {
                            otherUser: target.id
                        };
                        $.ajax({
                            type: 'POST',
                            url: '/checkLobbyFull',
                            data,
                            // on success call the callback function
                            success: function (result) {
                                console.log(result.result);
                                if (result.result == "false") {
                                    if (confirm('Are you sure you want to join ' + target.id + '?') == true) {
                                        // cant use this keyword as were inside a function
                                        // console.log(scene.network);
                                        // need to double check if the host is still in an empty lobby
                                        // can do this by absence of JOIN_CODE relationship
                                        var data = {
                                            username: scene.playerUsername,
                                            otherUser: target.id
                                        };
                                        $.ajax({
                                            type: 'POST',
                                            url: '/doubleCheckEmpty',
                                            data,
                                            // on success call the callback function
                                            success: function (result) {
                                                if (result.isLobbyStillEmpty == "true") {
                                                    var data = {
                                                        otherUsername: target.id
                                                    };
                                                    $.ajax({
                                                        type: 'POST',
                                                        url: '/testerRoute',
                                                        data,
                                                        // on success call the callback function
                                                        success: function (result) {
                                                            console.log(result.otherUser);
                                                            clearInterval(interval)
                                                            scene.network.connect(result.otherUser);
                                                            // scene.network.send("hello");
                                                            scene.network.send("testing again");
                                                            scene.loadLobby();
                                                        },
                                                        // on error return to game page
                                                        error: function (xhr) {
                                                            window.alert(JSON.stringify(xhr));
                                                            window.location.replace('/game.html');
                                                        }
                                                    });
                                                    // target.id wont work as its not the encrypted version
                                                    // scene.network.connect(target.id);
                                                    clearInterval(interval);
                                                }
                                                else{
                                                    scene.sound.play("failedToSendFriendRequest");
                                                    alert("this lobby is now full!");
                                                }
                                            },
                                            // on error return to game page
                                            error: function (xhr) {
                                                window.alert(JSON.stringify(xhr));
                                                window.location.replace('/game.html');
                                            }
                                        });
                                    }
                                } else {
                                    scene.sound.play("failedToSendFriendRequest");
                                    alert("this lobby is full!");
                                    
                                }
                            },

                            // on error return to game page
                            error: function (xhr) {
                                window.alert(JSON.stringify(xhr));
                                window.location.replace('/game.html');
                            }
                        });
                        break;
                    }
                }
            }
        }
    }
    reset() {
        this.scene.start(CST.SCENES.FRIENDS, { networkObj: this.network, playerUsername: this.playerUsername })

    }
    loadLobby() {
        this.scene.start(CST.SCENES.LOBBY, { networkObj: this.network, playerUsername: this.playerUsername, joinee: "joinee" })
    }
}

