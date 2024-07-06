const SongModel = require('../models/SongsModel');  
const { extractFeatures, calculateSimilarity } = require('../services/Recommendation');

const getAllSongs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 if not specified
        const offset = parseInt(req.query.offset, 10) || 0; // Default offset to 0 if not specified

        const songs = await SongModel.find().skip(offset).limit(limit);

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


const getSongById = async (req, res) => {
    try {
        const song = await SongModel.findById(req.params.id);

        if (!song) {
            return res.json({
                success: false,
                message: 'Song not found'
            });
        }

        res.json({
            success: true,
            song: song
        });
    } catch (error) {
        console.error(`Error fetching song: ${error}`);
        res.json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const SearchSong = async (req,res) => {
    try{
        const SearchQuery = req.query.SearchQuery;

        const regex = new RegExp(SearchQuery, 'i');

        const SearchedSongs = await SongModel.find({
            $or: [
                { SongTitle: { $regex: regex } },
                { 'metadata.artists': { $regex: regex } },
                { 'metadata.genres': { $regex: regex } }
            ]
        });

        if(!SearchedSongs)
            return res.json({
                success : true,
                message : "No results found :("
            })

        res.json({ success: true, count: SearchedSongs.length, SearchedSongs });

    }
    catch(error){
        console.log(error);
        res.json({
            success : false,
            message : "Server Error"
        })
    }
}

//recommendation controller
const RecommendSong = async(req,res) => {
    //console.log("Am here...")
    const targetSongFeatures = await extractFeatures(req.body.targetSongID);
    const otherSongFeatures = [];

    const targetSong = await SongModel.findOne({
        _id : req.body.targetSongID
    })

    //console.log(targetSong)

    const otherSongs = await SongModel.find({
        _id : { $ne: req.body.targetSongID },
        $or: [
            { 'metadata.artists': { $in: targetSong.metadata.artists } }, // Songs with at least one common artist
            { 'metadata.genres': { $in: targetSong.metadata.genres } }, // Songs with at least one common genre
            { 'metadata.album.name': targetSong.metadata.album.name } // Songs from the same album
            // You can add more criteria based on your data structure
          ]
    }).limit(50);

    //console.log(otherSongs)

    const similarities = await Promise.all(otherSongs.map(async (item) => {
        const otherSongFeatures = await extractFeatures(item._id);
        return {
            song: item,
            similarity: calculateSimilarity(targetSongFeatures, otherSongFeatures)
        };
    }));

    // Sort the similarities in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    const top5recommendedSongs = similarities.slice(0,5);


    //console.log(similarities)

    return res.json({
        success : true,
        recommended : top5recommendedSongs
    });
    

}


const updateSong = async (req, res) => {
    try {
        const updatedSong = await SongModel.findByIdAndUpdate(
            req.params.id,
            {
                SongTitle: req.body.title,
                updatedAt: Date.now(),
            },
            { new: true } // Return the updated document
        );

        if (!updatedSong) {
            return res.json({
                success: false,
                message: 'Song not found'
            });
        }

        res.json({
            success: true,
            song: updatedSong
        });
    } catch (error) {
        console.error(`Error updating song: ${error}`);
        res.json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const deleteSong = async (req, res) => {
    try {
        const deletedSong = await SongModel.findByIdAndDelete(req.params.id);

        if (!deletedSong) {
            return res.json({
                success: false,
                message: 'Song not found'
            });
        }

        res.json({
            success: true,
            message: 'Song deleted successfully'
        });
    } catch (error) {
        console.error(`Error deleting song: ${error}`);
        res.json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const streamSong = async (req, res) => {
    try {
        const song = await SongModel.findById(req.params.id);

        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song not found'
            });
        }

        const songURL = song.SongURL;
        
        // Fetch song file from the URL and stream it
        const request = require('request');
        
        // Set headers for partial content if 'Range' is present in request
        const options = {
            url: songURL,
            headers: {}
        };

        if (req.headers.range) {
            options.headers['Range'] = req.headers.range;
        }

        request(options)
            .on('response', (response) => {
                // Pass status and headers from the remote response to the client response
                res.writeHead(response.statusCode, response.headers);
            })
            .pipe(res)
            .on('error', (err) => {
                console.error(`Error streaming song: ${err}`);
                res.status(500).json({
                    success: false,
                    message: 'Error streaming song'
                });
            });
    } catch (error) {
        console.error(`Error fetching song: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};



module.exports = { getAllSongs, getSongById, deleteSong, updateSong, streamSong , SearchSong, RecommendSong};
