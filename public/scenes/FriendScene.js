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
                window.confirm("Invalid Username, please try again");
                document.getElementById("addFriendForm").reset();
            } else {
                // a user with the username was found
                // remove searchButton and make confirm button interactive
                searchButton.setText("");
                confirmButton.setText("Send Request");
                confirmButton.setInteractive();
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

            if (result.found == "exists") {
                scene.sound.play("failedToSendFriendRequest");
                alert("You already sent a friend request to this player!");
                scene.reset();

            } else if (result.found == "false") {
                scene.sound.play("failedToSendFriendRequest");
                alert("Invalid username, failed to send friend request");
                scene.reset();
            } else if (result.found == "otherUser") {
                scene.sound.play("failedToSendFriendRequest");
                alert("This user has already sent you a friend request");
                scene.reset();
            }
            else {
                scene.sound.play("sentFriendRequest");
                alert("Sent friend request!");
                scene.reset();
            }
        }


        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Friends title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.10, 'Friends', { fontFamily: 'font1', fill: '#ffffff', fontSize: '80px' }).setDepth(1).setOrigin(0.5)

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' }).setDepth(1).setOrigin(0.5)

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

        showFriends(); // on load call the friends function to load in the friends list

        const searchButton = this.add.text(100, 500, "Search", { fontFamily: 'font1', fill: '#fff', fontSize: '60px' });
        const confirmButton = this.add.text(50, 500, "", { fontFamily: 'font1', fill: '#fff', fontSize: '60px' });
        searchButton.setInteractive();

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.returnKey.on("down", event => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            // check if anything was inputted into the input box
            if (friendUsername.value != "") {
                if (document.querySelector('#currentFriends #' + friendUsername.value)) {
                    alert(`This player is already your friend!`);
                    // reset the form
                    document.getElementById("addFriendForm").reset();
                }
                else if (friendUsername.value == this.playerUsername) {
                    alert("Can not send request to yourself!");
                    // reset the form
                    document.getElementById("addFriendForm").reset();
                }
                else {
                    searchForValidUsername(friendUsername.value, searchForValidUsernameCallback);
                }
            }
        });

        searchButton.on("pointerdown", () => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            if (friendUsername.value != "") {
                if (friendUsername.value == this.playerUsername) {
                    alert("Can not send request to yourself!");
                    // reset the form
                    document.getElementById("addFriendForm").reset();
                }
                else if (document.querySelector('#currentFriends #' + friendUsername.value)) {
                    alert(`This player is already your friend!`);
                    // reset the form
                    document.getElementById("addFriendForm").reset();
                }
                else {
                    searchForValidUsername(friendUsername.value, searchForValidUsernameCallback);
                }
            }
        });

        searchButton.on("pointerover", () => {
            arrowSprite.setVisible(true);
            arrowSprite.x = searchButton.x;
            arrowSprite.y = searchButton.y + searchButton.height - 15;
        })
        searchButton.on("pointerout", () => {
            arrowSprite.setVisible(false);
        })

        confirmButton.on("pointerdown", () => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            if (friendUsername.value != "") {
                // when success is called in the ajax, it will pass the response to
                // searchForValidUsernameCallback function
                sendFriendRequest(friendUsername.value, sendFriendRequestCallback);

            }
        });

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", () => {
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
        })

        backButton.on("pointerout", () => {
            arrowSprite.setVisible(false);
        })

        backButton.on("pointerup", () => {
            // Moves back to the main menu when the back button is clicked
            clearInterval(interval);
            this.scene.start(CST.SCENES.MENU, {networkObj: this.network, playerUsername: this.playerUsername });
        })

        // called whenever anywhere is clicked
        document.onclick = function (event) {
            if (event === undefined) event = window.event;
            let joining;
            var target = 'target' in event ? event.target : event.srcElement;
            for (let index in friendsList) {
                if (friendsList[index] == target.id) {
                    // if the element's color attribute is green then they are online
                    if (window.getComputedStyle(document.getElementById(target.id), null).color == "rgb(0, 128, 0)") {
                        if (confirm('Are you sure you want to join ' + target.id + '?') == true) {
                            alert("Joining now!");
                            // code for connecting 2 players:
                            // join code - 1
                            // 
                            // 
                            // 
                            // 
                            clearInterval(interval)
                            joining = "true";
                            break;
                        }
                        else {
                            break;
                        }
                    }
                    joining = "offline"
                }
            }
            if (joining == "offline") {
                confirm(target.id + " is not online! ");
            } else if (joining == "true") {
                scene.loadLobby();
            }
        }
    }
    reset() {
        this.scene.restart(CST.SCENES.FRIENDS, {networkObj: this.network, playerUsername: this.playerUsername })
    }
    loadLobby() {
        this.scene.start(CST.SCENES.LOBBY, {networkObj: this.network, playerUsername: this.playerUsername })
    }
}