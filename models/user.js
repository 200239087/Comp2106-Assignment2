let mongoose = require('mongoose');
let passport = require('passport');
let plm = require('passport-local-mongoose');
let findOrCreate = require('mongoose-findorcreate');

let userSchema = new mongoose.Schema({
    googleId: String
});

userSchema.plugin(plm);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);