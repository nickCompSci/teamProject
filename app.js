require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/main");
const crypto = require('crypto');

// setting up a mongo connection using mongoose
const uri = process.env.MONGO_CONNECTION_URL;
process.env.JW
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
// will not let a user visit game.html unless authenticated
app.get('/game.html', passport.authenticate('jwt', { session : false }),
     function (request, response) {
    response.sendFile(__dirname + '/public/game.html');
  });
// where express will display/use static files
app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
// the main routes that are available, in routes dir
app.use("/", routes);

// catch all erroneous routes entered by user
app.use((request, response, next) => {
    response.status(404); // error code 404
    response.json({ message: "404 - Not found"});
});

// handle internal server errors
app.use((err, request, response, next) => {
    // http error code for server errors
    response.status(err.status || 500); 
    response.json({ error: err});
});

// server begins listening on the provided port
// either 3000 or from an environment variable
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});


 //Peer server

const { PeerServer } = require('peer');
const peerServer = PeerServer({ port: 443, 
                             path: '/'                         
                         });