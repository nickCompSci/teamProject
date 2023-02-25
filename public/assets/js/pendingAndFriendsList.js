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

