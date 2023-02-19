require('dotenv').config();
const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
const neo4j = require('neo4j-driver');
// current/active jwt tokens
const tokenList = {};
//create express router
const router = express.Router();

// route to check if server is active and running
router.get("/status", (request, response, next) => {
    response.status(200).json({ status: "Ok, server running"});
});

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
        }catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            // Don't forget to close the driver connection when you're finished with it.
            await driver.close();
        }    
        
        response.status(200).json({ message: "registration successful"});
});

router.post("/login", async (request, response, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error("An error occurred logging in.");
                return next(error);
            }
            request.login(user, { session : false }, async (error) => {
                if (error) return next(error);
                const body = {
                    _id: user._id,
                    email: user.email
                };
                const jwtKey = process.env.JWT_SIGN_KEY;
                const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
                const token = jwt.sign({ user: body }, jwtKey, { expiresIn: 300});
                const refreshToken = jwt.sign({ user: body }, jwtRefreshKey,
                { expiresIn: 86400});
                // store the jwt in a cookie
                response.cookie("jwt", token);
                response.cookie("refreshJwt", refreshToken);
                //store the tokens in memory (tokenList)
                tokenList[refreshToken] = {
                    token,
                    refreshToken,
                    email: user.email,
                    _id: user._id
                };
                // send the token back to the user
                return response.status(200).json({ token, refreshToken});
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
    if ((refreshToken in tokenList) && (tokenList[refreshToken].email === email)){
        const body = { email, _id: tokenList[refreshToken]._id };
        const token = jwt.sign({ user: body }, jwtKey,
            { expiresIn: 300});
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
    response.status(200).json({ message: "Successfully Logged out"});
});

module.exports = router;