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
            allFriends = result.friends.length;
            document.getElementById("currentFriends").innerHTML = "";
            for (let i = 0; i < allFriends.length; i++) {
                // create a list element
                const listElement = document.createElement("li");
                // add the friend to the dictionary
                friendsList[i] = allFriends[i];
                // what will be displayed to the user,
                // font-awesome icons and friend username
                listElement.innerHTML = allFriends[i] + ' <i id="' + allFriends[i]
                    + '" onClick="joinFriend(' + i + ')" class="fa-sharp fa-solid fa-right-to-bracket"></i>\
                    <i onClick="deleteFriend('+ i + ')" class="fa-solid fa-trash"></i>';
                document.getElementById("currentFriends").appendChild(listElement);
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
        url: "/getPendingRequests",
        data,
        success: function (result) {
            // set the innerhtml to nothing to make sure not to duplicate results
            document.getElementById("pendingRequests").innerHTML = "";
            allPendingRequests = result.friendRequests.length;
            // for loop to generate the list and the font-awesome icons
            for (let i = 0; i < allPendingRequests.length; i++) {
                const listElement = document.createElement("li");
                // add it to the dictionary
                pendingFriends[i] = allPendingRequests[i];
                // what the user will see
                listElement.innerHTML = allPendingRequests[i] + ' <i id="' + allPendingRequests[i]
                    + '" onClick="acceptFriendRequest(' + i + ')" class="fa-solid fa-square-check""></i>\
                <i onClick="declineFriendRequest(' + i + ')" class="fa-sharp fa-solid fa-square-xmark"></i>';
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

