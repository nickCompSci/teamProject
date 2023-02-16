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

// handle user login authentication
passport.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password"
    // the callback function
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Wrong email or password"});
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Wrong email or password" });
        }
        return done(null, user, { message : "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
}));