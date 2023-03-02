require('dotenv').config();
const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
const neo4j = require('neo4j-driver');
const crypto = require('crypto');
// current/active jwt tokens
const tokenList = {};
//create express router
const router = express.Router();
const algorithm = 'aes-256-cbc';
const password = 'my secret key';
const key = crypto.scryptSync(password, 'salt', 32);
const iv = Buffer.alloc(16, 0);
// route to check if server is active and running
router.get("/status", (request, response, next) => {
    response.status(200).json({ status: "Ok, server running" });
});

router.post("/obtainUserId", (request, response) => {
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(currentUser, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    response.setHeader('Content-Type', 'application/json');
    // return the username to route caller
    response.end(JSON.stringify({ username: currentUser, encrypted: encrypted }));
    // to access in caller - result.username
})
router.post("/getOtherPlayersId", (request, response) => {

    const otherUser = request.body.otherUser;

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(otherUser, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    response.setHeader('Content-Type', 'application/json');
    // return the username to route caller
    response.end(JSON.stringify({ otherUserName : decrypted }));
    // to access in caller - result.username
})



router.post("/testerRoute", (request, response) => {
    const otherUser = request.body.otherUsername;
    console.log(request.body.otherUsername);
    const algorithm = 'aes-256-cbc';
    const password = 'my secret key';
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(otherUser, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    response.setHeader('Content-Type', 'application/json');
    // return the username to route caller
    response.end(JSON.stringify({ otherUser: encrypted }));
    // to access in caller - result.username
})

// route to POST user registration details
router.post("/registration", passport.authenticate("registration",
    { session: false }), async (request, response, next) => {

        const uri = process.env.NEO4J_URI;
        const user = process.env.NEO4J_USERNAME;
        const password = process.env.NEO4J_PASSWORD;

        // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        try {
            const newPerson = request.body.username;
            const session = driver.session({ database: 'neo4j' });
            const writeQuery = `CREATE (n:Person { username: $newPerson })`;
            await session.executeWrite(tx =>
                tx.run(writeQuery, { newPerson })
            );
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            // Don't forget to close the driver connection when you're finished with it.
            await driver.close();
        }

        response.status(200).json({ message: "registration successful" });
    });

router.post("/login", async (request, response, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                return next(info);
            }
            request.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = {
                    _id: user._id,
                    email: user.email
                };
                const jwtKey = process.env.JWT_SIGN_KEY;
                const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
                const token = jwt.sign({ user: body }, jwtKey, { expiresIn: 300 });
                const refreshToken = jwt.sign({ user: body }, jwtRefreshKey,
                    { expiresIn: 86400 });
                // store the jwt in a cookie
                response.cookie("jwt", token);
                response.cookie("refreshJwt", refreshToken);
                //store the tokens in memory (tokenList)
                tokenList[refreshToken] = {
                    token,
                    refreshToken,
                    email: user.email,
                    _id: user._id,
                    username: user.username
                };
                // send the token back to the user
                return response.status(200).json({ token, refreshToken });
            });
        } catch (error) {
            return next(error);
        }
    })(request, response, next);
});

// route to check if the user is authorized by checking the
// tracked token in the cookie
router.post("/token", (request, response) => {
    // const  email = request.body.email;
    const jwtKey = process.env.JWT_SIGN_KEY;
    const refreshToken = request.body.refreshToken;
    const decoded = jwt.decode(request.body.refreshToken);
    const email = decoded.user.email;
    if ((refreshToken in tokenList) && (tokenList[refreshToken].email === email)) {
        const body = { email, _id: tokenList[refreshToken]._id };
        const token = jwt.sign({ user: body }, jwtKey,
            { expiresIn: 300 });
        // update the jwt
        response.cookie("jwt", token);
        tokenList[refreshToken].token = token;
        response.status(200).json({ token });
    } else {
        response.status(401).json({ message: "Unauthorized" });
    }
});

// route to logout for a user
router.post("/logout", (request, response) => {
    if (request.cookies) {
        const refreshToken = request.cookies['refreshJwt'];
        // delete the jwt in memory and in clear the cookies
        if (refreshToken in tokenList) delete tokenList[refreshToken]
        response.clearCookie("refreshJwt");
        response.clearCookie("jwt");
    }
    response.status(200).json({ message: "Successfully Logged out" });
});


router.post("/searchForValidUsername", (request, response) => {

    function checkIfUsernameExistsCallback(result) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ found: result }));
    }

    function checkIfUsernameExists(theUsername, callback) {
        (async () => {
            let found = "None";
            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

            try {
                const session = driver.session({ database: 'neo4j' });
                const readQuery = `MATCH (n:Person { username: $theUsername}) RETURN n.username as username`;
                const readResult = await session.executeRead(tx =>
                    tx.run(readQuery, { theUsername })
                );

                readResult.records.forEach(record => {
                    found = record.get("username");
                })
            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback(found);
            }
        })();
    }
    checkIfUsernameExists(request.body.username, checkIfUsernameExistsCallback);
});

router.post("/sendFriendRequest", (request, response) => {

    function sendFriendRequestCallback(result) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ found: String(result) }));
    }

    function sendFriendRequest(toOtherUser, currentUser, callback) {
        (async () => {
            let status = "false";
            let doesExist;
            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            const driver2 = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {
                const session = driver.session({ database: "neo4j" });
                // query to check if the relationship already exists
                // from this users standpoint
                const readQuery = `MATCH (a:Person {username : $currentUser}),
                    (b:Person {username: $toOtherUser})
                    RETURN EXISTS( (a)-[:PENDING_REQUEST]->(b) ) as exist`;

                const readResult = await session.executeRead(tx =>
                    tx.run(readQuery, { currentUser, toOtherUser })
                );
                // await session.close();
                readResult.records.forEach(record => {
                    doesExist = record.get("exist");
                    if (doesExist == true) {
                        status = "exists";
                    }
                })

                if (doesExist == false) {
                    const otherUsersStandpointQuery = `
                    MATCH (a:Person {username : $currentUser}),
                    (b:Person {username: $toOtherUser})
                    RETURN EXISTS( (b)-[:PENDING_REQUEST]->(a) ) as exist`;

                    const otherUsersStandpointResult = await session.executeRead(tx =>
                        tx.run(otherUsersStandpointQuery, { currentUser, toOtherUser })
                    );
                    await session.close();
                    otherUsersStandpointResult.records.forEach(record => {

                        doesExist = record.get("exist");
                        if (doesExist == true) {
                            status = "otherUser";
                        }
                    })
                }

                if (status == "false") {
                    const session2 = driver2.session({ database: "neo4j" });
                    // query to create a pending request relationship
                    const writeQuery = `MATCH (a:Person), (b:Person)
                        WHERE a.username = $currentUser AND b.username = $toOtherUser
                        CREATE (a)-[r:PENDING_REQUEST]->(b)
                        RETURN type(r)`;

                    await session2.executeWrite(tx =>
                        tx.run(writeQuery, { currentUser, toOtherUser })
                    );
                    status = "true";
                }
            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                // will make sure to always close the connection
                await driver.close();
                callback(status);
            }
        })();
    }

    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    const otherUser = request.body.username;
    sendFriendRequest(otherUser, currentUser, sendFriendRequestCallback);
});

router.post("/getPendingFriendRequests", (request, response) => {
    // retrieve all pending requests relating to current user
    // send back a list as result

    function searchForPendingRequestsCallback(incomingRequests,sentRequests) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ friendRequests: incomingRequests, sentRequests : sentRequests }));
    }

    function searchForPendingRequests(currentUsername, callback) {
        (async () => {
            // connection details
            const incomingRequests = [];
            const sentRequests = [];

            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            // the users/players who sent a friend request to this user
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {
                const session = driver.session({ database: "neo4j" });
                const incomingQuery = `MATCH (:Person {username: $currentUsername})<-[:PENDING_REQUEST]-(People)
                    RETURN People.username as users`;
                const incomingQueryResult = await session.executeRead(tx =>
                    tx.run(incomingQuery, { currentUsername })
                );
                incomingQueryResult.records.forEach(record => {
                    let userWhoSentFriendRequest = record.get("users");
                    incomingRequests.push(userWhoSentFriendRequest);
                })
                const sentQuery = `MATCH (:Person {username: $currentUsername})-[:PENDING_REQUEST]->(People)
                RETURN People.username as users`;
                const sentQueryResult = await session.executeRead(tx =>
                    tx.run(sentQuery, { currentUsername })
                );
                sentQueryResult.records.forEach(record => {
                    let otherUser = record.get("users");
                    sentRequests.push(otherUser);
                })

            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback(incomingRequests,sentRequests);
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    searchForPendingRequests(currentUser, searchForPendingRequestsCallback);
});

router.post("/acceptOrDeclinePendingRequest", (request, response) => {
    function createFriendRelationshipCallback(result) {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({}));
    }

    function createFriendRelationship(currentUser, otherUser, operation, callback) {
        (async () => {
            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            const driver2 = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {

                if (operation == "accept") {
                    // must create friend relationship
                    const session = driver.session({ database: 'neo4j' });
                    // make sure to create a unique relationship not duplicate
                    // have made sure will always be 1 friend relationship
                    // however - when 1 accepts, the other person's pending breaks
                    // 1) if system detects 2 people about to both have pending -request
                    // notify the latter person that they already have a request from that user
                    // make a read query to check if a friend already exists, if it does, do nothing
                    // also need to
                    const writeQuery = `
                        MATCH (a:Person {username: $currentUser}) 
                        MATCH (b:Person {username: $otherUser})
                        MERGE (b)-[r:FRIENDS_WITH]-(a);`;
                    await session.executeWrite(tx =>
                        tx.run(writeQuery, { currentUser, otherUser })
                    );
                    await session.close();
                }
                // now must delete the pending request relationship
                // this must be done when a user declines or accepts a friend request
                const session2 = driver2.session({ database: 'neo4j' });
                const deleteQuery = `
                 MATCH (a:Person {username: $otherUser})-[r:PENDING_REQUEST]->(b:Person {username: $currentUser})
                    DELETE r;`;
                await session2.executeWrite(tx =>
                    tx.run(deleteQuery, { otherUser, currentUser }))

            } catch (error) {
                console.log(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback("Success");
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    const otherUser = request.body.otherUser
    const operation = request.body.value;
    createFriendRelationship(currentUser, otherUser, operation, createFriendRelationshipCallback);
})

router.post("/cancelRequest", (request, response) => {
    function cancelRequestCallback(result) {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({}));
    }

    function cancelRequest(currentUser, otherUser, callback) {
        (async () => {
            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            const driver2 = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {

                // now must delete the pending request relationship
                // this must be done when a user declines or accepts a friend request
                const session2 = driver2.session({ database: 'neo4j' });
                const deleteQuery = `
                 MATCH (a:Person {username: $otherUser})<-[r:PENDING_REQUEST]-(b:Person {username: $currentUser})
                    DELETE r;`;
                await session2.executeWrite(tx =>
                    tx.run(deleteQuery, { otherUser, currentUser }))

            } catch (error) {
                console.log(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback("Success");
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    const otherUser = request.body.otherUser
    cancelRequest(currentUser, otherUser, cancelRequestCallback);
})
router.post("/getFriends", (request, response) => {
    function retrieveAllFriendsCallback(listOfFriends, friendsCurrentlyInLobby) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ friends: listOfFriends, friendsInLobby: friendsCurrentlyInLobby }));
    }

    function retrieveAllFriends(currentUsername, callback) {
        (async () => {
            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            const listOfFriends = [];
            const friendsCurrentlyInLobby = [];
            // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {
                const session = driver.session({ database: "neo4j" });
                // query to get all friends of the specified user
                const retreiveFriendsQuery = `MATCH (:Person {username: $currentUsername})-[:FRIENDS_WITH]-(People)
                    RETURN People.username as users ORDER BY users ASC`;
                const retreiveFriendsQueryResult = await session.executeRead(tx =>
                    tx.run(retreiveFriendsQuery, { currentUsername })
                );
                retreiveFriendsQueryResult.records.forEach(record => {
                    // the users who are a friend of this user
                    listOfFriends.push(record.get("users"));
                })
                // query to check if a join code relationship if active
                const checkJoinCodeQuery = `
                    MATCH (:Person {username: $currentUsername})<-[:JOIN_CODE]-(People)
                    RETURN People.username as everyone ORDER BY everyone ASC;
                    `;
                const checkJoinCodeQueryResult = await session.executeWrite(tx =>
                    tx.run(checkJoinCodeQuery, { currentUsername })
                );
                checkJoinCodeQueryResult.records.forEach(record => {
                    // friends currently sitting in a lobby
                    friendsCurrentlyInLobby.push(record.get("everyone"));
                    // listOfFriends.remove(record.get("everyone"));
                    const index = listOfFriends.indexOf(record.get("everyone"));
                    if (index > -1){
                        listOfFriends.splice(index,1)
                    }
                })

            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback(listOfFriends, friendsCurrentlyInLobby);
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    retrieveAllFriends(currentUser, retrieveAllFriendsCallback);

})

router.post("/deleteFriend", (request, response) => {
    function deleteFriendCallback(result) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({}));
    }

    function deleteFriend(currentUsername, userToDelete, callback) {
        (async () => {
            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;
            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {
                const session = driver.session({ database: "neo4j" });
                // query to delete the specified user
                const writeQuery = `MATCH (:Person {username: $currentUsername})-[r:FRIENDS_WITH]-(:Person {username: $userToDelete})
                    DELETE r`;
                await session.executeWrite(tx =>
                    tx.run(writeQuery, { currentUsername, userToDelete })
                );
                const writeQuery2 =`MATCH (:Person {username: $currentUsername})-[r:JOIN_CODE]-(:Person {username: $userToDelete})
                DELETE r`;
                await session.executeWrite(tx =>
                    tx.run(writeQuery2, { currentUsername, userToDelete })
                );
            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback();
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    const otherUser = request.body.otherUser
    deleteFriend(currentUser, otherUser, deleteFriendCallback);

})

router.post("/joinCodeRelationship", (request, response) => {
    function joinCodeRelationshipCallback(result) {
        // at the moment wont return anything
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({}));
    }

    function joinCodeRelationship(currentUsername, joinCode, callback) {
        (async () => {

            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;

            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {
                const session = driver.session({ database: "neo4j" });
                // query create unique JOIN_CODE relationship in neo4j database from
                // the current user to all their friends
                const writeQuery = `
                    MATCH (a:Person {username: $currentUsername})-[r:FRIENDS_WITH]-(n:Person)
                    MERGE (a)-[nr:JOIN_CODE{theCode: $joinCode }]->(n);`;
                await session.executeWrite(tx =>
                    tx.run(writeQuery, { currentUsername, joinCode })
                );
            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback();
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    const joinCode = request.body.joinCode
    joinCodeRelationship(currentUser, joinCode,
        joinCodeRelationshipCallback);

})

router.post("/deleteJoinRelationship", (request, response) => {
    function deleteJoinRelationshipCallback(result) {
        // at the moment wont return anything
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({}));
    }

    function deleteJoinRelationship(currentUsername, joinCode, callback) {
        (async () => {

            // connection details
            const uri = process.env.NEO4J_URI;
            const user = process.env.NEO4J_USERNAME;
            const password = process.env.NEO4J_PASSWORD;

            const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
            try {
                const session = driver.session({ database: "neo4j" });
                // query to delete the JOIN_CODE relationship from the current user to all
                // their friends
                const writeQuery = `
                    MATCH (a:Person {username: $currentUsername})-[r:JOIN_CODE]->(n:Person)
                    DELETE r`;
                await session.executeWrite(tx =>
                    tx.run(writeQuery, { currentUsername, joinCode })
                );
            } catch (error) {
                console.error(`Something went wrong: ${error}`);
            } finally {
                await driver.close();
                callback();
            }
        })();
    }
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    const joinCode = request.body.joinCode
    deleteJoinRelationship(currentUser, joinCode,
        deleteJoinRelationshipCallback);
})


router.post("/retrieveUsername", (request, response) => {
    const refreshToken = request.body.refreshToken;
    const currentUser = tokenList[refreshToken].username;
    response.setHeader('Content-Type', 'application/json');
    // return the username to route caller
    response.end(JSON.stringify({ username: currentUser }));
    // to access in caller - result.username
})


module.exports = router;