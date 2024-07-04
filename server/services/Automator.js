const axios = require("axios");
const SongModel = require("../models/SongsModel");
const dotenv = require("dotenv");

dotenv.config();

async function fetchSongsChunk(skip, limit) {
    try {
        const songs = await SongModel.find().skip(skip).limit(limit);
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        throw error; // Handle or propagate the error as needed
    }
}

async function main() {
    try {
        const batchSize = 10; // Number of songs per batch
        let skip = 0; // Initial skip value
        const startTime = new Date(); // Start time of the script

        console.log(`=== Script started at ${startTime.toISOString()} ===`);

        while (true) {
            const songs = await fetchSongsChunk(skip, batchSize);

            if (songs.length === 0) {
                console.log("No more songs to process.");
                break;
            }

            console.log(`Processing batch from ${skip + 1} to ${skip + batchSize}...`);

            for (const song of songs) {
                const songId = song._id;
                const serviceResponse = await axios.post(`${process.env.APIURL}/service/add-metadata`, {
                    _id: songId
                });

                if (!serviceResponse.data.success) {
                    console.error(`Error updating metadata for song ${song.SongTitle}: ${serviceResponse.data.message}`);
                    // Handle the error as needed, maybe break the loop or log it
                    break;
                }

                console.log(`Metadata updated for song: ${song.SongTitle}`);
            }

            skip += batchSize; // Move to the next batch
        }

        const endTime = new Date(); // End time of the script
        const duration = (endTime - startTime) / 1000; // Duration in seconds

        console.log(`=== Script completed at ${endTime.toISOString()} ===`);
        console.log(`Total duration: ${duration} seconds`);
        console.log("Process completed for all songs.");
    } catch (error) {
        console.error("Error in main function:", error);
        // Handle the error at a higher level if necessary
    }
}

module.exports = main;
