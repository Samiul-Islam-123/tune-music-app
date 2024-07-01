const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : String,
    email : {type : String, unique : true},
    profileImageURL : String,
    clerkID : {type : String, unique : true},
    updatedAt :{ type: Date, default: Date.now }
})

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;