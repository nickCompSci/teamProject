const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
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
                const token = jwt.sign({ user: body }, "top_secret", { expiresIn: 300});
                const refreshToken = jwt.sign({ user: body }, "top_secret_refresh",
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