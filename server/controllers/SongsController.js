const SongModel = require('../models/SongsModel');  

const getAllSongs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 if not specified
        const songs = await SongModel.find().limit(limit);

        res.json({
            success: true,
            songs: songs
        });
    } catch (error) {
        console.error(`Error fetching songs: ${error}`);
        res.json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = { getAllSongs };
