require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// make instance of an express app
const app = express();

// setting up a mongo connection using mongoose
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, {useNewUrlParser : true});
// catch errors when connecting
mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
});
mongoose.connection.on('connected', function () {
    console.log("Successfully connected to team4 mongo server");
});

