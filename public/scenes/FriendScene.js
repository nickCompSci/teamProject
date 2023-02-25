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
                // callabck function if successful
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
                window.confirm("You already sent a friend request to this player!");
                scene.reset();
            } else if (result.found == "false") {
                window.confirm("Invalid username, failed to send friend request");
                scene.reset();
            } else {
                window.confirm("Sent friend request!");
                scene.reset();
            }
        }

        // Adds background image to the scene - (x, y, image)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background').setDisplaySize(this.game.renderer.width, this.game.renderer.height).setDepth(0)

        // Friends title
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'Friends', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' }).setDepth(1).setOrigin(0.5)

        // Back Button for navigating back to the main menu
        let backButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 300, 'Back', { fontFamily: 'font1', fill: '#ffffff', fontSize: '60px' }).setDepth(1).setOrigin(0.5)

        let arrowSprite = this.add.sprite(100, 100, "arrow");
        arrowSprite.setVisible(false);

        this.nameInput = this.add.dom(200, 400).createFromCache("friendsForm");
        this.friendsAndPending = this.add.dom(825, 500).createFromCache("friendsList");

        const scene = this;
        showFriends(); // on load call the friends function to load in the friends list

        const searchButton = this.add.text(100, 525, "Search", { fontFamily: 'font1', fill: '#fff', fontSize: '60px' });
        const confirmButton = this.add.text(50, 525, "", { fontFamily: 'font1', fill: '#fff', fontSize: '60px' });
        searchButton.setInteractive();

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.returnKey.on("down", event => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            // check if anything was inputted into the input box
            if (friendUsername.value != "") {
                // when success is called in the ajax, it will pass the response to
                // searchForValidUsernameCallback function
                searchForValidUsername(friendUsername.value, searchForValidUsernameCallback);
            }
        });

        searchButton.on("pointerdown", () => {
            let friendUsername = this.nameInput.getChildByName("friendUsername");
            if (friendUsername.value != "") {
                // when success is called in the ajax, it will pass the response to
                // searchForValidUsernameCallback function
                searchForValidUsername(friendUsername.value, searchForValidUsernameCallback);
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
                console.log("sending the friend request now");
                sendFriendRequest(friendUsername.value, sendFriendRequestCallback);
            }
        });

        // Back Button
        backButton.setInteractive();

        backButton.on("pointerover", () => {
            arrowSprite.setVisible(true);
            arrowSprite.x = backButton.x - backButton.width + 60;
            arrowSprite.y = backButton.y + backButton.height / 4;
            console.log("hover")
        })

        backButton.on("pointerout", () => {
            arrowSprite.setVisible(false);
        })

        backButton.on("pointerup", () => {
            // Moves back to the main menu when the back button is clicked
            this.scene.start(CST.SCENES.MENU);
        })
    }
}