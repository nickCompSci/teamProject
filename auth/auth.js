const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const UserModel = require("../models/profileModel");

// handle user registration authentication
passport.use("registration", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    // setting this to true, allows request object to be passed
    // to the callback function
    passReqToCallback: true
    // the callback function
}, async (request, email, password, done) => {
    try {
        const { username } = request.body;
        const user = await UserModel.create({ email, password, username});
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

