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
        minLength : 1,
        maxLength : 12 }
});

// pre-save hook which is called everytime before a
// a document/field is saved to database
ProfileSchema.pre('save', async function (next) {
    // this pre-save hook allows us to hash the password then
    // store the hashed value in the mongo database
    const user = this;
    const hashedPassword = await bcrypt.hash(this.password, 15)
    this.password = hashedPassword;
    next();
});

// validating a profiles password when logging in
ProfileSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const ProfileModel = mongoose.model("profile", ProfileSchema);
module.exports = ProfileModel;
