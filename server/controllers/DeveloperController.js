const Song = require('../models/SongsModel');  // Assuming you have a Song model defined

const uploadSingleSong = async (req, res) => {
    try {
        console.log('Uploading single song...');
        const { title } = req.body;
        const songUrl = req.files.song[0].path;
        const thumbnailUrl = req.files.thumbnail[0].path;

        console.log('Creating new song object...');
        const newSong = new Song({
            SongTitle : title,
            SongURL : songUrl,
            thumnailURL : thumbnailUrl
        });

        console.log('Saving new song...');
        await newSong.save();

        console.log('Song saved successfully.');
        res.json({
            success: true,
            message: 'Song uploaded successfully',
            song: newSong
        });
    } catch (error) {
        console.error(`Error uploading single song: ${error}`);
        res.json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const uploadMultipleSongs = async (req, res) => {
    try {
        console.log('Uploading multiple songs...');
        const songs = req.files.songs.map((file, index) => {
            return {
                title: req.body.titles[index],
                songUrl: file.path,
                thumbnailUrl: req.files.thumbnails[index].path
            };
        });

        console.log('Inserting multiple songs into database...');
        const savedSongs = await Song.insertMany(songs);

        console.log('Songs uploaded successfully.');
        res.json({
            success: true,
            message: 'Songs uploaded successfully',
            songs: savedSongs
        });
    } catch (error) {
        console.error(`Error uploading multiple songs: ${error}`);
        res.json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = { uploadSingleSong, uploadMultipleSongs };
