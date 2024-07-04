const mongoose = require('mongoose');

// Define a flexible metadata schema
const MetadataSchema = new mongoose.Schema({}, { strict: false });

// Main schema for the Song
const SongSchema = new mongoose.Schema({
    SongTitle: { type: String, required: true },
    SongURL: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    metadata: MetadataSchema  // Embed the dynamic metadata schema here
});

const SongModel = mongoose.model('Song', SongSchema);

module.exports = SongModel;
