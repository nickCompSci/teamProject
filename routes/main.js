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

