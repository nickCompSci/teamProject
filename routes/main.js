const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
// current/active jwt tokens
const tokenList = {};
//create express router
const router = express.Router();

