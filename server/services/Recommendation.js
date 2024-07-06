const SongModel = require("../models/SongsModel");

const consineSimilarity = require('cosine-similarity');

const extractFeatures = async(songID) => {
    const song = await SongModel.findOne({
        _id : songID
    });

    if(!song)
        return "Song not found";

    const featureData = song.metadata.audioFeatures;
    //console.log(featureData)

    const features = [
        featureData.tempo,
        featureData.danceability,
        featureData.energy,
        featureData.key,
        featureData.loudness,
        featureData.mode,
        featureData.speechiness,
        featureData.acousticness,
        featureData.instrumentalness,
        featureData.liveness,
        featureData.valence,
        featureData.duration_ms, 
    ]

    return features;
}

const calculateSimilarity = (song1, song2) => {
    const similarity = consineSimilarity(song1, song2);
    return similarity;
}

module.exports = {extractFeatures, calculateSimilarity}