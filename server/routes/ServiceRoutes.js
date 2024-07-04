const SongModel = require('../models/SongsModel');
const { getTrackDetails } = require('../services/Features');

const ServiceRoute = require('express').Router();

ServiceRoute.post("/add-metadata", async (req, res) => {
    try {
        const { _id, } = req.body;
        const Song = await SongModel.findOne({
            _id : _id
        })

        if(!Song)
            return res.json({
                success : false,
                message : "Song not found"
            })

        const metadata =await getTrackDetails(Song.SongTitle); 
        
        if (!_id) {
            return res.status(400).json({ success: false, message: "Song _id is required" });
        }

        const updatedData = await SongModel.findByIdAndUpdate(
            _id,
            { 
                metadata: metadata,
                updatedAt: new Date() // Update updatedAt field
            },
            { new: true } // To return the updated document
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Song not found" });
        }

        res.json({
            success: true,
            updatedData: updatedData
        });
    } catch (error) {
        console.error("Error updating metadata:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = ServiceRoute;