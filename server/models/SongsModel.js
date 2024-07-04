const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
    SongTitle : {type : String, required : true},
    SongURL : {type : String, required : true},
    thumnailURL : {type : String, required : true},
    updtedAt : {type : Date, default : Date.now()},
    metadata : {
        Artist : String,
        Album : String,
        Genre : String
    }
})

const SongModel = new mongoose.model('Songs', SongSchema);

module.exports = SongModel;