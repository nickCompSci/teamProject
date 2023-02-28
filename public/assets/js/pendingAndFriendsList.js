const pendingFriends = {};
const friendsList = {};

function showFriends() {
    // where a call to a route occurs to find all friends
    // the result which is looped through and displays each friend in a new line
    // as a list element
    document.getElementById("showUsersFriends").style.display = "block";
    document.getElementById("showUsersPending").style.display = "none";
    // data to be sent to the route
    var data = {
        refreshToken: getCookie("refreshJwt")
    }
    $.ajax({
        type: "POST",
        url: "/getFriends",
        data,
        // callback function
        success: function (result) {
            const allFriends = result.friends;
            const inLobbyPlayers = result.friendsInLobby;
            // accessing this has the friends usernames
            document.getElementById("currentFriends").innerHTML = "";

            if( inLobbyPlayers.length > 0){
                const onlineListElement = document.createElement("li");
                onlineListElement.innerHTML = "Online ("+inLobbyPlayers.length+"):";
                document.getElementById("currentFriends").appendChild(onlineListElement);
                onlineListElement.style.color = "lightgreen";

                for (let i = 0; i < inLobbyPlayers.length; i++){
                    const listElement = document.createElement("li");
                    // add the friend to the dictionary
                    friendsList[i] = inLobbyPlayers[i];
                    
                    listElement.innerHTML = inLobbyPlayers[i] + ' <i id="' + inLobbyPlayers[i]
                        + '" class="fa-sharp fa-solid fa-right-to-bracket" title="Join '+inLobbyPlayers[i]+' if they are online"></i>\
                            <i onClick="deleteFriend('+ i + ')" class="fa-solid fa-trash" title="Delete '+inLobbyPlayers[i]+' from your friends list"></i>';
    
                    document.getElementById("currentFriends").appendChild(listElement);
                    document.getElementById(inLobbyPlayers[i]).style.color = "green";
                }
            }

            const offlineListElement = document.createElement("li");
            offlineListElement.innerHTML = "Offline ("+allFriends.length+"):";
            document.getElementById("currentFriends").appendChild(offlineListElement);

            for (let i = 0; i < allFriends.length; i++) {
                // create a list element
                const listElement = document.createElement("li");
                // add the friend to the dictionary
                friendsList[i] = allFriends[i];
                
                listElement.innerHTML = allFriends[i] + ' <i id="' + allFriends[i]
                    + '" class="fa-sharp fa-solid fa-right-to-bracket" title="Join '+allFriends[i]+' if they are online"></i>\
                        <i onClick="deleteFriend('+ i + ')" class="fa-solid fa-trash" title="Delete '+allFriends[i]+' from your friends list"></i>';

                document.getElementById("currentFriends").appendChild(listElement);

                // if the player is waiting in a lobby then they are online, make the
                // join icon green
                if (inLobbyPlayers.includes(allFriends[i])){
                    document.getElementById(allFriends[i]).style.color = "green";
                }
            }
        }
    })
}

function showPending() {
    // where a call to a route occurs to find any incoming pending requests.
    // the result is looped through and displays each pending request
    // along with the username of who sent it.

    document.getElementById("showUsersFriends").style.display = "none";
    document.getElementById("showUsersPending").style.display = "block";
    // data to be sent to the route
    var data = {
        refreshToken: getCookie('refreshJwt')
    };
    $.ajax({
        type: 'POST',
        url: "/getPendingFriendRequests",
        data,
        success: function (result) {
            // set the innerhtml to nothing to make sure not to duplicate results
            document.getElementById("pendingRequests").innerHTML = "";
            allPendingRequests = result.friendRequests;
            // for loop to generate the list and the font-awesome icons
            for (let i = 0; i < allPendingRequests.length; i++) {
                const listElement = document.createElement("li");
                // add it to the dictionary
                pendingFriends[i] = allPendingRequests[i];
                // what the user will see
                listElement.innerHTML = allPendingRequests[i] + ' <i id="' + allPendingRequests[i]
                    + '" onClick="acceptFriendRequest(' + i + ')" class="fa-solid fa-square-check" title="Accept '+allPendingRequests[i]+'\'s friend request"></i>\
                <i onClick="declineFriendRequest(' + i + ')" class="fa-sharp fa-solid fa-square-xmark" title="Decline '+allPendingRequests[i]+'\'s friend request"></i>';
                document.getElementById("pendingRequests").appendChild(listElement);
            }
        },
        error: function (xhr) {
            window.alert(JSON.stringify(xhr));
        }
    })
}

function acceptFriendRequest(otherUserIndex) {
    // data to be sent to the route
    var data = {
        refreshToken: getCookie('refreshJwt'),
        otherUser: pendingFriends[otherUserIndex],
        value: "accept"
    };
    $.ajax({
        type: 'POST',
        url: "/acceptOrDeclinePendingRequest",
        data,
        // callback function
        success: function (result) {
            // make the pending requests update to reflect changes to the user
            // a form of "refreshing"
            showPending()
        },
        error: function (xhr) {
            window.alert(JSON.stringify(xhr));
        }
    })
}

function declineFriendRequest(otherUserIndex) {
    // data to be sent to the route
    var data = {
        refreshToken: getCookie('refreshJwt'),
        otherUser: pendingFriends[otherUserIndex],
        value: "decline"
    };
    $.ajax({
        type: 'POST',
        url: "/acceptOrDeclinePendingRequest",
        data,
        success: function (result) {
            // make the pending requests update to reflect changes to the user
            // a form of "refreshing"
            showPending()
        },
        error: function (xhr) {
            window.alert(JSON.stringify(xhr));
        }
    })
}

function deleteFriend(otherUserIndex) {
    // call to a route to delete a friend from a users/players friend list

    // data to be sent to the route
    var data = {
        refreshToken: getCookie('refreshJwt'),
        otherUser: friendsList[otherUserIndex]
    }
    $.ajax({
        type: 'POST',
        url: "/deleteFriend",
        data,
        // callback function
        success: function (result) {
            // reload the friends list for the user
            showFriends()
        },
        error: function (xhr) {
            window.alert(JSON.stringify(xhr));
        }
    })
}

// function joinFriend(otherUserIndex) {
//     // will call a route that accesses the friends join code and automatically joins
//     // window.confirm("clicked join friend");
//     // upon pressing this
//     // check if the id that called it is green
//     // if yes then allow to join the session

//     // if not give a pop up saying this user is not online
//     let theUsername = friendsList[otherUserIndex];

//     console.log(window.getComputedStyle(document.getElementById(theUsername),null).color);
//     if (window.getComputedStyle(document.getElementById(theUsername),null).color == "rgb(0, 128, 0)"){
//         window.confirm('Are you sure you want to join '+theUsername+'?');

//     }else{
//         window.confirm(theUsername + " is not online.");
//     }
// }
