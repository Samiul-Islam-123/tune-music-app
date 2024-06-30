const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    profileImageURL : String,
    updatedAt :{ type: Date, default: Date.now }
})

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;