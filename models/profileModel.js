// used to facilitate connection to mongo and
// manipulate database
const mongoose = require("mongoose");
// to facilitate hashing of passwords
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// create new schema used for Profile
const ProfileSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        maxLength : 50 },
    password : {
        type : String,
        required : true,
        minLength : 5,
        maxLength : 30 },
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 3,
        maxLength : 20 }
});

