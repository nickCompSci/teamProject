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
        const user = await UserModel.create({ email, password, username });
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
            return done(null, false, { message: "Wrong email or password" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Wrong email or password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
}));

// verify jwt token of a user is valid
passport.use(new JWTstrategy({
    // used to sign the jwt that is created
    // placeholder can be changed or env variable
    secretOrKey: 'top_secret',
    // function used to obtain the jwt from request object
    // jwt will be inside a cookie, so must extract
    jwtFromRequest: function (request) {
        let token = null;
        if (request && request.cookies) token = request.cookies["jwt"];
        return token;
    }
    // callback function, call done function that was provided
    // to the callback function
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));