require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/main");

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

// make instance of an express app
const app = express();

// updating express settings
// parse app as x-www-form-urlencoded of bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// parse app/json
app.use(bodyParser.json());
// allow app to parse web cookies
app.use(cookieParser());
// the JS file used for user/profile authentication 
require("./auth/auth");
// where express will display/use static files
app.use(express.static(__dirname + '/src'));
app.get('/', function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
// the routes that are available, in routes dir
app.use("/", routes);


