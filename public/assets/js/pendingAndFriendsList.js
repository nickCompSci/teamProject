const pendingFriends = {};
const friendsList = {};
const sentRequests = {};
const inLobbyList = {};

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

            const onlineListElement = document.createElement("li");
            onlineListElement.innerHTML = "Online (" + inLobbyPlayers.length + "):";
            document.getElementById("currentFriends").appendChild(onlineListElement);
            if (inLobbyPlayers.length > 0) {
                onlineListElement.style.color = "lightgreen";

                for (let i = 0; i < inLobbyPlayers.length; i++) {
                    const listElement = document.createElement("li");
                    // add the friend to the dictionary
                    inLobbyList[i] = inLobbyPlayers[i];

                    listElement.innerHTML = inLobbyPlayers[i] + ' <i id="' + inLobbyPlayers[i]
                        + '" class="fa-sharp fa-solid fa-right-to-bracket green" title="Join ' + inLobbyPlayers[i] + ' if they are online"></i>\
                            <i onClick="deleteFriend('+ `\'${friendsList[i]}\'` + ')" class="fa-solid fa-trash" title="Delete ' + inLobbyPlayers[i] + ' from your friends list"></i>';

                    document.getElementById("currentFriends").appendChild(listElement);
                    // document.getElementById(inLobbyPlayers[i]).style.color = "green";
                }
            }

            const offlineListElement = document.createElement("li");
            offlineListElement.innerHTML = "Offline (" + allFriends.length + "):";
            offlineListElement.style.borderTop = "2px solid grey";
            offlineListElement.style.paddingTop = "5%";
            document.getElementById("currentFriends").appendChild(offlineListElement);

            for (let i = 0; i < allFriends.length; i++) {
                // create a list element
                const listElement = document.createElement("li");
                // add the friend to the dictionary
                friendsList[i] = allFriends[i];
                listElement.innerHTML = allFriends[i] + '<i id="' + allFriends[i]
                    + '" onClick="deleteFriend(' + `\'${friendsList[i]}\'` + ')" class="fa-solid fa-trash" title="Delete ' + allFriends[i] + ' from your friends list"></i>';

                document.getElementById("currentFriends").appendChild(listElement);

                // if the player is waiting in a lobby then they are online, make the
                // join icon green
                if (inLobbyPlayers.includes(allFriends[i])) {
                    document.getElementById(allFriends[i]).style.color = "green";
                }
            }
            if (document.getElementsByClassName("fa-solid fa-arrows-rotate")) {
                var element = document.getElementsByClassName("fa-solid fa-arrows-rotate");
                element[0].remove()
            }
            const iconElement = document.createElement("i");
            iconElement.innerHTML = '<i class="fa-solid fa-arrows-rotate" title="Refresh your friends list" onClick="showFriends()"></i>';
            document.getElementById("toDoWithFriends").appendChild(iconElement);
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
            const allPendingRequests = result.friendRequests;
            const allSentRequests = result.sentRequests;
            // for loop to generate the list and the font-awesome icons
            const incomingElement = document.createElement("li");
            incomingElement.innerHTML = "Incoming (" + allPendingRequests.length + "):"
            document.getElementById("pendingRequests").appendChild(incomingElement);
            if (allPendingRequests.length > 0) {
                for (let i = 0; i < allPendingRequests.length; i++) {
                    const listElement = document.createElement("li");
                    // add it to the dictionary
                    pendingFriends[i] = allPendingRequests[i];
                    // what the user will see
                    listElement.innerHTML = allPendingRequests[i] + ' <i id="' + allPendingRequests[i]
                        + '" onClick="acceptFriendRequest(' + i + ')" class="fa-solid fa-square-check green" title="Accept ' + allPendingRequests[i] + '\'s friend request"></i>\
                <i onClick="declineFriendRequest(' + i + ')" class="fa-sharp fa-solid fa-square-xmark red" title="Decline ' + allPendingRequests[i] + '\'s friend request"></i>';
                    document.getElementById("pendingRequests").appendChild(listElement);
                }
            }
            const sentElement = document.createElement("li");
            sentElement.innerHTML = "Sent (" + allSentRequests.length + "):"
            sentElement.style.borderTop = "2px solid grey";
            sentElement.style.paddingTop = "5%";
            document.getElementById("pendingRequests").appendChild(sentElement);
            if (allSentRequests.length > 0) {
                for (let i = 0; i < allSentRequests.length; i++) {
                    const listElement = document.createElement("li");
                    // add it to the dictionary
                    sentRequests[i] = allSentRequests[i];
                    // what the user will see
                    // remember to create new function to remove the request
                    listElement.innerHTML = allSentRequests[i] + '<i id="' + allSentRequests[i] + '" onClick="cancelFriendRequest(' + `\'${sentRequests[i]}\'` + ')" class="fa-sharp fa-solid fa-square-xmark red once" title="Cancel your friend request to ' + allSentRequests[i] + '"></i>';
                    document.getElementById("pendingRequests").appendChild(listElement);
                }
            }
            if (document.getElementsByClassName("fa-solid fa-arrows-rotate")) {
                var element = document.getElementsByClassName("fa-solid fa-arrows-rotate");
                element[0].remove()
            }
            const iconElement = document.createElement("i");
            iconElement.innerHTML = '<i class="fa-solid fa-arrows-rotate" title="Refresh your pending list" onClick="showPending()"></i>';
            document.getElementById("toDoWithFriends").appendChild(iconElement);
        },
        error: function (xhr) {
            window.alert(JSON.stringify(xhr));
        }
    })
}

function acceptFriendRequest(otherUserIndex) {
    // data to be sent to the route\
    if (confirm(`Are you sure you want to accept ${pendingFriends[otherUserIndex]} friend request?`) == true) {
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
}

function declineFriendRequest(otherUserIndex) {
    // data to be sent to the route
    if (confirm(`Are you sure you want to decline ${pendingFriends[otherUserIndex]} friend request?`) == true) {
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
                showPending();
            },
            error: function (xhr) {
                window.alert(JSON.stringify(xhr));
            }
        })
    }
}

function deleteFriend(otherUser) {
    // call to a route to delete a friend from a users/players friend list
    // data to be sent to the route
    if (confirm(`Are you sure you want to delete ${otherUser}?`) == true) {
        var data = {
            refreshToken: getCookie('refreshJwt'),
            otherUser: otherUser
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
}
function cancelFriendRequest(otherUser) {
    if (confirm(`Are you sure you want to cancel your friend request to ${otherUser}?`) == true) {
        var data = {
            refreshToken: getCookie('refreshJwt'),
            otherUser: otherUser
        }
        $.ajax({
            type: 'POST',
            url: "/cancelRequest",
            data,
            // callback function
            success: function (result) {
                // reload the friends list for the user
                showPending()
            },
            error: function (xhr) {
                window.alert(JSON.stringify(xhr));
            }
        })
    }
}
